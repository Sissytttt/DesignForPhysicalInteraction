#define rotaryEncoderAOutput1 6
#define rotaryEncoderAOutput2 7
#define buttonAPin 4

#define rotaryEncoderBOutput1 5
#define rotaryEncoderBOutput2 8
#define buttonBPin 3

#define buttonRPin 9

// rotary encoder A
int counterA = 0;
int rAState;
int rALastState;
// rotary encoder B
int counterB = 0;
int rBState;
int rBLastState;
// button
int buttonAState = 0;
int buttonBState = 0;
int buttonRState = 0;

void setup() {
  // rotary encoder A
  pinMode(rotaryEncoderAOutput1, INPUT);
  pinMode(rotaryEncoderAOutput2, INPUT);
  // rotary encoder B
  pinMode(rotaryEncoderBOutput1, INPUT);
  pinMode(rotaryEncoderBOutput2, INPUT);
  
  // buttons
  pinMode(buttonAPin, INPUT_PULLUP);
  pinMode(buttonBPin, INPUT_PULLUP);
  pinMode(buttonRPin, INPUT_PULLUP);

  Serial.begin(9600);

  // initialize last state of rotary encoders
  rALastState = digitalRead(rotaryEncoderAOutput1);
  rBLastState = digitalRead(rotaryEncoderBOutput1);
}

void loop() {
  // Rotary Encoder A
  rAState = digitalRead(rotaryEncoderAOutput1);
  if(rAState != rALastState) {
    if(digitalRead(rotaryEncoderAOutput2) != rAState) {
      counterA++;
    } else {
      counterA--;
    }
    Serial.print("A");
    Serial.println(counterA);
  }
  rALastState = rAState;

  // Button A
  if(digitalRead(buttonAPin) == LOW && buttonAState == 0) {
    counterA = 0;
    Serial.print("A");
    Serial.println(counterA); 
    buttonAState = 1;
  }
  if(digitalRead(buttonAPin) == HIGH) {
    buttonAState = 0; 
  }
  
  // ================================================================
  // Rotary Encoder B
  rBState = digitalRead(rotaryEncoderBOutput1);
  if(rBState != rBLastState) {
    if(digitalRead(rotaryEncoderBOutput2) != rBState) {
      counterB++;
    } else {
      counterB--;
    }
    Serial.print("B");
    Serial.println(counterB);
  }
  rBLastState = rBState;

  // Button B
  if(digitalRead(buttonBPin) == LOW && buttonBState == 0) {
    counterB = 0;
    Serial.print("B");
    Serial.println(counterB);
    buttonBState = 1;
  }
  if(digitalRead(buttonBPin) == HIGH) {
    buttonBState = 0;
  }

  // ================================================================
  //Button R
    if(digitalRead(buttonRPin) == LOW && buttonRState == 0) {
    counterA = 0;
    counterB = 0;
    Serial.println("R");
    Serial.println("A0");
    Serial.println("B0");
    buttonRState = 1;
  }
  if(digitalRead(buttonRPin) == HIGH) {
    buttonRState = 0; 
  }
}
