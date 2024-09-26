// todo
// 1. 从小的开始
// 2. life不要random
// 
// 
function updateTarget() {
    if (targets.length > 0) {
        for (let i = 0; i < targets.length; i++) {
            let t = targets[i];
            t.display();
            t.age();
            t.collision(catcher);
            t.disappear();
        }
    }
}


function generateTarget() {
    if (targets.length < 1) {
        if (random() < 0.05) {
            let target = new Target(random(2 * blockSize, length - 2 * blockSize))
                .set_lifeReduction(LevelData[level].TargetLifeReduction)
                .set_targetSize(LevelData[level].Targetsize);
            targets.push(target);
        }
    }

    else if (targets.length > 1 && targets.length < LevelData[level].maxNum_of_Target) {
        if (random() < LevelData[level].targetPossibility) {
            let target = new Target(random(2 * blockSize, length - 2 * blockSize))
                .set_lifeReduction(LevelData[level].TargetLifeReduction)
                .set_targetSize(LevelData[level].Targetsize);
            targets.push(target);
        }
    }
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
        this.coverLimit = 100;
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
        push();
        if (this.blink == false) {
            fill(0, 255, 255, this.alpha);
            ellipse(this.pos, blockSize / 2, this.size, blockSize);
        }
        // console.log(this.covering, this.blink)
        else if (this.blink && frameCount % 30 < 15) {
            fill(0, 255, 255, this.alpha);
            ellipse(this.pos, blockSize / 2, this.size, blockSize);
        }
        pop();
    }

    age() {
        this.lifespan -= this.lifeReduction;
        if (this.lifespan < 1 / 3) {
            this.alpha -= 255 * this.lifeReduction * 3;
        }
        if (this.lifespan <= 0) {
            this.lifespan = 0;
            this.isDone = true;
        }
    }

    disappear() {
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