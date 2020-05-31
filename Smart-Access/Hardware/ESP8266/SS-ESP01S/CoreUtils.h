/*
 * CoreUtils.h
 * Developed by Muhammad Ajmal P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Jan-2019
 */

#ifndef COREUTILS_H_
#define COREUTILS_H_

#include <Arduino.h>
#include <EEPROM.h>

int writeToMem(int addrStart, String data);
String readFromMem(int wordIndex);

class EDelay {

  private:
    unsigned long FDelay, FLastMillis;
    bool FStop;

  public:
    EDelay();
    EDelay(unsigned long delayInMilliSec);
    unsigned long getDelay();
    void setDelay(unsigned long delayInMilliSec);
    bool isStopped();
    void stop();
    void restart();
    bool canContinue();

};

#endif
