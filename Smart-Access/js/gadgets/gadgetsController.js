/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 26-Apr-2020
 */

myApp.controllers.gadgets = {

   addSwitchPage: function (page) {

      ons.ready(function () {
         document.getElementById('add-switch-selectde-image').src = "images/gadget/2.png";
         var varImageList = document.getElementById('list-item-images');

         varImageList.delegate = {
            createItemContent: function (i) {
               var iIndex = parseInt(i + 1);
               return ons.createElement('<ons-col width="fit-content"> ' +
                  '<ons-list>' +
                  '<ons-list-item tappable image-id="img-' + iIndex + '"' +
                  'style="background-color: white; border: none; border-color: white;" modifier="nodivider" style="width: fit-content;">' +
                  '<img class="list-item__thumbnail" src="images/gadget/' + iIndex + '.png" style="padding: 10px;">' +
                  '</ons-list-item>' +
                  '</ons-list>' +
                  '</ons-col>');
            },
            countItems: function () {
               return Gadgets.ImageCount();
            }
         };
         varImageList.refresh();

         [].forEach.call(page.querySelectorAll("[image-id^='img-']"), function (element) {
            element.onclick = function (obj) {
               var iImgIndex = element.getAttribute('image-id').replace('img-', '');
               var varImage = document.getElementById('add-switch-selectde-image');
               varImage.src = 'images/gadget/' + iImgIndex + '.png';
               varImage.setAttribute('image-id', iImgIndex);
            }.bind(element);
         });
      });

      Gadgets.LoadAddSwitchPage(page);
      [].forEach.call(page.querySelectorAll('[component="button/save-switch"]'), function (element) {
         element.onclick = function () {
            var sCaption = page.querySelector('#caption-input').value;
            var varDevice = page.querySelector('#device-select');
            if (sCaption) {
               Gadgets.SaveSwitch({
                  caption: sCaption,
                  deviceid: varDevice.options[varDevice.selectedIndex].getAttribute('deviceid'),
                  boardtype: varDevice.options[varDevice.selectedIndex].getAttribute('boardtype'),
                  pintype: page.querySelector('#pintype-select').value,
                  hidepair: false, // page.querySelector('#hidePair-check').checked,
                  inverted: page.querySelector('#inverted-check').checked,
                  imgcode: page.querySelector('#add-switch-selectde-image').getAttribute('image-id') + '.png'
               });
               myApp.Main.Navigator().popPage();
            } else {
               myApp.services.message.alert('You must enter caption');
            }
         };

         element.show && element.show();
      });
   },
}
