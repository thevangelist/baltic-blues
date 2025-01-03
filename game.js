// Canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const TANKER_IMAGE_WIDTH = 344,
      TANKER_IMAGE_HEIGHT = 52

let score = 0;
let gameFrame = 0;
let gameOver = false;
let warnings = 0;
const gameSpeed = 1;
ctx.font = '24px sans-serif'

const patrolsound = document.createElement('audio');
patrolsound.src = 'patrol.ogg';
const alarm1 = document.createElement('audio');
alarm1.src = 'alarm.ogg';
const alarm2 = document.createElement('audio');
alarm2.src = 'siren.mp3';
const winch1 = document.createElement('audio');
winch1.src = 'winch/2.wav'
const winch5 = document.createElement('audio');
winch5.src = 'winch/5.wav'
const winch8 = document.createElement('audio');
winch8.src = 'winch/8.wav'
const scrape7 = document.createElement('audio');
scrape7.src = 'scrapes/scrape-7.wav'
const ambient = document.createElement('audio');
ambient.src = 'ambient.wav'

// Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const targetPosition = {
  x: canvas.width / 2 - (TANKER_IMAGE_WIDTH/2),
  y: canvas.height / 1.5,
}

document.addEventListener('keydown', function(e) {
  event.preventDefault();
  // Less anchor chain
  if (e.key === 'ArrowUp') {
    tanker.chainLength = Math.max(0, tanker.chainLength - 2);
    winch8.play();
  }
  // More anchor chain
  if (e.key === 'ArrowDown') {
    tanker.chainLength = Math.min(tanker.chainLength + 7, tanker.chainLengthMax);
    winch1.play();
  }
  // Back
  if (e.key === 'ArrowLeft') {
    targetPosition.x -= 5;
  }
  // Forward
  if (e.key === 'ArrowRight') {
    targetPosition.x += 20;
  }
})

// Player
const tankerImage = new Image();
tankerImage.src = 'tanker-sprite-2.png';

class Tanker {
  constructor() {
    this.x = targetPosition.x;
    this.y = targetPosition.y;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = TANKER_IMAGE_WIDTH;
    this.spriteHeight = TANKER_IMAGE_HEIGHT;
    this.chainLength = 0;
    this.chainLengthMax = 400;
  }

  update() {
    const dx = this.x - targetPosition.x;
    const dy = this.y - targetPosition.y;
    if(targetPosition.x != this.x) {
      this.x -= dx/100;
    }
    if (targetPosition.y != this.y) {
      this.y -= dy/100;
    }
    if(gameFrame % 5 == 0) {
      if (1 > this.chainLength) {
        this.frameY = 0;
        this.frameX = 0;
      } else if (1 < this.chainLength && this.chainLength < 30) {
        this.frameY = 1;
        this.frameX = 0;
      } else if (31 < this.chainLength && this.chainLength < 170) {
        if (Math.random() <= 0.01) winch5.play()
        if (Math.random() <= 0.96) {
          this.frameY = 0;
          this.frameX = 1;
        } else {
          this.frameY = 0;
          this.frameX = 2;
        }
      } else { // Up to 400
        if (Math.random() <= 0.8) {
          this.frameY = 0;
          this.frameX = 2;
        } else {
          this.frameY = 1;
          this.frameX = 2;
        }
      }
      if(this.chainLength * randomBetween(0.8, 0.5) > hud.depth && (Math.random() <= randomBetween(0.11,0.1))) {
        scrape7.play()
        this.frameY = 1;
        this.frameX = 2;
      }
    }
  }
  draw() {
    ctx.drawImage(
        tankerImage,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.spriteWidth,
        this.spriteHeight
    );
  }
}

const tanker = new Tanker();
const background = new Image();
background.src = '1.png';

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
}

