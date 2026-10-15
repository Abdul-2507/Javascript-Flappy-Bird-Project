//GameEngine.js

//All objects using the game engine need
//x, y, w, h, speed, direction
//lk, rk, uk, dk for movement keys

function rectCollide(rect1, rect2) {
    if (rect1.x + rect1.w > rect2.x && rect1.x < rect2.x + rect2.w && rect1.y + rect1.h > rect2.y && rect1.y < rect2.y + rect2.h) {
        return true;
    } else {
        return false;
    } //if
} //rectCollide

class Pipe {
    constructor(x, y, w, h, top) {
        this.x = x;
        this.w = w + 20;
        this.h = h - 100;
        this.hitboxW = w;
        this.hitboxH = h;
        this.hitboxY = y;
        this.top = top;
        this.passed = false;
        this.dir = 1;

        if (this.top) {
            this.y = this.hitboxY - 35;
        } else {
            this.y = this.hitboxY + 135;
        } //if
    } //constructor

    display() {
        if (this.top) {
            push();
            scale(1, -1);
            image(pipe, this.x - 110, -(this.hitboxY + this.hitboxH), this.hitboxW + 250, this.hitboxH);
            pop();
        } else {
            image(pipe, this.x - 110, this.hitboxY, this.hitboxW + 250, this.hitboxH);
        } //if
    } //display

    move() {
        if (this.top) {
            this.y += this.dir * 0.4;
            this.hitboxY += this.dir * 0.4;

            if (this.y > -50) {
                this.dir = -1;
            } else if (this.y < -150) {
                this.dir = 1;
            } //if
        } else {
            this.y -= this.dir * 0.4;
            this.hitboxY -= this.dir * 0.4;

            if (this.y < 350) {
                this.dir = -1;
            } else if (this.y > 450) {
                this.dir = 1;
            } //if
        } //if
    } //move
} //Pipe

class Bird {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w + 20;
        this.h = h + 20;
        this.gravity = 0.2;
        this.yspeed = 0;
        this.angle = 0;
    } //constructor

    display() {
        push();
        translate(this.x + this.w / 2, this.y + this.h / 2);

        this.angle = map(this.yspeed, -6, 10, -30, 30);

        angleMode(DEGREES);
        rotate(this.angle);

        imageMode(CENTER);
        image(bird, 0, 0, this.w, this.h);

        pop();
        imageMode(CORNER);
    } //display

    move() {
        this.y += this.yspeed;
        this.yspeed += this.gravity;
    } //move

    jump() {
        this.yspeed = -6;

        if (levelNum === 5.5 || health <= 0) {
            return;
        } //if

        if (sound) {
            jumpSound.play();
        } //if
    } //jump
} //Bird

class Clouds {
    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w + 20;
        this.h = h + 20;
        this.type = type;
        this.xspeed = 0;
    } //constructor

    display() {
        tint(255, 150);

        if (this.type === 1) {
            image(cloud1, this.x, this.y, this.w, this.h);
        } else if (this.type === 2) {
            image(cloud2, this.x, this.y, this.w, this.h);
        } else if (this.type === 3) {
            image(cloud3, this.x, this.y, this.w, this.h);
        } //if

        tint(255);
    } //display

    move() {
        this.x += this.xspeed;
    } //move
} //Clouds