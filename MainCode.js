//MainCode.js

let timer = 0;
let levelNum = 1;
let player1;
let allPipes = [];
let allClouds = [];
let textX = 700;
let score = 0;
let level2 = false;
let level3 = false;
let level4 = false;
let sound = true;
let soundX = 20;
let soundY = 20;
let fade = 255;
let pipeDir = 1;
let level3Timer = 0;
let level4Timer = 0;
let health = 100;
let start = false;

function preload() {
    bird = loadImage("images/bird.png");
    pipe = loadImage("images/pipe.png");
    cloud1 = loadImage("images/cloud1.png");
    cloud2 = loadImage("images/cloud2.png");
    cloud3 = loadImage("images/cloud3.png");
    warning = loadImage("images/warning.png");
    asteroid = loadImage("images/asteroid.gif");
    soundOn = loadImage("images/soundOn.png");
    soundOff = loadImage("images/soundOff.png");
    evilBird = loadImage("images/evilBird.png");
    evilDeadBird = loadImage("images/evilDeadBird.png");
    bubble1 = loadImage("images/bubble1.png");
    bubble2 = loadImage("images/bubble2.png");
    sword = loadImage("images/sword.png");
    blueBird = loadImage("images/blueBird.png");
    pinkBird = loadImage("images/pinkBird.png");

    jumpSound = loadSound("sounds/jump.mp3");
    deathSound = loadSound("sounds/death.mp3");
    typeSound = loadSound("sounds/type.mp3");
    slashSound = loadSound("sounds/slash.mp3");
} //preload

function setup() {
    createCanvas(600, 600);

    //SKIP LEVELS (4 LEVELS)
    //levelNum = 4;
    //player1 = new Bird(40, 40, 40, 40);
} //setup

function draw() {
    if (levelNum <= 1.5) {
        levelOne();
    } else if (levelNum <= 2.5) {
        levelTwo();
    } else if (levelNum <= 3.5) {
        levelThree();
    } else if (levelNum <= 4.5) {
        levelFour();
    } else if (levelNum <= 5.5) {
        gameOver();
    } //if

    if (sound) {
        image(soundOn, soundX, soundY, 50, 40);
    } else {
        image(soundOff, soundX - 9, soundY - 2, 54, 44);
    } //if
} //draw

function keyPressed() {
    if (keyCode === 38 || keyCode === 87 || keyCode === 32) {
        player1.jump();
    } //if

    if (levelNum >= 5 && (key === 'r' || key === 'R')) {
        if (start) {
            levelNum = 4.5;
            player1 = new Bird(40, 40, 40, 40);
            player1.yspeed = 0;
            evilBirdX = 250;
            evilBirdY = 150;
            health = 100;
            asteroidX = 1600;
            roundNum = floor(random(1, 4));
            roundCount = 0;
            randomY1 = random(0, 100);
            randomY2 = random(180, 300);
            randomY3 = random(380, 520);
            evilBirdXSpeed = 6;
            evilBirdYSpeed = 1;
            playerXSpeed = 2;
            typeNum = 0;
            allPipes = [];
        } else if (level4) {
            levelNum = 4;
            player1 = new Bird(40, 40, 40, 40);
            player1.yspeed = 0;
        } else if (level3) {
            levelNum = 3;
            player1 = new Bird(40, 40, 40, 40);
            randomY1 = random(0, 200);
            randomY2 = random(300, 520);
            randomY3 = random(380, 520);
            player1.yspeed = 0;
        } else if (level2) {
            levelNum = 2;
            level2 = false;
            score = 0;
            player1 = new Bird(40, 40, 40, 40);
        } else {
            levelNum = 1;
            level2 = false;
            level3 = false;
            score = 0;
        } //if
    } //if
} //keyPressed

function mousePressed() {
    player1.jump();

    if (mouseX > soundX - 20 && mouseX < soundX + 50 && mouseY > soundY - 20 && mouseY < soundY + 50 && levelNum < 5.5) {
        sound = !sound;
    } //if
} //mousePressed

