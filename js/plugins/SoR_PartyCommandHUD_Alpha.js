//=============================================================================
// SoR_PartyCommandHUD_Alpha.js
// MIT License (C) 2020 蒼竜 @soryu_rpmaker
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Latest version v1.00 (2020/07/16)
//=============================================================================

/*:ja
* @plugindesc ＜パーティコマンドHUD単品 Type:α＞
* @author 蒼竜　@soryu_rpmaker
* @help パーティコマンドの表示形式を変更します。
*
*　機能の広範化により、製作者ごとに無駄な処理が氾濫することを抑制するため、
* UIデザインの方向性ごとにスクリプトファイルを分けています。
* 好みのスタイルのものを1つだけ選んで導入してください。
* (このスクリプトは、"Type-α"のものです。)

* 具体的な用例は
* http://dragonflare.dip.jp/dcave/
* から参照してください。
*
* -----------------------------------------------------------
* バージョン情報
* -----------------------------------------------------------
* v1.00 (2020/07/04)       公開  
*
*
* @param ======General Settings======
* @param IsActorStatusPositionAdjust
* @desc 'true'の時、デフォルトのステータス画面位置を調節します。  (default: false)
* @default false
* @type boolean
* @param IsActorStatusPositionFixed
* @desc 'true'の時、デフォルトのステータス画面位置を中央に固定します。  (default: false)
* @default false
* @type boolean
* @param ======UI Settings======
*
* @param PartyCommandWindow_Y-ratio
* @desc y軸方向パーティーコマンド配置位置。1.0で中心、大きいほど下寄りになります。(default: 1.38)
* @default 1.38
* @type number
* @param PartyCommandWindow_width
* @desc パーティーコマンドの横幅(default: 360)
* @default 360
* @type number
*
*/
/*:
* @plugindesc <Separatable Party Command HUD Type-Alpha>
* @author @soryu_rpmaker
* @help Apply alternative party command layout on battle scene
*
* This plugin implements alternative party command layout on battle scene
* which has the customability for rpgmakers. 
*
* The objective of the plugin is to just alter battle party command UI without
* changing other HUDs like existing comprehensive plugins,
* i.e. YEP, and MOG. The risk of conflict among other plugins 
* are expected to be relatively few so that each game developer  
* can manage safety their own game systems by using many plugins. 
*
*　In order to avoid outburst of unnecessary functions for respective developers
* by implementing various features for attractive UI,
* script files are separated by the design.
* Thus, install just ONLY ONE script for your preference. 
* (This file is for "Type-Alpha".)
*
* To get initial instructions, see
* http://dragonflare.dip.jp/dcave/ .
* 
* -----------------------------------------------------------
* Version Info.
* -----------------------------------------------------------
* v1.00 (2020/07/16)       Released!
*
*
* @param ======General Settings======
* @param IsActorStatusPositionAdjust
* @desc If 'true', adjust the position of default battle status window. (default: false)
* @default false
* @type boolean
* @param IsActorStatusPositionFixed
* @desc If 'true', the default status window is always put on the center. (default: false)
* @default false
* @type boolean
* @param ======UI Settings======
*
* @param PartyCommandWindow_Y-ratio
* @desc Parameter to fit the party command for y-coordinate. 1.0 is the center position. (default: 1.38)
* @default 1.38
* @type number
* @param PartyCommandWindow_width
* @desc Width for the default party command window(default: 360)
* @default 360
* @type number
*
*/


var Imported = Imported || {};
if(Imported.SoR_PartyCommandHUD) throw new Error("[SoR_PartyCommandHUD] Do NOT import more than 2 types of <SoR_PartyCommandHUD> series.");
Imported.SoR_PartyCommandHUD = true;

var SoR = SoR || {};

(function() {
var Param = PluginManager.parameters('SoR_PartyCommandHUD_Alpha');
var IsActorStatusPositionAdjust = Boolean(Param['IsActorStatusPositionAdjust'] === 'true') || false;
var IsActorStatusPositionFixed = Boolean(Param['IsActorStatusPositionFixed'] === 'true') || false;
var PartyCommandWindow_Yratio = Number(Param['PartyCommandWindow_Y-ratio'] || 1.38);
var PartyCommandWindow_width = Number(Param['PartyCommandWindow_width'] || 360);	
	
	

Window_PartyCommand.prototype.initialize = function() {
	var x = Graphics.boxWidth/2 - this.windowWidth()/2;
    var y = Graphics.boxHeight/2 + this.windowHeight()* PartyCommandWindow_Yratio;
    Window_Command.prototype.initialize.call(this, x, y);
    this.openness = 0;
    this.deactivate();
};

Window_PartyCommand.prototype.windowHeight = function() {
    return 50;//72
};

Window_PartyCommand.prototype.standardPadding = function() {
    return 7;//18
};

Window_PartyCommand.prototype.windowWidth = function() {
    return PartyCommandWindow_width;
};

Window_PartyCommand.prototype.numVisibleRows = function() {
    return 1;
};

Window_PartyCommand.prototype.maxCols = function() {
    return this._list.length;
};

Window_PartyCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'center');
};


if(IsActorStatusPositionAdjust){
	Scene_Battle.prototype.updateWindowPositions = function() {
		var statusX;

		if(IsActorStatusPositionFixed) statusX = Graphics.boxWidth/2 - this._statusWindow.width/2;
		else{
			if (BattleManager.isInputting() && this._actorCommandWindow.openness > 0) {
			statusX = this._actorCommandWindow.width;
			}
			else statusX = Graphics.boxWidth/2 - this._statusWindow.width/2;
		}
		
		if (this._statusWindow.x < statusX) {
			this._statusWindow.x += 16;
			if (this._statusWindow.x > statusX) {
				this._statusWindow.x = statusX;
			}
		}
		if (this._statusWindow.x > statusX) {
			this._statusWindow.x -= 16;
			if (this._statusWindow.x < statusX) {
				this._statusWindow.x = statusX;
			}
		}	
	}
}

}());
