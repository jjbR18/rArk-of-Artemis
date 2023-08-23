//=============================================================================
// Oggy_SnowTitle.js
//=============================================================================

/*:
 * @plugindesc Add snow weather effect to title scene.
 * @author oggy (http://www.oggy-rpg.com/)
 *
 * @param Snow Power
 * @desc This parameter represents the power of snow effect. This is the same as that of 'change weather' event command. The maximum value is 9, and the minimum value is 1.
 * @default 3
 * 
 */

/*:ja
 * @plugindesc タイトル画面に雪を降らせます。
 * @author oggy (http://www.oggy-rpg.com/)
 *
 * @param Snow Power
 * @desc 降らせる雪の強さです。イベントコマンド ”天候の設定” で指定するものと意味は同じです。値は1～9の範囲で設定してください。 
 * @default 3
 */

(function() {

var _Oggy_Parameters = PluginManager.parameters('Oggy_SnowTitle');
var _Oggy_SnowPower = String(_Oggy_Parameters['Snow Power']);

//-----------------------------------------------------------------------------
// Spriteset_Title
//
function Spriteset_Title() {
    this.initialize.apply(this, arguments);
}

Spriteset_Title.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_Title.prototype.constructor = Spriteset_Title;

Spriteset_Title.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
};

Spriteset_Title.prototype.createLowerLayer = function() {
    //Spriteset_Base.prototype.createLowerLayer.call(this);
};

Spriteset_Title.prototype.createToneChanger = function() {
};

Spriteset_Title.prototype.createUpperLayer = function() {
    //Spriteset_Base.prototype.createUpperLayer.call(this);
    this.createWeather();
};

Spriteset_Title.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateWeather();
};

Spriteset_Title.prototype.createWeather = function() {
    this._weather = new Weather();
    this.addChild(this._weather);
};

Spriteset_Title.prototype.updateWeather = function() {
    this._weather.type = $gameScreen.weatherType();
    this._weather.power = $gameScreen.weatherPower();
    this._weather.origin.x = 0;//$gameMap.displayX() * $gameMap.tileWidth();
    this._weather.origin.y = 0;//$gameMap.displayY() * $gameMap.tileHeight();
};

var _Oggy_Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    _Oggy_Scene_Title_start.call(this);
    $gameScreen.changeWeather('snow', _Oggy_SnowPower, 0);
};

var _Oggy_Scene_Title_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
    _Oggy_Scene_Title_createBackground.call(this);
    this._spriteset = new Spriteset_Title();
    this.addChild(this._spriteset);
};



})();