function levelOne() {
    if (levelNum === 1) {
        levelNum = 1.5;
        timer = 0;

        player1 = new Bird(40, 40, 40, 40);

        allPipes = [];
        for (let i = 0; i < 12; i++) {
            allPipes.push(new Pipe(random(400, 600) + (i * 400), random(250, 400), 20, 400, false));
        } //for

        for (let i = 0; i < 13; i++) {
            allPipes.push(new Pipe(random(700, 900) + (i * 400), random(-150, 0), 20, 400, true));
        } //for

        allClouds = [];
        allClouds.push(new Clouds(width + 100, random(20, 70), 100, 75, 1));
        allClouds.push(new Clouds(width + 300, random(20, 70), 100, 75, 2));
        allClouds.push(new Clouds(width + 500, random(20, 70), 100, 75, 3));
        allClouds.push(new Clouds(width + 700, random(20, 70), 100, 75, 2));
        allClouds.push(new Clouds(width + 900, random(20, 70), 100, 75, 3));
    } //if

    background(135, 205, 235);
    timer = millis() / 1000;

    if (timer < 14) {
        player1.y = 200;
        player1.yspeed = 0;

        textFont("Press Start 2P");
        textSize(25);
        textAlign(CENTER);
        text("WELCOME TO", textX, 110);
        text("REMASTERED", textX + 900, 140);

        fill(240, 220, 10);
        textSize(40);
        text("FLAPPY BIRD", textX + 900, 110);

        fill(0);
        textSize(20);
        textAlign(LEFT);
        text("TO JUMP: \nSPACEBAR \nMOUSE CLICK \nW KEY \nUP ARROW", textX + 1700, 110);
        textX -= 3.5;

        textAlign(CENTER);
    } else {
        for (let i = 0; i < allClouds.length; i++) {
            allClouds[i].display();
            allClouds[i].x -= 3;
            if (allClouds[i].x < -150) {
                allClouds[i].x = width + 200;
            } //if
        } //for

        for (let i = 0; i < allPipes.length; i++) {
            allPipes[i].display();
            allPipes[i].x -= 4;
        } //for

        for (let i = 0; i < allPipes.length; i++) {
            if (rectCollide(player1, allPipes[i])) {
                levelNum = 5;
                if (sound) {
                    deathSound.play();
                } //if
                return;
            } //if
        } //for

        if (player1.y < -60 || player1.y > 590) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        textSize(20);
        textAlign(CENTER);
        text("SCORE: " + score + "/25", 195, 50);

        for (let i = 0; i < allPipes.length; i++) {
            if (score > 24) {
                if (allPipes[allPipes.length - 1].x < -allPipes[allPipes.length - 1].w - 50) {
                    levelNum = 2;
                } //if
            } //if
        } //for
    } //if

    for (let i = 0; i < allPipes.length; i++) {
        if (player1.x > allPipes[i].x && !allPipes[i].passed) {
            score += 1;
            allPipes[i].passed = true;
        } //if
    } //for

    player1.display();
    player1.move();
} //levelOne

