
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

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

   Main: {

      Navigator: function () {
         return document.querySelector('#mainNavigator');
      }

   },

   login: function () {
      try {
         this.JQPHP.postData('ES\\Core\\AuthManager', 'getSecurityLevel', true,
            function (obj, isSuccess, textstatus) {
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

   mainPullHook: function () {
      ons.ready(function () {
         var pullHook = document.getElementById('pull-hook-main');

         pullHook.addEventListener('changestate', function (event) {
            var message = '';

            switch (event.state) {
               case 'initial':
                  message = 'Pull to refresh';
                  break;
               case 'preaction':
                  message = 'Release';
                  break;
               case 'action':
                  message = 'Loading...';
                  break;
            }

            pullHook.innerHTML = message;
         });

         pullHook.onAction = function (done) {
            Gadgets.LoadData(myApp.Main.LayoutIndex(), function () {
               setTimeout(done, 50);
            });
         };
      });
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

      ItemIndexByName: function (aName) {
         switch (aName) {
            case "home": return 0;
            case "office": return 1;
            case "other": return 2;
         }
      },

      bindOnClickListener: function (categoryItem) {
         var categoryId = categoryItem.getAttribute('category-id').replace('main-menu-', '');

         categoryItem.onClickListener = function () {
            document.querySelector('#mainSplitter').left.toggle();

            switch (categoryId) {

               case "settings":
                  myApp.Main.Navigator().pushPage('html/settings.html');
                  break;

               case "devices":
                  myApp.Main.Navigator().pushPage('html/devices.html');
                  break;

               case "home": case "office": case "other":
                  var sCategoryText = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
                  document.getElementById('main-toobal-title').innerHTML = "Smart Access [" + sCategoryText + "]";
                  var iLayoutIndex = myApp.services.categories.ItemIndexByName(categoryId);
                  document.getElementById('main-toobal-title').attributes['layoutIndex'].value = iLayoutIndex.toString();
                  Gadgets.LoadData(iLayoutIndex);
                  break;

               case "signOut":
                  myApp.services.JQPHP.postData(
                     'AuthManager',
                     'logout', null, function (obj, textstatus) {
                        sessionStorage.clear();
                        window.location.reload();
                     }
                  );
                  break;
            }
         };

         categoryItem.addEventListener('click', categoryItem.onClickListener);
      },
   }
};