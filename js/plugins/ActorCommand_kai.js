//rpg_windows.jsから抜き出し
//バトルコマンドの編集。
//不要なバトルコマンドはコメントアウトすれば表示されない。

/*:
 * @plugindesc 任意のタイミングで、アイテムを選択不可にします。
 * @author ゆわか
 *
 * @param Variable ID
 * @desc 表示状態を管理する変数のＩＤ。
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 * デフォルトのコマンドのみに対応しています。
 * パラメータで指定した変数の値を変更する事によって
 * 表示状態を変えます。
 *
 *　　0　表示
 *　　1　選択できないが、コマンドは表示
 *　　2　コマンドそのものを非表示
 *
 *クレジット不要・改変可
 */
(function(){
    var parameters = PluginManager.parameters('ActorCommand_kai');
    var variableId = Number(parameters['Variable ID'] || 0);
    var sentakuhuka = false;

Window_ActorCommand.prototype.makeCommandList = function() {

    if (this._actor) {
        this.addAttackCommand();      //攻撃
        this.addSkillCommands();      //スキル
        this.addGuardCommand();      //防御

if ($gameVariables.value(variableId)==0){
        this.addItemCommand();      //アイテム表示
}
if ($gameVariables.value(variableId)==1){
	this.addCommand(TextManager.item, false, sentakuhuka);//アイテム使用不可だが表示
   
}
    }
};
}());


