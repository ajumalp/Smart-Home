<h1 align="center">Smart Home</h1>
<h4 align="center">Complete solution for home automation</h4>

<p align="center">
    <a href="https://erratums.com"><img alt="Logo" src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Logo/erratums%20128x128.png" width="100"></a>
</p>

> **_For more details, visit [WiKi Pages](https://github.com/ajumalp/Smart-Home/wiki)_**    
---     

## Development tools required 
[![](https://img.shields.io/badge/Visual%20Studio%20Code-1.46-blue)](https://code.visualstudio.com/)
[![](https://img.shields.io/badge/Arduino%20IDE-1.8.12-00979D)](https://www.arduino.cc/en/Main/Software)
[![](https://img.shields.io/badge/XAMPP-3.2.4-F06F25)](https://www.apachefriends.org/download.html)
![](https://img.shields.io/badge/PHP-7.2%20[XAMPP]-8892BF)
![](https://img.shields.io/badge/MySQL-XAMPP-4479A1)
[![](https://img.shields.io/badge/MQTT-Mosquitto-blueviolet)](https://mosquitto.org/download/)
[![](https://img.shields.io/badge/Onsen%20UI-2.10-F02E29)](https://onsen.io/)

### Visual Studio Code Extensions used 
[![](https://img.shields.io/badge/Arduino-Microsoft-blue)](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-arduino#review-details)
[![](https://img.shields.io/badge/C%2FC%2B%2B-Microsoft-blue)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools#review-details)
[![](https://img.shields.io/badge/Debugger%20For%20Chrome-Microsoft-blue)](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome#review-details)
[![](https://img.shields.io/badge/HTML%20CSS%20Support-ecmel-lightgrey)](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css#review-details)
[![](https://img.shields.io/badge/JavaScript%20(ES6)%20code%20snippets-charalampos%20karypidis-yellow)](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets#review-details)
[![](https://img.shields.io/badge/PHP%20Debug-Felix%20Becker-blueviolet)](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug#review-details)
[![](https://img.shields.io/badge/PHP%20Intelephense-Ben%20Mewburn-blueviolet)](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client#review-details)

### Hardware Requirements 
![](https://img.shields.io/badge/ESP01S-ESP8266-red)
![](https://img.shields.io/badge/USB%20to%20TTL%20converter-ESP01S%20Programmer-red)
![](https://img.shields.io/badge/Relay%20Module-Single%20or%20Multi%20Channel-red)
![](https://img.shields.io/badge/Power%20Supply-5%20Volt-red)

# Automate your Home/Office      
_This application helps to control electronic devices remotely. This can be installed in your localnetwork, and if you have a static IP you can access your devices from any where. You need a WiFi/Ethernet at Home/Office to connect Arduino devices. Then from your phone, you can control connected appliances_    

> This app is tested using Google Chrome in both Windows 10 and Android only      

1. This support PWA [Progressive Web App]. So this can be easily installed into any OS supporting PWA
1. The Arduino code for the devices is also included in the [Hardware](https://github.com/ajumalp/Smart-Home/tree/master/Smart-Access/Hardware) folder. 
1. Mainly supporting [ESP8266](https://github.com/Erratums/ESP8266/wiki) devices 
1. You are always free to modify the code for your requirements 

---    
    
## Below are few screnshots of the Application     
|Main Screen [Android]|Main Screen [Other]|Devices|Main Menu|Login Screen|
|-|-|-|-|-|
|![Main Screen](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-android-screen.jpg)|![Main Screen](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-iphone-screen.jpg)|![Main Screen](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-device-list.jpg)|![Main Screen](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-menu-screen.jpg)|![Main Screen](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-login-screen.jpg)|     

## Below are few supporting Devices     
|1 Channel Module|1 Channel Module|4 Channel Module|1 Channel Module|
|-|-|-|-|
|![](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/1-ch-relay-module.png)|![](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/2-ch-relay-module.png)|![](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/4-ch-relay-module.png)|![](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/esp8266-1-ch-relay-module.png)|

---    

## Installing Software    
1. Install XAMPP with Apache MySQL [Download here](https://www.apachefriends.org/download.html)
1. Install Mosquitto MQTT [Doanload here](https://mosquitto.org/download/)
1. Download the complete source code and place it inside XAMPP/htdocs folder. [You should place it inside a folder say "sa"]
1. Make sure XAMPP is installed properly and also Apache and MySQL is working. Link [localhost/phpmyadmin](http://localhost/phpmyadmin/) should open MySQL Manager 
1. Inside the [res/db](https://github.com/ajumalp/Smart-Home/tree/master/Smart-Access/res/db) fodler you can see the query to create the tables. 
1. Execute this query in [phpmyadmin](http://localhost/phpmyadmin/server_sql.php). You can see the tables created      
![](https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sql-tables.png)      
1. The MySQL user and password will be automatically set in the above query. If you want to set a different password, you can change it in the config file 
1. Now run the **mosquitto.exe** file in the **mosquitto** folder you installed earlier 
1. It should be ready now. Open the [**index.html**](http://localhost/sa/index.html) in the [htdocs/sa](http://localhost/sa/) folder in your Google Chrome. [I tested this in Google Chrome only, so I suggest you to use Google Chrome]
1. You will see the Main Screen now. You should move to **Devices** screen and add device before adding switchs.

### How to program devices     
>[Click here to learn more](https://github.com/ajumalp/Smart-Home/wiki/How-to-program-Devices)       
     
**There are different types of ESP8266 modules. Here we are mainly using the ESP01S with the relay relay modules**      
      
> If you don't know how to install ESP8266 into Arduino IDE, please refer this link    
[**_How to install ESP8266 in Arduino_**](https://github.com/ajumalp/Smart-Home/wiki/How-to-Install-esp8266-on-Arduino)     

> If you don't know how to program ESP01S, please refer this link    
[**_How to program ESP01S_**](https://github.com/ajumalp/Smart-Home/wiki/How-to-program-ESP01S)

<table cellspacing="0" cellpadding="0">
    <tr>
        <th>
            <a href="https://github.com/ajumalp/Smart-Home/wiki/How-to-program-ESP01S"><img src="https://raw.githubusercontent.com/Erratums/ESP8266/master/images/esp01-progrm.png"/></a>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/Erratums/ESP8266/master/images/esp01-program-using-arduino-uno.png" width="50%"/>
        </th>
    </tr>
</table>      
You need a USB to TTL Converter to program ESP01S or you can buy any ESP01S programmer or you can also program ESP01S using [TTL converter in] Arduino Uno as shown.     

**_Please note: In the above image, the Tx or Arduino is directly connected to Rx of ESP01S which not recomended for long time use. You should use a 5v to 3v3 logic converter_**     
       
Once you have the programmer or TTL to USB converter you can start programming ESP01S     

1. Go to [Hardware](https://github.com/ajumalp/Smart-Home/tree/master/Smart-Access/Hardware) folder
1. Open the **SS-ESP01S.ino** in Arduino IDE
1. Select the Board Type as **ESP8266 Generic**
1. Select the port 
1. Upload the code 
