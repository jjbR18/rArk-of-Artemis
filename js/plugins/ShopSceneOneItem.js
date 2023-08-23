//=============================================================================
// ShopSceneOneItem.js
// ----------------------------------------------------------------------------
// (C) 2019 astral
//
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/06/22 初版
/*:
 * 
 * @plugindesc ショップ画面で個数を指定せずに購入します
 * @author astral
 * 
 * 
 * @help
 * ショップ画面で個数選択をせずに、1つを購入・売却するようにします。
 * 
 * プラグイン導入のみで利用できます。
 * ショップ関連のプラグインより下になるよう配置してください。
 * 
 * デフォルトで個数選択は無効になっています。
 * 
 * 
 * プラグインコマンド
 * 
 *  ShopItemNumber enable
 *  ショップ個数選択 有効化
 * 個数選択をする機能を有効化させます。
 * 
 *  ShopItemNumber disable
 *  ショップ個数選択 無効化
 * 個数選択をする機能を無効にします。
 * 
 * 
 * 英語・日本語共に同じ動作をします。
 * 
 * 
 * 
 */

(function () {
    'use strict';

    var _Window_ShopNumber_activate = Window_ShopNumber.prototype.activate;
    Window_ShopNumber.prototype.activate = function() {
        if ($gameTemp.isShopNumber()) _Window_ShopNumber_activate.apply(this, arguments);
    };
    
    var _Window_ShopNumber_show = Window_ShopNumber.prototype.show;
    Window_ShopNumber.prototype.show = function() {
        if ($gameTemp.isShopNumber()) _Window_ShopNumber_show.apply(this, arguments);
    };
    
    var _Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() {
        _Scene_Shop_onBuyOk.apply(this, arguments);
        if ($gameTemp.isShopNumber()) return;
        this._buyWindow.show();
        this.onNumberOk();
    };

    var _Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function() {
        _Scene_Shop_onSellOk.apply(this, arguments);
        if ($gameTemp.isShopNumber()) return;
        this._sellWindow.show();
        this.onNumberOk();
    };

    Game_Temp.prototype.enableShopNumber = function(value) {
        this._enableShopNumber = !!value;
    };
    
    Game_Temp.prototype.isShopNumber = function() {
        return this._enableShopNumber;
    };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var commandName = command.toLowerCase();
        if (commandName === 'shopitemnumber' || commandName === 'ショップ個数選択') {
            switch (args[0].toLowerCase()) {
                case 'enable':
                case '有効化':
                    $gameTemp.enableShopNumber(true);
                    break;
                
                case 'disable':
                case '無効化':
                    $gameTemp.enableShopNumber(false);
                    break;

                default:
		$gameTemp.enableShopNumber(true);
                    break;
            }
        }
    };

})();
