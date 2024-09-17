class Controller {
    // state "PLAY" "GAMEOVER"
    constructor() {
        this.gameState = "PLAY";
    }

    update() {
        switch (this.gameState) {
            case "PLAY":
                background(0);
                keyInteraction();

                catcher.updatePos();
                catcher.updateLen();
                catcher.update();
                catcher.display();
                catcher.updateColor();
                catcher.checkLen();
                catcher.checkBoundary();
                // catcher.showLen();

                playerA.update();
                playerB.update();
                // playerA.display();
                // playerB.display();

                generateTarget();
                updateTarget();

                showScore();
                break;

            case "GAMEOVER":
                background(255, 0, 0);
                showScore();
                displayScore();
        }
    }
}

function displayScore() {
    push();
    rectMode(CORNER);
    let xOffset = 0;

    if (displayedScore < SCORE && frameCount % 10 == 0) {
        let xPos = xOffset;
        fill(255, 255, 0);
        rect(xPos, 0, blockSize, blockSize);
        xOffset += blockSize + 1;
        displayedScore++;
    }
    for (let i = 0; i < displayedScore; i++) {
        let xPos = i * (blockSize + 1);
        fill(255, 255, 0);
        rect(xPos, 0, blockSize, blockSize);
    }
    pop();
}

function showScore() {
    fill(255);
    text("score: " + SCORE, 10, 10);
}