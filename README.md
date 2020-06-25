<h1 align="center">Smart Home</h1>
<h4 align="center">Complete solution for home automation</h4>

<p align="center">
    <a href="https://erratums.com"><img alt="Logo" src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Logo/erratums%20128x128.png" width="100"></a>
</p>

> **_For more details, visit [WiKi Pages](https://github.com/ajumalp/Smart-Home/wiki)_**    
---

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

### How to program devices    
> If you don't know how to install ESP8266 into Arduino IDE, please refer this link    
[**_How to install ESP8266 in Arduino_**](https://github.com/ajumalp/Smart-Home/wiki/How-to-Install-esp8266-on-Arduino)     

There are different types of ESP8266 modules. Here we are mainly using the ESP01S with the relay relay modules    
> If you don't know how to program ESP01S, please refer this link    
[**_How to program ESP01S_**](https://github.com/ajumalp/Smart-Home/wiki/How-to-program-ESP01S)

You need a USB to TTL Converter to program ESP01S or you can buy any ESP01S programmer     
[![](https://raw.githubusercontent.com/Erratums/ESP8266/master/images/esp01-progrm.png)](https://github.com/ajumalp/Smart-Home/wiki/How-to-program-ESP01S)    

---     
   
You can also program ESP01S using [TTL converter in] Arduino Uno as below.    
**_Please note: In the below image, the Tx or Arduino is directly connected to Rx of ESP01S which not recomended for long time use. You should use a 5v to 3v3 logic converter_**     
<img src="https://raw.githubusercontent.com/Erratums/ESP8266/master/images/esp01-program-using-arduino-uno.png" width="50%"/>    

---     

Once you have the programmer or TTL to USB converter you can start programming ESP01S     
1. Go to [Hardware](https://github.com/ajumalp/Smart-Home/tree/master/Smart-Access/Hardware) folder
1. Open the **SS-ESP01S.ino** in Arduino IDE
1. Select the Board Type as **ESP8266 Generic**
1. Select the port 
1. Upload the code 
