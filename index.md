# Automate your Home/Office      
_This application helps to control electronic devices remotely. This can be installed in your localnetwork, and if you have a static IP you can access your devices from any where. You need a WiFi/Ethernet at Home/Office to connect Arduino devices. Then from your phone, you can control connected appliances_    

> This app is tested using Google Chrome in both Windows 10 and Android only      

1. This support PWA [Progressive Web App]. So that this can be easily installed into any OS supporting PWA
1. The Arduino code for the devices is als oincluded in the [Hardware](https://github.com/ajumalp/Smart-Home/tree/master/Smart-Access/Hardware) folder. 
1. Mainly supporting [ESP8266](https://github.com/Erratums/ESP8266/wiki) devices 
1. You are always free to modify the code for your requirements 

---    
    
### Below are few screnshots of the Application    

<table>
    <tr>
        <th>Main Screen [Android]</th>
        <th>Main Screen [Other]</th>
        <th>Devices</th>
        <th>Main Menu</th>
        <th>Login Screen</th>
    </tr>
    <tr>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-android-screen.jpg"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-iphone-screen.jpg"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-device-list.jpg"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-menu-screen.jpg"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Screenshots/sa-login-screen.jpg"/>
        </th>
    </tr>
</table>     

### Below are few supporting Devices      

<table>
    <tr>
        <th>1 Channel Module</th>
        <th>2 Channel Module</th>
        <th>4 Channel Module</th>
        <th>ESP8266 1 Channel Module</th>
    </tr>
    <tr>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/1-ch-relay-module.png"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/2-ch-relay-module.png"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/4-ch-relay-module.png"/>
        </th>
        <th>
            <img src="https://raw.githubusercontent.com/ajumalp/Smart-Home/master/Other/Images/Devices/esp8266-1-ch-relay-module.png"/>
        </th>
    </tr>
</table>      

### How to program devices    
> If you don't know how to install ESP8266 into Arduino IDE, please refer this link    
[**_How to install ESP8266 in Arduino_**](https://github.com/ajumalp/Smart-Home/wiki/How-to-Install-esp8266-on-Arduino)     

There are different types of ESP8266 modules. Here we are mainly using the ESP01S with the relay relay modules    
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


**_For more details, visit [WiKi Page](https://github.com/ajumalp/Smart-Home/wiki)_**    
---
