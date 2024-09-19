class Catcher {
    constructor(endpointA, endpointB, len) {
        this.endpointA = endpointA;
        this.endpointB = endpointB;
        this.len = len;
        this.oriLen = len;
        this.k = k;
        this.stretchSpeed = 1; // ***
        this.shrinkSpeed = 4; // ***
        this.maxLen = maxLen; // ***
        this.col = color(255, 255, 255);
    }

    updatePos() {
        this.centerPos = (this.endpointA.pos + this.endpointB.pos) / 2;
    }

    updateLen() {
        this.len = abs(this.endpointB.pos - this.endpointA.pos);
    }

    updateColor() {
        let stretchRatio = constrain(abs(this.len - this.oriLen) / 120, 0, 1);
        this.col = lerpColor(color(255, 255, 255), color(255, 0, 0), stretchRatio);
    }

    display() {
        push();
        rectMode(CENTER);
        fill(this.col);
        rect(this.centerPos, blockSize / 2, this.len, blockSize);
        pop();
    }

    update() {
        let distance = this.endpointB.pos - this.endpointA.pos;
        let stretch = distance - this.oriLen;
        let direction;
        if (distance > 0) {
            direction = -1;
        } else if (distance < 0) {
            direction = 1;
        } else {
            direction = 0;
        }

        if (stretching) {
            let force = direction * -1 * this.k * stretch * this.stretchSpeed;
            this.endpointA.applyForce(force);
            this.endpointB.applyForce(-force);
        } else {
            let force = direction * -1 * this.k * stretch * this.shrinkSpeed;
            this.endpointA.applyForce(force);
            this.endpointB.applyForce(-force);
        }
    }

    checkLen() {
        // if (len > limit) -> Die
        if (this.len >= this.maxLen) {
            controller.gameState = "GAMEOVER";
            console.log("GAMEOVER");
        }
    }

    checkBoundary() {
        // if(any of the endpoint touch boundary) -> Die
        if (this.endpointA.pos <= 0 || this.endpointB.pos >= length) {
            controller.gameState = "GAMEOVER";
            console.log("GAMEOVER");
        }
    }

    showLen() {
        console.log(this.len, this.maxLen);
    }
}