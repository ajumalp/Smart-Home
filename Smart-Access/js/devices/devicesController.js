
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

myApp.controllers.devices = {

   deviceListPage: function (page) {
      myApp.services.devices.loadData(0);

      document.addEventListener('prechange', function (event) {
         myApp.services.devices.loadData(event.index);
      });

      Array.prototype.forEach.call(page.querySelectorAll('[component="button/add-device"]'), function (element) {
         element.onclick = function () {
            myApp.services.platform.changeTo('ios', function () {
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
               myApp.services.platform.alert('You must enter caption');
            }
         };

         element.show && element.show();
      });
   }

};