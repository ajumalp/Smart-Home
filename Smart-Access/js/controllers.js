/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function (page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function () {
      document.querySelector('#mySplitter').left.toggle();
    };

    Array.prototype.forEach.call(page.querySelectorAll('[component="button/add-control"]'), function (element) {
      element.onclick = function () {
        myApp.services.platform.changeTo('ios', function () {
          ons.openActionSheet({
            title: 'Select Control',
            cancelable: true,
            buttons: ['Switch', 'Push Button', 'Cancel']
          }).then(function (index) {
            switch (index) {
              case 0:
                document.querySelector('#myNavigator').pushPage('html/addControl.html');
                break;
              case 1:
                break;
            }
          });
        });
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform
    // page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function (page) {
    myApp.services.categories.bindOnClickListener(page.querySelector('#place-main ons-list-item[category-id="home"]'));
    myApp.services.categories.bindOnClickListener(page.querySelector('#place-main ons-list-item[category-id="office"]'));
    myApp.services.categories.bindOnClickListener(page.querySelector('#place-main ons-list-item[category-id="other"]'));

    myApp.services.categories.bindOnClickListener(page.querySelector('#manage-main ons-list-item[category-id="devices"]'));
    myApp.services.categories.bindOnClickListener(page.querySelector('#manage-main ons-list-item[category-id="settings"]'));

    myApp.services.categories.bindOnClickListener(page.querySelector('#access-main ons-list-item[category-id="signOut"]'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  settingsPage: function (page) {
    // Set button functionality to save a new task.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-task"]'), function (element) {
      element.onclick = function () {
        var newTitle = page.querySelector('#title-input').value;

        if (newTitle) {
          // If input title is not empty, create a new task.
          myApp.services.tasks.create(
            {
              title: newTitle,
              category: page.querySelector('#category-input').value,
              description: page.querySelector('#description-input').value,
              highlight: page.querySelector('#highlight-input').checked,
              urgent: page.querySelector('#urgent-input').checked
            }
          );

          // Set selected category to 'All', refresh and pop page.
          document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
          document.querySelector('#default-category-list ons-list-item').updateCategoryView();
          document.querySelector('#myNavigator').popPage();

        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('You must provide a task title.');
        }
      };
    });
  },

};
