/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

   JQPHP: {
      postData: function (aClassName, aFunctionName, aArgs, aOnSuccess = null, aOnError = null) {
         $.ajax({
            type: "POST",
            url: "php/masterAPI.php",
            data: {
               sessionID: myApp.services.sessionID(),
               className: aClassName,
               functionName: aFunctionName,
               parameters: aArgs
            },

            success: function (obj, textstatus, jqXHR) {
               var isSuccess = textstatus == 'success';
               if (aOnSuccess !== null) aOnSuccess(obj, isSuccess, textstatus);
            },

            error: function (jqXHR, exception) {
               if (aOnError !== null) aOnError(jqXHR, exception);
            }
         });
      }
   },

   login: function () {
      try {
         this.JQPHP.postData('ES\\Core\\AuthManager', 'getSecurityLevel', true, function (obj, isSuccess, textstatus) {
            if (obj != 0) {
               var sSessionID = myApp.services.sessionID();
               if (sSessionID === null) {
                  window.location.href = "login/";
               }
            }
         });
      } catch (err) {
         var sSessionID = myApp.services.sessionID();
         if (sSessionID === null) {
            window.location.href = "login/";
         }
      }
   },

   sessionID: function () {
      return sessionStorage.getItem('es_sa_sessionID');
   },

   message: {

      alert: function (aMsg) {
         myApp.services.platform.changeTo('ios', function () {
            ons.notification.alert(aMsg);
         });
      },

      openActionSheet: function (aOptions, aOnSelectEvent) {
         var varOldPlatform = ons.platform._renderPlatform;
         try {
            ons.platform.select('ios');
            ons.openActionSheet(aOptions).then(function (aIndex) {
               aOnSelectEvent(aIndex)
            });
         } finally {
            ons.platform._renderPlatform = varOldPlatform;
         }
      }

   },

   platform: {

      changeTo: function (aTempPlatform, aEvent) {
         var varOldPlatform = ons.platform._renderPlatform;
         try {
            ons.platform.select(aTempPlatform);
            aEvent();
         } finally {
            ons.platform._renderPlatform = varOldPlatform;
         }
      },

   },

   categories: {
      bindOnClickListener: function (categoryItem) {
         var categoryId = categoryItem.getAttribute('category-id');

         categoryItem.onClickListener = function () {
            document.querySelector('#mySplitter').left.toggle();
            if (categoryId === 'settings') {
               document.querySelector('#myNavigator').pushPage('html/settings.html');
            } else if (categoryId === 'devices') {
               document.querySelector('#myNavigator').pushPage('html/devices.html');
            } else if (categoryId === 'home') {
               document.getElementById('main-toobal-title').innerHTML = "Smart Access [Home]";
               document.getElementById('main-toobal-title').attributes['layoutIndex'].value = "0";
            } else if (categoryId === 'office') {
               document.getElementById('main-toobal-title').innerHTML = "Smart Access [Office]";
               document.getElementById('main-toobal-title').attributes['layoutIndex'].value = "1";
            } else if (categoryId === 'other') {
               document.getElementById('main-toobal-title').innerHTML = "Smart Access [Other]";
               document.getElementById('main-toobal-title').attributes['layoutIndex'].value = "2";
            } else if (categoryId == 'signOut') {
               myApp.services.JQPHP.postData(
                  'AuthManager',
                  'logout', null, function (obj, textstatus) {
                     sessionStorage.clear();
                     window.location.reload();
                  }
               );
            }
         };

         categoryItem.addEventListener('click', categoryItem.onClickListener);
      },
   }
};