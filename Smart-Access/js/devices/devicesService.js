
/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

myApp.services.devices = {

   bindOnSaveListener: function (aControl) {
      alert('Done');
   },

   save: function (aData) {
      myApp.services.JQPHP.postData(
         'devices/devices.php',
         'saveDevice',
         [aData.caption, aData.devicetype],
         function (obj, isSuccess, textstatus) {
            if (isSuccess) {
               ons.notification.alert(obj);
            }
         });
   }
};