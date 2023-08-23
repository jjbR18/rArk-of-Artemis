//=============================================================================
// TG-shopLayout.js	
// The MIT License (MIT)
//=============================================================================

/*:
 * @plugindesc ショップのレイアウト変更を行い、任意で背景のぼかしを除去します
 * @author どらぴか(STUDIO TOKIWA)
 * 
 * @param BlurOffSwitchID
 * @type switch
 * @desc 該当スイッチがオンの時、背景のぼかしを除去します。
 * @default 1
 * 
 * @help 【TG-shopLayout】
 * ショップの処理のレイアウトを変更します。
 * また該当スイッチがオンの時、背景のぼかしを除去します。
 * 
 * このプラグインにはプラグインコマンドはありません。
 * 
 */

(function() {

//=============================================================================
// パラメータの設定
//=============================================================================	

   var parameters = PluginManager.parameters('TG-shopLayout');
   var TGBlurOff = Number(parameters['BlurOffSwitchID']);
	
//=============================================================================
// 背景のぼかしを除去する処理
//=============================================================================

   SceneManager.snapForBackground = function() {
      this._backgroundBitmap = this.snap();
	  if ($gameSwitches.value(TGBlurOff)) {
        //this._backgroundBitmap.blur();
      } else {
	   this._backgroundBitmap.blur();
      }
    };
	
//=============================================================================
// ItemCategory
//=============================================================================
  
// ***　カテゴリ(アイテム・武器・防具...)の設定　***

	function Window_Shop_ItemCategory() {
	  this.initialize.apply(this, arguments);
	}
	Window_Shop_ItemCategory.prototype = Object.create(Window_ItemCategory.prototype);
	Window_Shop_ItemCategory.prototype.constructor = Window_Shop_ItemCategory;
	
    Window_Shop_ItemCategory.prototype.initialize = function() {
      Window_HorzCommand.prototype.initialize.call(this, 24, 0);
    };

    Window_Shop_ItemCategory.prototype.windowWidth = function() {
      return 400;
    };
	
	Window_Shop_ItemCategory.prototype.windowHeight = function() {
      return 108;
    };
  
// ***　カテゴリ(アイテム・武器・防具...)のフォントサイズ　***

	Window_Shop_ItemCategory.prototype.standardFontSize = function() {
      return 24;
    };

    Window_Shop_ItemCategory.prototype.maxCols = function() {
      return 2;
    };
	
	Window_Shop_ItemCategory.prototype.maxRows = function() {
      return 2;
    };
	
//=============================================================================
// ShopBuy
//=============================================================================

// ***　「購入・売却・やめる」のウィンドウ設定　***

   Window_ShopCommand.prototype.initialize = function(width, purchaseOnly) {
       this._windowWidth = width;
       this._purchaseOnly = purchaseOnly;
       Window_HorzCommand.prototype.initialize.call(this, 24, 0);
    };
	

  	Window_ShopCommand.prototype.windowWidth = function() {
      return 400;
    };
  
// ***　「購入・売却・やめる」のフォントサイズ　***

	Window_ShopCommand.prototype.standardFontSize = function() {
      return 24;
    };
  
// ***　商品リストのウィンドウ生成　***

	Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods) {
      var width = this.windowWidth();
      Window_Selectable.prototype.initialize.call(this, 24, y + 29, 400, 180);
      this._shopGoods = shopGoods;
      this._money = 0;
      this.refresh();
      this.select(0);
    };
  
// ***　商品リストのフォントサイズ　***

	Window_ShopBuy.prototype.standardFontSize = function() {
      return 24;
    };
   
// ***　装備キャラクターステータスのウィンドウ生成　***

	Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
      Window_Base.prototype.initialize.call(this, 24, y + 235, 400, 365);
      this._item = null;
      this._pageIndex = 0;
      this.refresh();
    };
  
// ***　装備キャラクターステータスのフォントサイズ　***

	Window_ShopStatus.prototype.standardFontSize = function() {
      return 16;
    };
  
