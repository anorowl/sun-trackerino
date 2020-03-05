// Include the Servo library
#include <Servo.h>
// - - - - - - - - - - - -
// Declare the Servo pin
const int servoPinH = 10;
const int servoPinV = 11;
// Create a servo object
const Servo ServoH, ServoV;
int servoValueH = 0;
int servoValueV = 0;
// - - - - - - - - - - - -
const int lightSensorPinTopLeft = A0;     // noir + jaune = noir
const int lightSensorPinTopRight = A1;    // bleu + marron = vert
const int lightSensorPinBottomLeft = A2;  // gris + orange = bleu
const int lightSensorPinBottomRight = A3; // violet + rouge = rouge
// - - - - - - - - - - - -
int tl = 0; // Top Left
int tr = 0; // Top Right
int bl = 0; // Bottom Left
int br = 0; // Bottom Right
int atl, atr, abr, abl = 0;
// - - - - - - - - - - - -
const int btnSwitch = 4;
const int RedLED = 5;
const int GreenLED = 6;
const int BlueLED = 7;
const int ledPin = 13;
// - - - - - - - - - - - -
int maxTL, maxTR, maxBL, maxBR = 0;
int minTL, minTR, minBL, minBR = 1023;
const int minH = 10;
const int maxH = 170;
const int minV = 10;
const int maxV = 170;
// - - - - - - - - - - - -
bool initServo = false;
bool isCalibrate = false;
int valueBtnCalibrate = 0;
int d = 30;
int myDelay;
int RedBright = 0;
int GreenBright = 0;
// - - - - - - - - - - - -
bool MODE_DEBUG = false;
// - - - - - - - - - - - -


/** 
 *  Setup 
 */
void setup() {
  Serial.begin(9600);
  //Serial.begin(115200);

  pinMode(GreenLED, OUTPUT);
  pinMode(RedLED, OUTPUT);
  pinMode(BlueLED, OUTPUT);
  pinMode(ledPin, OUTPUT);

  pinMode(btnSwitch, INPUT);

  ServoH.attach(servoPinH);
  ServoV.attach(servoPinV);
  ServoH.write(90);
  ServoV.write(70);
}

/** 
 *  Loop
 */
void loop() {

  //  if (isCalibrate == true) {
  //    ServoH.write(90);
  //    delay(2000);
  //    ServoH.write(50);
  //    delay(2000);
  //    ServoH.write(140);
  //    delay(2000);
  //    ServoH.write(90);
  //
  //    ServoV.write(90);
  //    delay(2000);
  //    ServoV.write(0);
  //    delay(2000);
  //    ServoV.write(140);
  //    delay(2000);
  //    ServoV.write(90);
  //
  //    delay(2000);
  //  }
  
  valueBtnCalibrate = digitalRead(btnSwitch);
  
  if(valueBtnCalibrate == HIGH) {
    digitalWrite(ledPin, HIGH);
    isCalibrate = true;
    analogWrite(BlueLED, 255);
    analogWrite(RedLED, 0);
    analogWrite(GreenLED, 0);
    ServoH.write(90);
    ServoV.write(70);
  } 
  if(valueBtnCalibrate == LOW) {
    digitalWrite(ledPin, LOW);
    isCalibrate = false;
    analogWrite(BlueLED, 0);
  }

  tl = analogRead(lightSensorPinTopLeft);
  tr = analogRead(lightSensorPinTopRight);
  bl = analogRead(lightSensorPinBottomLeft);
  br = analogRead(lightSensorPinBottomRight);


  if (isCalibrate) {

    //Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");
    minTL = min(tl, minTL);
    minTR = min(tr, minTR);
    minBL = min(bl, minBL);
    minBR = min(br, minBR);
    
    maxTL = max(tl, maxTL);
    maxTR = max(tr, maxTR);
    maxBL = max(bl, maxBL);
    maxBR = max(br, maxBR);

//    Serial.println("TL MIN = \t" + String(minTL));
//    Serial.println("TR MIN = \t" + String(minTR));
//    Serial.println("BL MIN = \t" + String(minBL));
//    Serial.println("BR MIN = \t" + String(minBR));
//    Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");  
//    Serial.println("TL MAX = \t" + String(maxTL));
//    Serial.println("TR MAX = \t" + String(maxTR));
//    Serial.println("BL MAX = \t" + String(maxBL));
//    Serial.println("BR MAX = \t" + String(maxBR));
//    Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");  
  }
  
  if (!isCalibrate) {
    getValue(tl, tr, bl, br);
  
    while ( ((tl + tr) > (bl + br) ) &&  servoValueV > minV ) {
      if(MODE_DEBUG) {Serial.println("UP");}
      --servoValueV;
      ServoV.write(servoValueV);
      delay(d);
      getValue(tl, tr, bl, br);
    }
  
    while ( ((tl + tr) < (bl + br) ) &&  servoValueV < maxV ) {
      if(MODE_DEBUG) {Serial.println("DOWN");}
      ++servoValueV;
      ServoV.write(servoValueV);
      delay(d);
      getValue(tl, tr, bl, br);
    }
  
    while ( ((tl + bl) > (tr + br) ) &&  servoValueH < maxH ) {
      if(MODE_DEBUG) {Serial.println("RIGHT");}
      ++servoValueH;
      ServoH.write(servoValueH);
      delay(d);
      getValue(tl, tr, bl, br);
    }
  
    while ( ((tl + bl) < (tr + br) ) &&  servoValueH > minH ) {
      if(MODE_DEBUG) {Serial.println("LEFT");}
      --servoValueH;
      ServoH.write(servoValueH);
      delay(d);
      getValue(tl, tr, bl, br);
    }
  
    // - - - - - - - - - - - -
    Serial.println("TL: " + (String) tl + "| TR: " + (String) tr);
    Serial.println("BL: " + (String) bl + "| BR: " + (String) br);
    int avg = (int) (tl + tr + br + bl) / 4;
    //Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");
    Serial.println( ">>>> " + (String)avg + "%");
  
    
    // - - - - - - - - - - - -
    RedBright = map(avg, 0, 100, 255, 0);
    GreenBright = map(avg, 0, 100, 0, 255);
    analogWrite(RedLED, RedBright);
    analogWrite(GreenLED, GreenBright);

    if(avg > 75) {
      delay(map(avg, 0, 100, 500, 5000));
    } else if(avg < 25) {
      delay(30);
    } else {
      delay(map(avg, 0, 100, 30, 1000));
    }
  }
}


/** Functions */
void getValue(int &tl, int &tr, int &bl, int &br) {
  int ratio = 1;
//  maxTL = 250;
//  maxTR = 254;
//  maxBL = 258;
//  maxBR = 244;

  maxTL = 284;
  maxTR = 290;
  maxBL = 289;
  maxBR = 302;

  tl = constrain(map((analogRead(lightSensorPinTopLeft) / ratio), 0, maxTL, 0, 100), 0, 100);
  tr = constrain(map((analogRead(lightSensorPinTopRight) / ratio), 0, maxTR, 0, 100), 0, 100);
  bl = constrain(map((analogRead(lightSensorPinBottomLeft) / ratio), 0, maxBL, 0, 100), 0, 100);
  br = constrain(map((analogRead(lightSensorPinBottomRight) / ratio), 0, maxBR, 0, 100), 0, 100); 
}
