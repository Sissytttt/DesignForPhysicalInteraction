// TODO：
// 1. diffent level  (?)
// 2. if no one is pressing -- go back to center (?)

let forceLeft_A = 3;
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
  createCanvas(length, blockSize);
  controller = new Controller();
  playerA = new Player(length / 2 - 50);
  playerB = new Player(length / 2 + 50);
  catcher = new Catcher(playerA, playerB, blockSize / 2);
  background(255, 0, 0);
}

function draw() {
  controller.update();
}