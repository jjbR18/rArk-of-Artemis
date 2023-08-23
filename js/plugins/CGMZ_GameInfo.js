/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/gameinfo/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds text fields to the title screen for copyright/website/etc.
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds three text fields to the title screen, such as
 * as version info, a link to your website, copyright information, or anything
 * else.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin does not use plugin commands.
 *
 * Version History:
 * 1.0.0 - Initial release
 *
 * 1.1.0:
 * - Added ability to add buttons on the title screen for social media, patron,
 *   discord, etc.
 *
 * 1.1.1:
 * - Fixed bug with buttons disappearing in some cases
 * - Added cursor change to a pointer over the buttons
 *
 * @param Text Options
 *
 * @param Font Size
 * @parent Text Options
 * @type number
 * @min 1
 * @default 12
 * @desc Size of the font
 *
 * @param Font Outline Width
 * @parent Text Options
 * @type number
 * @min 0
 * @default 2
 * @desc Bigger number means the outline will be wider. Set to 0 for no outline.
 *
 * @param Font Outline Color
 * @parent Text Options
 * @type text
 * @default black
 * @desc The color of the outline
 * 
 * @param Left Text
 * @parent Text Options
 * @type text
 * @default 
 * @desc Text to display in the lower left corner of the title screen
 * 
 * @param Center Text
 * @parent Text Options
 * @type text
 * @default 
 * @desc Text to display in the center bottom of the title screen
 * 
 * @param Right Text
 * @parent Text Options
 * @type text
 * @default 
 * @desc Text to display in the bottom right of the title screen
 *
 * @param Buttons
 * @type struct<Button>[]
 * @default []
 * @desc Set up clickable buttons here
*/
/*~struct~Button:
 * @param Image
 * @type file
 * @dir img/pictures
 * @default 
 * @desc The image file (stored in pictures folder) to use
 *
 * @param x
 * @type number
 * @min 0
 * @default 0
 * @desc The x coordinate to show the button
 *
 * @param y
 * @type number
 * @min 0
 * @default 0
 * @desc The y coordinate to show the button
 *
 * @param width
 * @type number
 * @min 1
 * @default 50
 * @desc The width of the button
 *
 * @param height
 * @type number
 * @min 1
 * @default 50
 * @desc The height of the button
 *
 * @param URL
 * @type text
 * @default 
 * @desc Enter in a website url which will be launched on click
 */
