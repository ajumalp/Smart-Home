/*
 * CharUtils.h
 * Developed by Muhammad Ajmal P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Jan-2019
 */

#ifndef CHARUTILS_H_
#define CHARUTILS_H_

#include <Arduino.h>

const char cNullChr = '\0';
const char cPipeSymbol = '|';
const char cNewLineChr = '\n';
const char cReturnChr = '\r';
const char cEqualTo = '=';
const char cColon = ':';
const char cEmptyStr[] = "";

inline char digitToChar(byte aDigit) {
  switch(aDigit) {
    case 0: return '0';
    case 1: return '1';
    case 2: return '2';
    case 3: return '3';
    case 4: return '4';
    case 5: return '5';
    case 6: return '6';
    case 7: return '7';
    case 8: return '8';
    case 9: return '9';
  }
}

inline bool eStrIsEmpty(char aValue[]) {
  return (aValue[0] == cNullChr);
}

inline void eStrClear(char* aValue, int8_t aSize) {
  for (int8_t iCntr = 0; iCntr < aSize - 1; iCntr++) {
    aValue[iCntr] = cNullChr;
  }
}

inline void eStrCat(char aSource[], char aChr, char* aDest) {
  for (int8_t iCntr = 0; iCntr < strlen(aSource); iCntr++) {
    if (aDest[iCntr] == cNullChr) {
      aDest[iCntr++] = aChr;
      aDest[iCntr] = cNullChr;
    }
  }
}

inline bool eStrIsStartWith(char aStart[], char aValue[]) {
  for (int iCntr = 0; iCntr < strlen(aStart); iCntr++) {
    if (aStart[iCntr] != aValue[iCntr]) return false;
  }
  return true;
}

inline bool eStrIsEquals(char aValue1[], char aValue2[]) {
  return eStrIsStartWith(aValue1, aValue2);
}

inline int eStrIndexOf(char aSource[], char aChr, int aStartFrom) {
  for (int iCntr = aStartFrom; iCntr < strlen(aSource); iCntr++) {
    if (aSource[iCntr] == aChr) return iCntr;
  }
  return -1;
}

inline int eStrFirstIndexOf(char aSource[], char aChr) {
  return eStrIndexOf(aSource, aChr, 0);
}

inline void eStrExtract(char aSource[], int aFrom, int aTo, char* aDest) {
  if (strlen(aSource) < aTo) return;

  int iCntr = aFrom;
  int jCntr = 0;
  while (iCntr <= aTo) aDest[jCntr++] = aSource[iCntr++];
  if (aDest[jCntr] != cNullChr) aDest[++jCntr] = cNullChr;
}

inline void eStrExtract(char aSource[], int aFrom, char* aDest) {
  eStrExtract(aSource, aFrom, strlen(aSource), aDest);
}

#endif