// ***　装備キャラクターステータスの設定　***

	Window_ShopStatus.prototype.drawPossession = function(x, y) {
      var width = this.contents.width - this.textPadding() - x;
      var possessionWidth = this.textWidth('0000');
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.possession + ' :', x, y - 8, width - possessionWidth);
      this.resetTextColor();
      this.drawText($gameParty.numItems(this._item), x + 148, y - 8, width);
    };
	
	Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
      var members = this.statusMembers();
	  if (members.length == 1) {
		for (var i = 0; i < members.length; i++) {
          this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 1.6), members[i]);
        }
	  } else {
        for (var i = 0; i < 2; i++) {
          this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 1.6), members[i]);
        }
	    var x = 190;
	    var y = -43;
	    for (var i = 2; i < members.length; i++) {
          this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 1.6), members[i]);
        }
	  }
    };
	
	Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
      var enabled = actor.canEquip(this._item);
      this.changePaintOpacity(enabled);
      this.resetTextColor();
      this.drawText(actor.name(), x, y - 50, 168);
      var item1 = this.currentEquippedItem(actor, this._item.etypeId);
      if (enabled) {
          this.drawActorParamChange(x, y, actor, item1);
      }
      this.drawItemName(item1, x, y + this.lineHeight() - 58);
      this.changePaintOpacity(true);
    };
	
	Window_ShopStatus.prototype.drawActorParamChange = function(x, y, actor, item1) {
      var width = this.contents.width - this.textPadding() - x;
      var paramId = this.paramId();
      var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
      this.changeTextColor(this.paramchangeTextColor(change));
      this.drawText((change > 0 ? '+' : '') + change, x + 130, y - 50, width);
    };
	

  // ***　購入数・売却数のウィンドウ生成　***
    
	Window_ShopNumber.prototype.initialize = function(x, y, height) {
      var width = this.windowWidth();
      Window_Selectable.prototype.initialize.call(this, 24, y + 16, 400, 180);
      this._item = null;
      this._max = 1;
      this._price = 0;
      this._number = 1;
      this._currencyUnit = TextManager.currencyUnit;
      this.createButtons();
    };

  Window_ShopNumber.prototype.itemY = function() {
      return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5) - 10;
  };
  
  Window_ShopNumber.prototype.priceY = function() {
      return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2) - 30;
  };
  
  Window_ShopNumber.prototype.buttonY = function() {
      return 120;
  };
    
// ***　購入数・売却数のフォントサイズ　***

	Window_ShopNumber.prototype.standardFontSize = function() {
      return 24;
    };

// ***　アイテム説明のフォントサイズ　***

    Window_Help.prototype.standardFontSize = function() {
      if ($gameSwitches.value(TGBlurOff)) {
        return 24;
      } else {
    var defaultfontsize = Window_Base.prototype.standardFontSize.call(this);
    return defaultfontsize;
      }
    };

    Window_Help.prototype.standardPadding = function() {
      if ($gameSwitches.value(TGBlurOff)) {
        return 14;
      } else {
    var defaultPadding = Window_Base.prototype.standardPadding.call(this);
    return defaultPadding;
      }

    };

    Window_ShopNumber.prototype.windowWidth = function() {
      return 600;
    };

//=============================================================================
// ShopSell
//=============================================================================
	
	Window_ShopSell.prototype.initialize = function(x, y, width, height) {
      Window_ItemList.prototype.initialize.call(this, 24, y + 12, 400, height - 36);
    };
  
// ***　売却するアイテムのフォントサイズ　***

	Window_ShopSell.prototype.standardFontSize = function() {
      return 24;
    };
	
	Window_ShopSell.prototype.maxCols = function() {
      return 1;
    };
	
//=============================================================================
// Scene_Shop
//=============================================================================
    Scene_Shop.prototype.create = function() {
      Scene_MenuBase.prototype.create.call(this);
      this.createHelpWindow();
      this.createGoldWindow();
      this.createCommandWindow();
      this.createDummyWindow();
      this.createNumberWindow();
      this.createStatusWindow();
      this.createBuyWindow();
      this.createCategoryWindow();
      this.createSellWindow();
    this._dummyWindow.opacity = 0;

// ***　アイテム説明のウィンドウ生成　***

      this._helpWindow.x = 455;
      this._helpWindow.y = 589;
      this._helpWindow.width = 798;
	  this._helpWindow.height = 107;
    };

// ***　「購入・売却・やめる」のウィンドウ設定　***

    Scene_Shop.prototype.createCommandWindow = function() {
      this._commandWindow = new Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
      this._commandWindow.y = 24;
      this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
      this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
      this._commandWindow.setHandler('cancel', this.popScene.bind(this));
      this.addWindow(this._commandWindow);
    };
  
// ***　所持金のウィンドウ生成　***

	Scene_Shop.prototype.createGoldWindow = function() {
      this._goldWindow = new Window_Gold(0, 24);
      this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width - 24;
	  this._goldWindow.height = 70;
      this.addWindow(this._goldWindow);
    };
    
// ***　カテゴリ(アイテム・武器・防具...)の生成　***

    Scene_Shop.prototype.createCategoryWindow = function() {
		this._categoryWindow = new Window_Shop_ItemCategory();
		this._categoryWindow.setHelpWindow(this._helpWindow);
		this._categoryWindow.y = this._commandWindow.height + 36;
		this._categoryWindow.hide();
		this._categoryWindow.deactivate();
		this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
		this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
		this.addWindow(this._categoryWindow);
	};		
	
})();