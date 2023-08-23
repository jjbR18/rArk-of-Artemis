//=============================================================================
// PartyCommandSkip.js
//=============================================================================

/*:
 * @plugindesc 戦闘の戦う・逃げるを飛ばして戦闘へ
 * @author １１１
 *
 * @desc 戦闘の戦う・逃げるを飛ばして戦闘へ
 *
 * @param SwitchNumber
 * @default 111
 *
 * @help
 * Parametersの番号のスイッチがONだった時、
 * 戦闘に入る時の「戦う・逃げる」メニューを飛ばして
 * そのまま戦闘へ。
 * 
 */
(function() {
    var parameters = PluginManager.parameters('111_PartyCommandSkip');
    var swicth_number = String(parameters['SwitchNumber'] || '111');
    swicth_number = +swicth_number;

    Scene_Battle.prototype.changeInputWindow = function() {
        if (BattleManager.isInputting()) {
            if($gameSwitches.value(swicth_number)){
                // 戦う・逃げるの決定飛ばす
                BattleManager._actorIndex = 0;
                this.startActorCommandSelection();
            }else
                if (BattleManager.actor()) {
                    this.startActorCommandSelection();
                } else {
                    this.startPartyCommandSelection();
                }
        } else {
            this.endCommandSelection();
        }
    };

})();