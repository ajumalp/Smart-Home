
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

class Devices {

   layoutIndex = -1;

   save(aData) {
      var varThis = this;
      myApp.services.JQPHP.postData(
         'Devices',
         'SaveItemToDB',
         [aData.caption, aData.devicetype, this.getSelectedLayoutIndex()],
         function (obj, isSuccess, textstatus) {
            if (isSuccess) {
               varThis.loadData(varThis.getSelectedLayoutIndex());
               myApp.services.message.alert('Saved');
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
         }

         myApp.services.JQPHP.postData(
            'Devices',
            'MoveTo',
            [iNewLayoutIndex, aDeviceID],
            function (obj, isSuccess, textstatus) {
               if (isSuccess) {
                  varThis.loadData(varThis.getSelectedLayoutIndex());
                  myApp.services.message.alert('Device moved successfully');
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
         '<div class="center">' + aItemData.DEVICENAME + '</div>' +
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
               case 0: break;
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