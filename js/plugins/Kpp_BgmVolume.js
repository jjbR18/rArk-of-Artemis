//=============================================================================
// Kpp_BgmVolume.js
//=============================================================================
// Copyright (c) 2016-2019 カッピ
//
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// ウェブサイト
// http://birdwind.webcrow.jp/
//
// Twitter
// https://twitter.com/kappi_bw

/*:ja
 * @plugindesc BGMの音量指定を無視し、プラグインで設定した音量で再生します。
 * @author カッピ
 *
 * @param DisableSwitch
 * @desc オンの間、プラグインの機能を無効にするスイッチの番号
 * @default 0
 * @type number
 *
 * @param BgmName 1
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 1
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 2
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 2
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 3
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 3
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 4
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 4
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 5
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 5
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 6
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 6
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 7
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 7
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 8
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 8
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 9
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 9
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 10
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 10
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 11
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 11
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 12
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 12
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 13
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 13
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 14
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 14
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 15
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 15
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 16
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 16
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 17
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 17
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 18
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 18
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 19
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 19
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 20
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 20
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 21
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 21
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 22
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 22
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 23
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 23
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 24
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 24
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 25
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 25
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 26
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 26
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 27
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 27
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 28
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 28
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 29
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 29
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 30
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 30
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 31
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 31
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 32
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 32
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 33
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 33
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 34
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 34
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 35
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 35
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 36
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 36
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 37
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 37
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 38
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 38
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 39
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 39
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 *
 * @param BgmName 40
 * @desc 音量を設定するBGM
 * @default 
 * @type file
 * @dir audio/bgm
 *
 * @param Volume 40
 * @desc BGMの音量
 * @default 90
 * @type number
 * @min -1
 * @max 100
 * 
 * @help
 * BGMを再生する音量を、プラグインで設定した値に統一します。
 * BGMごとに音量を設定します。
 *
 * BGMはファイル名で指定します。
 * 拡張子を除外して入力してください。
 * × sample.ogg
 * ○ sample
 * 
 * 指定した番号のスイッチがオンの場合、プラグインの機能は無効になり、
 * 通常の(イベントコマンドなどで指定した)音量で再生されます。
 *
 * 音量の最大値は 100 です。
 * それ以上の値を設定すると、100に補正されます。
 * マイナスの値を設定すると、設定は無効になり、通常の音量で再生されます。
 *
 * 全てのBGMを設定する必要はありません。
 * プラグインで設定していないBGMは、通常の音量で再生されます。
 *
 * [ 更新 2019/1/11 ]
 * インポートしたBGMを一覧から選択可能に(MV 1.5.0以降)
 * 
 *
 */

(function(){

    var volumeList = {};
    
    var parameters = PluginManager.parameters('Kpp_BgmVolume');
    
    var disableSwitch = Number(parameters['DisableSwitch'] || 0);
    
    for (var i = 1; i <= 40; i++) {
        var bgmName = String(parameters['BgmName ' + i] || "");
        if (bgmName != "") {
            var bgmVolume = Number(parameters['Volume ' + i] || -1);
            if (bgmVolume > 100) {
                bgmVolume = 100;
            }
            if (bgmVolume >= 0) {
                volumeList[bgmName] = bgmVolume;
            }
        } 
    }
    
    var _AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm = function(bgm, pos) {
        if (disableSwitch <= 0 || !$gameSwitches.value(disableSwitch)) {
            if (bgm.name in volumeList) {
                bgm.volume = volumeList[bgm.name];
            }
        }

        _AudioManager_playBgm.call(this, bgm, pos);
    };

}());