/*:
 * @plugindesc 装備記憶・ロード用プラグイン
 * @author あいうえお
 * @help 装備を記憶・ロードする機能を実装するためのプラグインです。
 */

(function() {
    'use strict';

    var Scene_Equip_prototype_update = Scene_Equip.prototype.update;
    Scene_Equip.prototype.update = function() {
        Scene_Equip_prototype_update.call(this);
        //何も選択されていない時に表示させるテキスト
        if (this._helpWindow && this._helpWindow._text == "") {
            this._helpWindow.setText("\\C[14]Shiftキー\\C[0]を押すことで現在のパーティの装備を保存します。\nオプションのおまかせ装備設定\\C[14]保存した装備\\C[0]に反映されます。");
        }
        if(Input.isTriggered('shift')) {
            AudioManager.playSe({"name":"Up4","volume":100,"pitch":150,"pan":0});
            if (this._helpWindow) {
                this._helpWindow.setText("\\C[1]現在のパーティの装備が保存されました！\\C[0]\nオプションのおまかせ装備設定\\C[14]保存した装備\\C[0]に反映されます。");
                //現在の装備保存処理
                $gameSystem.saveCurrentEquips();
            }
        }
    }

    Game_System.prototype.saveCurrentEquips = function() {
        for (var i = 1; i < 9; i++) {
            if (!$gameActors.actor(i)) {
                continue;
            }
            var actor = $gameActors.actor(i);
            var num = Number(180 + i);
            var Jobnum  = actor.getJobNumber();
            console.log(num)
            console.log(Jobnum)
            switch(Jobnum) {
                case 1:
                    $gameVariables.setValue(Number(num),actor.equips());
                    break;
                case 2:
                    $gameVariables.setValue(Number(num + 10),actor.equips());
                    break;
                case 3:
                    $gameVariables.setValue(201,actor.equips());
                    break;
                case 4:
                    $gameVariables.setValue(202,actor.equips());
                    break;
                default:
                    break;
                }
        }
    }

    Game_Actor.prototype.getJobNumber = function() {
        if (!$dataClasses[this._classId] || !$dataClasses[this._classId].meta) {
            return 0;
        }
        return Number($dataClasses[this._classId].meta.Jobnumber);
    };


    var Game_Actor_prototype_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
    Game_Actor.prototype.optimizeEquipments = function() {
        if ($gameVariables.value(50) == 6) {
            this.clearEquipments();
            //保存した装備を装備させる処理
            this.getSavedEquips();
        } else {
            Game_Actor_prototype_optimizeEquipments.call(this);
        }
    }

    Game_Actor.prototype.getSavedEquips = function() {
        if (!this._actorId || !this._classId) {
            return;
        }
        var num = Number(180 + this._actorId);
        var Jobnum  = this.getJobNumber();
        var equipObject = [];
        switch(Jobnum) {
            case 1:
                equipObject = $gameVariables.value(Number(num));
                break;
            case 2:
                equipObject = $gameVariables.value(Number(num + 10));
                break;
            case 3:
                equipObject = $gameVariables.value(201);
                break;
            case 4:
                equipObject = $gameVariables.value(202);
                break;
            default:
                break;
            }

        //バグ対応　二刀のお守りをあらかじめ装備させておく
        for (var i = 0; i < equipObject.length; i++) {
            if (!equipObject[i] || !equipObject[i].id) {
                continue;
            }
            var item = $gameSystem.getItemTypes(equipObject[i], equipObject[i].id);
            if($gameParty.hasItem(item, false) && this.canEquip(item) && item.meta.dualWeapon){
                this.changeEquip(i, item);
            }
        }

        for (var i = 0; i < equipObject.length; i++) {
            if (!equipObject[i] || !equipObject[i].id) {
                continue;
            }
            var item = $gameSystem.getItemTypes(equipObject[i], equipObject[i].id);
            if($gameParty.hasItem(item, false) && this.canEquip(item)){
                this.changeEquip(i, item);
            }
        }
    }

    Game_System.prototype.getItemTypes = function(type, id){
        console.log(type.wtypeId);
        console.log(type.atypeId);
        if (type.wtypeId) {
            return $dataWeapons[id];
        } else if (type.atypeId) {
            return $dataArmors[id];
        }
        return null;
    }
})();