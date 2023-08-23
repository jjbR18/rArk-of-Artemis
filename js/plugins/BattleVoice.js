//=============================================================================
// BattleVoice.js (Ver 1.2.0)
//=============================================================================
// [Update History]
// 2015.Nov    Ver1.0.0 First Release
// 2016.Aug    Ver1.1.0 Strict Option Input
// 2019.Feb.27 Ver1.2.0 Random Play

/*:
 * @plugindesc play voice SE at battle when actor does spcified action(ver1.2)
 * @author Sasuke KANNAZUKI
 * 
 * @param pitch
 * @desc pitch of SEs. this setting is common among all voice SEs.
 * @default 100
 *
 * @param volume
 * @desc volume of SEs. this setting is common among all voice SEs.
 * @default 90
 * 
 * @param Battle Voice Name at Option
 * @desc display name at option
 * @deault Battle Voice
 *
 * @param ON switch ID
 * @desc play se only when the switch is ON. This setting interlocks with option  Battle Voice.
 * @default 21
 * 
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @help This plugin does not provide plugin commands.
 * 
 * note specification:
 * write down each actor's note at following format to set SE filename.
 * <attackVoice:filename>  plays when actor does normal attack.
 * <recoverVoice:filename>   plays when actor uses HP recovering magic.
 * <friendMagicVoice:filename> plays when actor spells magic for friend
 *  except HP recovering. if this is not set but <skillVoice:filename> is set,
 *   it plays <magicVoice:filename> setting file.
 * <magicVoice:filename>   plays when actor spells magic(except for friend).
 * <skillVoice:filename>   plays when actor uses special skill except magic.
 * <damageVoice:filename>    plays when actor takes damage.
 * <defeatedVoice:filename>   plays when actor is died.
 * <victoryVoice:filename>   plays when battle finishes.
 *  if plural actors attend the battle, randomly selected actor's SE is adopted.
 *
 * [Advanced option]
 * If you want to play one of several voices randomly,
 * write filenames with colon as follows:
 * <attackVoice:atk1,atk2,atk3>
 * in this case, at attack, plays atk1 atk2, or atk3 randomly.
 * 

 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @plugindesc アクターの戦闘時の行動にボイスSEを設定します。(ver1.2)
 * @author 神無月サスケ
 * 
 * @param pitch
 * @desc ボイスSEのピッチです。この設定が全てのボイスSEの共通となります。
 * @default 100
 *
 * @param volume
 * @desc ボイスSEのボリュームです。この設定が全てのボイスSEの共通となります。
 * @default 90
 *
 * @param Battle Voice Name at Option
 * @desc オプション画面での表示名です。
 * @default バトルボイス
 *
 * @param ON switch ID
 * @desc このスイッチが ON の時のみ、ボイスSEを演奏します。オプション「バトルボイス」と連動します。
 * @default 21
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * バトルボイスを戦闘中に演奏できます。
 * ゲーム中のオプション画面でON/OFFが可能です。
 *
 * ■メモ設定方法:
 * それぞれのアクターのメモに以下の書式で書いてください。
 * filename はボイスSEのファイル名にしてください。
 *
 * <attackVoice:filename>  通常攻撃の時に再生されるボイスです。
 * <recoverVoice:filename>   HP回復魔法を使用した時に再生されるボイスです。
 * <friendMagicVoice:filename>   HP回復以外の味方向け魔法を使用した時に
 *  再生されるボイスです。省略された場合で<magicVoice:filename>が
 *  設定されている場合は、そちらが再生されます。
 * <magicVoice:filename> 味方向け以外の魔法を使用した時に再生されるボイスです。
 * <skillVoice:filename>   必殺技を使用した時に再生されるボイスです。
 * <damageVoice:filename>    ダメージを受けた時に再生されるボイスです。
 * <defeatedVoice:filename>   戦闘不能になった時に再生されるボイスです。
 * <victoryVoice:filename>   戦闘勝利時に再生されるボイスです。
 *  アクターが複数いる場合は、生きているアクターの中からランダムで再生されます。
 *
 * ■拡張機能
 * 上記のメモのfilename を、コロンで複数指定すると、その中からランダムで
 * 再生されます。例えば、以下のように指定した場合、
 * <attackVoice:atk1,atk2,atk3>
 * atk1 atk2 atk3 のいずれかのボイスがランダムで再生されます。
 * 
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */
(function() {

  //
  // process parameters
  //
  var parameters = PluginManager.parameters('BattleVoice');
  var pitch = Number(parameters['pitch']) || 100;
  var volume = Number(parameters['volume']) || 90;
  var playSwitchId = Number(parameters['ON switch ID']) || 21;
  var strBattleVoice = parameters['Battle Voice Name at Option'] || 'バトルボイス';

  AudioManager.createAudioByFileame = function(name){
    var audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    return audio;
  };

  //
  // set play options (interlock with switch)
  //
  var doesDisplaySpecialOptions = function() {
    return !SceneManager.isPreviousScene(Scene_Title);
  };

  var _Window_Options_makeCommandList =
   Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    if (doesDisplaySpecialOptions()) {
      this.addCommand(strBattleVoice, 'battleVoice');
    }
    _Window_Options_makeCommandList.call(this);
  };

  var _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function(symbol) { 
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.value(playSwitchId);
    default:
      return _Window_Options_getConfigValue.call(this, symbol);
    }
  };

  var _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
  Window_Options.prototype.setConfigValue = function(symbol, volume) {
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.setValue(playSwitchId, volume);
    default:
      return _Window_Options_setConfigValue.call(this, symbol, volume);
    }
  };

  //
  // play actor voice
  //
  var canPlayActorVoice = function(){
    return $gameSwitches.value(playSwitchId);
  };

  var split = function (name) {
    if (!name) {
      return name;
    }
    var names = name.split(',');
    return names[Math.randomInt(names.length)];
  };


  SoundManager.playActorVoice = function(actor, type){
    if (!canPlayActorVoice()) {
      return;
    }
    var name = '';
    switch(type){
      case 'attack':
        name = split(actor.meta.attackVoice);
        break;
      case 'recover':
        name = split(actor.meta.recoverVoice);
        break;
      case 'friendmagic':
        name = split(actor.meta.friendMagicVoice || actor.meta.magicVoice);
        break;
      case 'magic':
        name = split(actor.meta.magicVoice);
        break;
      case 'skill':
        name = split(actor.meta.skillVoice);
        break;
      case 'damage':
        name = split(actor.meta.damageVoice);
        break;
      case 'dead':
        name = split(actor.meta.defeatedVoice);
        break;
      case 'victory':
        name = split(actor.meta.victoryVoice);
        break;
    }
    if(name){
      var audio = AudioManager.createAudioByFileame(name);
      AudioManager.playSe(audio);
    }
  };

  //
  // functions for call actor voice.
  //
  var _Game_Actor_performAction = Game_Actor.prototype.performAction;
  Game_Actor.prototype.performAction = function(action) {
    _Game_Actor_performAction.call(this, action);
    if (action.isAttack()) {
      SoundManager.playActorVoice(this.actor(), 'attack');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      SoundManager.playActorVoice(this.actor(), 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      SoundManager.playActorVoice(this.actor(), 'friendmagic');
    } else if (action.isMagicSkill()) {
      SoundManager.playActorVoice(this.actor(), 'magic');
    } else if (action.isSkill() && !action.isGuard()) {
      SoundManager.playActorVoice(this.actor(), 'skill');
    }
  };

  var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
  Game_Actor.prototype.performDamage = function() {
    _Game_Actor_performDamage.call(this);
    SoundManager.playActorVoice(this.actor(), 'damage');
  };

  var _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
  Game_Actor.prototype.performCollapse = function() {
    _Game_Actor_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      SoundManager.playActorVoice(this.actor(), 'dead');
    }
  };

  var _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    var index = Math.randomInt($gameParty.aliveMembers().length);
    var actor = $gameParty.aliveMembers()[index].actor();
    SoundManager.playActorVoice(actor, 'victory');
    _BattleManager_processVictory.call(this);
  };

})();
