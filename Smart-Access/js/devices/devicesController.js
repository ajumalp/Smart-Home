
/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

myApp.controllers.devices = {

   deviceListPage: function (page) {
      Array.prototype.forEach.call(page.querySelectorAll('[component="button/add-device"]'), function (element) {
         element.onclick = function () {
            ons.openActionSheet({
               title: 'Select Device Type',
               cancelable: true,
               buttons: ['Generic', 'Cancel']
            }).then(function (index) {
               switch (index) {
                  case 0:
                     document.querySelector('#myNavigator').pushPage('html/addDevice.html');
                     break;
               }
            });
         };

         element.show && element.show(); // Fix ons-fab in Safari.
      });

   },

   addDevicePage: function (page) {
      Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-device"]'), function (element) {
         element.onclick = function () {
            var sCaption = page.querySelector('#caption-input').value;
            if (sCaption) {
               myApp.services.devices.save({
                  caption: sCaption,
                  devicetype: page.querySelector('#deviceType-select').value
               });

               document.querySelector('#myNavigator').popPage();
            } else {
               ons.notification.alert('You must enter caption');
            }
         };

         element.show && element.show();
      });
   }

};