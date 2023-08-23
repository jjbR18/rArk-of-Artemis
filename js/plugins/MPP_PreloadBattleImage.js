//=============================================================================
// MPP_PreloadBattleImage.js
//=============================================================================
// Copyright (c) 2017 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.0】戦闘に必要な画像を先読み込みすることで、戦闘開始時のロード時間をわずかに減らします。
 * @author 木星ペンギン
 *
 * @help 通常、
 *   開始エフェクト > 画像読み込み開始 > 読み込み完了までウェイト > 戦闘開始
 * となっているところを
 *   画像読み込み開始 > 開始エフェクト > 読み込み完了までウェイト > 戦闘開始
 * とすることで、
 * エフェクト中に画像読み込みを行いロード時間を短縮します。
 * 
 * デフォルトではエフェクトの時間が60フレーム(1秒)なので
 * 理論上はロード時間が1秒短縮されます。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * 
 * 
 */

(function () {

//-----------------------------------------------------------------------------
// Scene_Map

//57
var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
    _Scene_Map_launchBattle.call(this);
    var spriteset = Object.create(Spriteset_Battle.prototype);
    ImageManager.requestBattleback1(spriteset.battleback1Name());
    ImageManager.requestBattleback2(spriteset.battleback2Name());
    var enemies = $gameTroop.members();
    for (var i = 0; i < enemies.length; i++) {
        var name = enemies[i].battlerName();
        var hue = enemies[i].battlerHue();
        if ($gameSystem.isSideView()) {
            ImageManager.requestSvEnemy(name, hue);
        } else {
            ImageManager.requestEnemy(name, hue);
        }
    }
    //var bgm = $gameSystem.battleBgm();
    //if (bgm.name) {
    //    AudioManager.createBuffer('bgm', bgm.name);
    //}
};




})();
