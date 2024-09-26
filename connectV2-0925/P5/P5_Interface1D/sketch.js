// TODO：
// 1. diffent level
// 2. sense of time -- fade away if is not catched


let serial; //arduino
let portName = '/dev/tty.usbmodem1101';
let ArduinoDataA = "";
let ArduinoDataB = "";

let forceLeft_A = 0;
let forceRight_B = 0;
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

let displayedScore = 0;

let level = 1;
let targets = [];

let LevelData = {
  1: {
    score: 2,
    Targetsize: 30,
    TargetLifeReduction: 0.0005,
    targetNum: 1,
    targetPossibility: 0.5,
  },
  2: {
    score: 4,
    Targetsize: 40,
    TargetLifeReduction: 0.0008,
    targetNum: 1,
    targetPossibility: 0.5,
  },
  3: {
    score: 6,
    Targetsize: 50,
    TargetLifeReduction: 0.001,
    targetNum: 2,
    targetPossibility: 0.005,
  },
  4: {
    score: 30,
    Targetsize: 60,
    TargetLifeReduction: 0.002,
    targetNum: 3,
    targetPossibility: 0.002,
  }

}


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
  processDataB(ArduinoDataB)
}