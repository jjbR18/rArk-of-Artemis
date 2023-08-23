//=============================================================================
// セーブ画面 / AltSaveScreen.js
//=============================================================================

/*:ja
 * v0.3.0
 * @plugindesc 
 * セーブ/ロード画面のレイアウトを変更します。
 * 導入前にヘルプを読むことを推奨
 *
 * @author Declare War
 * 
 * @param UseBackPicture1
 * @default true
 * @desc 背景の画像を使うかどうか(true/false)
 *
 * @param BackPicture1
 * @default Save_Back_Picture
 * @desc 背景の画像のファイル名
 *
 * @param UseBackPicture2
 * @default true
 * @desc 背景の上に表示する画像を使うかどうか(ウィンドウの代わり、true/false)
 *
 * @param BackPicture2
 * @default Save_Back_Picture2
 * @desc 背景の上に表示する画像のファイル名
 *
 * @param Opacity
 * @default 192
 * @desc ウィンドウの不透明度
 *
 * @param DrawGauge
 * @default true
 * @desc HPMPゲージを描画するかどうか(true/false)
 *
 * @param MoveLvDraw
 * @default false
 * @desc レベルの描画を名前の下にするかどうか(true/false)
 *
 * @param FontSize1
 * @default 24
 * @desc 左のウィンドウのフォントサイズ(初期設定は24)
 *
 * @param FontSize2
 * @default 28
 * @desc 右のウィンドウのフォントサイズ(初期設定は28)
 *
 * @param Color1
 * @default rgba(0,0,0,0.2)
 * @desc ファイル名表示のところの背景の色の設定1
 *
 * @param Color2
 * @default rgba(0,0,0,1)
 * @desc ファイル名表示のところの背景の色の設定2
 *
 * @param Color3
 * @default rgba(0,0,64,0.5)
 * @desc マップ名表示のところの背景の色の設定1
 *
 * @param Color4
 * @default rgba(0,0,64,0.5)
 * @desc マップ名表示のところの背景の色の設定2
 *
 * @param Color5
 * @default #00FF00
 * @desc マップ名のテキストの色
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 * ●マップ名表示について
 * 実際のマップ名ではなく編集画面の表示名の方を表示する
 *
 * ●注意
 * 導入前にsaveフォルダを空にする
 * (global.rpgsaveも消す、コンフィグのは残してもOK)
 *
 * 画像はPicturesフォルダに入れる
 *
 */
 
