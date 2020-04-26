
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

class Devices {

   layoutIndex = -1;

   static GetBoardNameByID(aID) {
      switch (aID) {
         case 1001: return "1 CH Relay [esp01]";
         case 1002: return "2 CH Relay [esp01]";
         case 1003: return "4 CH Relay [esp01]";
         case 1004: return "1 CH Relay [ESP8266]";
      }
   }

   save(aData) {
      var varThis = this;
      myApp.services.JQPHP.postData(
         'Devices',
         'SaveItemToDB',
         [aData.caption, aData.devicetype, this.getSelectedLayoutIndex()],
         function (obj, isSuccess, textstatus) {
            if (obj === 'success') {
               varThis.loadData(varThis.getSelectedLayoutIndex());
               myApp.services.message.alert('Saved successfully');
            } else {
               myApp.services.message.alert(obj);
            }
         }
      );
   }

   deleteItem(aDeviceID) {
      var varThis = this;
      myApp.services.JQPHP.postData(
         'Devices',
         'DeleteFromDB',
         [aDeviceID],
         function (obj, isSuccess, textstatus) {
            if (isSuccess) {
               varThis.loadData(varThis.getSelectedLayoutIndex());
               myApp.services.message.alert('Device deleted successfully');
            }
         }
      );
   }

   editDevice(aDeviceID) {
      myApp.services.message.alert('This feature is still not implimented');
      return;

      myApp.services.JQPHP.postData(
         'Devices',
         'UpdateItemInDB',
         [0, aDeviceID],
         function (obj, isSuccess, textstatus) {
            if (isSuccess) {
               myApp.services.message.alert('Device updated successfully');
            }
         }
      );
   }

   moveTo(aDeviceID) {
      var iLayoutIndex = this.getSelectedLayoutIndex();
      var varThis = this;
      var varButtonNames = [];
      switch (iLayoutIndex) {
         case 0: varButtonNames = ['Office', 'Other', 'Cancel'];
            break;
         case 1: varButtonNames = ['Home', 'Other', 'Cancel'];
            break;
         case 2: varButtonNames = ['Home', 'Office', 'Cancel'];
            break;
      }

      myApp.services.message.openActionSheet({
         title: 'Move Device',
         cancelable: true,
         buttons: varButtonNames
      }, function (aIndex) {
         // Check if cancelled { Ajmal }
         if (aIndex === 2) return;

         var iNewLayoutIndex = -1;
         switch (varButtonNames[aIndex]) {
            case "Home":
               iNewLayoutIndex = 0;
               break;
            case "Office":
               iNewLayoutIndex = 1;
               break;
            case "Other":
               iNewLayoutIndex = 2;
               break;
            default: return;
         }

         myApp.services.JQPHP.postData(
            'Devices',
            'MoveTo',
            [iNewLayoutIndex, aDeviceID],
            function (obj, isSuccess, textstatus) {
               if (obj === 'success') {
                  varThis.loadData(varThis.getSelectedLayoutIndex());
                  myApp.services.message.alert('Device moved successfully');
               } else {
                  myApp.services.message.alert(obj);
               }
            }
         );
      });
   }

   layoutIDFromIndex(aLayoutIndex) {
      switch (aLayoutIndex) {
         case 0: return '#device-list-home';
         case 1: return '#device-list-office';
         case 2: return '#device-list-other';
      }
   }

   clear(aLayoutIndex) {
      var sLayoutID = this.layoutIDFromIndex(aLayoutIndex);
      $(sLayoutID).empty();
   }

   getSelectedLayoutIndex() {
      return this.layoutIndex;
   }

   loadData(aLayoutIndex = null) {
      if (aLayoutIndex !== null) {
         this.layoutIndex = aLayoutIndex;
      }
      if (this.layoutIndex < 0 || this.layoutIndex > 2) {
         throw new Error("Invalid Layout Index");
      }

      this.clear(this.layoutIndex);
      myApp.services.JQPHP.postData(
         'Devices',
         'LoadFromDB',
         [this.layoutIndex],
         function (data, isSuccess, textstatus) {
            if (isSuccess) {
               var varJSONData = JSON.parse(data);
               for (let iCntr = 0; iCntr < varJSONData.length; iCntr++) {
                  this.createItem(varJSONData[iCntr]);
               }
            }
         }.bind(this)
      );
   }

   createItem(aItemData) {
      var varThis = this;
      var sLayoutID = this.layoutIDFromIndex(this.layoutIndex);
      var taskItem = ons.createElement(
         '<ons-list-item tappable deviceID="' + aItemData.DEVICEID + '" layoutIndex="' + this.layoutIndex + '" component="button/add-device">' +
         '<div class="left"><img class="list-item__thumbnail" src="images/board/' + aItemData.BOARDID + '.png"></div>' +
         '<span class="list-item__title">' + aItemData.DEVICENAME + '</span>' +
         '<span class="list-item__subtitle">Board: ' + Devices.GetBoardNameByID(parseInt(aItemData.BOARDID)) + '</span>' +
         '</ons-list-item>'
      );

      document.querySelector(sLayoutID).appendChild(taskItem);

      taskItem.querySelector('.center').onclick = function () {
         myApp.services.message.openActionSheet({
            title: 'Manage Device',
            cancelable: true,
            buttons: ['Edit', 'Move to', 'Delete', 'Cancel']
         }, function (aIndex) {
            switch (aIndex) {
               case 0:
                  varThis.editDevice(aItemData.DEVICEID);
                  break;
               case 1:
                  varThis.moveTo(aItemData.DEVICEID);
                  break;
               case 2:
                  varThis.deleteItem(aItemData.DEVICEID);
                  break;
            }
         });
      };
   }
};