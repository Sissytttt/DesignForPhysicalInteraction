
function updateTarget() {
    if (targets.length > 0) {
        for (let i = 0; i < targets.length; i++) {
            let t = targets[i];
            t.display();
            t.age();
            t.collision(catcher);
            t.remove();
        }
    }
}


function generateTarget() {
    if (targets.length < 1) {
        if (random() < 0.05) {
            let sectionNum = randSection();
            let target = new Target(random(section[sectionNum][0], section[sectionNum][0]))
                .set_lifeReduction(LevelData[level].TargetLifeReduction)
                .set_targetSize(LevelData[level].Targetsize);
            targets.push(target);
        }
    }
    else if (targets.length >= 1 && targets.length < LevelData[level].maxNum_of_Target) {
        if (random() < LevelData[level].targetPossibility) {
            let sectionNum = randSection();
            let target = new Target(random(section[sectionNum][0], section[sectionNum][0]))
                .set_lifeReduction(LevelData[level].TargetLifeReduction)
                .set_targetSize(LevelData[level].Targetsize);
            targets.push(target);
        }
    }
}

function divideSection(num) {
    let segmentLen = (length - ends * 2) / num;
    for (let i = 0; i < num; i++) {
        let secMin = ends + i * segmentLen;
        let secMax = (i + 1) * segmentLen;
        section[i] = [secMin, secMax];
    }
}

function randSection() {
    let sect = floor(random(0, sectionDivision));

    if (sectionHistory.includes(sect)) {
        return randSection();
    }
    else if (level >= 3 && level < 5 && sect == floor(sectionDivision / 2) + 1) {
        return randSection();
    }
    else if (level >= 5 && sect != Object.keys(section)[0] && sect != Object.keys(section)[-1] && sect != Object.keys(section)[floor(sectionDivision / 2) + 1]) {
        return randSection();
    }
    sectionHistory.push(sect);
    if (sectionHistory.length > 2) {
        sectionHistory.shift();
    }
    return sect;
}

class Target {
    constructor(x) {
        this.pos = x;
        this.lifespan = 1;
        this.lifeReduction = 0;
        this.alpha = 255;
        this.size = 1;
        this.isDone = false;
        this.coveredTime = 0;
        this.covering = false;
        this.coverLimit = 50; // *** time to wrap to win
        this.blink = false;
    }

    set_lifeReduction(val) {
        this.lifeReduction = val;
        return this;
    }

    set_targetSize(size) {
        this.size = size;
        return this;
    }

    display() {
        // let size = this.size * (1 - this.coveredTime / this.coverLimit);
        let size = this.size;
        if (this.pos < size / 2 + ends) {
            this.pos = size / 2 + ends;
        } else if (this.pos > length - size / 2) {
            this.pos = length - size / 2 - ends;
        }
        if (this.blink == false) {
            fill(255, 222, 0, this.alpha);
            rectMode(CENTER);
            rect(this.pos, blockSize / 2, size, blockSize);
        }
        // console.log(this.covering, this.blink)
        else if (this.blink && frameCount % 7 < 4) {
            fill(255, 222, 0, this.alpha);
            rectMode(CENTER);
            rect(this.pos, blockSize / 2, size, blockSize);
            this.alpha -= 8;
        }

        if (this.lifespan <= 0.1) {
            if (frameCount % 15 < 7) {
                fill(255, 0, 0, this.alpha * 2)
                rect(this.pos, blockSize / 2, size, blockSize);
            }
        }
    }

    age() {
        this.lifespan -= this.lifeReduction;
        if (this.lifespan < 1 / 5) {
            this.alpha = 255
            this.alpha -= 255 * this.lifeReduction * 5;
        }
        if (this.lifespan <= 0) {
            this.lifespan = 0;
            LOST += 1;
            this.isDone = true;
            if (LOST >= 3) {
                controller.gameState = "GAMEOVER";
            }
        }
    }

    remove() {
        if (this.isDone) {
            let index = targets.indexOf(this);
            if (index > -1) {
                targets.splice(index, 1);
            }
        }
    }

    checkCollision(catcher) {
        let catcherLeft = catcher.centerPos - catcher.len / 2;
        let catcherRight = catcher.centerPos + catcher.len / 2;

        let targetLeft = this.pos - this.size / 2;
        let targetRight = this.pos + this.size / 2;

        if (catcherLeft <= targetLeft && catcherRight >= targetRight) {
            return true;
        } else {
            this.blink = false;
            return false;
        }
    }

    collision() {
        this.covering = this.checkCollision(catcher);
        if (this.covering == true) {
            this.coveredTime += 1;
            this.blink = true;
        } else {
            this.coveredTime = 0;
            this.alpha = 255;
        }

        if (this.coveredTime >= this.coverLimit) {
            this.isDone = true;
            SCORE++;
            if (SCORE >= LevelData[level].score) {
                level += 1;
                console.log("level:", level);
            }
        }
    }
}