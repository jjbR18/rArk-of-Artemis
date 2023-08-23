//=============================================================================
// SepTrigger.js
//=============================================================================

/*:ja
 * @plugindesc ver1.02 プレイヤーがイベントに接触した時の制御。
 * @author まっつＵＰ
 *
 * @param require
 * @desc このIDのスイッチがオンの時に
 * イベント接触時の制御を変更します。
 * @default 10
 * 
 * @param require2
 * @desc 0以外の時プライオリティがプレイヤーと
 * 同じではない場合でもイベントから接触の制御をします。
 * @default 1
 * 
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * イベントの「トリガー」でイベントから接触を選択している場合でも
 * プレイヤーから接触してもイベントが実行されません。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 * 
 * ver1.01 プライオリティについて機能追加
 * ver1.02 プライオリティが「プレイヤーと同じ」でなくても
 * トリガーが「イベントから接触」のイベントが条件を満たしたとき実行されるように。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('SepTrigger');
var STrequire = Number(parameters['require'] || 10);
var STrequire2 = Number(parameters['require2'] || 1);

if(STrequire2){

Game_Player.prototype.updateNonmoving = function(wasMoving) {
    if(!$gameMap.isEventRunning()){
        if(wasMoving){
           $gameParty.onPlayerWalk();
           if(!$gameSwitches.value(STrequire)){
               this.checkEventTriggerHere([1,2]);
           }else{
               this.checkEventTriggerHere([1]);
           }
           if($gameMap.setupStartingEvent()) {
               return;
           }
        }
        if(this.triggerAction()){
            return;
        }
        if(wasMoving){
            this.updateEncounterCount();
        }else{
            $gameTemp.clearDestination();
        }
    }
};

//オーバーライド
Game_Event.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
    if(this.isMovementSucceeded()) this.checkEventTriggerTouch(this._x,this._y);
};

Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    if(!$gameMap.isEventRunning()){
        if(this._trigger === 2 && $gamePlayer.pos(x, y)){
            if(!this.isJumping()){
                this.start();
            }
        }
    }
};

}

var _Game_Player_checkEventTriggerTouch = Game_Player.prototype.checkEventTriggerTouch;
Game_Player.prototype.checkEventTriggerTouch = function(x, y) {
    if(!$gameSwitches.value(STrequire)){
        _Game_Player_checkEventTriggerTouch.call(this, x, y);
        return;
    } 
    if(this.canStartLocalEvents()) this.startMapEvent(x, y, [1], true);
};
 
})();
