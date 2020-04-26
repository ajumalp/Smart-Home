
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 26-Apr-2020
 */

class Gadgets {

   static SaveSwitch(aData) {
      var varThis = this;
      myApp.services.JQPHP.postData(
         'Gadgets',
         'SaveItemToDB',
         [aData.caption, aData.deviceid, Gadgets.PinTypeCode(aData.pintype),
         myApp.Utils.Main.LayoutIndex(),
         myApp.Utils.General.BoolToChar(aData.hidepair),
         myApp.Utils.General.BoolToChar(aData.inverted)],
         function (obj, isSuccess, textstatus) {
            if (obj === 'success') {
               // varThis.loadData(varThis.getSelectedLayoutIndex());
               myApp.services.message.alert('Saved successfully');
            } else {
               myApp.services.message.alert(obj);
            }
         }
      );
   }

   static PinTypes(aBoardType) {
      switch (aBoardType) {
         case "1001": case "1004": return ['Switch 1'];
         case "1002": return ['Switch 1', 'Switch 2'];
         case "1003": return ['Switch 1', 'Switch 2', 'Switch 3', 'Switch 4'];
      }
   }

   static PinTypeCode(aBoardType, aIndex) {
      switch (aBoardType) {
         case "1001": case "1002": case "1003": return 'D' + aIndex;
         case "1004": return "";
      }
   }

   static LoadAddSwitchPage(page) {
      myApp.services.JQPHP.postData(
         'Devices',
         'LoadFromDB',
         [myApp.Utils.Main.LayoutIndex()],
         function (data, isSuccess, textstatus) {
            if (isSuccess) {
               var varJSONData = JSON.parse(data);
               for (let iCntr = 0; iCntr < varJSONData.length; iCntr++) {
                  Gadgets.CreateDeviceElement(varJSONData[iCntr]);
               }
               var varDeviceSelect = document.getElementById('device-select');
               varDeviceSelect.selectedIndex = "0";
               varDeviceSelect.onchange();
            }
         }
      );

      page.querySelector('#device-select').onchange = function (event) {
         var sBoardType = this.options[this.selectedIndex].getAttribute("boardtype");
         $('#pintype-select').empty();
         Gadgets.PinTypes(sBoardType).forEach(Gadgets.CreatePinTypeElement);
      }
   }

   static CreateDeviceElement(aItemData) {
      var taskItem = ons.createElement(
         '<option deviceid="' + aItemData.DEVICEID + '" boardtype="' + aItemData.BOARDID + '">' + aItemData.DEVICENAME + '</option>'
      );
      document.getElementById('device-select').appendChild(taskItem);
   }

   static CreatePinTypeElement(aSwitchName, aIndex) {
      var taskItem = ons.createElement(
         '<option value="' + aIndex + '">' + aSwitchName + '</option>'
      );
      document.getElementById('pintype-select').appendChild(taskItem);
   }

}