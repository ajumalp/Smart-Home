
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

myApp.services.devices = {

   save: function (aData) {
      myApp.services.JQPHP.postData(
         'Devices',
         'SaveItemToDB',
         [aData.caption, aData.devicetype],
         function (obj, isSuccess, textstatus) {
            if (isSuccess) {
               myApp.services.platform.alert(obj);
            }
         }
      );
   },

   layoutIDFromIndex: function (aLayoutIndex) {
      switch (aLayoutIndex) {
         case 0: return '#device-list-home';
         case 1: return '#device-list-office';
         case 2: return '#device-list-other';
      }
   },

   loadData: function (aLayoutIndex) {
      var sLayoutID = this.layoutIDFromIndex(aLayoutIndex);
      $(sLayoutID).empty();
      myApp.services.JQPHP.postData(
         'Devices',
         'LoadFromDB',
         [aLayoutIndex],
         function (data, isSuccess, textstatus) {
            if (isSuccess) {
               var varJSONData = JSON.parse(data);
               for (let iCntr = 0; iCntr < varJSONData.length; iCntr++) {
                  var varData = varJSONData[iCntr];
                  myApp.services.devices.createItem(sLayoutID, varData);
               }
            }
         }
      );
   },

   createItem: function (aLayoutID, aItemData) {
      var taskItem = ons.createElement(
         '<ons-list-item tappable deviceID="' + aItemData.DEVICEID + '" component="button/add-device">' +
         '<div class="center">' + aItemData.DEVICENAME + '</div>' +
         '</ons-list-item>'
      );

      // Store data within the element.
      taskItem.data = aItemData;
      document.querySelector(aLayoutID).appendChild(taskItem);

      taskItem.querySelector('.center').onclick = function () {
         /*document.querySelector('#myNavigator').pushPage('html/addControl.html', {
            animation: 'lift',
            data: {
               element: taskItem
            }
         });*/

         myApp.services.platform.changeTo('ios', function () {
            ons.openActionSheet({
               title: 'Manage Device',
               cancelable: true,
               buttons: ['Edit', 'Move to', 'Unregister', 'Cancel']
            }).then(function (index) {
               myApp.services.platform.alert('index');
            });
         });
      };
   },
};