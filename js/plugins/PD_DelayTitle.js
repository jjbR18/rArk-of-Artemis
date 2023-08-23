//=============================================================================
// PD_DelayTitle.js
//=============================================================================

/*:
 * @plugindesc タイトル画面の各画像の表示にディレイとフェードイン機能を追加します。
 * @author Shio_inu
 *
 *
 * @param Delay BG1
 * @desc 背景1を表示開始するフレーム数です。
 * @default 0
 *
 * @param Fade BG1
 * @desc 背景1のフェードインにかかるフレーム数です。
 * @default 60
 *
 * @param Delay BG2
 * @desc 背景1を表示開始するフレーム数です。
 * @default 60
 *
 * @param Fade BG2
 * @desc 背景1のフェードインにかかるフレーム数です。
 * @default 60
 *
 * @param Delay Title
 * @desc タイトルを表示開始するフレーム数です。
 * @default 120
 *
 * @param Fade Title
 * @desc タイトルのフェードインにかかるフレーム数です。
 * @default 60
 *
 * @param Delay Command
 * @desc コマンドを表示するフレーム数です。
 * @default 180
 *
 * @param Pass To Decide
 * @desc 決定キーで演出をスキップできるかの設定です。1:スキップ出来る　0:スキップ出来ない
 * @default 1
 * 
 * @help last update : 09th Jan 2016 v1.00
 *
 */

/*:ja
 * @plugindesc タイトル画面の各画像の表示にディレイとフェードイン機能を追加します。
 * @author しおいぬ
 *
 * @param Delay BG1
 * @desc 背景1を表示開始するフレーム数です。
 * @default 0
 *
 * @param Fade BG1
 * @desc 背景1のフェードインにかかるフレーム数です。
 * @default 30
 *
 * @param Delay BG2
 * @desc 背景1を表示開始するフレーム数です。
 * @default 10
 *
 * @param Fade BG2
 * @desc 背景1のフェードインにかかるフレーム数です。
 * @default 20
 *
 * @param Delay Title
 * @desc タイトルを表示開始するフレーム数です。
 * @default 50
 *
 * @param Fade Title
 * @desc タイトルのフェードインにかかるフレーム数です。
 * @default 30
 *
 * @param Delay Command
 * @desc コマンドを表示するフレーム数です。
 * @default 180
 *
 * @param Pass To Decide
 * @desc 決定キーで演出をスキップできるかの設定です。1:スキップ出来る　0:スキップ出来ない
 * @default 1
 * @help last update : 2016/01/09 v1.00
 *
 */
