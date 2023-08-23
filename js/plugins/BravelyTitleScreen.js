/*:
 * @plugindesc Version 1.1 | This Plugin changes your Titlescreen to look like the on in Bravely Second: End Layer.
 *
 * @author Critcap
 *
 * @param GENERAL
 * @default
 *
 * @param Game Title
 * @parent GENERAL
 * @type string
 * @desc Prefix headlines with #h sublines with #s and seperate with commas Default: #h BRAVELY, #h FAUXED, #s CAKE LAYER
 * @default #h BRAVELY, #h FAUXED, #s CAKE LAYER
 *
 * @param Background Image
 * @parent GENERAL
 * @type file
 * @desc Choose the scrolling part of the background
 * @default battlebacks1/DarkSpace
 * @dir img/
 * @require 1
 *
 * @param Background Color
 * @parent GENERAL
 * @type string
 * @desc sets the background color using a hex color string
 * default: ffffff (white)
 * @default ffffff
 *
 * @param Transition Duration
 * @parent GENERAL
 * @type number
 * @desc time it takes to invert the masking
 * default: 60 (frames)
 * @default 60
 *
 * @param FONT
 * @default
 *
 * @param Font Face
 * @parent FONT
 * @type string
 * @desc Choose the font for the game title
 * Default: GameFont
 * @default GameFont
 *
 * @param Headline Fontsize
 * @parent FONT
 * @type number
 * @desc Headline fontsize
 * Default: 192
 * @default 192
 *
 * @param Subtext Fontsize
 * @parent FONT
 * @type number
 * @desc Subtext fontsize
 * Default: 54
 * @default 54
 *
 * @param Use Outline
 * @parent FONT
 * @type boolean
 * @desc Use masked outline to make font more bold.
 * Default: true
 * @default true
 *
 * @param SCROLLING
 * @default
 *
 * @param Sprite Scrolling
 * @parent SCROLLING
 * @type boolean
 * @desc Scrolls the Background Image.
 * Turning off can result in better performance
 * @default true
 *
 * @param Direction
 * @parent SCROLLING
 * @type select
 * @option left
 * @value -1
 * @option right
 * @value 1
 * @option swing
 * @value 0
 * @default 0
 *
 * @param Speed
 * @parent SCROLLING
 * @type number
 * @desc Scrolling Speed in %.
 * Default: 100% (100)
 * @default 100
 *
 * @param Swing Duration
 * @parent SCROLLING
 * @type number
 * @desc Time in frames for 1 left to right swing.
 * Default: 240 (4 Seconds)
 * @default 240
 *
 * @param Swing Distance
 * @parent SCROLLING
 * @type number
 * @desc Distance in pixels for 1 swing.
 * Default: 200
 * @default 200
 *
 * @param TITLE IMAGE
 * @default
 *
 * @param Use Image as Title
 * @parent TITLE IMAGE
 * @type boolean
 * @desc use a choosen image as mask of the title.
 * Read the help text for more information.
 * @default false
 *
 * @param Title Image Location
 * @parent TITLE IMAGE
 * @type file
 * @default
 * @dir img/
 * @require 1
 *
 * @param Scale Title Image
 * @parent TITLE IMAGE
 * @type boolean
 * @desc Scales the Title Image to the game resolution.
 * @default true
 *
 * @param ADVANCED
 * @default
 *
 * @param Native TilingSprite
 * @parent ADVANCED
 * @type boolean
 * @desc You can use the RMMV native TilingSprite instead of the PIXI one. Can possibly yield better perfomance you. Default: OFF
 * @on Native TilingSprite
 * @off PIXI TilingSprite
 * @default false
 *
 * @help
 *
 *  ###Instruction for using a Image for the Game Title:
 *
 *  In the image creation software of you choice create a new image. For a
 *  perfect layout use your games resolution as image size. The Plugin can
 *  also scale it later but it might be stretched or/and pixelated.
 *  For the cleanest result use plain white (#ffffff) background and a
 *  plain black (#000000) for the Text. Because the image will be use as
 *  a mask and everything black and transparent will be invisble and every-
 *  thing above will be more or less visible with white as perfect visible.
 *  And yes we want the text to be black and be invisible!
 *
 *  Now create a title with a layout you like and after you are done save
 *  it as .png and put it a foler within your games img folder. You can
 *  also create a new folder for it if you like.
 *
 *  Now you can choose the created image in the plugin settings and turn
 *  'Use Image as Title' on.
 *
 */

const __BravelyTitleScreen = {};
__BravelyTitleScreen.parameters = PluginManager.parameters('BravelyTitleScreen');

/*
 *   Parameters
 */

