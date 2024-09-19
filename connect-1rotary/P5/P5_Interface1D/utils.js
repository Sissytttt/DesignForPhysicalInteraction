function keyInteraction() {
    if (controller.gameState == "PLAY") {
        if (forceLeft_A > 0 && keyIsDown(RIGHT_ARROW)) {
            stretching = true;
        } else {
            stretching = false;
        }
        if (stretching == true) {
            if (forceLeft_A > 0) {
                playerA.applyForce(-1 * forceLeft_A);
            }
            if (keyIsDown(RIGHT_ARROW)) {
                playerB.applyForce(forceRight_B);
            }
        } else if (stretching == false) {
            if (forceLeft_A > 0) {
                playerA.applyForce(-1 * forceLeft_A);
                playerB.applyForce(-1 * forceLeft_A);
            }
            if (keyIsDown(RIGHT_ARROW)) {
                playerA.applyForce(forceRight_B);
                playerB.applyForce(forceRight_B);
            }
        }
    }
}


// function keyInteraction() {
//     if (controller.gameState == "PLAY") {
//         if (keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)) {
//             stretching = true;
//         } else {
//             stretching = false;
//         }
//         if (stretching == true) {
//             if (keyIsDown(LEFT_ARROW)) {
//                 playerA.applyForce(-1 * forceLeft_A);
//             }
//             if (keyIsDown(RIGHT_ARROW)) {
//                 playerB.applyForce(forceRight_B);
//             }
//         } else if (stretching == false) {
//             if (keyIsDown(LEFT_ARROW)) {
//                 playerA.applyForce(-1 * forceLeft_A);
//                 playerB.applyForce(-1 * forceLeft_A);
//             }
//             if (keyIsDown(RIGHT_ARROW)) {
//                 playerA.applyForce(forceRight_B);
//                 playerB.applyForce(forceRight_B);
//             }
//         }
//     }
// }


function keyPressed() {
    if (key == "R" || key == "r") {
        controller.gameState = "PLAY";
        SCORE = 0;
        displayedScore = 0;
        playerA.pos = length / 2 - 50;
        playerB.pos = length / 2 + 50;
    }
}