// TODO：
// 1. diffent level  (?)
// 2. if no one is pressing -- go back to center (?)


let serial; //arduino
let portName = '/dev/tty.usbmodem1101';
let ArduinoDataA = "";
let ArduinoDataB = "";

let forceLeft_A = 0;
let forceRight_B = 3;
let SCORE = 0;

let k = 0.04; // larger K, stronger Sping, bigger Force
let damping = 0.1; // V = Vprev * damping
let maxLen = 120;

let stretching = true; // stretch only when both two players are pressing the key

let length = 800;
let blockSize = 30;

let catcher;
let playerA, playerB;
let controller;
let targetNum = 1;
let targets = [];

let displayedScore = 0;

function setup() {
  serial = new p5.SerialPort();
  serial.open(portName);

  createCanvas(length, blockSize);
  controller = new Controller();
  playerA = new Player(length / 2 - 50);
  playerB = new Player(length / 2 + 50);
  catcher = new Catcher(playerA, playerB, blockSize / 2);
  background(255, 0, 0);
  serial.on('data', catchData);
}

function draw() {
  controller.update();
  processDataA(ArduinoDataA);
  // console.log(ArduinoDataA, forceLeft_A);
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + portList[i]);
  }
}

function catchData() {
  console.log("got data")
  let currentString = serial.readLine();
  if (currentString.length > 0) {
    ArduinoDataA = currentString.trim();
    console.log(ArduinoDataA)
    ArduinoDataA = int(ArduinoDataA);
  }
}

function processDataA(ArduinoData) {
  if (ArduinoDataA == "") {
    return;
  }
  forceLeft_A = map(ArduinoData, 0, 30, 0, 6);
}