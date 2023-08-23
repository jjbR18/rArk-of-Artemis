//=============================================================================
// AltMenuScreen3.js　をデスポンが弄り倒したプラグインです。
//=============================================================================
//
//以下のプラグインとも合体してます。
//=============================================================================
// TMVplugin - 最強全脱ぎコマンド削除
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.01
// 最終更新日: 2016/02/05
//=============================================================================


/*:
 * @plugindesc Yet Another menu screen layout.
 * @author Sasuke KANNAZUKI, Yoji Ojima
 * 
 * @default 
 * @param bgBitmapMenu
 * @desc background bitmap file at menu scene. put at img/pictures.
 * @default 
 * 
 * @param bgBitmapItem
 * @desc background bitmap file at item scene. put at img/pictures.
 * @default 
 * 
 * @param bgBitmapSkill
 * @desc background bitmap file at skill scene. put at img/pictures.
 * @default 
 * 
 * @param bgBitmapEquip
 * @desc background bitmap file at equip scene. put at img/pictures.
 * @default 
 * 
 * @param bgBitmapStatus
 * @desc background bitmap file at status scene. put at img/pictures.
 * @default 
 * 
 * @param bgBitmapOptions
 * @desc background bitmap file at option scene. put at img/pictures.
 * @default
 * 
 * @param bgBitmapFile
 * @desc background bitmap file at save/load scene. put at img/pictures.
 * @default 
 * 
 * @param bgBitmapGameEnd
 * @desc background bitmap file at gameEnd scene. put at img/pictures.
 * @default 
 * 
 * @param maxColsMenu
 * @desc max column at menu window
 * @default 4
 * 
 * @param commandRows
 * @desc number of visible rows at command window
 * @default 2
 *
 * @param isDisplayStatus
 * @desc whether display status or not. (1 = yes, 0 = no)
 * @default 1
 * 
 * @help This plugin does not provide plugin commands.
 *  The differences with AltMenuscreen are follows:
 *   - windows are transparent at all menu scene.
 *   - it can set the background bitmap for each scenes at menu.
 *   - picture is actors' original
 *
 * Actor' note:
 * <stand_picture:filename> set actor's standing picture at menu.
 *   put file at img/pictures.
 *
 * preferred size of actor's picture:
 * width: 174px(maxColsMenu=4), 240px(maxColsMenu=3)
 * height: 408px(commandRows=2), 444px(commandRows=1)
 */

/*:ja
 * @plugindesc レイアウトの異なるメニュー画面
 * @author 神無月サスケ, Yoji Ojima　+デスポン
 * 
 * @param bgBitmapMenu
 * @desc メニュー背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapItem
 * @desc アイテム画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapSkill
 * @desc スキル画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapEquip
 * @desc 装備画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapStatus
 * @desc ステータス画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapOptions
 * @desc オプション画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapFile
 * @desc セーブ／ロード画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param bgBitmapGameEnd
 * @desc ゲーム終了画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param maxColsMenu
 * @desc アクターを表示するウィンドウの1画面の登録最大数です。
 * @default 4
 * 
 * @param commandRows
 * @desc コマンドウィンドウの行数です。
 * @default 1
 *
 * @param isDisplayStatus
 * @desc ステータスを表示するかしないかを選びます。(1 = yes, 0 = no)
 * @default 1
 * 
 * @help このプラグインには、プラグインコマンドはありません。
 *
 *  AltMenuscreen との違いは以下です:
 *  - メニュー画面すべてのウィンドウが透明です
 *  - メニューそれぞれのシーンに背景ビットマップを付けることが出来ます。
 *  - アクターに立ち絵を利用します。
 *
 * アクターのメモに以下のように書いてください:
 * <stand_picture:ファイル名> ファイル名が、そのアクターの立ち絵になります。
 *   ファイルは img/pictures に置いてください。
 *
 * 以下「TMVplugin - 最強全脱ぎコマンド削除」の説明
 * 望ましいアクター立ち絵のサイズ：
 * 幅：3列:240px, 4列：174px
 * 高さ： コマンドウィンドウ 1行:444px 2行:408px
 *
 * @plugindesc 装備シーンからコマンドウィンドウを削除し、
 * スロットウィンドウに２行分のスペースを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * スロットウィンドウがアクティブな状態で Shift キーを押せば最強装備、
 * Ctrl または Alt キーを押せば全て外すが実行されます。
 *
 * Q または W キーによるアクター変更もスロットウィンドウが
 * アクティブな状態で実行できます。
 *
 * 現在のバージョンではマウス、タッチ操作には対応していません。
 *
 * プラグインコマンドはありません。
 * 
 */

