
/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 20-Apr-2020
 */

function doLogin() {
   $.ajax({
      type: "POST",
      url: "../php/auth/Login.php",
      data: { fnName: 'login', userName: document.getElementById("uname").value, password: document.getElementById("psw").value },

      success: function (aSessionID, textstatus) {
         document.getElementById("uname").value = '';
         document.getElementById("psw").value = '';
         if (textstatus == 'success') {
            if (aSessionID.Trim === "" || aSessionID == "false") {
               alert('Invalid Login');
            } else {
               sessionStorage.setItem('es_sa_sessionID', aSessionID);
               window.location.href = "../";
            }
         }
      },
   });
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
      data: { fnName: 'register', userName: document.getElementById("uname").value, password: document.getElementById("psw").value },

      success: function (aSessionID, textstatus) {
         document.getElementById("uname").value = '';
         document.getElementById("psw").value = '';
         document.getElementById("pswcnf").value = '';
         if (textstatus == 'success') {
            if (aSessionID.Trim === "" || aSessionID == "false") {
               alert('Invalid Login');
            } else {
               sessionStorage.setItem('es_sa_sessionID', aSessionID);
               window.location.href = "../login/";
            }
         }
      },
   });
}