function levelTwo() {
    if (levelNum === 2) {
        levelNum = 2.5;
        level2 = true;
        pipeDir = 1;
        score = 0;
        speed = 2.5;

        fadeIn = true;

        allPipes = [];
        for (let i = 0; i < 10; i++) {
            allPipes.push(new Pipe(i * 80 + width, 400, 20, 400, false));
        } //for

        for (let i = 0; i < 10; i++) {
            allPipes.push(new Pipe(i * 80 + width, -200, 20, 400, true));
        } //for

        for (let i = 0; i < 8; i++) {
            allPipes.push(new Pipe(random(1700, 1900) + (i * 400), random(200, 450), 20, 400, false));
        } //for

        for (let i = 0; i < 7; i++) {
            allPipes.push(new Pipe(random(2400, 2600) + (i * 400), random(-200, 50), 20, 400, true));
        } //for
    } //if

    background(135, 205, 235);

    if (fadeIn && fade > 0) {
        fade -= 2.5;
    } //if

    fill(0, 0, 0, fade);
    textSize(30);
    textAlign(CENTER);
    text("LEVEL 2", width / 2, height / 2);

    for (let i = 0; i < allClouds.length; i++) {
        allClouds[i].display();
        allClouds[i].x -= 3;

        if (allClouds[i].x < -150) {
            allClouds[i].x = width + 200;
        } //if
    } //for

    if (fade <= 0) {
        for (let i = 0; i < allPipes.length; i++) {
            allPipes[i].display();
            allPipes[i].x -= 4;
            allPipes[i].move();
        } //for
    } //if

    for (let i = 0; i < allPipes.length; i++) {
        if (player1.x > allPipes[i].x && !allPipes[i].passed) {
            score += 1;
            allPipes[i].passed = true;
        } //if
    } //for

    for (let i = 0; i < allPipes.length; i++) {
        if (rectCollide(player1, allPipes[i])) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
            return;
        } //if
    } //for

    if (player1.y < -60 || player1.y > 590) {
        levelNum = 5;
        if (sound) {
            deathSound.play();
        } //if
    } //if

    if (score >= 20) {
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("SCORE: " + (score - 20) + "/15", 195, 50);
    } //if

    if (score >= 15 && allPipes[allPipes.length - 1] && allPipes[allPipes.length - 1].x < -200) {
        player1.x += speed;

        if (player1.x > width + 20) {
            player1.y = 200;
            allClouds = [];

            if (fadeIn) {
                background(135, 205, 235);
            } else {
                background(90, 55, 40);
            } //if

            if (fadeIn) {
                fade += 7;

                if (fade >= 400) {
                    fade = 400;
                    fadeIn = false;
                } //if
            } else {
                fade -= 3;

                if (fade <= 0) {
                    fade = 0;
                    player1.x = 40;
                    levelNum = 3;
                } //if
            } //if

            noStroke();
            fill(0, fade);
            rect(0, 0, width, height);

            fill(255, fade);
            textSize(30);
            textAlign(CENTER);
            text("LEVEL 3", width / 2, height / 2 - 10);

            textSize(15);
            text("THE CAVE", width / 2, height / 2 + 10);
        } //if
    } //if

    player1.display();
    player1.move();
} //levelTwo

function levelThree() {
    if (levelNum === 3) {
        levelNum = 3.5;
        level2 = false;
        level3 = true;
        level3Timer = millis();
        player1.x = -40;
        player1.y = 40;
        player1.yspeed = 0;
        randomY1 = random(0, 200);
        randomY2 = random(300, 520);
        randomY3 = random(380, 520);
        asteroidX = 600;
        round1 = true;
        round2 = false;
        round3 = false;
        round4 = false;
        round5 = false;

        allPipes = [];
    } //if

    background(90, 55, 40);

    if (player1.x <= 40) {
        player1.x += 1;
        player1.y = 40;
    } else {
        if (millis() - level3Timer < 4000) {
            image(warning, 500, randomY1, 75, 75);
            image(warning, 500, randomY2, 75, 75);
        } else {
            if (round1) {
                image(asteroid, asteroidX, randomY1 - 75, 250, 250);
                image(asteroid, asteroidX, randomY2 - 75, 250, 250);

                asteroidX -= 7;

                if (asteroidX < -400) {
                    round1 = false;
                    round2 = true;
                    asteroidX = 1600;

                    randomY1 = random(0, 100);
                    randomY2 = random(180, 300);
                    randomY3 = random(380, 520);
                } //if
            } else if (round2) {
                if (asteroidX > 600) {
                    image(warning, 500, randomY1, 75, 75);
                    image(warning, 500, randomY2, 75, 75);
                    image(warning, 500, randomY3, 75, 75);
                } //if

                image(asteroid, asteroidX, randomY1 - 75, 250, 250);
                image(asteroid, asteroidX, randomY2 - 75, 250, 250);
                image(asteroid, asteroidX, randomY3 - 75, 250, 250);

                asteroidX -= 7;

                if (asteroidX < -400) {
                    round2 = false;
                    round3 = true;
                    asteroidX = 1600;

                    randomY1 = random(0, 110);
                    randomY2 = random(280, 430);
                } //if
            } else if (round3) {
                if (asteroidX > 600) {
                    image(warning, 420, randomY1, 175, 175);
                    image(warning, 420, randomY2, 175, 175);
                } //if

                image(asteroid, asteroidX, randomY1 - 85, 400, 400);
                image(asteroid, asteroidX, randomY2 - 85, 400, 400);

                asteroidX -= 7;

                if (asteroidX < -400) {
                    round1 = false;
                    round2 = false;
                    round3 = false;
                    round4 = true;
                    asteroidX = 1600;

                    randomY1 = random(0, 100);
                    randomY2 = random(180, 300);
                    randomY3 = random(380, 520);
                } //if
            } else if (round4) {
                if (asteroidX > 600) {
                    image(warning, 500, randomY1, 75, 75);
                    image(warning, 500, randomY2, 75, 75);
                    image(warning, 500, randomY3, 75, 75);
                } //if

                image(asteroid, asteroidX, randomY1 - 75, 250, 250);
                image(asteroid, asteroidX, randomY2 - 75, 250, 250);
                image(asteroid, asteroidX, randomY3 - 75, 250, 250);

                asteroidX -= 7;

                if (asteroidX < -400) {
                    round4 = false;
                    round5 = true;
                    asteroidX = 1600;

                    randomY1 = random(0, 110);
                    randomY2 = random(280, 430);
                } //if
            } else if (round5) {
                if (asteroidX > 600) {
                    image(warning, 420, randomY1, 175, 175);
                    image(warning, 420, randomY2, 175, 175);
                } //if

                image(asteroid, asteroidX, randomY1 - 85, 400, 400);
                image(asteroid, asteroidX, randomY2 - 85, 400, 400);

                asteroidX -= 7;

                if (asteroidX < -400) {
                    round1 = false;
                    round2 = false;
                    round3 = false;
                    round4 = false;
                    round5 = false;
                } //if
            } //if
        } //if

        player1.move();
    } //if

    if (!round3 && !round5) {
        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 210 && player1.y + player1.h > randomY1 - 75 + 105 && player1.y < randomY1 - 75 + 140) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 210 && player1.y + player1.h > randomY2 - 75 + 105 && player1.y < randomY2 - 75 + 140) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 210 && player1.y + player1.h > randomY3 - 75 + 105 && player1.y < randomY3 - 75 + 140) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if
    } else {
        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 300 && player1.y + player1.h > randomY1 - 90 + 155 && player1.y < randomY1 - 10 + 160) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 300 && player1.y + player1.h > randomY2 - 90 + 155 && player1.y < randomY2 - 10 + 160) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if
    } //if

    if (player1.y < -60 || player1.y > 600) {
        levelNum = 5;
        if (sound) {
            deathSound.play();
        } //if
    } //if

    if (!round1 && !round2 && !round3 && !round4 && !round5) {
        levelNum = 4;
    } //if

    player1.display();
} //levelThree

