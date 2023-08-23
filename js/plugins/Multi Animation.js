//=============================================================================
// Multi Animation.js
//=============================================================================

/*:
 * @plugindesc 多段ヒットスキルのアニメーションを1回だけに変更します。
 * @author 村人C
 *
 * @help
 *
 * 使い方
 * 導入するだけで動作します。
 *
 * 仕様
 * 全ての多段ヒットスキルに適用されます。
 *
 * readmeやスタッフロールの明記、使用報告は任意
 */

Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
    var data = { animationId: animationId, mirror: mirror, delay: delay };
	if (this._animations.length === 0){ this._animations.push(data); }
};