(function(){
	// params --------------------------------------------------------
    var parameters = PluginManager.parameters('セーブ画面');
    var Params = {};
	Params.useBackPicture1 = parameters['UseBackPicture1'] || '';
	Params.backPicture1 = parameters['BackPicture1'] || '';
	Params.useBackPicture2 = parameters['UseBackPicture2'] || '';
	Params.backPicture2 = parameters['BackPicture2'] || '';
	Params.opacity = Number(parameters['Opacity'] || 0);
	Params.drawGauge = parameters['DrawGauge'] || '';
	Params.moveLvDraw = parameters['MoveLvDraw'] || '';
	Params.fontSize1 = Number(parameters['FontSize1'] || 24);
	Params.fontSize2 = Number(parameters['FontSize2'] || 36);
	Params.color = [parameters['Color1'], parameters['Color2'],
	parameters['Color3'], parameters['Color4'], parameters['Color5']];
	Params.defalutColor = ['rgba(0,0,0,0.2)', 'rgba(0,0,0,1)',
	                       'rgba(0,0,64,0.5)', 'rgba(0,0,64,0.5)', '#00FF00'];
	// DataManager -------------------------------------------------------------
	// makeSavefileInfo
	var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function() {
		var info = _DataManager_makeSavefileInfo.call(this);
		info.partyLeaderParam = $gameParty.leaderParam();
		info.mapName = $gameMap.displayName();
		return info;
	};
	// Game_Party --------------------------------------------------------------
	// leaderParam
	Game_Party.prototype.leaderParam = function() {
		var actor = this.leader();
		if (!actor) return null;
		return [actor._level, actor.hp, actor.mhp, actor.mp, actor.mmp, 
		        actor.atk, actor.def, actor.mat, actor.mdf, actor.agi, 
				actor.luk, actor.name()];
	};
	// Window_SavefileList -----------------------------------------------------
	// maxItems
	Window_SavefileList.prototype.maxItems = function() {
		return DataManager.maxSavefiles();
	};
    // maxVisibleItems
	Window_SavefileList.prototype.maxVisibleItems = function() {
		return 15;
	};
	// setActorWindow
	Window_SavefileList.prototype.setActorWindow = function(window) {
		this._actorWindow = window;
		this.updateActorWindow();
	};
	// updateActorWindow
	Window_SavefileList.prototype.updateActorWindow = function() {
		if (this._actorWindow){
			var id = this.index() + 1;
			this._actorWindow.setId(id);
		}
	};
	// callUpdateHelp
	var _Window_SavefileList_callUpdateHelp = Window_SavefileList.prototype.callUpdateHelp;
	Window_SavefileList.prototype.callUpdateHelp = function() {
		_Window_SavefileList_callUpdateHelp.call(this);
		if (this.active && this._actorWindow) {
			this.updateActorWindow();
		}
	};
	// standardFontSize
	Window_SavefileList.prototype.standardFontSize = function() {
		return Params.fontSize1;
	};
	// leftWidth
	Window_SavefileList.prototype.leftWidth = function() {
		return 88;
	};
	// centerWidth
	Window_SavefileList.prototype.centerWidth = function() {
		return 240;
	};
	// drawItem
	Window_SavefileList.prototype.drawItem = function(index) {
		var id = index + 1;
		var valid = DataManager.isThisGameFile(id);
		var info = DataManager.loadSavefileInfo(id);
		var rect = this.itemRect(index);
		this.resetTextColor();
		if (this._mode === 'load') {
			this.changePaintOpacity(valid);
		}
		this.backGradient(rect);
		this.drawFileId(id, rect.x + 4, rect.y);
		if (info) {
			this.changePaintOpacity(valid);
			this.drawContents(info, rect, valid);
			this.changePaintOpacity(true);
		}
	};
	// drawFileId
	Window_SavefileList.prototype.drawFileId = function(id, x, y) {
		this.drawText('File ' + id, x, y, this.leftWidth());
	};
	// backGradient
	Window_SavefileList.prototype.backGradient = function(rect) {
		var c1 = Params.color[0] || Params.defalutColor[0];
		var c2 = Params.color[1] || Params.defalutColor[1];
		var c3 = Params.color[2] || Params.defalutColor[2];
		var c4 = Params.color[3] || Params.defalutColor[3];
		var w1 = this.leftWidth();
		var w2 = rect.width - w1;
        this.contents.gradientFillRect(rect.x, rect.y, w1, 36, c1, c2);
		this.contents.gradientFillRect(rect.x+w1, rect.y, w2, 36, c3, c4);
	};
    // drawContents
	Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
		var x1 = rect.x + this.leftWidth() + 6;
		var w1 = this.centerWidth();
		this.drawMapName(info, x1, rect.y, w1);
		var rx = x1 + this.centerWidth();
		var rw = rect.width - x1 - this.centerWidth() - 6;
		this.drawPlaytime(info, rx, rect.y, rw);
	};
    // drawMapName
	Window_SavefileList.prototype.drawMapName = function(info, x, y, width) {
		if (info.mapName) {
			var color = Params.color[4] || Params.defalutColor[4];
			this.changeTextColor(color);
			this.drawText(info.mapName, x, y, width);
			this.resetTextColor();
		}
	};
	// Window_Save_Actor -------------------------------------------------------
	//
	function Window_Save_Actor() {
		this.initialize.apply(this, arguments);
	}

	Window_Save_Actor.prototype = Object.create(Window_Base.prototype);
	Window_Save_Actor.prototype.constructor = Window_Save_Actor;
    
	// standardFontSize
	Window_Save_Actor.prototype.standardFontSize = function() {
		return Params.fontSize2;
	};
	// setId
	Window_Save_Actor.prototype.setId = function(id) {
		this.refresh(id);
	};
	// refresh
	Window_Save_Actor.prototype.refresh = function(id) {
		this.contents.clear();
		var info = DataManager.loadSavefileInfo(id);
		if (!info) return;
		var param = info.partyLeaderParam;
		var name = String(param[param.length - 1]);
		var cx = (this.contents.width - 144) / 2;
		var bx = 6;
		var by = 152;
		var lh = 36;
		var pw = 0;
		var ph = 0;
		var flag = Params.moveLvDraw === 'true';
		if (flag){
			pw += 72;
			ph += lh;
		}
		if (info.faces){
			var data = info.faces[0];
			this.drawFace(data[0], data[1], 0, 0, 144, 144);
		}
		
		this.drawActorName(name, param[1], param[2], bx, by + lh * 0, 200 + pw);
		this.drawActorLevel(param[0], 200, by + ph + lh * 0, flag);
		this.drawActorHp(param[1], param[2], bx, by + ph + lh * 1, 210);
		this.drawActorMp(param[3], param[4], bx, by + ph + lh * 2, 210);
		
		for (var i = 0; i < 6; i++) {
            this.drawItem(param, bx, by + ph + lh * (3 + i), 2 + i, 5 + i);
        }
	};
	// drawActorName
	Window_Save_Actor.prototype.drawActorName = function(name, hp, mhp, x, y, width) {
		width = width || 168;
		var rate = hp / mhp;
		this.changeTextColor(this.hpColor(rate));
		this.drawText(name, x, y, width);
	};
	// drawActorLevel
	Window_Save_Actor.prototype.drawActorLevel = function(num, x, y, flag) {
		var dx = flag ? 6 : x
		var dw = flag ? 60 : 36
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.levelA, dx, y, dw);
		this.resetTextColor();
		this.drawText(num, dx + dw, y, dw, 'right');
	};
	// drawActorHp
	Window_Save_Actor.prototype.drawActorHp = function(hp, mhp, x, y, width) {
		var rate = hp / mhp;
		width = width || 186;
		if (Params.drawGauge === 'true'){
			var color1 = this.hpGaugeColor1();
			var color2 = this.hpGaugeColor2();
			this.drawGauge(x, y, width, rate, color1, color2);
		}
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.hpA, x, y, 44);
		this.drawCurrentAndMax(hp, mhp, x, y, width,
							   this.hpColor(rate), this.normalColor());
	};
	// hpColor
	Window_Save_Actor.prototype.hpColor = function(rate) {
		if (rate === 0) {
			return this.deathColor();
		} else if (rate <= 0.25) {
			return this.crisisColor();
		} else {
			return this.normalColor();
		}
	};
    // drawActorMp
	Window_Save_Actor.prototype.drawActorMp = function(mp, mmp, x, y, width) {
		var rate = mp / mmp;
		width = width || 186;
		if (Params.drawGauge === 'true'){
			var color1 = this.mpGaugeColor1();
			var color2 = this.mpGaugeColor2();
			this.drawGauge(x, y, width, rate, color1, color2);
		}
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.mpA, x, y, 44);
		this.drawCurrentAndMax(mp, mmp, x, y, width,
							   this.normalColor(), this.normalColor());
	};
	// drawItem
	Window_Save_Actor.prototype.drawItem = function(param, x, y, paramId, paramId2) {
		this.drawParamName(x, y, paramId);
		this.drawCurrentParam(x + 180, y, param[paramId2]);
	};
	// drawParamName
	Window_Save_Actor.prototype.drawParamName = function(x, y, paramId) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.param(paramId), x, y, 140);
	};
    // drawCurrentParam
	Window_Save_Actor.prototype.drawCurrentParam = function(x, y, num) {
		this.resetTextColor();
		this.drawText(num, x, y, 80, 'right');
	};
	// Scene_Title -------------------------------------------------------------
	// isReady
	var _Scene_Title_isReady = Scene_Title.prototype.isReady;
	Scene_Title.prototype.isReady = function() {
		if (!this.faceLoadFlag){
			this.faceLoadFlag = true;
			DataManager.loadAllSavefileImages();
		}
		return _Scene_Title_isReady.call(this);
	}
	// Scene_File --------------------------------------------------------------
	// createBackground
	Scene_File.prototype.createBackground = function() {
		this._backgroundSprite = new Sprite();
		if (Params.useBackPicture1 === 'true'){
			this._backgroundSprite.bitmap = 
			ImageManager.loadPicture(Params.backPicture1, 0); 
		}else{
			this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		}
		this.addChild(this._backgroundSprite);
		
		if (Params.useBackPicture2 === 'true'){
			this._backgroundSprite2 = new Sprite();
			this._backgroundSprite2.bitmap = 
				ImageManager.loadPicture(Params.backPicture2, 0);
			this.addChild(this._backgroundSprite2);
		};
    };
	// create
	var _Scene_File_create = Scene_File.prototype.create;
	Scene_File.prototype.create = function() {
		_Scene_File_create.call(this);
		this.createActorWindow();
		this.setWindowOpacity();
	};
	// createListWindow
	Scene_File.prototype.createListWindow = function() {
		var x = 0;
		var y = this._helpWindow.height;
		var width = 496;
		var height = Graphics.boxHeight - y;
		this._listWindow = new Window_SavefileList(x, y, width, height);
		this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
		this._listWindow.setHandler('cancel', this.popScene.bind(this));
		this._listWindow.select(this.firstSavefileIndex());
		this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
		this._listWindow.setMode(this.mode());
		this._listWindow.refresh();
		this.addWindow(this._listWindow);
	};
	// createActorWindow
	Scene_File.prototype.createActorWindow = function() {
		var x = this._listWindow.width;
		var y = this._helpWindow.height;
		var w = Graphics.boxWidth - x;
		var h = Graphics.boxHeight - y;
		this._actorWindow = new Window_Save_Actor(x, y, w, h);
		this._listWindow.setActorWindow(this._actorWindow);
		this.addWindow(this._actorWindow);
	}
	// setWindowOpacity
	Scene_File.prototype.setWindowOpacity = function(){
	    this._helpWindow.opacity = Params.opacity;
		this._listWindow.opacity = Params.opacity;
		this._actorWindow.opacity = Params.opacity;
	}
})();