'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//=============================================================================
// EISPreRun.js                                                             
//=============================================================================

/*:
*
* @author Kino
* @plugindesc A plugin that lets you pre-run common events, once the game is loaded.<EIS_PreRun>
*
* @param Pre Run Common Event IDs
* @desc Common event IDs to run on game start (once the map is loaded).
* @default 1, 2, 3
*
* @help
* Version 1.00
//=============================================================================
//  Instructions
//=============================================================================
* Simply add the plugin to your game, and place the common event IDs seperated
* by commas in the plugin parameter.
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Twitter Link: https://twitter.com/EISKino
* Website: http://endlessillusoft.com/
* Patreon Link: https://www.patreon.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/
(function () {

  var params = $plugins.filter(function (plugin) {
    return (/<EIS_PreRun>/ig.test(plugin.description)
    );
  })[0].parameters;
  var cmmnEvents = params['Pre Run Common Event IDs'].split(",").map(function (element) {
    return Number(element.trim());
  });

  function setup() {
    'use strict';
    //=============================================================================
    //  CommonEventObserver
    //=============================================================================

    var CommonEventObserver = function () {
      function CommonEventObserver() {
        _classCallCheck(this, CommonEventObserver);
      }

      _createClass(CommonEventObserver, null, [{
        key: 'start',
        value: function start() {
          this.update();
        }
      }, {
        key: 'update',
        value: function update() {
          this.handleCommonEvents();
          this.requestUpdate();
        }
      }, {
        key: 'handleCommonEvents',
        value: function handleCommonEvents() {
          if ($gameMap.mapId() !== 0 && !$gameMap._interpreter.isRunning() && !$gameTemp.isCommonEventReserved() && cmmnEvents.length > 0) {
            $gameTemp.reserveCommonEvent(cmmnEvents.dequeue());
          }
        }
      }, {
        key: 'requestUpdate',
        value: function requestUpdate() {
          requestAnimationFrame(this.update.bind(this));
        }
      }]);

      return CommonEventObserver;
    }();
    //=============================================================================
    //  DataManager                                                             
    //=============================================================================


    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
      _DataManager_createGameObjects.call(this);
      this.preRunCommonEvents();
    };

    DataManager.preRunCommonEvents = function () {
      CommonEventObserver.start();
    };
    //=============================================================================
    //  Array
    //=============================================================================    
    Array.prototype.enqueue = function (value) {
      this.reverse();
      this.push(value);
      this.reverse();
    };

    Array.prototype.dequeue = function () {
      this.reverse();
      var temp = this.pop();
      this.reverse();
      return temp;
    };
  }

  setup();
})();