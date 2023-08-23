//=============================================================================
// TN_SpriteExtender.js
//=============================================================================
//ver 1.02 Fix a bug: The lowerbody of the non-extended sprites are not transparent when they are on bush.
//ver 1.01 Resolve the plugin confliction with the color tone function of CharacterGraphicExtend.js
//ver 1.00 Released
/*:
 * @plugindesc 【有償ライセンス】任意の比率で歩行グラフィックの胴体を引き伸ばし、頭身を上げます。
 * @author terunon / AA series
 * @version 1.02
 *
 * @param 胴体の引き伸ばし率
 * @desc 1でデフォルトと同じ頭身になります。高いほど頭身が上がります。
 * @default 1.42
 * 
 * @param 頭の範囲
 * @desc 歩行グラフィック上端を0とし、ここに指定した値までは引き伸ばしを行いません。
 * @default 14
 *
 * @param 除外ファイル（部分一致）
 * @desc 画像ファイル名に特定の文字列が含まれる場合、頭身引き伸ばしを行いません。【スペース無しのカンマ区切りで複数指定可】
 * @default !,Damage
 *
 * @param 除外ファイル（完全一致）
 * @desc ここに記載された画像ファイルは、頭身引き伸ばしを行いません。【スペース無しのカンマ区切りで複数指定可】
 * @default Nature,Monster,Vehicle
 *
 * @param 茂みタイルの高さを統一
 * @desc 茂み属性タイルに入った時、頭身を上げていないキャラも上げたキャラと同じ高さだけ身体が隠れるようにします。
 * @type boolean
 * @on 統一する
 * @off 統一しない
 * @default true
 *
 * @help
 * お好きな値で調節してください。
 * 微妙な数値変更で、胴体のどのドットが引き伸ばされるか変わるため
 * 引き伸ばし方が気に入らない場合は、0.1～0.01単位で各値を調節してみてください。
 * 数値によっては、ホコグラの上端に別のホコグラ由来の線が見えることがありますが、
 * 0.01ほど数値を調整すれば消失します。
 * 
 * 再定義を含むため、プラグインリストの上の方への適用が望ましいです。
 * -----------------------------------------------------------
 * 【！】 有償ライセンスプラグイン
 * 本プラグインは、ライセンス付与者様名簿
 * （https://ch.nicovideo.jp/terunon/blomaga/ar1083931）に作者名（サークル名）を
 * 記載された方が、公開ゲームへ組み込んでご使用いただけます。
 *
 * BOOTHから有償ライセンス付き本プラグインをご購入できます。
 * 購入後、通常1～2日、最長5日以内に
 * BOOTHのメッセージ機能でお名前をお伺いし、ライセンス名簿に追加いたします。
 * メッセージが届かない場合や、お問い合わせ事項がある場合は、
 * tri-nitroterunon.3790☆live.jp
 * または twitter ID: trinitroterunon までお知らせください。
 * 作者の人身トラブル等で万一、名簿追加が異常に遅延している場合は、
 * BOOTHの機能から返金申請をしてください。
 *
 * ※作者名・サークル名を変更した場合、原則ライセンスは引継ぎできません。
 * 虚偽の名前変更申請により本来のライセンス保有者さんが
 * 被害を受けるのを防ぐため、何卒ご了承ください。
 *
 * ※他プラグインとの競合については、購入履歴のお問い合わせフォーム等から
 * ご連絡いただければ、ある程度サポートいたします。
 * ただ、多数のプラグインが複雑に競合している等、工数が膨大な場合は
 * サポートしかねる場合があります。
 *
 * ※本ライセンス方式は、今後の状況次第で変更される可能性がありますが、
 * 変更により正規ライセンスが消失することはありません。
 *
 * ※ライセンス違反作品を発見した場合は、作者へご連絡いただくか
 * 各投稿サイトの通報機能で当該作品をご通報ください。
 * 
 * This plugin can be used only by the users who have added the license roster below:
 *   https://ch.nicovideo.jp/terunon/blomaga/ar1083931
 *
 * When you buy this plugin, the license register form
 * will be post to your BOOTH account.
 *
 * [!] If you find a product without registering the license roster,
 * please report to me or the owner of the website.
 */

