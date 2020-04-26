
/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 20-Apr-2020
 */

function doLogin() {
   $.ajax({
      type: "POST",
      url: "../php/auth/Login.php",
      data: { fnName: 'login', userName: document.getElementById("uname").value.toLowerCase(), password: document.getElementById("psw").value },

      success: function (aSessionID, textstatus) {
         if (textstatus == 'success') {
            if (aSessionID.Trim === "" || aSessionID == "false") {
               document.getElementById("uname").value = '';
               document.getElementById("psw").value = '';
               alert('Invalid Login');
            } else {
               sessionStorage.setItem('es_sa_sessionID', aSessionID);
               window.location.href = "../";
            }
         }
      },
   });
}

function getParameterByName(name, url = null) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, '\\$&');
   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function forceLower(strInput) {
   strInput.value = strInput.value.toLowerCase();
}

function go2Register() {
   window.location.href = "register.html"
}

function doRegister() {
   var sPassword = document.getElementById("psw").value;
   if (sPassword !== document.getElementById("pswcnf").value) {
      document.getElementById("psw").value = '';
      document.getElementById("pswcnf").value = '';
      alert('password not matching');
      return;
   }

   $.ajax({
      type: "POST",
      url: "../php/auth/Login.php",
      data: { fnName: 'register', userName: document.getElementById("uname").value.toLowerCase(), password: document.getElementById("psw").value },

      success: function (aRespond, textstatus) {
         document.getElementById("uname").value = '';
         document.getElementById("psw").value = '';
         document.getElementById("pswcnf").value = '';
         if (textstatus == 'success') {
            if (aRespond.Trim === "" || aRespond == "false") {
               alert('Invalid Login');
            } else {
               // sessionStorage.setItem('es_sa_sessionID', aRespond);
               window.location.href = "../login/";
            }
         }
      },
   });
}