__BravelyTitleScreen.GameTitleText = String(__BravelyTitleScreen.parameters['Game Title'] || "#h Something, #h Went Wrong").split(",");
__BravelyTitleScreen.GameTitleText = __BravelyTitleScreen.GameTitleText.map((ele) => {
    return ele.trim();
});
__BravelyTitleScreen.ScrollingBackSprite = String((__BravelyTitleScreen.parameters['Background Image'])).split('/');
__BravelyTitleScreen.ScrollingBackSpriteDirectory = String('img/' + __BravelyTitleScreen.ScrollingBackSprite[0] + '/' || 'img/battlebacks1/');
__BravelyTitleScreen.ScrollingBackSpriteImg = String(__BravelyTitleScreen.ScrollingBackSprite[1] || 'DarkSpace');
__BravelyTitleScreen.BackSpriteColor = String('0x' + __BravelyTitleScreen.parameters['Background Color'] || "0xffffff");
__BravelyTitleScreen.TransitionDuration = Number(__BravelyTitleScreen.parameters['Transition Duration'] || 60);
__BravelyTitleScreen.TitleFontFace = String(__BravelyTitleScreen.parameters['Font Face'] || "GameFont");
__BravelyTitleScreen.GameTitleTextSize = Number(__BravelyTitleScreen.parameters['Headline Fontsize'] || 192);
__BravelyTitleScreen.GameSubTextSize = Number(__BravelyTitleScreen.parameters['Subline Fontsize'] || 52);
__BravelyTitleScreen.GameTitleOutline = eval(__BravelyTitleScreen.parameters['Use Outline']);
__BravelyTitleScreen.GameTitleTextColor = "#000000";
__BravelyTitleScreen.GameTitleOutlineColor = "#000000";
__BravelyTitleScreen.GameSubTextColor = "#000000";
__BravelyTitleScreen.SubFont = {
    fontFace: __BravelyTitleScreen.TitleFontFace,
    fontSize: __BravelyTitleScreen.GameSubTextSize,
    fontColor: __BravelyTitleScreen.GameSubTextColor,
    outline: __BravelyTitleScreen.GameTitleOutline,
    outlineColor: __BravelyTitleScreen.GameTitleOutlineColor
};
__BravelyTitleScreen.HeadFont = {
    fontFace: __BravelyTitleScreen.TitleFontFace,
    fontSize: __BravelyTitleScreen.GameTitleTextSize,
    fontColor: __BravelyTitleScreen.GameTitleTextColor,
    outline: __BravelyTitleScreen.GameTitleOutline,
    outlineColor: __BravelyTitleScreen.GameTitleOutlineColor
};
__BravelyTitleScreen.IsImageTitle = eval(__BravelyTitleScreen.parameters['Use Image as Title'] || false);
__BravelyTitleScreen.ImageTitle = String((__BravelyTitleScreen.parameters['Title Image Location'])).split('/');
__BravelyTitleScreen.ImageTitleDirectory = String('img/' + __BravelyTitleScreen.ImageTitle[0] + '/');
__BravelyTitleScreen.ImageTitleFilename = String(__BravelyTitleScreen.ImageTitle[1]);
__BravelyTitleScreen.ImageTitleScale = eval(__BravelyTitleScreen.parameters['Scale Title Image'] || true);
__BravelyTitleScreen.ScrollBackground = eval(__BravelyTitleScreen.parameters['Sprite Scrolling'] || true);
__BravelyTitleScreen.ScrollingDirection = Number(__BravelyTitleScreen.parameters['Direction'] || 0);
__BravelyTitleScreen.ScrollingSpeed = Number(__BravelyTitleScreen.parameters['Speed'] || 100) / 100;
__BravelyTitleScreen.ScrollingSwingDuration = Number(__BravelyTitleScreen.parameters['Swing Duration'] || 240);
__BravelyTitleScreen.ScrollingSwingDistance = Number(__BravelyTitleScreen.parameters['Swing Distance'] || 200);
__BravelyTitleScreen.UseNativeTilingSprite = eval(__BravelyTitleScreen.parameters['Native TilingSprite'] || false);

/*  New Classes
*   Using the texture based PIXI.extras.TilingSprite because it has smoother scrolling as default method
*   There is also an option to use the RMMV native Tilesprite method which is bitmap based.
*/

class Scrolling_BackSprite extends PIXI.extras.TilingSprite {
    constructor(file, width = Graphics.width, height = Graphics.height) {
        super(file, width, height);
        this._motionCount = 0;
        this._motionDirection = __BravelyTitleScreen.ScrollingDirection;
    }
    update() {
        (__BravelyTitleScreen.ScrollBackground) ? this.updateScrolling(): null;
    }
    updateScrolling() {
        if (this._motionDirection < 0 || this._motionDirection > 0) {
            this.tilePosition.x += (0.5 * __BravelyTitleScreen.ScrollingSpeed) * this._motionDirection;
        } else if (this._motionDirection === 0) {
            (this._motionCount >= 4) ? this._motionCount = 0: null;
            this.tilePosition.x = __BravelyTitleScreen.ScrollingSwingDistance * Math.sin(Math.PI / 2 * this._motionCount);
            this._motionCount += 2 / (__BravelyTitleScreen.ScrollingSwingDuration * 2);
        }
    }
};

