class Player {
    constructor(x) {
        this.pos = x;
        this.vel = 0;
        this.acc = 0;
        this.damping = damping;
    }

    display() {
        push();
        stroke(255);
        strokeWeight(2);
        fill(200);
        ellipse(this.pos, blockSize / 2, blockSize, blockSize);
        pop();
    }

    update() {
        this.vel += this.acc;
        this.pos += this.vel;
        this.acc = 0;
        // damping
        this.vel *= this.damping;
    }

    applyForce(force) {
        this.acc += force;
    }
}