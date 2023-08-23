//=============================================================================
// ALT_MenuBackgroundDarkTone.js
// by Altered (Machina Suzuhara)
// Version: 1.00
//=============================================================================

/*:
 * @plugindesc メニュー時のウィンドウ枠外背景をACEと同じように暗くする。
 * Darken background outside windou of menu.
 * @author Altered (Machina Suzuhara)
 * @help このプラグインに、 プラグインコマンドはありません。
 * This plugin does not provide plugin commands.
 *
 * 【利用規約】
 * 1.利用上の注意
 * ・本スクリプトを使用してゲームなどを配布する際、
 *   添付ドキュメント内に本素材を使用して制作した旨を表記し、その際に次の権利表記を行なうこと。
 *
 *  (C)Altered  http://altered.sblo.jp
 *
 *   ※ただし、「http://altered.sblo.jp」はR-18サイトのため、表記は配布者の任意としますが、
 *    本素材を使用した配布物がR-18指定の場合、表記は必須です。
 *
 * ・利用に関しては全て自己責任で行ってください。
 *   本スクリプトを使用すること及びゲームなどを制作・配布・販売することにより、
 *   第三者との間で生じたトラブル等に関しては、弊組は一切責任を負わないものとします。
 * ・有償・無償・年齢制限コンテンツでの利用に、特に制限はありません。
 *
 * 2.利用報告
 * ・特に必要ありません。
 *
 * 3.禁止事項
 * ・二次配布。
 * ・素材への直リンク。
 *
 *  4.サポート
 * ・競合などの対処は致しかねます。
 *
 */

(function() {
  Scene_MenuBase.prototype.createBackground = function() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
      this._backgroundSprite.setBlendColor([16, 16, 16, 128]);
  };
})();