var Imported = Imported || {};
Imported.CGMZ_GameInfo = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Game Info"] = "1.1.1";
CGMZ.GameInfo = CGMZ.GameInfo || {};
CGMZ.GameInfo.parameters = PluginManager.parameters('CGMZ_GameInfo');
CGMZ.GameInfo.LeftText = CGMZ.GameInfo.parameters["Left Text"] || "";
CGMZ.GameInfo.CenterText = CGMZ.GameInfo.parameters["Center Text"] || "";
CGMZ.GameInfo.RightText = CGMZ.GameInfo.parameters["Right Text"] || "";
CGMZ.GameInfo.FontOutlineColor = CGMZ.GameInfo.parameters["Font Outline Color"] || "black";
CGMZ.GameInfo.FontSize = Number(CGMZ.GameInfo.parameters["Font Size"]) || 12;
CGMZ.GameInfo.FontOutlineWidth = Number(CGMZ.GameInfo.parameters["Font Outline Width"]) || 2;
CGMZ.GameInfo.Buttons = JSON.parse(CGMZ.GameInfo.parameters["Buttons"]);
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// Modify the title scene to add additional text at bottom.
// modified functions: createForeground
//=============================================================================
//-----------------------------------------------------------------------------
// Also add CGMZ info text to foreground
//-----------------------------------------------------------------------------
const alias_CGMZ_GameInfo_createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {
    alias_CGMZ_GameInfo_createForeground.call(this);
	this.CGMZ_GameInfo_DrawGameInfo();
	this.CGMZ_GameInfo_DrawSocialButtons();
};
//-----------------------------------------------------------------------------
// Draw CGMZ info text
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_GameInfo_DrawGameInfo = function () {
	const x = 20;
    const y = Graphics.height - (28 + CGMZ.GameInfo.FontSize);
    const maxWidth = Graphics.width - x * 2;
	const bitmap = this._gameTitleSprite.bitmap;
	bitmap.outlineColor = CGMZ.GameInfo.FontOutlineColor;
	bitmap.outlineWidth = CGMZ.GameInfo.FontOutlineWidth;
    bitmap.fontSize = CGMZ.GameInfo.FontSize;
	bitmap.drawText(CGMZ.GameInfo.LeftText, x, y, maxWidth, 48, 'left');
    bitmap.drawText(CGMZ.GameInfo.CenterText, x, y, maxWidth, 48, 'center');
	bitmap.drawText(CGMZ.GameInfo.RightText, x, y, maxWidth, 48, 'right');
};
//-----------------------------------------------------------------------------
// Draw CGMZ social media / patreon / etc buttons
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_GameInfo_DrawSocialButtons = function() {
	let buttonArray = CGMZ.GameInfo.Buttons;
	for(let i = 0; i < buttonArray.length; i++) {
		let buttonObject = JSON.parse(buttonArray[i]);
		let sprite = new Sprite_CGMZ_GameInfo_Button(buttonObject["URL"]);
		sprite.bitmap = ImageManager.loadPicture(buttonObject["Image"]);
		sprite.move(buttonObject.x, buttonObject.y);
		sprite.bitmap.addLoadListener(this.CGMZ_GameInfo_scaleSprite.bind(this, {"sprite": sprite, "width": buttonObject.width, "height": buttonObject.height}));
		sprite.opacity = 200;
		this.addChild(sprite);
	}
};
//-----------------------------------------------------------------------------
// Scale sprite after load
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_GameInfo_scaleSprite = function(args) {
	let sprite = args.sprite;
	sprite.scale.x = args.width / sprite.width;
	sprite.scale.y = args.height / sprite.height;
};
//=============================================================================
// Sprite_CGMZ_GameInfo_Button
//-----------------------------------------------------------------------------
// Buttons for the title screen with mouse over behavior and click behavior
//=============================================================================
function Sprite_CGMZ_GameInfo_Button() {
    this.initialize(...arguments);
}
Sprite_CGMZ_GameInfo_Button.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_CGMZ_GameInfo_Button.prototype.constructor = Sprite_CGMZ_GameInfo_Button;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
Sprite_CGMZ_GameInfo_Button.prototype.initialize = function(url) {
	Sprite_Clickable.prototype.initialize.call(this);
	this._targetOpacity = 200;
	this._url = url;
	this._cursor = document.body.style.cursor;
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
Sprite_CGMZ_GameInfo_Button.prototype.update = function() {
	Sprite_Clickable.prototype.update.call(this);
	if(this.opacity !== this._targetOpacity) {
		this.updateOpacity();
	}
};
//-----------------------------------------------------------------------------
// Update the opacity of the sprite
//-----------------------------------------------------------------------------
Sprite_CGMZ_GameInfo_Button.prototype.updateOpacity = function() {
	if(this.opacity < this._targetOpacity) {
		this.opacity += 5;
		if(this.opacity > this._targetOpacity) {
			this.opacity = this._targetOpacity;
		}
	} else {
		this.opacity -= 5;
		if(this.opacity < this._targetOpacity) {
			this.opacity = this._targetOpacity;
		}
	}
};
//-----------------------------------------------------------------------------
// If mouse over, change opacity to 255
//-----------------------------------------------------------------------------
Sprite_CGMZ_GameInfo_Button.prototype.onMouseEnter = function() {
    this._targetOpacity = 255;
	this._cursor = document.body.style.cursor;
	document.body.style.cursor = "pointer";
};
//-----------------------------------------------------------------------------
// If not hovered, change opacity to 200
//-----------------------------------------------------------------------------
Sprite_CGMZ_GameInfo_Button.prototype.onMouseExit = function() {
    this._targetOpacity = 200;
	document.body.style.cursor = this._cursor;
};
//-----------------------------------------------------------------------------
// Open URL when clicked
//-----------------------------------------------------------------------------
Sprite_CGMZ_GameInfo_Button.prototype.onClick = function() {
    window.open(this._url);
};