(function () {


    var parameters = PluginManager.parameters('PD_DelayTitle');
    var delayBG1 = 0; //Number(parameters['Delay BG1'] || 0);
    var fadeBG1 = 30; //Number(parameters['Fade BG1'] || 30);
    var delayBG2 = 0; //Number(parameters['Delay BG2'] || 0);
    var fadeBG2 = 30; //Number(parameters['Fade BG2'] || 30);
    var delayTitle = 20; //Number(parameters['Delay Title'] || 20);
    var fadeTitle = 60; //Number(parameters['Fade Title'] || 60);
    var delayCommand = 120; //Number(parameters['Delay Command'] || 180);
    var passToDecide = Boolean(parameters['Pass To Decide'] || false);

    var endFrame = Math.max(delayBG1 + fadeBG1, delayBG2 + fadeBG2, delayTitle + fadeTitle, delayCommand);

    Scene_Title.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createForeground();
        this.createWindowLayer();
        this.createCommandWindow();
        this._frame = 0;

        this._whiteSprite = new Sprite(ImageManager.reserveBitmap('img/pictures/', 'white', 0, true));
        this.addChild(this._whiteSprite);
        this._whiteSprite.addAnimation(new QueueTweenAnimation(
            new Point(0,0),
            new Point(1, 1), 
            0, 
            0,
            100, 
            0, 1, false));

        this._gameTitleSprite.addAnimation(new QueueTweenAnimation(
            new Point(1280 * 0.1, 720*0.1),
            new Point(0.8, 0.8), 
            0, 
            255,
            150, 
            0, 1, false));
    };

    Scene_Title.prototype.update = function () {
        Scene_Base.prototype.update.call(this);

        //スキップ
        if ((Input.isTriggered('ok') || TouchInput.isPressed()) && this._frame < endFrame) {
            this.skip();
        }
        //フェード開始確認
        if (this._frame === delayBG1) {
            if (fadeBG1 === 0) {
                this._backSprite1.opacity = 255;
            } else {
                this._backSprite1.opacity = 1;
            }
        }
        if (this._frame === delayBG2) {
            if (fadeBG2 === 0) {
                this._backSprite2.opacity = 255;
            } else {
                this._backSprite2.opacity = 1;
            }
        }
        if ($dataSystem.optDrawTitle && this._frame === delayTitle) {
            if (fadeTitle === 0) {
                //this._gameTitleSprite.opacity = 255;
            } else {
                //this._gameTitleSprite.opacity = 1;
            }
        }
        if (this._frame === delayCommand) {
            this._commandWindow.open();
        }
        //フェード処理
        if (this._backSprite1.opacity > 0 && this._backSprite1.opacity < 255) {
            this._backSprite1.opacity += 255 / fadeBG1;
        }
        if (this._backSprite2.opacity > 0 && this._backSprite2.opacity < 180) {
            this._backSprite2.opacity += 255 / fadeBG2;
        }
        if ($dataSystem.optDrawTitle && this._gameTitleSprite.opacity > 0 && this._gameTitleSprite.opacity < 255) {
            //this._gameTitleSprite.opacity += 255 / fadeTitle;
        }

        this._frame++;
    }
    Scene_Title.prototype.createBackground = function () {
        this._spritebutton = new Sprite
        this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
        this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
        this._backSprite1.opacity = 0;
        this._backSprite2.opacity = 0;
        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

    Scene_Title.prototype.createForeground = function () {
        //this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));

        this._gameTitleSprite = new Sprite(ImageManager.reserveBitmap('img/pictures/', 'gamelogo_1', 0, true));
        this._gameTitleSprite.opacity = 0;
        this._gameTitleSprite.y = -50;

        this.addChild(this._gameTitleSprite);
        this.drawGameVersion();
    };

    Scene_Title.prototype.drawGameVersion = function () {
        var x = 20;
        var y = Graphics.height - 80;
        var maxWidth = Graphics.width - x * 2;
        var text = Denneko_Word.VERSION;
        this._versionSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._versionSprite);

        this._versionSprite.bitmap.textColor = "white";
        this._versionSprite.bitmap.outlineColor = 'rgpa(0.2 , 0.2, 0.2 , 0.5)';
        this._versionSprite.bitmap.outlineWidth = 1;
        this._versionSprite.bitmap.fontSize = 25;
        this._versionSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'left');
    };

    Scene_Title.prototype.skip = function () {
        this._backSprite1.opacity = 255;
        this._backSprite2.opacity = 255;
        if ($dataSystem.optDrawTitle) {
            this._gameTitleSprite.opacity = 255;
        }
        this._commandWindow.open();
        this._frame = endFrame + 1;
    };

    Scene_Title.prototype.createCommandWindow = function () {
        this._commandWindow = new Window_TitleCommand();
        this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
        this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
        this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        this.addWindow(this._commandWindow);
    };

    //-----------------------------------------------------------------------------
    // Window_TitleCommand
    //
    // The window for selecting New Game/Continue on the title screen.

    function Window_TitleCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_TitleCommand.prototype = Object.create(Window_Command.prototype);
    Window_TitleCommand.prototype.constructor = Window_TitleCommand;

    Window_TitleCommand.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.updatePlacement();
        this.openness = 0;
        this.selectLast();
        this.opacity = 0;
    };

    Window_TitleCommand._lastCommandSymbol = null;

    Window_TitleCommand.initCommandPosition = function () {
        this._lastCommandSymbol = null;
    };

    Window_TitleCommand.prototype.windowWidth = function () {
        return 240;
    };

    Window_TitleCommand.prototype.updatePlacement = function () {
        this.x = Graphics.boxWidth - this.width - 100; //(Graphics.boxWidth - this.width) / 2;
        this.y = Graphics.boxHeight - this.height - 96;
    };

    Window_TitleCommand.prototype.makeCommandList = function () {
        this.addCommand(TextManager.newGame, 'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(TextManager.options, 'options');
    };

    Window_TitleCommand.prototype.isContinueEnabled = function () {
        return DataManager.isAnySavefileExists();
    };

    Window_TitleCommand.prototype.processOk = function () {
        Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };

    Window_TitleCommand.prototype.selectLast = function () {
        if (Window_TitleCommand._lastCommandSymbol) {
            this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
        } else if (this.isContinueEnabled()) {
            this.selectSymbol('continue');
        }
    };

})();