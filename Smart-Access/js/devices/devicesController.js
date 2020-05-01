
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

class DeviceController {

   static AddDevice() {
      myApp.services.message.openActionSheet({
         title: 'Select Device Type',
         cancelable: true,
         buttons: ['Generic', 'Cancel']
      }, function (aIndex) {
         switch (aIndex) {
            case 0:
               myApp.Main.Navigator().pushPage('html/addDevice.html', {
                  animation: 'lift',
                  data: {
                     deviceData: varDevices
                  }
               });
               break;
         }
      });
   }

}

myApp.controllers.devices = {

   deviceListPage: function (page) {
      varDevices = new Devices();
      varDevices.loadData(0); // Load home layout 1st { Ajmal }

      [].forEach.call(page.querySelectorAll("[id^='tab-device-']"), function (element) {
         element.onclick = function () {
            varDevices.loadData(parseInt(element.attributes['index'].value));
         }
      });

   },

   addDevicePage: function (page) {

      page.querySelector('#deviceType-select').onchange = function (event) {
         $('#add-device-type-image').attr('src', 'images\\board\\' + page.querySelector('#deviceType-select').value + '.png');
      };


      [].forEach.call(page.querySelectorAll('[component="button/save-device"]'), function (element) {
         element.onclick = function () {
            var sCaption = page.querySelector('#caption-input').value;
            if (sCaption) {
               page.data.deviceData.save({
                  caption: sCaption,
                  devicetype: page.querySelector('#deviceType-select').value
               });

               myApp.Main.Navigator().popPage();
            } else {
               myApp.services.message.alert('You must enter caption');
            }
         };

         element.show && element.show();
      });

   }

};