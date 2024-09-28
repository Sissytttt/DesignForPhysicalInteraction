
function catchData() {
    let currentString = serial.readLine();
    // console.log(currentString);
    if (currentString.length > 0) {
        data = currentString.trim();
        // console.log(data);
        if (data[0] == "A") {
            ArduinoDataA = int(data.slice(1));
        }
        if (data[0] == "B") {
            ArduinoDataB = int(data.slice(1));
        }
        if (data[0] == "R") {
            controller.gameState = "PLAY";
            SCORE = 0;
            forceLeft_A = 0;
            forceRight_B = 0;
            displayedScore = 0;
            playerA.pos = length / 2 - 50;
            playerB.pos = length / 2 + 50;
            level = 1;
        }
    }
}

function processDataA(ArduinoData) {
    if (ArduinoDataA == "") {
        return;
    }
    forceLeft_A = map(ArduinoData, 0, 30, 0, 12);
}

function processDataB(ArduinoData) {
    if (ArduinoDataB == "") {
        return;
    }
    forceRight_B = map(ArduinoData, 0, 30, 0, 12);
}