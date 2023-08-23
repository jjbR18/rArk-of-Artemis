//=============================================================================
// ATileSpeed.js
//=============================================================================

/*:ja
 * @plugindesc ver1.02 アニメーションタイルの更新する速さを
 * 変更することができます。
 * @author まっつＵＰ
 * 
 * @param rate
 * @desc この値が小さいほど早く更新します。
 * @type number
 * @min 0
 * @max 300
 * @default 30
 * 
 * @param kind0
 * @desc 百分率で指定してください。
 * 値が小さいほど遅くなります。（海など）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param kind1
 * @desc 百分率で指定してください。
 * 値が小さいほど遅くなります。（滝、渦など）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * パラメータ「rate」に0を入れるとアニメーションの更新を行いません。
 * 
 * パラメータkind0~1は0未満または100を超える値を入れることはできません。
 * 
 * パラメータ「rate」で全体の速度を上げ、
 * これを基準にkind0~1の値を調整してそれぞれの更新速度を遅くしてください。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 * 
 * ver1.01 機能の拡充
 * ver1.02 エディタとコアスクリプトver1.6.2の動作に合わせて修正
 *         ただし、WebGL環境のみでの確認
 *         プラグインパラメータの更新
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('ATileSpeed');
var ASrate = Number(parameters['rate'] || 30);
var ASkind0 = Number(parameters['kind0'] || 100);
var ASkind1 = Number(parameters['kind1'] || 100);

var _Tilemap_update = Tilemap.prototype.update;
Tilemap.prototype.update = function() {
    _Tilemap_update.call(this);
    if(ASrate === 0){
       this.animationFrame = 0;
    }else{       
       this.animationFrame = Math.floor(this.animationCount / ASrate);
    }
};

ShaderTilemap.prototype._hackRenderer = function(renderer) {
    var ASdefault0 = Math.floor(this.animationFrame * ASkind0 / 100);
    var ASdefault1 = Math.floor(this.animationFrame * ASkind1 / 100);
    var af = ASdefault0 % 4;
    if (af==3) af = 1;
    renderer.plugins.tilemap.tileAnim[0] = af * this._tileWidth;
    renderer.plugins.tilemap.tileAnim[1] = ASdefault1 % 3 * this._tileHeight;
    return renderer;
};
 
})();
