//=============================================================================
// KZR_SkillCombo.js
// Version : 1.10
// -----------------------------------------------------------------------------
// [Homepage]: かざり - ホームページ名なんて飾りです。偉い人にはそれがわからんのですよ。 -
//             http://nyannyannyan.bake-neko.net/
// -----------------------------------------------------------------------------
// [Version]
// 1.10 2017/04/24 コンボする確率を設定可能に
// 1.01 2017/01/27 属性チェインステートとの併用のため修正
// 1.00 2017/01/26 公開
//=============================================================================

/*:
 * @plugindesc スキルが連続発動します。
 * @author ぶちょー
 *
 * @param NextTarget
 * @desc 対象が戦闘不能になった場合、
 * 新たなターゲットを設定する。 true / false
 * @default true
 *
 * @param StopCantUse
 * @desc 途中で使用できないスキルがあったら、
 * それ以降のスキルは発動しない。 true / false
 * @default false
 *
 * @help
 * 【コンボの設定】
 * 　スキルのメモ欄に以下のように記述します。(ver1.10で記述方法が変わりました)
 * 　<SkillCombo:id,確率>
 * 　id にスキルID、確率に数値を入れてください。
 *   確率は省略が可能で、省略した場合 100% になります。
 *   複数行記述すると、上から順番に発動判定します。
 *   途中で発動判定が途切れた場合、下記のコンボストップに応じて、次スキルの発動判定を行います。
 *   （例）<SkillCombo:20,50> # 50%の確率でスキル20を発動する。
 * 　
 * 【次のターゲットの設定】
 * 　対象が単体で、その対象が戦闘不能になってた場合、新たなターゲットを設定するか。
 * 　スキルのメモ欄に <TargetNext> と記述すると、
 * 　新たなターゲットを指定します。その際はランダムに決まります。
 * 　スキルのメモ欄に <UntargetNext> と記述すると、
 * 　新たなターゲットは指定しません。
 *
 * 【コンボストップの設定】
 * 　スキルのメモ欄に <UnstoppableCombo> と記述すると、
 * 　途中で使用できないスキルがあっても、最後までコンボ判定を続けます。
 * 　スキルのメモ欄に <StopCombo> と記述すると、
 * 　途中で使用できないスキルがあったら、その時点でコンボを停止します。
 */

var Imported = Imported || {};
    Imported.KZR_SkillCombo = true;

(function() {
    var parameters = PluginManager.parameters('KZR_SkillCombo');
    var SC_Next = eval(parameters['NextTarget'] || 'true');
    var SC_Stop = eval(parameters['StopCantUse'] || 'true');

//-----------------------------------------------------------------------------
// BattleManager
//

var _kzr_SC_BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    this._combo = [];
    var action = this._subject.currentAction();
    if (action.isSkill()) {
        this._comboSubject = this._subject;
        var combo = action.item().combo;
        var comboRate = action.item().comboRate;
        this._stopCombo = action.item().stopCombo;
        this._oldScope = action.item().scope;
        for (var i in combo) {
            if (comboRate[i] > Math.random()) {
                this._combo.push($dataSkills[combo[i]]);
            } else {
                if (this._stopCombo) break;
            }
        }
    }
    _kzr_SC_BattleManager_startAction.call(this);
    if (action.isSkill()) this._oldTargets = this._targets.concat();
};

var _kzr_SC_BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    var skill = this._combo.shift();
    if (skill) {
        if (this._comboSubject.canUse(skill)) {
            this.startComboAction(skill);
        } else if (this._stopCombo) {
            this._combo = [];
        }
    } else {
        _kzr_SC_BattleManager_endAction.call(this);
    }
};

BattleManager.startComboAction = function(skill) {
    var subject = this._comboSubject;
    var action = new Game_Action(subject);
    action.setSkill(skill.id);
    this._phase = 'action';
    this._action = action;
    if (this._oldScope === skill.scope) {
        var targets = this._oldTargets;
        var aliveTarget = !action.isForDeadFriend();
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if (target.isDead() && aliveTarget) {
                targets = targets.filter(function(t) { return t != target });
            }
        }
        if (targets.length === 0 && skill.nextTarget) targets = action.makeTargets();
        this._targets = targets;
    } else {
        this._targets = action.makeTargets();
    }
    if (this._targets.length > 0) {
        subject.useItem(skill);
        this._action.applyGlobal();
        this.refreshStatus();
        this._logWindow.startAction(subject, action, this._targets);
    }
    this._oldTargets = this._targets.concat();
    this._oldScope = skill.scope;
};

//-----------------------------------------------------------------------------
// Scene_Boot
//

var _kzr_SC_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _kzr_SC_Scene_Boot_start.call(this);
    for (var i = 1; i < $dataSkills.length; i++) {
        this.setSkillCombo($dataSkills[i]);
    }
};

Scene_Boot.prototype.setSkillCombo = function(skill) {
    skill.combo = [];
    skill.comboRate = [];
    skill.stopCombo = SC_Stop;
    skill.nextTarget = SC_Next;
    var notedata = skill.note.split(/[\r\n]+/);
    var note1 = /<(?:SkillCombo):(\d+)(,)?((\d+))?>/i;
    var note2 = /<(?:UnstoppableCombo)>/g;
    var note3 = /<(?:StoppableCombo)>/g;
    var note4 = /<(?:TargetNext)>/g;
    var note5 = /<(?:UntargetNext)>/g;
    for (var i = 0; i < notedata.length; i++) {
        if (notedata[i].match(note1)) {
            skill.combo.push(parseInt(RegExp.$1));
            if (RegExp.$3) {
                skill.comboRate.push(parseInt(RegExp.$3) * 0.01);
            } else {
                skill.comboRate.push(1.0);
            }
        }
        if (notedata[i].match(note2)) skill.stopCombo = false;
        if (notedata[i].match(note3)) skill.stopCombo = true;
        if (notedata[i].match(note4)) skill.nextTarget = true;
        if (notedata[i].match(note5)) skill.nextTarget = false;
    }
};

})();