function createBackground() {
  BG.x1 -= gameSpeed;
  BG.x2 -= gameSpeed;

  if (BG.x1 < -BG.width) {
    BG.x1 = BG.x2 + BG.width; // Add new background when current moves out
  }
  if (BG.x2 < -BG.width) {
    BG.x2 = BG.x1 + BG.width; // Add new background when current moves out
  }

  // Draw the background images on both sides
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

// Patrols
const patrolsArray = [];
const patrolImage = new Image();
patrolImage.src = 'patrol.png';

class Patrol {
  constructor() {
    this.x = Math.random() * canvas.width + canvas.width;
    this.y = canvas.height / 1.4 + (Math.random() * 20 - 10),
    this.frameX = 0;
    this.frameY = 0;
    this.distance;
    this.frame = 0;
    this.spriteWidth = 52;
    this.spriteHeight = 52;
    this.sound = Math.random() <= 0.5 ? 'alarm1' : 'alarm1'
    this.speed = Math.random() * 0.1;
  }
  update() {
    this.age++;
    this.x -= this.speed; // Move upward
  }
  setSpeed(speed) {
    this.speed = speed
  }
  draw() {
    // - patrolImage: The image object for the patrol.
    // - this.frameX * this.spriteWidth: The x-coordinate of the source rectangle in the image.
    // - this.frameY * this.spriteHeight: The y-coordinate of the source rectangle in the image.
    // - this.spriteWidth: The width of the source rectangle in the image.
    // - this.spriteHeight: The height of the source rectangle in the image.
    // - this.x: The x-coordinate on the canvas where the image will be drawn.
    // - this.y: The y-coordinate on the canvas where the image will be drawn.
    // - this.spriteWidth: The width to draw the image on the canvas.
    // - this.spriteHeight: The height to draw the image on the canvas.
    ctx.drawImage(
      patrolImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}

function randomBetween(high, low) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function createPatrols() {
  if (gameFrame % randomBetween(6460, 50) === 0) {
    patrolsArray.push(new Patrol());
    console.log(`Patrol Ship Created! Total: ${patrolsArray.length}`);
  }
  for (let i = 0; i < patrolsArray.length; i++) {
    // alarm1.play()
    patrolsArray[i].update();
    patrolsArray[i].draw();
    if(patrolsArray[i].x > 200 && patrolsArray[i].x < 700) {
      patrolsArray[i].setSpeed(0.5)
      if(patrolsArray[i].x > 400 && patrolsArray[i].x < 550) {
        if(tanker.chainLength > randomBetween(100, 20)) {
          warnings++;
        }
        console.log(warnings)
        patrolsArray[i].setSpeed(0.3)
      }
    } else {
      patrolsArray[i].setSpeed(1)
    }
    if (patrolsArray[i].x < (0 - 52)) {
      score++;
      patrolsArray.splice(i, 1);
      i--;
    }
  }
}

function createTanker() {
  tanker.update();
  tanker.draw();
}

class Hud {
  constructor() {
    this.depth = Math.floor(randomBetween(470, 20));
  }
  update() {
    if(gameFrame % 300 == 0) {
      const oldDepth = this.depth;
      const newDepth = Math.floor((randomBetween(470, 20) + (oldDepth * 5)) / 6);
      this.depth = newDepth
    }
  }
}

const hud = new Hud()

function createHud() {
  hud.update();
}

function animate() {
  ambient.play();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createBackground();
  createHud();
  createTanker();
  createPatrols();
  gameFrame++;
  ctx.fillStyle = '#fff'
  ctx.fillText(`Anchor chain ${tanker.chainLength} m`, 10, 30)
  ctx.fillText(`Patrols avoided ${score}`, 10, 60)
  ctx.fillText(`Seabed depth ${hud.depth} m`, 10, 90)
  requestAnimationFrame(animate)
  if (warnings > 1000) {
    document.getElementById('gameOver').style.display = 'block';
    return
  }
}

animate();

document.getElementById('play').addEventListener('click', function() {
  document.getElementById('start').style.display = 'none';
  animate();
});

window.addEventListener('resize', function() {
  canvasPosition = canvas.getBoundingClientRect();
})