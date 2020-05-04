/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 26-Apr-2020
 */

class Gadgets {

   static #_ImageCount = -1;

   static ImageCount() {
      return Gadgets.#_ImageCount;
   }

   static UpdateImageCount() {
      if (Gadgets.#_ImageCount === -1) {
         myApp.services.JQPHP.postData(
            'Gadgets', 'ImageCount', true,
            function (obj, isSuccess, textstatus) {
               if (isSuccess) {
                  Gadgets.#_ImageCount = parseInt(obj);
               } else {
                  myApp.services.message.alert(obj);
               }
            }
         );
      }
   }

   static ChangeListener(aGadgetID) {
      var varGadgetElement = document.getElementById('gadget-switch-id-' + aGadgetID);
      var bIsChecked = varGadgetElement.lastChild.lastChild.checked;
      var sPinType = varGadgetElement.getAttribute('pinType');
      var bInverted = varGadgetElement.getAttribute('inverted') === 'T';

      var sState = '';
      if (bInverted) {
         sState = bIsChecked ? 'IF' : 'IT';
      } else {
         sState = bIsChecked ? 'NT' : 'NF';
      }

      myApp.services.JQPHP.postData(
         'Gadgets',
         'UpdateSwitchState',
         [sState, aGadgetID, sPinType],
         function (obj, isSuccess, textstatus) {
            if (obj !== 'success') {
               myApp.services.message.alert(obj);
            }
         }
      );
   }

   static SaveSwitch(aData) {
      myApp.services.JQPHP.postData(
         'Gadgets',
         'SaveItemToDB',
         [aData.caption, aData.deviceid, Gadgets.PinTypeCode(aData.boardtype, aData.pintype),
         myApp.Main.LayoutIndex(),
         myApp.Utils.General.BoolToChar(aData.hidepair),
         myApp.Utils.General.BoolToChar(aData.inverted),
         aData.imgcode],
         function (obj, isSuccess, textstatus) {
            if (obj === 'success') {
               Gadgets.LoadData();
               myApp.services.message.alert('Saved successfully');
            } else {
               myApp.services.message.alert(obj);
            }
         }
      );
   }

   static DeleteItem(aGadgetID) {
      myApp.services.JQPHP.postData(
         'Gadgets',
         'DeleteFromDB',
         [aGadgetID],
         function (obj, isSuccess, textstatus) {
            if (obj === 'success') {
               Gadgets.LoadData();
               myApp.services.message.alert('Gadget deleted successfully');
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

   static LoadData(aLayoutIndex = null, aOnSuccessEvent = null) {
      Gadgets.UpdateImageCount();
      if (aLayoutIndex === null) {
         aLayoutIndex = myApp.Main.LayoutIndex();
      }

      myApp.services.JQPHP.postData(
         'Gadgets',
         'LoadFromDB',
         [aLayoutIndex],
         function (data, isSuccess, textstatus) {
            if (isSuccess) {
               $("#main-gadget-list").empty();
               var varJSONData = JSON.parse(data);
               var sLastDeviceName = '';
               for (let iCntr = 0; iCntr < varJSONData.length; iCntr++) {
                  var varData = varJSONData[iCntr];
                  var bAddHeader = sLastDeviceName !== varData.DEVICENAME;
                  if (bAddHeader) {
                     sLastDeviceName = varData.DEVICENAME;
                  }
                  Gadgets.CreateGadgetElement(varData, bAddHeader);
               }
               if (aOnSuccessEvent !== null) {
                  aOnSuccessEvent();
               }
            }
         }
      );
   }

   static LoadAddSwitchPage(page) {
      myApp.services.JQPHP.postData(
         'Devices',
         'LoadFromDB',
         [myApp.Main.LayoutIndex()],
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

   static CreateIconList() {
      var taskItem = ons.createElement(
         '<option value="' + aIndex + '">' + aSwitchName + '</option>'
      );
      document.getElementById('gadget-icon-select').appendChild(taskItem);
   }

   static CreateGadgetElement(aItemData, aAddHeader) {
      var sChecked = 'checked';
      if (aItemData.VALUE === 'NF' || aItemData.VALUE === 'IT') {
         sChecked = 'unchecked';
      }
      var varThis = this;
      if (aAddHeader) {
         var taskItemHeader = ons.createElement('<ons-if platform="ios other"><ons-list-header>' + aItemData.DEVICENAME + '</ons-list-header></ons-if>');
         myApp.UI.GadgetList().appendChild(taskItemHeader);
      }
      var taskItem = ons.createElement(
         '<ons-list-item modifier="nodivider" style="min-height: 60px;" id="gadget-switch-id-' + aItemData.GADGETID + '" pinType="' + aItemData.PINTYPE + '" inverted="' + aItemData.INVERTED + '">' +
         '<div class="left"><img class="list-item__thumbnail" src="images/gadget/' + aItemData.IMAGECODE + '"></div>' +
         '<span class="list-item__title">' + aItemData.GADGETNAME + '</span>' +
         '<span class="list-item__subtitle">Board: ' + aItemData.DEVICENAME + '</span>' +
         '<div class="right" id="cbGadget"><ons-switch ' + sChecked + ' id="cbGadget" onchange="Gadgets.ChangeListener(' + aItemData.GADGETID + ')"></ons-switch></div>' +
         '</ons-list-item>'
      );

      myApp.UI.GadgetList().appendChild(taskItem);

      taskItem.querySelector('.center').onclick = function () {
         myApp.services.message.openActionSheet({
            title: 'Manage Control',
            cancelable: true,
            buttons: ['Delete', 'Cancel']
         }, function (aIndex) {
            switch (aIndex) {
               case 0:
                  Gadgets.DeleteItem(aItemData.GADGETID);
                  break;
            }
         });
      }
   }

}