class Scrolling_BackSpriteNative extends TilingSprite {
    constructor(bitmap, width = Graphics.width, height = Graphics.height) {
        super(bitmap);
        this.width = width;
        this.height = height;
        this._motionCount = 0;
        this._motionDirection = __BravelyTitleScreen.ScrollingDirection;
    }
    update() {
        super.update();
        this.updatePosition();
        (__BravelyTitleScreen.ScrollBackground) ? this.updateScrolling(): null;
    }
    updatePosition() {
        this.origin.y = this.bitmap.height / 2;
    }
    updateScrolling() {
        if (this._motionDirection < 0 || this._motionDirection > 0) {
            this.origin.x += (0.5 * __BravelyTitleScreen.ScrollingSpeed) * this._motionDirection;
        } else if (this._motionDirection === 0) {
            (this._motionCount >= 4) ? this._motionCount = 0: null;
            this.origin.x = __BravelyTitleScreen.ScrollingSwingDistance * Math.sin(Math.PI / 2 * this._motionCount);
            this._motionCount += 2 / (__BravelyTitleScreen.ScrollingSwingDuration * 2);
        }
        this.tilePosition.x = this.origin.x;
    }
};

/*
 *   using PIXI.Sprite because its texture based and doesnt require a image
 */

class Blank_BackSprite extends PIXI.Sprite {
    constructor(tint = '0xffffff') {
        let texture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
        texture.orig.width = Graphics.width;
        texture.orig.height = Graphics.height;
        super(texture);
        this.tint = parseInt(tint);
    }
};

__BravelyTitleScreen._Scene_Title_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function () {
    __BravelyTitleScreen._Scene_Title_initialize.call(this);
    this._transitionCount = -1;
};

__BravelyTitleScreen._Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function () {
    (__BravelyTitleScreen.IsImageTitle) ? this.createTitleMaskSprite(): this.createTitleMask();
    __BravelyTitleScreen._Scene_Title_start.call(this);
};

