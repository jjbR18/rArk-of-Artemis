//=============================================================================
// LevelUpCommonEvent.js
//
// Copyright (c) 2019 ina-amagami (ina@amagamina.jp)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// GitHub  : https://github.com/ina-amagami/
// Blog    : https://amagamina.jp
// Twitter : https://twitter.com/ina_amagami
//=============================================================================

/*:
 * @plugindesc レベルアップ時にコモンイベントを実行する
 * @author 天神いな
 *
 * @param プラグイン無効化スイッチ番号
 * @type switch
 * @desc このスイッチがオンのときにレベルアップしても、コモンイベントを実行しない。
 * @default 0
 *
 * @help レベルアップ時にコモンイベントを差し込みたいキャラのメモ欄に以下追加する
 * <LevelUpCommonEvent: [コモンイベントID]>
 * (例) <LevelUpCommonEvent: 1>
 */

(function () {

    var pluginName = 'LevelUpCommonEvent';
    var parameters = PluginManager.parameters(pluginName);
    
    var switchNum = Number(parameters['プラグイン無効化スイッチ番号']);
    
    var regex = /<LevelUpCommonEvent:\s*(\d+)>/i;

    var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);
        
        // バトルテスト中は実行しない
        if (DataManager.isBattleTest()) {
            return;
        }
        
        // スイッチで無効化されている場合は実行しない
        if (switchNum > 0 && $gameSwitches.value(switchNum)) {
            return;
        }
        
        var levelUpCommonEventId = this.levelUpCommonEventId();
        if (levelUpCommonEventId > 0) {
            $gameTemp.reserveCommonEvent(levelUpCommonEventId);
        }
    }

    Game_Actor.prototype.levelUpCommonEventId = function() {
        if (this._levelUpCommonEventId !== undefined) {
            return this._levelUpCommonEventId;
        }
        this._levelUpCommonEventId = 0;
        var result = regex.exec(this.actor().note);
        if (result) {
            this._levelUpCommonEventId = Math.floor(result[1]);
        }
        return this._levelUpCommonEventId;
    }
    
})();