(function(){var parameters=PluginManager.parameters("TN_SpriteExtender");var bodyRate=Number(parameters["\u80f4\u4f53\u306e\u5f15\u304d\u4f38\u3070\u3057\u7387"]);var bodyMargin=Number(parameters["\u982d\u306e\u7bc4\u56f2"]);var disableKeys=String(parameters["\u9664\u5916\u30d5\u30a1\u30a4\u30eb\uff08\u90e8\u5206\u4e00\u81f4\uff09"]).split(",");var disableFiles=String(parameters["\u9664\u5916\u30d5\u30a1\u30a4\u30eb\uff08\u5b8c\u5168\u4e00\u81f4\uff09"]).split(",");var disableKeysL=disableKeys.length;var disableFilesL=disableFiles.length;var bushHeight=parameters["\u8302\u307f\u30bf\u30a4\u30eb\u306e\u9ad8\u3055\u3092\u7d71\u4e00"]==="true";Sprite_Character.prototype.updateBitmap=function(){if(this.isImageChanged()){this._tilesetId=$gameMap.tilesetId();this._tileId=this._character.tileId();this._characterName=this._character.characterName();this._characterIndex=this._character.characterIndex();this._isSeperated=this.isSeperated();if(this._tileId>0)this.setTileBitmap();else this.setCharacterBitmap()}};var TN_dn=172;Sprite_Character.prototype.isSeperated=function(){for(var i=0;i<disableKeysL;i++)if(this._characterName.contains(disableKeys[i]))return false;for(var i$0=0;i$0<disableFilesL;i$0++)if(this._characterName===disableFiles[i$0])return false;return true};Sprite_Character.prototype.updateCharacterFrameDef=Sprite_Character.prototype.updateCharacterFrame;Sprite_Character.prototype.updateCharacterFrameSep=function(){var pw=this.patternWidth();var ph=this.patternHeight();var sx=(this.characterBlockX()+this.characterPatternX())*pw;var sy=(this.characterBlockY()+this.characterPatternY())*ph;this.createHalfBodySprites();if(this._bushDepth>0)this._lowerBody.opacity=128;else this._lowerBody.opacity=255;this._upperBody.bitmap=this.bitmap;this._upperBody.visible=true;this._lowerBody.bitmap=this.bitmap;this._lowerBody.visible=true;this._upperBody.y=-bodyMargin*bodyRate;this._lowerBody.scale.y=bodyRate;this._upperBody.setFrame(sx,sy,pw,ph-bodyMargin);this._lowerBody.setFrame(sx,sy+ph-bodyMargin,pw,bodyMargin);this.setFrame(sx,sy,0,ph);var tone=this._character._tone;if(tone){this._upperBody.setColorTone(tone);this._lowerBody.setColorTone(tone)}};Sprite_Character.prototype.updateCharacterFrame=function(){if(this.isSeperated())this.updateCharacterFrameSep();else this.updateCharacterFrameDef()};if(bushHeight)Sprite_Character.prototype.updateCharacterFrameDef=function(){var pw=this.patternWidth();var ph=this.patternHeight();var sx=(this.characterBlockX()+this.characterPatternX())*pw;var sy=(this.characterBlockY()+this.characterPatternY())*ph;this.createHalfBodySprites();if(this._bushDepth>0)this._lowerBody.opacity=128;else this._lowerBody.opacity=255;this._upperBody.bitmap=this.bitmap;this._upperBody.visible=true;this._lowerBody.bitmap=this.bitmap;this._lowerBody.visible=true;this._upperBody.y=-bodyMargin*bodyRate;this._upperBody.setFrame(sx,sy,pw,ph-bodyMargin*bodyRate);this._lowerBody.setFrame(sx,sy+ph-bodyMargin*bodyRate,pw,bodyMargin*bodyRate);this.setFrame(sx,sy,0,ph);var tone=this._character._tone;if(tone){this._upperBody.setColorTone(tone);this._lowerBody.setColorTone(tone)}}})();