// Include the Servo library
#include <Servo.h>
// - - - - - - - - - - - -
// Declare the Servo pin
int servoPinH = 10;
int servoPinV = 11;
// Create a servo object
Servo ServoH, ServoV;
int servoValueH = 0;
int servoValueV = 0;
// - - - - - - - - - - - -
int lightSensorPinTopLeft = A0;     // noir + jaune
int lightSensorPinTopRight = A1;    // bleu + marron
int lightSensorPinBottomLeft = A2;  // gris + orange
int lightSensorPinBottomRight = A3; // violet + rouge

int tl = 0; // Top Left
int tr = 0; // Top Right
int bl = 0; // Bottom Left
int br = 0; // Bottom Right
int atl, atr, abr, abl = 0;
// - - - - - - - - - - - -
int RightValue, LeftValue, BottomValue = 0;
// - - - - - - - - - - - -
int maxTL, maxTR, maxBL, maxBR = 0;
int minH = 10;
int maxH = 170;
int minV = 10;
int maxV = 170;
bool initServo = false;
bool etalonnage = false;
int idx = 0;
int d = 50;
void setup() {
  Serial.begin(9600);
  
  ServoH.attach(servoPinH);
  ServoV.attach(servoPinV);
  ServoH.write(80);
  ServoV.write(80);
}

void loop() {

//  if (etalonnage == true) {
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


  while((idx < 100) && (etalonnage == true)) {

    Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");
    maxTL = max(tl, maxTL);
    maxTR = max(tr, maxTR);
    maxBL = max(bl, maxBL);
    maxBR = max(br, maxBR);

    Serial.println("TL MAX = \t" + String(maxTL));
    Serial.println("TR MAX = \t" + String(maxTR));
    Serial.println("BL MAX = \t" + String(maxBL));
    Serial.println("BR MAX = \t" + String(maxBR));

    delay(100);
    Serial.println(idx);
    Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");
    
    tl = analogRead(lightSensorPinTopLeft);
    tr = analogRead(lightSensorPinTopRight);
    bl = analogRead(lightSensorPinBottomLeft);
    br = analogRead(lightSensorPinBottomRight);

    idx += 1;
  }  

  getValue(tl, tr, bl, br);

  while ( ((tl + tr) > (bl + br) )&&  servoValueV > minV ) {
    Serial.println("UP");
    --servoValueV;
    ServoV.write(servoValueV);
    delay(d);
    getValue(tl, tr, bl, br);
  }

  while ( ((tl + tr) < (bl + br) )&&  servoValueV < maxV ) {
    Serial.println("DOWN");
    ++servoValueV;
    ServoV.write(servoValueV);
    delay(d);
    getValue(tl, tr, bl, br);
  }

  while ( ((tl + bl) > (tr + br) )&&  servoValueH < maxH ) {
    Serial.println("RIGHT");
    ++servoValueH;
    ServoH.write(servoValueH);
    delay(d);
    getValue(tl, tr, bl, br);
  }

  while ( ((tl + bl) < (tr + br) )&&  servoValueH > minH ) {
    Serial.println("LEFT");    
    --servoValueH;
    ServoH.write(servoValueH);
    delay(d);
    getValue(tl, tr, bl, br);
  }

// - - - - - - - - - - - -
  Serial.println("TL:" + (String)tl + "TR:" + (String) tr + "BL:" + (String) bl + "BR:" + (String) br);

  int avg = (int) (tl + tr + br + bl) / 4;
  Serial.println("- - - - - - - - - - - - - - - - - - - - - - ");
  Serial.println((String)avg + "%");
  delay(1000);
}


void getValue(int &tl, int &tr, int &bl, int &br) {
  
//TL MAX =   380
//TR MAX =  573
//BL MAX =  601
//BR MAX =  475

//TL MAX =   160
//TR MAX =  254
//BL MAX =  278
//BR MAX =  224

  int ratio = 1;
  maxTL = 200;
  maxTR = 254;
  maxBL = 278;
  maxBR = 224;

  maxTL = 250;
  maxTR = 254;
  maxBL = 258;
  maxBR = 244;

  
  tl = map((analogRead(lightSensorPinTopLeft)/ratio), 0, maxTL, 0, 100);
  tr = map((analogRead(lightSensorPinTopRight)/ratio), 0, maxTR, 0, 100);
  bl = map((analogRead(lightSensorPinBottomLeft)/ratio), 0, maxBL, 0, 100);
  br = map((analogRead(lightSensorPinBottomRight)/ratio), 0, maxBR, 0, 100);
}
