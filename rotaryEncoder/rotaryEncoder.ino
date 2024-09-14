#define rotaryEncoderOutputA 6
#define rotaryEncoderOutputB 7
#define buttonPin 2
// rotary encoder
int counter = 0;
int rState;
int rLastState;
// button
int buttonState = 0;

void setup() {
  pinMode(rotaryEncoderOutputA, INPUT); // rotary encoder A
  pinMode(rotaryEncoderOutputB, INPUT); // rotary encoder B
  pinMode(buttonPin, INPUT_PULLUP); // button

  Serial.begin(9600);

  rLastState = digitalRead(rotaryEncoderOutputA);
}

void loop() {
  // put your main code here, to run repeatedly:
  rState = digitalRead(rotaryEncoderOutputA);
  if(rState != rLastState){
    if(digitalRead(rotaryEncoderOutputB) != rState){
      counter++;
    } else {
      counter --;
    }
    // Serial.print("Position: ");
    Serial.println(counter);
  }
  rLastState = rState;

// button
  if(digitalRead(buttonPin) == LOW && buttonState == 0) {
    counter = 0;
    buttonState = 1;
  }
  if(digitalRead(2) == HIGH) {
  buttonState = 0;
  }
}
