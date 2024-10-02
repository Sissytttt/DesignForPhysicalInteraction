// TODO：
// 1. diffent level
// 2. sense of time -- fade away if is not catched


let serial; //arduino ***
let portName = '/dev/tty.usbmodem1101'; // *** 
let ArduinoDataA = "";
let ArduinoDataB = "";

let forceLeft_A = 0;
let forceRight_B = 0;

let SCORE = 0;
let LOST = 0; // lost 3 targets -> die

let k = 0.04; // larger K, stronger Sping, bigger Force
let damping = 0.1; // V = Vprev * damping
let maxLen = 120;

let stretching = true; // stretch only when both two players are pressing the key

let length = 1000;
let blockSize = 30;
let ends = 40;

let catcher;
let playerA, playerB;
let controller;

let displayedScore = 0;

let level = 1;
let targets = [];
let sectionDivision = 5;
let section = {};
let sectionHistory = [];
let LevelData = {
  1: {
    score: 2,
    Targetsize: 30,
    TargetLifeReduction: 0.0005,
    maxNum_of_Target: 1,
    targetPossibility: 0.5,
  },
  2: {
    score: 4,
    Targetsize: 45,
    TargetLifeReduction: 0.0008,
    maxNum_of_Target: 1,
    targetPossibility: 0.5,
  },
  3: {
    score: 6,
    Targetsize: 60,
    TargetLifeReduction: 0.001,
    maxNum_of_Target: 2,
    targetPossibility: 0.001,
  },
  4: {
    score: 8,
    Targetsize: 80,
    TargetLifeReduction: 0.002,
    maxNum_of_Target: 2,
    targetPossibility: 0.002,
  },
  5: {
    score: 20,
    Targetsize: 100,
    TargetLifeReduction: 0.003,
    maxNum_of_Target: 3,
    targetPossibility: 0.003,
  }
}


function setup() {
  serial = new p5.SerialPort(); // ***
  serial.open(portName); // ***

  createCanvas(length, blockSize);
  controller = new Controller();
  playerA = new Player(length / 2 - 50);
  playerB = new Player(length / 2 + 50);
  catcher = new Catcher(playerA, playerB, blockSize / 2);
  background(255, 0, 0);
  serial.on('data', catchData); // ***
  divideSection(sectionDivision);
}

function draw() {
  controller.update();
  processDataA(ArduinoDataA);
  processDataB(ArduinoDataB);
}

