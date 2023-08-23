//=============================================================================
// Kujilan.js
//=============================================================================
// Copyright (c) 2020 kujilan
//=============================================================================
// GitHub  : https://github.com/rev2nym
//=============================================================================

/*:
 * @plugindesc Bitmap.getPixel回避
 * 「メソッド呼び出しを回避します。
 * @author kujilan https://github.com/rev2nym
 * @help
 * ■概要
 * FPSパフォーマンス改善のためのプラグインなのじゃ。
 * 「Bitmap.getPixel」メソッドと「Bitmap.getAlphaPixel」メソッドの結果を
 * キャッシュ化することで「CanvasRenderingContext2D.getImageData」メソッドの
 * 毎フレームの呼び出しを回避するぞい
 * 
 */

var Imported = Imported || {};
Imported.SAN_GetPixelWorkAround = true;

var kujilan = kujilan || {};
kujilan.GetPixelWorkAround = kujilan.GetPixelWorkAround || {};
kujilan.GetPixelWorkAround.version = '1.0.2';

(function() {

//-----------------------------------------------------------------------------
// Bitmap
//
// ビットマップ

// オブジェクト初期化
var _Bitmap_initialize = 
    Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    _Bitmap_initialize.call(this, width, height);
    this.initPixelCache();
};

// ピクセルキャッシュの初期化
Bitmap.prototype.initPixelCache = function() {
    this._pixelCache = {};
    this._alphaPixelCache = {};
};

// ピクセルキャッシュのクリア
Bitmap.prototype.clearPixelCache = function() {
    this._pixelCache = {};
    this._alphaPixelCache = {};
};

// ピクセルの色データの取得("#rrggbb")
var _Bitmap_getPixel =
    Bitmap.prototype.getPixel;
Bitmap.prototype.getPixel = function(x, y) {
    var key = x + '_' + y;
    var result = (!!this._pixelCache[key] ?
        this._pixelCache[key] :
        _Bitmap_getPixel.call(this, x, y)
    );
    this._pixelCache[key] = result;
    return result;
};

// ピクセルのアルファデータの取得
var _Bitmap_getAlphaPixel = 
    Bitmap.prototype.getAlphaPixel;
Bitmap.prototype.getAlphaPixel = function(x, y) {
    var key = x + '_' + y;
    var result = (!!this._alphaPixelCache[key] ?
        this._alphaPixelCache[key] :
        _Bitmap_getAlphaPixel.call(this, x, y)
    );
    this._alphaPixelCache[key] = result;
    return result;
};

// ダーティフラグの設定
var _Bitmap__setDirty =
    Bitmap.prototype._setDirty;
Bitmap.prototype._setDirty = function() {
    _Bitmap__setDirty.call(this);
    this.clearPixelCache();
};

})();