Scene_Title.prototype.update = function () {
    this.updateTransition();
    if (!this.isBusy() && this._commandWindow.isOpen() == false && Input.isTriggered('ok')) {
        this.startTransition();
        this._commandWindow.open();
    }
    if (!this.isBusy() && this._commandWindow.isOpen() == true && Input.isTriggered('escape')) {
        this.revertTransition();
        this._commandWindow.close();
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Title.prototype.createBackground = function () {
    this.createScrollingBackground();
    this._baseScreen = new Blank_BackSprite(__BravelyTitleScreen.BackSpriteColor);
    this._backSpriteBlank = new Blank_BackSprite(__BravelyTitleScreen.BackSpriteColor);
    this._backSprite1 = this._backSpriteScrolling;
    this._backSprite2 = this._backSpriteBlank;
    this.addChild(this._baseScreen);
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
};

Scene_Title.prototype.createScrollingBackground = function () {
    //NOTE Using a sprite to ensure it loads encrypted files after deployment
    let dir = __BravelyTitleScreen.ScrollingBackSpriteDirectory;
    let img = __BravelyTitleScreen.ScrollingBackSpriteImg;
    let bitmap = ImageManager.loadBitmap(dir, img, 0, false);
    if (!__BravelyTitleScreen.UseNativeTilingSprite) {
        let sprite = new Sprite(bitmap);
        this._backSpriteScrolling = new Scrolling_BackSprite(sprite.texture);
    } else {
        this._backSpriteScrolling = new Scrolling_BackSpriteNative(bitmap);
    }
};

Scene_Title.prototype.createForeground = function () {
    (__BravelyTitleScreen.IsImageTitle) ? this.createGameTitleSprite(): this.createGameTitle();
};

Scene_Title.prototype.createGameTitle = function () {
    this._gameTitleHeadSprites = [];
    this._gameTitleSubSprites = [];
    __BravelyTitleScreen.GameTitleText.forEach((element) => {
        if (element.match(/(?:[ ]?#h)\s*(.*)/i)) {
            let sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
            this._gameTitleHeadSprites.push(sprite);
            this.drawGameTitleHead(sprite, RegExp.$1, __BravelyTitleScreen.HeadFont);
        } else if (element.match(/(?:[ ]?#s)\s*(.*)/i)) {
            let sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
            this._gameTitleSubSprites.push(sprite);
            this.drawGameTitleSub(sprite, RegExp.$1, __BravelyTitleScreen.SubFont);
        }
    });
};

Scene_Title.prototype.createGameTitleSprite = function () {
    let dir = __BravelyTitleScreen.ImageTitleDirectory;
    let img = __BravelyTitleScreen.ImageTitleFilename;
    this._gameTitleSprite = new Sprite(ImageManager.loadBitmap(dir, img, 0, false));
    this._gameTitleSprite2 = new Sprite(ImageManager.loadBitmap(dir, img, 0, false));
};

Scene_Title.prototype.drawGameTitleHead = function (sprite, text, font) {
    let index = this._gameTitleHeadSprites.indexOf(sprite);
    let x = 20;
    let y = Graphics.height / 4 + __BravelyTitleScreen.GameTitleTextSize * index;
    let maxWidth = Graphics.width - x * 2;
    Scene_Title.prototype.drawGameTitle(sprite, text, x, y, maxWidth, font);
};

Scene_Title.prototype.drawGameTitleSub = function (sprite, text, font) {
    let index = this._gameTitleSubSprites.indexOf(sprite);
    let x = 20;
    let y = Graphics.height / 4 + (this._gameTitleHeadSprites.length) * __BravelyTitleScreen.GameTitleTextSize - __BravelyTitleScreen.GameSubTextSize * 0.5 + __BravelyTitleScreen.GameSubTextSize * index;
    let maxWidth = Graphics.width - x * 2;
    Scene_Title.prototype.drawGameTitle(sprite, text, x, y, maxWidth, font);
};

Scene_Title.prototype.drawGameTitle = function (sprite, text, x, y, maxWidth, font) {
    sprite.bitmap.fontFace = font.fontFace;
    sprite.bitmap.textColor = font.fontColor;
    sprite.bitmap.outlineWidth = 0;
    if (font.outline) {
        sprite.bitmap.outlineColor = font.outlineColor;
        sprite.bitmap.outlineWidth = 2;
    }
    sprite.bitmap.fontSize = font.fontSize;
    sprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
};

Scene_Title.prototype.createTitleMask = function () {
    let texture = PIXI.RenderTexture.create(Graphics.width, Graphics.height);
    let plane = new PIXI.Container();
    plane.addChild(new Blank_BackSprite(__BravelyTitleScreen.BackSpriteColor));
    let sprites = this._gameTitleHeadSprites.concat(this._gameTitleSubSprites);
    sprites.forEach(sprite => plane.addChild(sprite));
    Graphics._renderer.render(plane, texture);
    this._backSpriteBlank.mask = new PIXI.Sprite(texture);
    this._gameTitleSprite = new PIXI.Sprite(texture);
    this._gameTitleSprite.alpha = 0;
    this.addChild(this._backSpriteBlank.mask);
    this.addChild(this._gameTitleSprite);
};

Scene_Title.prototype.createTitleMaskSprite = function () {
    //@ts-ignore
    this._backSpriteBlank.mask = this._gameTitleSprite2;
    this._gameTitleSprite.alpha = 0;
    this.addChild(this._gameTitleSprite);
    this.addChild(this._gameTitleSprite2);
};

Scene_Title.prototype.updateTransition = function () {
    if (!this.isTransitioning() && this._transitionCount >= 0) {
        this._transitionCount = -1;
    };
    if (this.isTransitioning()) {
        let count = this._transitionCount;
        let duration = __BravelyTitleScreen.TransitionDuration;
        this._backSpriteScrolling.mask.alpha = 1 * Math.sin(Math.PI / 2 * (count / duration));
        if (this._backSpriteScrolling.mask.alpha <= 0.5) {
            let third = duration / 3;
            this._backSpriteBlank.mask.alpha = 1 - Math.sin(Math.PI / 2 * (count / third));
        }
        this._transitionCount++;
    }
};

Scene_Title.prototype.startTransition = function () {
    this._transitionCount = 0;
    this._backSpriteScrolling.mask = this._gameTitleSprite;
};

Scene_Title.prototype.revertTransition = function () {
    if (!this._backSpriteScrolling.mask) return;
    this._transitionCount = -1;
    this._backSpriteScrolling.mask.alpha = 0;
    this._backSpriteScrolling.mask = null;
    this._backSpriteBlank.mask.alpha = 1;
};

Scene_Title.prototype.isTransitioning = function () {
    if (this._transitionCount < 0) {
        return false;
    };
    if (this._transitionCount > __BravelyTitleScreen.TransitionDuration) {
        return false;
    };
    return true;
};

/*
 *   Plugin Compatibility
 */


if (Imported.YEP_CoreEngine) {
    Scene_Title.prototype.rescaleTitle = function () {
        if (__BravelyTitleScreen.IsImageTitle && __BravelyTitleScreen.ImageTitleScale) {
            this.rescaleTitleSprite(this._gameTitleSprite);
            this.rescaleTitleSprite(this._gameTitleSprite2);
        }
    };
}