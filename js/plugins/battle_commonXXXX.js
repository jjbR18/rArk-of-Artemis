
/*:
 * @plugindesc コモンイベント呼び出し
 * @author しぐれん（魔のささやき）
 * 
 * @param event
 * @type common_event
 * @default 0
*/
(function(){
    'use strict'
const eventId =(function(){

    const param  = PluginManager.parameters("battle_commonXXXX");

    return Number(param.event);

})();

const Window_BattleLog_displayDamage=Window_BattleLog.prototype.displayDamage;
Window_BattleLog.prototype.displayDamage =function(subject){
    Window_BattleLog_displayDamage.call(this,subject);

    const inter = new Game_Interpreter();
    const event = $dataCommonEvents[eventId];
    inter.setup(event.list);
    inter.update();
};
})()