(function() {

    //背景のブラーをブッ殺す
    SceneManager.snapForBackground = function() {
        this._backgroundBitmap = this.snap();
        //this._backgroundBitmap.blur();
    };
    
    // set parameters
    var parameters = PluginManager.parameters('AltMenuScreen3');
    var bgBitmapMenu = parameters['bgBitmapMenu'] || '';
    var bgBitmapItem = parameters['bgBitmapItem'] || '';
    var bgBitmapSkill = parameters['bgBitmapSkill'] || '';
    var bgBitmapEquip = parameters['bgBitmapEquip'] || 'Menu_equip_';
    var bgBitmapStatus = parameters['bgBitmapStatus'] || '';
    var bgBitmapOptions = parameters['bgBitmapOptions'] || 'option_bg';
    var bgBitmapFile = parameters['bgBitmapFile'] || '';
    var bgBitmapGameEnd = parameters['bgBitmapGameEnd'] || '';
    var maxColsMenuWnd = Number(parameters['maxColsMenu'] || 5);
    var rowsCommandWnd = Number(parameters['commandRows'] || 2);
    var isDisplayStatus = !!Number(parameters['isDisplayStatus']);

   //
   // make transparent windows for each scenes in menu.
   //
    
    Scene_Menu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createGoldWindow();
        this.createStatusWindow();
    };
    
    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 270;
        this._statusWindow.y = 40;
        // インフォメーションウィンドウの追加
        this.createInformationWindow();
        this.createInformationWindow2();
        // make transparent for all windows at menu scene.
        this._statusWindow.opacity = 0;
        this._goldWindow.opacity = 0;
        this._goldWindow.x = 2;
        this._goldWindow.y = 336 + 131;
        this._commandWindow.x = 30;
        this._commandWindow.y = 86;
        this._commandWindow.width = 260;
        this._commandWindow.opacity = 0;
        this._informationWindow.x = 330;
        this._informationWindow.y = -7;
        this._informationWindow.opacity = 0;
        this._informationWindow2.opacity = 0;
    };

    Scene_Item.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        //this.createAllWindows();
        this._scopeIndex = null;
        Scene_ItemBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createCategoryWindow();
        this.createItemWindow();
        //this.createActorWindow();
        
        this._helpWindow.x = 36;
        this._helpWindow.y = 486;
        this._helpWindow.width -= 256;
        this._helpWindow.height += 120;
        this._categoryWindow.x = 60;
        this._categoryWindow.y = 72;
        this._categoryWindow.width -= 120;
        this._itemWindow.x = 64;
        this._itemWindow.y = 164;
        this._categoryWindow.opacity = 0;
        this._itemWindow.opacity = 0;
        this._helpWindow.opacity = 0;
    };
    
    Scene_Item.prototype.createItemWindow = function() {
        var wy = this._categoryWindow.y + this._categoryWindow.height;
        var wh = Graphics.boxHeight - wy - 160;
        this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth - 128, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);
    };
    
    Window_ItemList.prototype.drawItem = function(index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            var default_font_size = this.contents.fontSize;
            this.contents.fontSize = 22;
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.contents.fontSize = default_font_size;
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };
    
    Window_ItemList.prototype.updateHelp = function() {
        $gameVariables._data[402] = 'Equip'
        //$gameVariables._data[401] = this.item()
        this.setHelpWindowItem(this.item());
    };
    
    //ここからスキル
    var _Scene_Skill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function() {
        _Scene_Skill_create.call(this);
        this._helpWindow.opacity = 160;
        this._skillTypeWindow.opacity = 160;
        this._statusWindow.opacity = 160;
        this._itemWindow.opacity = 160;
        this._actorWindow.opacity = 160;
    };
    
    
    
    
    
    //ここまでスキル
    var _Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _Scene_Status_create.call(this);
        this._statusWindow.opacity = 0;
    };

    var _Scene_Options_create = Scene_Options.prototype.create;
    Scene_Options.prototype.create = function() {
        _Scene_Options_create.call(this);
        this._optionsWindow.x = 40;
        this._optionsWindow.y = 84;
        this._optionsWindow.opacity = 0;
    };

    var _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_create.call(this);
        this._helpWindow.opacity = 0;
        this._helpWindow.x = 320;
        this._helpWindow.y = -9;
        this._listWindow.opacity = 0;
        //this._listWindow.height  = 580
    };
    
    Scene_File.prototype.createListWindow = function() {
        var x = 20;
        var y = this._helpWindow.height - 8 - 64;
        var width = Graphics.boxWidth;
        var height = 580;
        this._listWindow = new Window_SavefileList(x, y, width, height);
        this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this._listWindow.select(this.firstSavefileIndex());
        this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
        this._listWindow.setMode(this.mode());
        this._listWindow.refresh();
        this.addWindow(this._listWindow);
    };

    var _Scene_GameEnd_create = Scene_GameEnd.prototype.create;
    Scene_GameEnd.prototype.create = function() {
        _Scene_GameEnd_create.call(this);
        this._commandWindow.x = 40;
        this._commandWindow.y = 84;
        this._commandWindow.opacity = 0;
    };

    //
    // load bitmap that set in plugin parameter
    //
    var _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function(){
        //if(bgBitmapMenu){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture("menu_bg");
            this.addChild(this._backgroundSprite);
            return;
        //}
        // if background file is invalid, it does original process.
        _Scene_Menu_createBackground.call(this);
    };

    var _Scene_Item_createBackground = Scene_Item.prototype.createBackground;
    Scene_Item.prototype.createBackground = function(){
        //if(bgBitmapItem){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
            ImageManager.loadPicture("item_bg");
            this.addChild(this._backgroundSprite);
            return;
        //}
        // if background file is invalid, it does original process.
        _Scene_Item_createBackground.call(this);
    };
    
    
    Window_Gold.prototype.refresh = function() {
        //var x = this.textPadding();
        //var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        //this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
        if ($gameSwitches.value(144)) {this.drawIcon(57, 0, 0);}
        if ($gameSwitches.value(145)) {this.drawIcon(58, 32, 0);}
        if ($gameSwitches.value(146)) {this.drawIcon(59, 64, 0);}
    };

    //-----------------------------------------------------------------------------
    // 装備関係の処理
    
    //TMVplugin - 最強全脱ぎコマンド削除　関係の処理

      var _Scene_Equip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
      Scene_Equip.prototype.createCommandWindow = function() {
        _Scene_Equip_createCommandWindow.call(this);
        this._commandWindow.hide();
        this._commandWindow.deactivate();
      };
    
        Window_EquipStatus.prototype.initialize = function(x, y) {
            var width = Graphics.boxWidth;
            var height = Graphics.boxHeight;
            Window_Base.prototype.initialize.call(this, 0, 0, width, height);
            this._actor = null;
            this._tempActor = null;
            this.refresh();
        };

      Scene_Equip.prototype.createSlotWindow = function() {
        var wx = 0;
        var wy = 288;
        var ww = 340;
        var wh = 240;
        this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
        this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
        this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
        this.addWindow(this._slotWindow);
      };
    
    Scene_Equip.prototype.createItemWindow = function() {
        var wx = 0;
        var wy = 228;
        var ww = 340;
        var wh = 380;
        this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._itemWindow.hide();
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

      Scene_Equip.prototype.commandOptimize = function() {
        SoundManager.playEquip();
        this.actor().optimizeEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._slotWindow.activate();
      };

      Scene_Equip.prototype.commandClear = function() {
        SoundManager.playEquip();
        this.actor().clearEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._slotWindow.activate();
      };

      var _Scene_Equip_update = Scene_Equip.prototype.update;
      Scene_Equip.prototype.update = function() {
        _Scene_Equip_update.call(this);
        if (this._slotWindow.active) {
          if (Input.isTriggered('shift')) {
            this.commandOptimize();
          } else if (Input.isTriggered('control')) {
            this.commandClear();
          }
        }
      };
    
    var _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_create.call(this);
        //最強装備とかのwinを殺す処理
        this._slotWindow.activate();
        this._slotWindow.select(0);
        //現在装備してるアイテムWINの位置とサイズ調整
        this._slotWindow.x = 35;
        this._slotWindow.y = 81;
        //ステータスWINを作成
        this._statusWindow.x = 35;
        this._statusWindow.y = 273;
        this._statusWindow.width = 400;
        //所持品WINを作成
        this._itemWindow.x = 757;
        this._itemWindow.y = 81;
        //ヘルプWINを作成
        this._helpWindow.x = 757;
        this._helpWindow.y = 485;
        this._helpWindow.width = 380;
        this._helpWindow.height = 250;
        //全WINを透明化する
        this._helpWindow.opacity = 0;
        this._statusWindow.opacity = 0;
        this._commandWindow.opacity = 100;
        this._slotWindow.opacity = 0;
        this._itemWindow.opacity = 255;
    };
    
    //背景を作成
    
    var _Scene_Equip_createBackground = Scene_Equip.prototype.createBackground;
    Scene_Equip.prototype.createBackground = function(){
        if(bgBitmapEquip){
            console.log(this._backgroundSprite)
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture(bgBitmapEquip+$gameParty.menuActor()._actorId);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Equip_createBackground.call(this);
    };
    
    // パラメータ表示の内容をカスタマイズする
    
    Window_EquipStatus.prototype.refresh = function() {
        this.contents.clear();  
        if (this._actor) {
            //パラメータ表示
            var x = 0
            var y = 20
            var row = 0
            var row_size = 33
            var Column = 0
            var Column_size = 174
            this.contents.fontSize = 22;
            //基本能力を描画
            //１行目
            this.drawItem(x + Column * Column_size, y + row * row_size, 26);//戦力
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 0);//最大HP
            //２行目
            row += 1;
            Column = 0;
            Column_size = 116
            this.drawItem(x + Column * Column_size, y + row * row_size, 2);//腕力
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 3);//丈夫
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 4);//知力
            //３行目
            row += 1;
            Column = 0;
            Column_size = 116
            this.drawItem(x + Column * Column_size, y + row * row_size, 8);//器用さ
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 6);//素早さ
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 5);//精神
            //４行目
            row += 1;
            Column = 0;
            Column_size = 116
            this.drawItem(x + Column * Column_size, y + row * row_size, 9);//魅力
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 7);//愛
            //ここから属性耐性
            //５行目
            row += 1;
            Column = 0;
            Column_size = 87
            this.drawItem(x + Column * Column_size, y + row * row_size, 10);//斬
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 11);//突
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 12);//打
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 13);//火
            //６行目
            row += 1;
            Column = 0;
            Column_size = 87
            this.drawItem(x + Column * Column_size, y + row * row_size, 14);//水
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 15);//天
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 16);//陽
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 17);//陰
            //７行目
            row += 1;
            Column = 0;
            Column_size = 87
            this.drawItem(x + Column * Column_size, y + row * row_size, 18);//毒
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 19);//暗闇
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 20);//スタン
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 21);//マヒ
            //８行目
            row += 1;
            Column = 0;
            Column_size = 87
            this.drawItem(x + Column * Column_size, y + row * row_size, 22);//眠り
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 23);//石化
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 24);//恐怖
            Column += 1;
            this.drawItem(x + Column * Column_size, y + row * row_size, 25);//魅了
        }
    };

    Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
        /*
        0:最大HP
        1:最大MP
        2:腕力(攻撃力)
        3:丈夫さ(防御力)
        4:魔法力
        5:魔法防御
        6:敏捷性
        7:運
        8:器用さ(命中)
        9:魅力(回避)
        */
        if (paramId <= 9 || paramId == 26){
            var size = 80;
        }else{
            var size = 48;
        }
        this.drawFontIcon(paramId, x, y);
        if (this._actor) {
            this.drawCurrentParam(x + size, y, paramId);
        } else if(this._tempActor) {
            this.drawNewParam(x + size, y, paramId);
        }
        
    };
    
    //=============================================================================
    // drawFontIcon
    // ウィンドウ用の大きいパラメータ名を表示するやつ
    //=============================================================================
    
    Window_Base.prototype.drawFontIcon = function(iconIndex, x, y) {
        var bitmapname = 'IconSet_pfont'
        ImageManager.reserveSystem(bitmapname);
        var bitmap = ImageManager.loadSystem(bitmapname);
        var pw = 75//Window_Base._iconWidth;
        var ph = 26//Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y + 36);
    };
    
    //=============================================================================
    // Window_EquipStatus
    //=============================================================================
    

    Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
        this.resetTextColor();
        //console.log(this._actor.elementRate(1))
        if (paramId <= 7){
            var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
        }else if (paramId == 8){
            var actorparam = Yanfly.Util.toGroup(this._actor.dex);
        }else if (paramId == 9){
            var actorparam = Yanfly.Util.toGroup(this._actor.love);
        }else if (paramId == 10){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(1) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 11){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(2) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 12){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(3) * 100 - 100);   
            actorparam = Math.floor(actorparam);
        }else if (paramId == 13){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(4) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 14){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(5) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 15){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(6) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 16){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(7) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 17){
            var actorparam = Yanfly.Util.toGroup(this._actor.elementRate(8) * 100 - 100);     
            actorparam = Math.floor(actorparam);
        }else if (paramId == 18){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(4) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 19){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(5) * 100 - 100); 
            actorparam = Math.floor(actorparam);
        }else if (paramId == 20){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(6) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 21){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(7) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 22){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(8) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 23){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(9) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 24){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(10) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 25){
            var actorparam = Yanfly.Util.toGroup(this._actor.stateRate(11) * 100 - 100);
            actorparam = Math.floor(actorparam);
        }else if (paramId == 26){
            var actorparam = Yanfly.Util.toGroup(this._actor.battlepower(this._actor));   
        }
        this.drawText(actorparam, x, y, 128, 'left');
    };

    Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
        var newValue = this._tempActor.param(paramId);
        var diffvalue = newValue - this._actor.param(paramId);
        var actorparam = Yanfly.Util.toGroup(newValue);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(actorparam, x, y, 48, 'left');
    };
    
    //=============================================================================    
    
    Scene_Equip.prototype.onSlotOk = function() {
        this._itemWindow.activate();
        this._itemWindow.select(0);
        this._itemWindow.show();
        //this._slotWindow.hide();
    };
    
    Scene_Equip.prototype.onItemOk = function() {
        SoundManager.playEquip();
        this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
        //this._itemWindow.hide();
        this._slotWindow.show();
    };

    Scene_Equip.prototype.onItemCancel = function() {
        this._slotWindow.activate();
        this._itemWindow.deselect();
        this._itemWindow.hide();
        this._slotWindow.show();
    };

    //背景画像をキャラに合わせたものに更新する処理を追加
    Scene_Equip.prototype.onActorChange = function() {
        this._backgroundSprite.bitmap = ImageManager.loadPicture(bgBitmapEquip+$gameParty.menuActor()._actorId);
        this.refreshActor();
        //this._commandWindow.activate();
        this._slotWindow.activate();
        this._itemWindow.hide();
        this._slotWindow.show();
        //this._itemWindow._refreshAllParts;
        this._itemWindow._createBackImageChange();
    };
    
    Window_EquipSlot.prototype.drawItem = function(index) {
        if (this._actor) {
            var rect = this.itemRectForText(index);
            this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            var default_font_size = this.contents.fontSize;
            this.contents.fontSize = 22;
            this.drawEquipName(this._actor.equips()[index], rect.x - 8, rect.y + 7);
            this.contents.fontSize = default_font_size;

            this.changePaintOpacity(true);
        }
    };
    
    Window_EquipItem.prototype.drawItem = function(index) {    
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            var default_font_size = this.contents.fontSize;
            this.contents.fontSize = 22;
            this.drawEquipName(item, rect.x, rect.y + 7);
            //this.drawItemName(item, rect.x - 8, rect.y + 7, rect.width - numberWidth);
            this.contents.fontSize = default_font_size;
            this.changePaintOpacity(1);
        }
    };

    
    Window_Base.prototype.drawEquipName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        //console.log(item)
        var iconBoxWidth = Window_Base._iconWidth + 4;
        x += 12;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 4, y - 2, item);
        this.contents.fontSize = 22;
        this.drawText(item.name, x + 36, y - 4, width - iconBoxWidth);
    }
    };

    //ヘルプの内容を拡張する   
    Window_Help.prototype.setItem = function(item) {
        $gameVariables._data[401] = item
        this.setText(item ? item.description : '');
    };
    
    Window_Help.prototype.refresh = function() {
        this.contents.clear();
        var default_font_size = this.contents.fontSize;
        this.contents.fontSize = default_font_size;
        var item = $gameVariables._data[401]
        if ($gameVariables._data[402] == 'Equip'){
            if (item){
                //console.log(item.params[1])
                this.drawIcon(item.iconIndex, 0, -2, item);
                this.contents.fontSize = 22;
                this.drawText(item.name, 36, -4, 320);
                if (item.meta['武器性能']){
                    var wea = item.meta['武器性能'];
                }else if(item.meta['防具']){
                    var wea = "斬+"+Math.round((item.traits[0].value * 100)-100)+" 突+"+Math.round((item.traits[1].value * 100)-100)+" 打+"+Math.round((item.traits[2].value * 100)-100);
                }else if(item.meta['斬防具']){
                    var wea = "斬+"+Math.round((item.traits[0].value * 100)-100);
                }else if(item.meta['突防具']){
                    var wea = "突+"+Math.round((item.traits[0].value * 100)-100);    
                }else if(item.meta['打防具']){
                    var wea = "打+"+Math.round((item.traits[0].value * 100)-100);      
                }else if(item.meta['３属性防具']){
                    var wea = "火+"+Math.round((item.traits[0].value * 100)-100)+" 水+"+Math.round((item.traits[1].value * 100)-100)+" 天+"+Math.round((item.traits[2].value * 100)-100);
                }else if(item.meta['２属性防具']){
                    var wea = "陽+"+Math.round((item.traits[0].value * 100)-100)+" 陰+"+Math.round((item.traits[1].value * 100)-100);    
                }else{
                    var wea = 0; 
                }
                this.drawText('性能 : ' + wea, 4, -4 + 33, 320);
            }
            this.contents.fontSize = 22;
            //this.drawText(this._text, 0, 64, 320);
            this.drawTextEx(this._text, this.textPadding(), 60);
            this.contents.fontSize = default_font_size;
            //$gameVariables._data[402] = ''
        }else{
            this.drawTextEx(this._text, this.textPadding(), 0);
        }    
    };
    
    //ヘルプ拡張
    Window_EquipSlot.prototype.updateHelp = function() {
        $gameVariables._data[402] = 'Equip'
        Window_Selectable.prototype.updateHelp.call(this);
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setTempActor(null);
        }
    };

    Window_EquipItem.prototype.updateHelp = function() {
        $gameVariables._data[402] = 'Equip'
        Window_ItemList.prototype.updateHelp.call(this);
        if (this._actor && this._statusWindow) {
            var actor = JsonEx.makeDeepCopy(this._actor);
            actor.forceChangeEquip(this._slotId, this.item());
            this._statusWindow.setTempActor(actor);
        }
    };

    
    //このあたりまで装備系の処理

    var _Scene_Status_createBackground =
     Scene_Status.prototype.createBackground;
    Scene_Status.prototype.createBackground = function(){
        if(bgBitmapStatus){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapStatus);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Status_createBackground.call(this);
    };

    var _Scene_Options_createBackground = Scene_Options.prototype.createBackground;
    Scene_Options.prototype.createBackground = function(){
        if(bgBitmapOptions){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapOptions);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Options_createBackground.call(this);
    };

    var _Scene_File_createBackground = Scene_File.prototype.createBackground;
    Scene_File.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap =
         ImageManager.loadPicture('save_bg');
        this.addChild(this._backgroundSprite);
        return;
        // if background file is invalid, it does original process.
        _Scene_File_createBackground.call(this);
    };

    var _Scene_GameEnd_createBackground = Scene_GameEnd.prototype.createBackground;
    Scene_GameEnd.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap =
         ImageManager.loadPicture('end_bg');
        this.addChild(this._backgroundSprite);
        return;
        // if background file is invalid, it does original process.
        _Scene_GameEnd_createBackground.call(this);
    };  

    //-----------------------------------------------------------------------------
    // Window_MenuCommand
    //
    // コマンド関係の処理での変更
    
    //順番を変えて不要なコマンドを削除する。
    //
    // alt menu screen processes
    //
    Window_MenuCommand.prototype.windowWidth = function() {
        return 320;
    };
    
    Window_MenuCommand.prototype.windowHeight  = function() {
        return 480;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return rowsCommandWnd;
    };
    
    Window_MenuCommand.prototype.updateCursor = function() {
        if (this._cursorAll) {
            var allRowsHeight = this.maxRows() * this.itemHeight();
            this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
            this.setTopRow(0);
        } else if (this.isCursorVisible()) {
            var rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y + 3, rect.width, rect.height - 6);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };


    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - 24;
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(rowsCommandWnd);
        return 520;//Graphics.boxHeight - h1 - h2;
    };
    
     Window_MenuStatus.prototype.maxCols = function() {
        return maxColsMenuWnd;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };
    
    Window_MenuStatus.prototype.itemWidth = function() {
        return 158;
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        // load stand_picture
        var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
        var w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
        var h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        if(bitmap){
            var sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
            var sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
            var dx = (bitmap.width > rect.width) ? rect.x : rect.x + (rect.width - bitmap.width) / 2;
            var dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2;
            this.contents.blt(bitmap, 0, 0, 155, 463, index * 170, 10);
        } else { // when bitmap is not set, do the original process.
            this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
        }
        this.changePaintOpacity(true);
    };
    
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        //if(!isDisplayStatus){
        //    return;
        //}
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = index * 170;
        var y = rect.y;
        var width = 170//rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorParams(actor, x + 18, bottom - lineHeight * 2, width);
        //this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };  

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function() {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };
    
    //-----------------------------------------------------------------------------
    // Game_Actor

    Game_Actor.prototype.nextExpRate = function()
    {
        var diff = Math.max(this.nextLevelExp() - this.currentLevelExp(), 1);
        var rest = Math.max(this.nextRequiredExp(), 1);
        return Math.round(((diff - rest) / diff * 100) / 5);
    };
    
    Game_Actor.prototype.battlepower = function(actor)
    {
        var bp = 0;
        bp += actor.param(0) * 5;
        bp += actor.cri * 1;
        bp += actor.param(2) * 6;
        bp += actor.param(3) * 5;
        bp += actor.param(4) * 6;
        bp += actor.param(5) * 5;
        bp += actor.param(6) * 4;
        bp += actor.param(7) * 2;
        bp += actor.dex * 6;
        bp += actor.love * 4;
        bp = Math.ceil(bp);
        //console.log(bp)
        return bp;
    };
    
    Window_Base.prototype.drawActorParams = function(actor, x, y, width) {
        //var value2 = actor.isMaxLevel() ? '-------' : actor.nextRequiredExp();
        //var bitmap = ImageManager.loadPicture('exp_gage');
        this.contents.fontSize = 32;
        this.changeTextColor(this.textColor(31));
        this.drawText(actor.mhp, x - 33, y - 40, 166, 'right');
        this.drawText(actor.battlepower(actor), x - 33, y + 24, 166, 'right');
        this.resetTextColor();
    };
    
    
    //-----------------------------------------------------------------------------
    // スキル画面の処理
    
    //-----------------------------------------------------------------------------
    // Scene_Skill
    
    Scene_Skill.prototype.create = function() {
        Scene_ItemBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createSkillTypeWindow();
        this.createStatusWindow();
        this.createItemWindow();
        this.createActorWindow();
        //いらんウィンドウを画面外へ
        this._statusWindow.x = 1136;
        //ヘルプ画面の位置を移動
        this._helpWindow.x = 274;
        this._helpWindow.y = 480;
        this._helpWindow.height = 460;
        this._helpWindow.contents.fontSize = 22;
        //種別一覧画面の位置を移動
        this._skillTypeWindow.x = 32;
        this._skillTypeWindow.y = 84;
        this._skillTypeWindow.height = 460;
        //スキル一覧画面の位置を移動
        this._itemWindow.x = 32 + 256;
        this._itemWindow.y = 84;
        this._itemWindow.width = 375;
        this._itemWindow.height = 400;
        //全部透明化
        this._helpWindow.opacity = 0;
        this._statusWindow.opacity = 0;
        this._skillTypeWindow.opacity = 0;
        this._itemWindow.opacity = 0;
        this._actorWindow.opacity = 0;
    };
    
    //背景を作成
    var _Scene_Skill_createBackground = Scene_Skill.prototype.createBackground;
    Scene_Skill.prototype.createBackground = function(){
        //if(bgBitmapSkill){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture("Menu_skill_"+$gameParty.menuActor()._actorId);
            this.addChild(this._backgroundSprite);
            return;
        //}
        // if background file is invalid, it does original process.
        _Scene_Skill_createBackground.call(this);
    };
    
    Scene_Skill.prototype.onActorChange = function() {
        this._backgroundSprite.bitmap = ImageManager.loadPicture("Menu_skill_"+$gameParty.menuActor()._actorId);
        this.refreshActor();
        this._skillTypeWindow.activate();
    };

    
    
    //-----------------------------------------------------------------------------
    // Window_SkillList
    //
    // The window for selecting a skill type on the skill screen.
    
    Window_SkillList.prototype.includes = function(item) {
        if (this._stypeId >= 11){
            return item && item.requiredWtypeId1 === this._stypeId - 10;
        }else{
            return item && item.stypeId === this._stypeId;    
        }
    };
    
    Window_SkillList.prototype.standardFontSize = function() {
        return 22;
    };
    
    Window_SkillList.prototype.lineHeight = function() {
        return 33;
    };
    
    Window_SkillList.prototype.maxCols = function() {
        return 1;
    };

    //-----------------------------------------------------------------------------
    // Window_SkillType
    
    Window_SkillType.prototype.makeCommandList = function() {
        if (this._actor) {
            this.addCommand("　剣技", 'skill', true, 11);
            this.addCommand("　大剣技", 'skill', true, 12);
            this.addCommand("　刀技", 'skill', true, 18);
            this.addCommand("　槍技", 'skill', true, 13);
            this.addCommand("　弓技", 'skill', true, 16);
            this.addCommand("　きかい", 'skill', true, 17);
            this.addCommand("　体術", 'skill', true, 3);
            this.addCommand("　火術", 'skill', true, 4);
            this.addCommand("　水術", 'skill', true, 5);
            this.addCommand("　天術", 'skill', true, 6);
            this.addCommand("　陽術", 'skill', true, 7);
            this.addCommand("　陰術", 'skill', true, 8);
            /*
            var skillTypes = this._actor.addedSkillTypes();
            skillTypes.sort(function(a, b) {
                return a - b;
            });
            skillTypes.forEach(function(stypeId) {
                var name = $dataSystem.skillTypes[stypeId];
                this.addCommand(name, 'skill', true, stypeId);
            }, this);*/
        }
    };
    
    Window_SkillType.prototype.standardFontSize = function() {
        return 22;
    };
    
    Window_SkillType.prototype.lineHeight = function() {
        return 33;
    };
    

})();