function levelFour() {
    if (levelNum === 4) {
        levelNum = 4.5;
        level3 = false;
        level4 = true;
        start = false;
        level4Timer = millis();
        evilBirdX = 600;
        evilBirdY = 150;
        evilBirdXSpeed = 6;
        evilBirdYSpeed = 1;
        health = 100;
        roundCount = 0;
        typeNum = 0;
        asteroidX = 1600;
        randomY1 = random(0, 100);
        randomY2 = random(180, 300);
        randomY3 = random(380, 520);
        playerXSpeed = 2;
        fade = 255;
        rectFade = 0;
        textFade = 0;
        fadeSpeed = 2;
        fadeNum = 1;
    } //if

    background(90, 55, 40);

    if (fade > 0) {
        fade -= 2.5;
    } //if

    fill(0, 0, 0, fade);
    textSize(30);
    textAlign(CENTER);
    textFont("Press Start 2P");
    text("LEVEL 4", width / 2, height / 2);

    image(evilBird, evilBirdX, evilBirdY, 400, 300);

    if (millis() - level4Timer > 3500 && player1.y > 150 && player1.y < 350 && !start) {
        player1.yspeed = 0;

        if (millis() - level4Timer > 5000) {
            image(bubble1, player1.x + 50, player1.y - 110, 150, 150);
        } //if

        fill(0);
        textSize(21);

        if (millis() - level4Timer > 5500) {
            text("?", player1.x + 110, player1.y - 45);

            if (sound && typeNum === 0) {
                typeSound.play();
                typeNum = 1;
            } //if
        } //if

        if (millis() - level4Timer > 6000) {
            text("?", player1.x + 130, player1.y - 45);

            if (sound && typeNum === 1) {
                typeSound.play();
                typeNum = 2;
            } //if
        } //if

        if (millis() - level4Timer > 6500) {
            text("?", player1.x + 150, player1.y - 45);

            if (sound && typeNum === 2) {
                typeSound.play();
                typeNum = 3;
            } //if
        } //if

        if (millis() - level4Timer > 7500) {
            if (evilBirdX > 250) {
                evilBirdX -= 1.5;
            } //if
        } //if

        if (evilBirdX <= 250) {
            image(bubble2, 240, 60, 150, 150);

            if (millis() - level4Timer > 12500) {
                text("D", 290, 120);

                if (sound && typeNum === 3) {
                    typeSound.play();
                    typeNum = 4;
                } //if
            } //if

            if (millis() - level4Timer > 13000) {
                text("I", 310, 120);

                if (sound && typeNum === 4) {
                    typeSound.play();
                    typeNum = 5;
                } //if
            } //if

            if (millis() - level4Timer > 13500) {
                text("E", 330, 120);

                if (sound && typeNum === 5) {
                    typeSound.play();
                    typeNum = 6;
                } //if
            } //if

            if (millis() - level4Timer > 14000) {
                text("!", 345, 120);

                if (sound && typeNum === 6) {
                    typeSound.play();
                    typeNum = 7;
                } //if
            } //if
        } //if
    } //if

    if (millis() - level4Timer > 16000 && !start) {
        start = true;
        roundNum = floor(random(1, 4));
    } //if

    if (start) {
        image(evilBird, evilBirdX, evilBirdY, 400, 300);
        fill(0);
        textSize(20);
        text("BOSS HEALTH:", width / 2, 40)
        rect(100, 50, 400, 40);

        fill(255, 0, 0);

        if (health === 100) {
            rect(105, 55, 390, 30);
        } else if (health === 50) {
            rect(105, 55, 190, 30);
        } else {
            rect(105, 55, 0, 30);
        } //if

        if (roundNum === 1) {
            evilBirdY += evilBirdYSpeed;

            if (evilBirdX === 600 && evilBirdY === 150) {
                evilBirdXSpeed = 6;
                evilBirdYSpeed = 1;
            } //if

            if (evilBirdY > 300) {
                evilBirdY = 300;
            } //if

            if (evilBirdY === 300) {
                evilBirdX -= evilBirdXSpeed;
            } //if

            if (evilBirdX < -500) {
                roundCount++;
                evilBirdX = 250;
                evilBirdY = 150;
                asteroidX = 1600;
                allPipes = [];
                roundNum = floor(random(1, 4));
            } //if
        } else if (roundNum === 2) {
            if (asteroidX > 600) {
                image(warning, 210, randomY1, 75, 75);
                image(warning, 210, randomY2, 75, 75);
                image(warning, 210, randomY3, 75, 75);
            } //if

            image(asteroid, asteroidX, randomY1 - 75, 250, 250);
            image(asteroid, asteroidX, randomY2 - 75, 250, 250);
            image(asteroid, asteroidX, randomY3 - 75, 250, 250);

            asteroidX -= 7;

            if (asteroidX < -400) {
                roundCount++;
                asteroidX = 1600;
                evilBirdX = 250;
                evilBirdY = 150;
                allPipes = [];
                randomY1 = random(0, 100);
                randomY2 = random(180, 300);
                randomY3 = random(380, 520);
                roundNum = floor(random(1, 4));
            } //if
        } else if (roundNum === 3) {
            if (allPipes.length === 0) {
                for (let i = 0; i < 5; i++) {
                    allPipes.push(new Pipe(random(800, 1000) + (i * 400), random(250, 400), 20, 400, false));
                } //for

                for (let i = 0; i < 5; i++) {
                    allPipes.push(new Pipe(random(1100, 1300) + (i * 400), random(-150, 0), 20, 400, true));
                } //for
            } //if

            if (allPipes.length > 0 && allPipes[allPipes.length - 1].x < -allPipes[allPipes.length - 1].w - 50) {
                roundCount++;
                allPipes = [];
                evilBirdX = 250;
                evilBirdY = 150;
                asteroidX = 1600;
                roundNum = floor(random(1, 4));
            } //if
        } //if

        if (roundCount === 3 || roundCount === 7) {
            roundNum = 4;
        } //if

        if (roundNum === 4) {
            player1.x += playerXSpeed;
            image(sword, 450, 230, 100, 100);

            if (player1.y > 150 && player1.y < 350 && player1.x > 450) {
                if (sound) {
                    slashSound.play();
                } //if

                player1.x = 40;
                playerXSpeed = 2;
                health -= 50;
                allPipes = [];
                evilBirdX = 250;
                evilBirdY = 150;
                asteroidX = 1600;
                roundCount++;
                roundNum = floor(random(1, 4));
            } //if
        } //if

        if (health <= 0) {
            image(evilDeadBird, evilBirdX, evilBirdY, 400, 300);
            evilBirdX++;
            roundNum = 0;
            player1.yspeed = 0;
            player1.display();

            if (evilBirdX > width + 50) {
                fill(0, rectFade);
                rect(0, 0, width, height);
                rectFade += 2;

                if (fadeNum === 1) {
                    fill(255, textFade);
                    text("YOU HAVE DEFEATED \nTHE EVIL BIRD.", width / 2, 200);
                    textFade += fadeSpeed;

                    if (textFade > 400) {
                        fadeSpeed = -2;
                    } //if

                    tint(255, textFade);
                    image(evilDeadBird, width / 2 - 120, 300, 240, 150);

                    noTint();

                    if (textFade < -50 && fadeSpeed < 0) {
                        textFade = 0;
                        fadeNum = 2;
                        fadeSpeed = 2;
                    } //if
                } else if (fadeNum === 2) {
                    fill(255, textFade);
                    text("YOU BROUGHT YOUR \nFAMILY HOME SAFELY.", width / 2, 200);
                    textFade += fadeSpeed;

                    if (textFade > 400) {
                        fadeSpeed = -2;
                    } //if

                    tint(255, textFade);
                    image(bird, width / 2 + 50, 300, 100, 100);
                    image(bird, width / 2 - 20, 310, 80, 80);
                    image(pinkBird, width / 2 - 60, 320, 60, 60);
                    image(pinkBird, width / 2 - 100, 320, 60, 60);
                    image(blueBird, width / 2 - 130, 330, 35, 35);

                    noTint();

                    if (textFade < -50 && fadeSpeed < 0) {
                        textFade = 0;
                        fadeNum = 3;
                        fadeSpeed = 2;
                    } //if
                } else if (fadeNum === 3) {
                    fill(240, 220, 10, textFade);
                    textAlign(CENTER);
                    textSize(40);
                    text("YOU WIN!", width / 2, height / 2);
                    textFade += fadeSpeed;
                } //if
            } //if

            return;
        } //if
    } //if

    if (start) {
        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 210 && player1.y + player1.h > randomY1 - 75 + 105 && player1.y < randomY1 - 75 + 140) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 210 && player1.y + player1.h > randomY2 - 75 + 105 && player1.y < randomY2 - 75 + 140) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        if (player1.x + player1.w > asteroidX + 40 && player1.x < asteroidX + 210 && player1.y + player1.h > randomY3 - 75 + 105 && player1.y < randomY3 - 75 + 140) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if

        if (roundNum === 1 && player1.x + player1.w > evilBirdX + 40 && player1.x < evilBirdX + 340 && player1.y + player1.h > evilBirdY + 50 && player1.y < evilBirdY + 250
        ) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
        } //if
    } //if

    for (let i = 0; i < allPipes.length; i++) {
        allPipes[i].display();
        allPipes[i].x -= 4;
    } //for

    for (let i = 0; i < allPipes.length; i++) {
        if (rectCollide(player1, allPipes[i])) {
            levelNum = 5;
            if (sound) {
                deathSound.play();
            } //if
            return;
        } //if
    } //for

    if (player1.y < -60 || player1.y > 600 || player1.x > width + 50) {
        levelNum = 5;
        if (sound) {
            deathSound.play();
        } //if
    } //if

    if (levelNum < 5) {
        player1.display();
        player1.move();
    } //if
} //levelFour

function gameOver() {
    if (levelNum === 5) {
        levelNum = 5.5;
        player1.display();
    } //if

    fill(0);
    textSize(50)
    textFont("Press Start 2P");
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2 - 20);

    textSize(20);
    text("PRESS R TO RESTART", width / 2, height / 2 + 20);
    textAlign(LEFT);
} //GameOver