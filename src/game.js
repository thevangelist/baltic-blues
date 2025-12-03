import bgImg from './images/bg.png';
import patrolImg from './images/patrol.png';
import tankerSprite from './images/tanker-sprite-2.png';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;
canvas.width = DEFAULT_WIDTH;
canvas.height = DEFAULT_HEIGHT;

const TANKER_IMAGE_WIDTH = 344,
  TANKER_IMAGE_HEIGHT = 52

let score = 0;
let gameFrame = 0;
let warnings = 0;
const gameSpeed = 1;
let previousChainLength = 0;
let isPaused = false;
let detectionRisk = 0; // 0-100 scale for patrol detection risk
ctx.font = '24px sans-serif'

// Expose game state to window for cross-module access
window.gameState = {
  get isPaused() { return isPaused; },
  set isPaused(value) {
    isPaused = value;
    // Pause/resume all audio when game is paused
    if (isPaused) {
      pauseAllAudio();
    } else {
      resumeAllAudio();
    }
  }
};

// Audio control functions
function pauseAllAudio() {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach(audio => {
    if (!audio.paused) {
      audio.pause();
    }
  });
}

function resumeAllAudio() {
  // Only resume looping background audio, not one-shot sounds
  music.play().catch(() => { });
  wind1.play().catch(() => { });
  waves.play().catch(() => { });
  ship.play().catch(() => { });
}

// Audio elements map
const audioElements = {
  metal1: document.getElementById('metal1'),
  metal2: document.getElementById('metal2'),
  metal3: document.getElementById('metal3'),
  metal4: document.getElementById('metal4'),
  metal5: document.getElementById('metal5')
};

// All other audio elements
const music = document.getElementById('music');
const wind1 = document.getElementById('wind1');
const waves = document.getElementById('waves');
const ship = document.getElementById('ship');
const winch1 = document.getElementById('winch1');
const winch5 = document.getElementById('winch5');
const winch8 = document.getElementById('winch8');
const scrape7 = document.getElementById('scrape7');
const alarm1 = document.getElementById('alarm1');
const splash = document.getElementById('splash');
// Get metal sounds from audioElements for convenience
const metal1 = audioElements.metal1;
const metal2 = audioElements.metal2;
const metal3 = audioElements.metal3;
const metal4 = audioElements.metal4;
const metal5 = audioElements.metal5;

const targetPosition = {
  x: canvas.width / 2 - (TANKER_IMAGE_WIDTH / 2),
  y: canvas.height / 1.5,
}

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  // Reel anchor up - slower (harder to pull up)
  if (e.key === 'ArrowUp') {
    tanker.chainLength = Math.max(0, tanker.chainLength - 5);
    winch8.volume = 0.25;
    winch8.play().catch(() => { });
  }
  // Lower anchor - faster (easier to drop) - only if anchors remain
  if (e.key === 'ArrowDown' && hud.remainingAnchors > 0) {
    tanker.chainLength = Math.min(tanker.chainLength + 20, tanker.chainLengthMax);
    winch1.volume = 0.25;
    winch1.play().catch(() => { });
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
tankerImage.src = tankerSprite;

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
    this.chainLengthMax = 2000; // Increased to allow 4x depth (max depth ~470, so 4x ~1880)
  }

  update() {
    const dx = this.x - targetPosition.x;
    const dy = this.y - targetPosition.y;

    // Calculate speed reduction based on anchor dragging
    let speedMultiplier = 1.0; // Normal speed

    // EXTREME slowdown when dragging through a cable (5 seconds after cable cut)
    if (hud.lastCableCut && gameFrame - hud.lastCableTime < 300) {
      // Nearly stopped: 2-8% speed depending on cable difficulty
      const cableDifficulty = hud.lastCableCut.difficulty || 1;
      speedMultiplier = 0.02 + (cableDifficulty * 0.012); // Harder cables = slightly more resistance
    } else if (this.chainLength > 0) {
      // Anchor is deployed - boat slows down
      if (this.chainLength >= hud.depth) {
        // Anchor is touching/dragging on seabed - dramatic slowdown
        const dragAmount = this.chainLength - hud.depth;
        const maxDrag = hud.depth * 4; // Max optimal range
        const dragRatio = Math.min(dragAmount / maxDrag, 1.0);

        // Speed reduces dramatically: 30% speed when just touching, down to 5% at max drag
        speedMultiplier = 0.3 - (dragRatio * 0.25);
      } else {
        // Anchor deployed but not touching seabed - moderate slowdown based on chain length
        const deployRatio = Math.min(this.chainLength / hud.depth, 1.0);
        // Speed reduces from 100% to 50% as anchor gets closer to seabed
        speedMultiplier = 1.0 - (deployRatio * 0.5);
      }
    }

    // Apply speed with drag resistance
    const effectiveSpeed = 100 / speedMultiplier;
    if (targetPosition.x != this.x) {
      this.x -= dx / effectiveSpeed;
    }
    if (targetPosition.y != this.y) {
      this.y -= dy / effectiveSpeed;
    }
    if (gameFrame % 5 == 0) {
      // Dynamic animation based on chain length relative to optimal range
      const minOptimal = hud.depth * 2;
      const maxOptimal = hud.depth * 4;
      const inSweetSpot = this.chainLength >= minOptimal && this.chainLength <= maxOptimal;

      if (this.chainLength < 10) {
        // No anchor deployed
        this.frameY = 0;
        this.frameX = 0;
      } else if (this.chainLength < minOptimal * 0.5) {
        // Light deployment (< half of min optimal)
        this.frameY = 1;
        this.frameX = 0;
      } else if (!inSweetSpot) {
        // Moderate deployment (approaching or past sweet spot)
        if (Math.random() <= 0.01) winch5.play().catch(() => { })
        if (Math.random() <= 0.96) {
          this.frameY = 0;
          this.frameX = 1;
        } else {
          this.frameY = 0;
          this.frameX = 2;
        }
      } else {
        // In sweet spot (2x-4x depth)
        if (Math.random() <= 0.8) {
          this.frameY = 0;
          this.frameX = 2;
        } else {
          this.frameY = 1;
          this.frameX = 2;
        }
      }

      // Scraping and creaking sounds when anchor is dragging on seabed
      if (this.chainLength >= hud.depth) {
        const dragAmount = this.chainLength - hud.depth;
        const maxDrag = hud.depth * 4;
        const dragRatio = Math.min(dragAmount / maxDrag, 1.0);

        // More frequent sounds the more you drag: 5% base, up to 25% at max drag
        const soundChance = 0.05 + (dragRatio * 0.20);

        if (Math.random() <= soundChance) {
          // Random metal creaking sounds
          const metalSounds = [metal1, metal2, metal3, metal4, metal5];
          const randomMetal = metalSounds[Math.floor(Math.random() * metalSounds.length)];
          randomMetal.volume = 0.08 + (dragRatio * 0.12); // Louder with more drag
          randomMetal.play().catch(() => { });

          this.frameY = 1;
          this.frameX = 2;
        }

        // Scraping sound at optimal dragging depth
        if (hud.isAnchorDown && (Math.random() <= 0.08)) {
          scrape7.volume = 0.12 + (dragRatio * 0.08);
          scrape7.play().catch(() => { });
        }
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
background.src = bgImg;

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
patrolImage.src = patrolImg

class Patrol {
  constructor() {
    // Spawn patrols off-screen to the right with some randomness
    this.x = canvas.width + Math.random() * canvas.width * 0.5;
    // Y position varies slightly for visual interest
    this.y = canvas.height / 1.4 + (Math.random() * 40 - 20);
    this.frameX = 0;
    this.frameY = 0;
    this.distance;
    this.frame = 0;
    this.spriteWidth = 52;
    this.spriteHeight = 52;
    this.sound = Math.random() <= 0.5 ? 'alarm1' : 'alarm2';
    this.speed = 0.3 + Math.random() * 0.4; // Initial speed 0.3-0.7
  }
  update() {
    this.age++;
    this.x -= this.speed; // Move upward
  }
  setSpeed(speed) {
    this.speed = speed
  }
  draw() {
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

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Particle system for water splash effects
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2; // Small horizontal velocity
    this.vy = (Math.random() * -2) - 0.5; // Small upward velocity
    this.gravity = 0.15;
    this.life = 1.0;
    this.decay = 0.05; // Faster fade for brief splash
    this.size = Math.random() * 1.5 + 1; // Very small particles (1-2.5px)
    this.color = `rgba(255, 255, 255, ${this.life})`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= this.decay;
    const alpha = this.life * 0.6;
    this.color = `rgba(220, 240, 255, ${alpha})`;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}

const particlesArray = [];

function createSplashParticles(x, y, count = 15) {
  for (let i = 0; i < count; i++) {
    particlesArray.push(new Particle(x, y));
  }
}

function updateParticles() {
  for (let i = particlesArray.length - 1; i >= 0; i--) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].isDead()) {
      particlesArray.splice(i, 1);
    }
  }
}

function createPatrols() {
  // Don't spawn patrols for the first 90 seconds (5400 frames) to give player time to learn
  const minimumStartDelay = 5400; // 90 seconds at 60 FPS

  // Spawn patrols very rarely: every 200-600 seconds / 3.3-10 minutes (at 60 FPS)
  if (gameFrame > minimumStartDelay && gameFrame % randomBetween(12000, 36000) === 0) {
    patrolsArray.push(new Patrol());
  }

  // Calculate detection risk ONLY if anchor is down
  detectionRisk = 0;

  for (let i = 0; i < patrolsArray.length; i++) {
    // alarm1.play()
    patrolsArray[i].update();
    patrolsArray[i].draw();
    if (patrolsArray[i].x > 200 && patrolsArray[i].x < 700) {
      patrolsArray[i].setSpeed(0.5)

      // Only calculate risk if anchor is down
      if (tanker.chainLength > 0) {
        const distance = Math.abs(patrolsArray[i].x - (tanker.x + TANKER_IMAGE_WIDTH / 2));
        if (distance < 400) {
          // Exponential decay: risk drops off quickly with distance
          // At distance 0: 100%, at 200: ~14%, at 400: ~2%
          const proximityRisk = 100 * Math.exp(-distance / 100);
          detectionRisk = Math.max(detectionRisk, proximityRisk);
        }
      }

      if (patrolsArray[i].x > 400 && patrolsArray[i].x < 550) {
        if (tanker.chainLength != 0) {
          // Accumulate warnings faster when in critical detection zone
          warnings += 2;
          detectionRisk = Math.max(detectionRisk, 85); // Very high risk in detection zone with anchor down
        }
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

  // Anchor position at the front right of the ship
  const anchorX = tanker.x + (TANKER_IMAGE_WIDTH * 0.9); // Front right edge
  const anchorY = tanker.y + TANKER_IMAGE_HEIGHT; // At ship's bottom edge

  // Play warning alarm when entering critical depth (5x)
  // Actual anchor loss is handled by Hud.update()
  const anchorLossThreshold = hud.depth * 5;
  if (tanker.chainLength >= anchorLossThreshold) {
    if (previousChainLength < anchorLossThreshold) {
      // First time crossing threshold - play alarm
      alarm1.volume = 0.3;
      alarm1.play().catch(() => { });
    }
  }

  // Check if anchor was just lost (from Hud.update())
  if (hud.anchorLost && gameFrame === hud.anchorLostTime) {
    createSplashParticles(anchorX, anchorY, 25); // Big splash
    splash.volume = 0.3;
    splash.play().catch(() => { });
    // Add detection risk penalty
    detectionRisk = Math.min(100, detectionRisk + 20);
  }

  // Trigger small splash when anchor first deploys (0 -> 10+)
  if (tanker.chainLength >= 10 && previousChainLength === 0) {
    createSplashParticles(anchorX, anchorY, 10);
    splash.volume = 0.1;
    splash.play().catch(() => { });
  }

  // Trigger splash when anchor is raised (10+ -> 0)
  // More particles if raising from deep deployment
  if (tanker.chainLength === 0 && previousChainLength >= 10) {
    const particleCount = Math.min(15, 8 + Math.floor(previousChainLength / 100));
    createSplashParticles(anchorX, anchorY, particleCount);
    splash.volume = Math.min(0.2, 0.1 + previousChainLength / 5000);
    splash.play().catch(() => { });
  }

  previousChainLength = tanker.chainLength;
}

// Cable type definitions with gameplay properties
const CABLE_TYPES = {
  SCRAP: {
    name: 'Old Scrap Cable',
    color: '#8b8b7a',
    difficulty: 1,
    reward: 1,
    risk: 1,
    rarity: 0.35, // 35% chance
    riskIncrease: 0,
  },
  RESEARCH: {
    name: 'Research Sensor Cable',
    color: '#5a8ca8',
    difficulty: 1,
    reward: 2,
    risk: 1,
    rarity: 0.30, // 30% chance
    riskIncrease: 5,
  },
  FIBER: {
    name: 'Fiber Data Cable',
    color: '#a8f088',
    difficulty: 3,
    reward: 4,
    risk: 3,
    rarity: 0.25, // 25% chance
    riskIncrease: 15,
  },
  MILITARY: {
    name: 'Military Surveillance Line',
    color: '#ff6b7a',
    difficulty: 5,
    reward: 4,
    risk: 5,
    rarity: 0.06, // 6% chance
    riskIncrease: 40,
  },
  HVDC: {
    name: 'HVDC Power Cable',
    color: '#ffa940',
    difficulty: 5,
    reward: 5,
    risk: 5,
    rarity: 0.04, // 4% chance
    riskIncrease: 35,
  },
};

class Hud {
  constructor() {
    this.depth = Math.floor(this.generateRealisticDepth());
    this.isAnchorDown = false;
    this.draggedInMeters = 0;
    this.cablesCut = 0; // Total cables severed
    this.cablesByType = { // Track by type
      SCRAP: 0,
      RESEARCH: 0,
      FIBER: 0,
      MILITARY: 0,
      HVDC: 0,
    };
    this.lastCableCut = null; // Store last cable cut info
    this.lastCableTime = 0; // When last cable was cut
    this.depthHistory = []; // Track past depths for graph
    this.futureDepths = []; // Track upcoming depths for graph
    this.maxHistoryLength = 30; // Keep 30 past readings (50% of graph)
    this.maxFutureLength = 30; // Keep 30 future readings (50% of graph)
    this.depthTrend = 0; // Tracks if we're in shallow basin or approaching deep depression
    this.optimalCenterDepth = 3.0; // Center of optimal range (varies between 2.5-3.5)
    this.optimalVariance = 0.3; // ±0.3 around center
    this.remainingAnchors = 2; // Ship has 2 anchors total
    this.anchorLost = false; // Track if anchor was just lost
    this.anchorLostTime = 0; // When anchor was lost
    this.anchorLossReason = ''; // Track reason: 'cable' or 'depth'
    this.anchorDangerStartTime = 0; // Track when anchor entered danger zone
    this.missionSuccess = false; // Track if mission succeeded
    this.successTime = 0; // When mission was completed

    // Pre-generate initial future depths
    this.generateFutureDepths();
  }

  // Select random cable type based on rarity
  selectCableType() {
    const roll = Math.random();
    let cumulative = 0;

    for (const [key, cable] of Object.entries(CABLE_TYPES)) {
      cumulative += cable.rarity;
      if (roll < cumulative) {
        return { type: key, ...cable };
      }
    }
    return { type: 'SCRAP', ...CABLE_TYPES.SCRAP };
  }

  // Generate future depth predictions
  generateFutureDepths() {
    this.futureDepths = [];
    let lastDepth = this.depth;

    for (let i = 0; i < this.maxFutureLength; i++) {
      // Use same gradual depth generation with smoothing
      if (Math.random() < 0.90) {
        // Very smooth transition (90% of the time)
        const targetDepth = this.generateRealisticDepth();
        lastDepth = Math.floor(lastDepth * 0.92 + targetDepth * 0.08);
      } else if (Math.random() < 0.97) {
        // Moderate change (7% of the time)
        const targetDepth = this.generateRealisticDepth();
        lastDepth = Math.floor(lastDepth * 0.75 + targetDepth * 0.25);
      } else {
        // Sudden change (3% of the time)
        lastDepth = Math.floor(this.generateRealisticDepth());
      }
      this.futureDepths.push(lastDepth);
    }
  }

  // Update optimal depth with variance (simulates cable depth variations)
  updateOptimalDepth() {
    // Slowly vary the optimal depth between 2.5-3.5x
    this.optimalCenterDepth += (Math.random() - 0.5) * 0.05; // Small random walk
    // Clamp between 2.5 and 3.5
    this.optimalCenterDepth = Math.max(2.5, Math.min(3.5, this.optimalCenterDepth));
  }

  // Generate realistic Baltic Sea depth with varied terrain
  generateRealisticDepth() {
    const rand = Math.random();

    // 70% shallow basin (20-80m) - typical Baltic Sea
    if (rand < 0.70) {
      return randomBetween(20, 80);
    }
    // 20% moderate depth (80-150m) - sloping areas
    else if (rand < 0.90) {
      return randomBetween(80, 150);
    }
    // 8% deep depressions (150-300m) - glacial features
    else if (rand < 0.98) {
      return randomBetween(150, 300);
    }
    // 2% very deep (300-459m) - Landsort Deep-like trenches
    else {
      return randomBetween(300, 459);
    }
  }

  update() {
    // Less frequent depth changes: every 600 frames (10 seconds at 60 FPS)
    if (gameFrame % 600 == 0) {
      // Move current depth to history
      this.depthHistory.push(this.depth);
      if (this.depthHistory.length > this.maxHistoryLength) {
        this.depthHistory.shift(); // Remove oldest
      }

      // Move first future depth to current
      if (this.futureDepths.length > 0) {
        this.depth = this.futureDepths.shift();
      }

      // Generate one new future depth to maintain the array
      if (this.futureDepths.length > 0) {
        const lastFuture = this.futureDepths[this.futureDepths.length - 1];
        let newFutureDepth;

        // Much more gradual depth transitions
        if (Math.random() < 0.90) {
          // Very smooth transition (90% of the time)
          const targetDepth = this.generateRealisticDepth();
          newFutureDepth = Math.floor(lastFuture * 0.92 + targetDepth * 0.08);
        } else if (Math.random() < 0.97) {
          // Moderate change (7% of the time)
          const targetDepth = this.generateRealisticDepth();
          newFutureDepth = Math.floor(lastFuture * 0.75 + targetDepth * 0.25);
        } else {
          // Sudden change (3% of the time)
          newFutureDepth = Math.floor(this.generateRealisticDepth());
        }

        this.futureDepths.push(newFutureDepth);
      }

      // Update optimal cable depth variance
      this.updateOptimalDepth();
    }

    if (gameFrame % 30 == 0) {
      // Dynamic optimal range: center ±variance (e.g., 3.0 ±0.3 = 2.7-3.3x depth)
      const minOptimal = this.depth * (this.optimalCenterDepth - this.optimalVariance);
      const maxOptimal = this.depth * (this.optimalCenterDepth + this.optimalVariance);
      const perfectOptimal = this.depth * this.optimalCenterDepth; // Best depth (e.g., 3.0x)

      // Check if anchor is deployed deep enough to drag (min optimal or deeper)
      const anchorLossThreshold = this.depth * 5; // Critical depth
      const dangerZoneEnd = maxOptimal * 1.5;
      const inDangerZone = tanker.chainLength > maxOptimal && tanker.chainLength <= dangerZoneEnd;
      const inCriticalZone = tanker.chainLength >= anchorLossThreshold;

      // Allow cable cutting at any depth >= minOptimal (including danger zone)
      this.isAnchorDown = (tanker.chainLength >= minOptimal && !inCriticalZone);

      if (this.isAnchorDown) {
        this.draggedInMeters += 10;

        // Cable encounter probability based on how close to perfect depth
        const depthDiff = Math.abs(tanker.chainLength - perfectOptimal);
        const maxDiff = perfectOptimal * this.optimalVariance;

        // Probability calculation
        let encounterChance;
        if (tanker.chainLength <= maxOptimal) {
          // GREEN ZONE: 1.0 at perfect depth, decreases to 0.3 at edges
          encounterChance = 1.0 - (depthDiff / maxDiff) * 0.7;
        } else if (inDangerZone) {
          // DANGER ZONE (too deep): reduced efficiency (0.15 - 0.05)
          const dangerDepth = (tanker.chainLength - maxOptimal) / (dangerZoneEnd - maxOptimal);
          encounterChance = 0.15 - (dangerDepth * 0.10);
        } else {
          encounterChance = 0.05; // Very low outside zones
        }

        // Extremely rare: 0.15% base chance per check
        if (Math.random() < encounterChance * 0.0015) {
          // Select cable type
          const cable = this.selectCableType();

          // Difficulty check: harder cables need better depth accuracy
          const difficultyThreshold = 1.0 - (cable.difficulty * 0.15); // Difficulty 5 = 0.25 threshold
          const passedCheck = encounterChance >= difficultyThreshold;

          if (passedCheck) {
            this.cablesCut++;
            this.cablesByType[cable.type]++;
            this.lastCableCut = cable;
            this.lastCableTime = gameFrame;

            // WIN CONDITION: Successfully cutting MILITARY or HVDC cable wins the mission!
            if (cable.type === 'MILITARY' || cable.type === 'HVDC') {
              this.missionSuccess = true;
              this.successTime = gameFrame;
            }

            // Increase detection risk based on cable type
            detectionRisk = Math.min(100, detectionRisk + cable.riskIncrease);

            // Risk of losing anchor when cutting cable (higher for harder cables)
            // SCRAP: 5%, RESEARCH: 10%, FIBER: 25%, MILITARY: 40%, HVDC: 50%
            const anchorLossChance = cable.difficulty * 0.10;
            if (Math.random() < anchorLossChance && this.remainingAnchors > 0) {
              this.remainingAnchors--;
              this.anchorLost = true;
              this.anchorLostTime = gameFrame;
              this.anchorLossReason = 'cable'; // Lost due to cable cutting
              tanker.chainLength = 0; // Anchor is lost, chain goes to zero

              // Play alarm sound
              alarm1.volume = 0.3;
              alarm1.play().catch(() => { });

              console.log(`Anchor lost from cable! Remaining: ${this.remainingAnchors}`);
            }

            // Play appropriate sound based on cable reward
            if (cable.reward >= 4) {
              // High value cables - louder, more distinct sound
              metal3.volume = 0.25;
              metal3.play().catch(() => { });
              setTimeout(() => {
                metal4.volume = 0.2;
                metal4.play().catch(() => { });
              }, 100);
            } else if (cable.reward >= 2) {
              // Medium value
              metal3.volume = 0.15;
              metal3.play().catch(() => { });
            } else {
              // Low value - subtle sound
              metal1.volume = 0.1;
              metal1.play().catch(() => { });
            }
          }
        }
      }

      // Check if anchor is in critical danger zone (>5x depth) for too long
      // (anchorLossThreshold already defined above in cable cutting logic)
      if (tanker.chainLength >= this.depth * 5) {
        // Anchor is critically deep
        if (this.anchorDangerStartTime === 0) {
          // Just entered danger zone
          this.anchorDangerStartTime = gameFrame;
        } else if (gameFrame - this.anchorDangerStartTime > 300 && this.remainingAnchors > 0) {
          // Been in danger zone for 5 seconds (300 frames) - lose anchor!
          this.remainingAnchors--;
          this.anchorLost = true;
          this.anchorLostTime = gameFrame;
          this.anchorLossReason = 'depth'; // Lost due to being too deep
          tanker.chainLength = 0; // Anchor is lost
          this.anchorDangerStartTime = 0; // Reset timer

          // Play alarm sound
          alarm1.volume = 0.3;
          alarm1.play().catch(() => { });

          console.log(`Anchor lost from depth! Remaining: ${this.remainingAnchors}`);
        }
      } else {
        // Not in danger zone, reset timer
        this.anchorDangerStartTime = 0;
      }
    }
  }
}

const hud = new Hud()

function createHud() {
  hud.update();
}

function drawHUD() {
  // Set up HUD styling
  ctx.save();

  // Cable cut notification banner (center top)
  if (hud.lastCableCut && gameFrame - hud.lastCableTime < 1800) { // Show for 30 seconds
    const elapsed = gameFrame - hud.lastCableTime;
    const opacity = elapsed < 1740 ? 1.0 : (1800 - elapsed) / 60; // Fade out in last 1s

    const bannerWidth = 400;
    const bannerHeight = 70;
    const bannerX = (canvas.width - bannerWidth) / 2;
    const bannerY = 20;

    // Background
    ctx.globalAlpha = opacity * 0.95;
    ctx.fillStyle = 'rgba(10, 26, 36, 0.95)';
    ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Border with cable color
    ctx.strokeStyle = hud.lastCableCut.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Title
    ctx.fillStyle = '#a8f088';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚓ CABLE DAMAGED', bannerX + bannerWidth / 2, bannerY + 20);

    // Cable type name
    ctx.fillStyle = hud.lastCableCut.color;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(hud.lastCableCut.name.toUpperCase(), bannerX + bannerWidth / 2, bannerY + 42);

    // Stats (Reward & Risk)
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    const rewardStars = '★'.repeat(hud.lastCableCut.reward);
    const riskLevel = hud.lastCableCut.risk >= 4 ? 'HIGH RISK' : hud.lastCableCut.risk >= 3 ? 'MEDIUM' : 'LOW RISK';
    ctx.fillText(`Value: ${rewardStars} | ${riskLevel}`, bannerX + bannerWidth / 2, bannerY + 60);

    ctx.globalAlpha = 1.0;
    ctx.textAlign = 'left';
  }

  // Anchor lost notification banner (center top, below cable notification)
  if (hud.anchorLost && gameFrame - hud.anchorLostTime < 1800) { // Show for 30 seconds
    const elapsed = gameFrame - hud.anchorLostTime;
    const opacity = elapsed < 1740 ? 1.0 : (1800 - elapsed) / 60; // Fade out in last 1s

    const bannerWidth = 450;
    const bannerHeight = 80;
    const bannerX = (canvas.width - bannerWidth) / 2;
    const bannerY = 100; // Below cable notification

    // Background
    ctx.globalAlpha = opacity * 0.95;
    ctx.fillStyle = 'rgba(139, 0, 0, 0.95)'; // Dark red background
    ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Border
    ctx.strokeStyle = '#ff6b7a';
    ctx.lineWidth = 3;
    ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Warning icon and title
    ctx.fillStyle = '#ff6b7a';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠ ANCHOR LOST! ⚠', bannerX + bannerWidth / 2, bannerY + 25);

    // Message (different based on loss reason)
    ctx.fillStyle = '#e8e8d8';
    ctx.font = 'bold 14px sans-serif';
    const lossMessage = hud.anchorLossReason === 'cable'
      ? 'Cable was too strong!'
      : 'Anchor stayed too deep!';
    ctx.fillText(lossMessage, bannerX + bannerWidth / 2, bannerY + 48);

    // Remaining anchors
    ctx.font = '12px sans-serif';
    const anchorText = hud.remainingAnchors > 0
      ? `${hud.remainingAnchors} anchor${hud.remainingAnchors === 1 ? '' : 's'} remaining`
      : 'NO ANCHORS LEFT - MISSION FAILED!';
    ctx.fillStyle = hud.remainingAnchors > 0 ? '#fffa80' : '#ff6b7a';
    ctx.fillText(anchorText, bannerX + bannerWidth / 2, bannerY + 68);

    ctx.globalAlpha = 1.0;
    ctx.textAlign = 'left';
  }

  // Mission success notification banner (center, prominent)
  if (hud.missionSuccess && gameFrame - hud.successTime < 3600) { // Show for 60 seconds
    const elapsed = gameFrame - hud.successTime;
    const opacity = elapsed < 3540 ? 1.0 : (3600 - elapsed) / 60; // Fade out in last 1s

    const bannerWidth = 500;
    const bannerHeight = 100;
    const bannerX = (canvas.width - bannerWidth) / 2;
    const bannerY = 190; // Center of screen

    // Background with green glow
    ctx.globalAlpha = opacity * 0.98;
    ctx.fillStyle = 'rgba(42, 133, 149, 0.98)'; // Teal/cyan background
    ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Border
    ctx.strokeStyle = '#a8f088';
    ctx.lineWidth = 4;
    ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Success icon and title
    ctx.fillStyle = '#a8f088';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ MISSION SUCCESS! ★', bannerX + bannerWidth / 2, bannerY + 30);

    // Cable name
    ctx.fillStyle = hud.lastCableCut.color;
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(hud.lastCableCut.name.toUpperCase() + ' SEVERED', bannerX + bannerWidth / 2, bannerY + 56);

    // Message
    ctx.fillStyle = '#e8e8d8';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Critical infrastructure disrupted!', bannerX + bannerWidth / 2, bannerY + 80);

    ctx.globalAlpha = 1.0;
    ctx.textAlign = 'left';
  }

  // Left side - Mission stats (simplified)
  const leftX = 20;
  // Use dynamic optimal range
  const minOptimal = Math.floor(hud.depth * (hud.optimalCenterDepth - hud.optimalVariance));
  const maxOptimal = Math.floor(hud.depth * (hud.optimalCenterDepth + hud.optimalVariance));
  const anchorInSweetSpot = hud.isAnchorDown;

  // Danger zone calculations (shared across HUD elements)
  const anchorLossThreshold = hud.depth * 5;
  const dangerZoneEnd = hud.depth * 7; // Red zone extends to bottom of gauge
  const inDangerZone = tanker.chainLength > maxOptimal && tanker.chainLength <= dangerZoneEnd;

  // Display remaining anchors prominently
  ctx.fillStyle = '#e8e8d8';
  ctx.font = 'bold 14px sans-serif';
  const anchorDisplay = '⚓'.repeat(hud.remainingAnchors) + '✗'.repeat(2 - hud.remainingAnchors);
  ctx.fillText(`Anchors: ${anchorDisplay} | Cables: ${hud.cablesCut}`, leftX, 30);

  // Debug: Log anchor count when it changes
  if (gameFrame % 60 === 0) {
    console.log(`Frame ${gameFrame}: Anchors remaining = ${hud.remainingAnchors}, Display = ${anchorDisplay}`);
  }

  // Anchor status with proper states

  ctx.font = 'bold 15px sans-serif';

  if (tanker.chainLength >= anchorLossThreshold) {
    // State 6: Critical danger - anchor too deep, about to be lost
    ctx.fillStyle = '#ff6b7a';
    ctx.fillText(`⚠ ANCHOR DANGER`, leftX, 60);
    ctx.font = '12px sans-serif';

    // Show countdown timer if in danger zone
    if (hud.anchorDangerStartTime > 0) {
      const timeInDanger = gameFrame - hud.anchorDangerStartTime;
      const timeRemaining = Math.max(0, 300 - timeInDanger);
      const secondsRemaining = Math.ceil(timeRemaining / 60);
      ctx.fillText(`ANCHOR LOST IN ${secondsRemaining}s!`, leftX, 80);
    } else {
      ctx.fillText(`TOO DEEP! Reel up now!`, leftX, 80);
    }
  } else if (inDangerZone) {
    // State 5: Red zone - too deep, reduced cable cutting efficiency
    ctx.fillStyle = '#ffa940';
    ctx.fillText(`⚠ TOO DEEP`, leftX, 60);
    ctx.font = '12px sans-serif';
    ctx.fillText(`Low efficiency - optimal: ${minOptimal}-${maxOptimal}m`, leftX, 80);
  } else if (tanker.chainLength === 0) {
    // State 1: Anchor up - not deployed
    ctx.fillStyle = '#5a8ca8';
    ctx.fillText(`ANCHOR UP`, leftX, 60);
    ctx.font = '12px sans-serif';
    ctx.fillText(`Deploy to drag seabed`, leftX, 80);
  } else if (tanker.chainLength < hud.depth) {
    // State 2: Anchor lowered - deployed but not touching seabed
    ctx.fillStyle = '#5a8ca8';
    ctx.fillText(`ANCHOR LOWERED`, leftX, 60);
    ctx.font = '12px sans-serif';
    ctx.fillText(`Need ${hud.depth - tanker.chainLength}m more`, leftX, 80);
  } else if (anchorInSweetSpot) {
    // State 4: Dragging at optimal depth (green zone)
    ctx.fillStyle = '#a8f088';
    ctx.fillText(`⚓ DRAGGING`, leftX, 60);
    ctx.font = '13px sans-serif';
    ctx.fillText(`${hud.cablesCut} cables | ${(hud.draggedInMeters / 1000).toFixed(1)}km`, leftX, 80);
  } else {
    // State 3: Dragging - touching seabed but not in optimal range
    ctx.fillStyle = '#fffa80';
    ctx.fillText(`⚠ DRAGGING`, leftX, 60);
    ctx.font = '12px sans-serif';
    ctx.fillText(`Target: ${minOptimal}-${maxOptimal}m`, leftX, 80);
  }

  // Right side - Detection risk meter
  const meterWidth = 180;
  const meterHeight = 24;
  const meterX = canvas.width - meterWidth - 20;
  const meterY = 20;

  // Detection Risk Label
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#e8e8d8';
  ctx.fillText('DETECTION', meterX, meterY - 6);

  // Meter background
  ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
  ctx.fillRect(meterX, meterY, meterWidth, meterHeight);

  // Risk bar color based on level
  let riskColor;
  if (detectionRisk < 30) {
    riskColor = '#a8f088'; // Green - safe
  } else if (detectionRisk < 60) {
    riskColor = '#fffa80'; // Yellow - caution
  } else {
    riskColor = '#ff6b7a'; // Red - danger
  }

  // Fill risk meter
  const riskWidth = (detectionRisk / 100) * meterWidth;
  ctx.fillStyle = riskColor;
  ctx.fillRect(meterX, meterY, riskWidth, meterHeight);

  // Meter border
  ctx.strokeStyle = '#5a8ca8';
  ctx.lineWidth = 2;
  ctx.strokeRect(meterX, meterY, meterWidth, meterHeight);

  // Risk percentage text
  ctx.font = 'bold 14px sans-serif';
  ctx.fillStyle = '#0a1a24';
  ctx.textAlign = 'center';
  if (detectionRisk > 15) {
    ctx.fillText(`${Math.round(detectionRisk)}%`, meterX + meterWidth / 2, meterY + 18);
  }
  ctx.textAlign = 'left';

  // Risk status text
  ctx.font = '11px sans-serif';
  ctx.fillStyle = riskColor;
  let statusText = 'CLEAR';
  if (detectionRisk >= 60) statusText = 'DANGER';
  else if (detectionRisk >= 30) statusText = 'CAUTION';
  ctx.textAlign = 'center';
  ctx.fillText(statusText, meterX + meterWidth / 2, meterY + meterHeight + 14);
  ctx.textAlign = 'left';

  // Chain depth gauge (right side, below detection meter)
  const gaugeX = canvas.width - 70;
  const gaugeY = 70;
  const gaugeHeight = 140;
  const gaugeWidth = 35;

  // Fixed scale based on seabed depth: always show 0 to 7x depth
  // This covers: seabed (1x ~14%), green zone (~38-47%), red danger zone (50-100%, lower half)
  const gaugeMaxValue = hud.depth * 7;

  // Label with current chain length
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = '#e8e8d8';
  ctx.textAlign = 'center';
  ctx.fillText('CHAIN', gaugeX + gaugeWidth / 2, gaugeY - 8);

  // Gauge background
  ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
  ctx.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);

  // Seabed depth reference line
  const seabedPos = (hud.depth / gaugeMaxValue) * gaugeHeight;
  if (seabedPos <= gaugeHeight) {
    ctx.fillStyle = 'rgba(42, 133, 149, 0.4)';
    ctx.fillRect(gaugeX, gaugeY + seabedPos - 1, gaugeWidth, 2);
  }

  // Optimal cutting zone (green zone - dynamically calculated based on cable depth variance)
  // Typically ~2.7x-3.3x depth (center 3.0x ± 0.3x variance)
  const minOptimalPos = Math.min((minOptimal / gaugeMaxValue) * gaugeHeight, gaugeHeight);
  const maxOptimalPos = Math.min((maxOptimal / gaugeMaxValue) * gaugeHeight, gaugeHeight);

  // Orange transition zone (between green and red)
  const orangeZoneStart = maxOptimal; // Starts right after green zone ends (~3.3x)
  const orangeZoneEnd = hud.depth * 3.5; // Ends where red zone starts (3.5x)
  const orangeZoneStartPos = Math.min((orangeZoneStart / gaugeMaxValue) * gaugeHeight, gaugeHeight);
  const orangeZoneEndPos = Math.min((orangeZoneEnd / gaugeMaxValue) * gaugeHeight, gaugeHeight);

  // Danger zone (red zone in lower HALF of gauge - starts at 3.5x depth)
  // Gauge shows 0 to 7x depth, so 3.5x depth is exactly halfway
  const dangerZoneStart = hud.depth * 3.5; // Start red zone at halfway point
  const dangerZoneStartPos = Math.min((dangerZoneStart / gaugeMaxValue) * gaugeHeight, gaugeHeight);
  const dangerZoneEndPos = gaugeHeight; // Red zone extends to bottom of gauge (7x depth)

  // Always draw green zone (reference zone for optimal cable cutting)
  if (maxOptimalPos > minOptimalPos) {
    ctx.fillStyle = 'rgba(168, 240, 136, 0.25)';
    ctx.fillRect(gaugeX, gaugeY + minOptimalPos, gaugeWidth, maxOptimalPos - minOptimalPos);

    // Draw zone boundaries
    ctx.fillStyle = '#a8f088';
    if (minOptimalPos < gaugeHeight) {
      ctx.fillRect(gaugeX, gaugeY + minOptimalPos - 1, gaugeWidth, 2);
    }
    if (maxOptimalPos < gaugeHeight) {
      ctx.fillRect(gaugeX, gaugeY + maxOptimalPos - 1, gaugeWidth, 2);
    }
  }

  // Draw orange transition zone (between green and red)
  if (orangeZoneEndPos > orangeZoneStartPos && orangeZoneStartPos < gaugeHeight) {
    const zoneHeight = orangeZoneEndPos - orangeZoneStartPos;
    ctx.fillStyle = 'rgba(255, 169, 64, 0.25)'; // Slight orange/amber
    ctx.fillRect(gaugeX, gaugeY + orangeZoneStartPos, gaugeWidth, zoneHeight);

    // Draw orange zone boundary at the top
    if (orangeZoneStartPos < gaugeHeight) {
      ctx.fillStyle = '#ffa940';
      ctx.fillRect(gaugeX, gaugeY + orangeZoneStartPos - 1, gaugeWidth, 2);
    }
  }

  // Always draw red danger zone (reference zone for too deep)
  if (dangerZoneEndPos > dangerZoneStartPos && dangerZoneStartPos < gaugeHeight) {
    const zoneHeight = dangerZoneEndPos - dangerZoneStartPos;
    ctx.fillStyle = 'rgba(255, 107, 122, 0.3)';
    ctx.fillRect(gaugeX, gaugeY + dangerZoneStartPos, gaugeWidth, zoneHeight);

    // Draw danger zone boundary at the top of red zone
    if (dangerZoneStartPos < gaugeHeight) {
      ctx.fillStyle = '#ff6b7a';
      ctx.fillRect(gaugeX, gaugeY + dangerZoneStartPos - 1, gaugeWidth, 2);
    }
  }

  // Current anchor position indicator (using inDangerZone from above)
  const anchorPos = Math.min((tanker.chainLength / gaugeMaxValue) * gaugeHeight, gaugeHeight);

  ctx.beginPath();
  ctx.moveTo(gaugeX - 5, gaugeY + anchorPos);
  ctx.lineTo(gaugeX + gaugeWidth + 5, gaugeY + anchorPos);
  ctx.lineWidth = 3;
  // Red if in danger zone, green if in sweet spot, blue otherwise
  ctx.strokeStyle = inDangerZone ? '#ff6b7a' : (anchorInSweetSpot ? '#a8f088' : '#5a8ca8');
  ctx.stroke();

  // Gauge border
  ctx.strokeStyle = '#5a8ca8';
  ctx.lineWidth = 2;
  ctx.strokeRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);

  // Current chain length below gauge
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#e8e8d8';
  ctx.fillText(`${tanker.chainLength}m`, gaugeX + gaugeWidth / 2, gaugeY + gaugeHeight + 12);

  // Seabed depth graph (bottom left) - 50% past, 50% future
  if (hud.depthHistory.length > 0 || hud.futureDepths.length > 0) {
    const graphWidth = 180;
    const graphHeight = 45;
    const graphX = 20;
    const graphY = canvas.height - graphHeight - 20;

    // Label
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    ctx.textAlign = 'left';
    ctx.fillText('SEABED', graphX, graphY - 8);

    // Background
    ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
    ctx.fillRect(graphX, graphY, graphWidth, graphHeight);

    // Combine past, current, and future depths
    const allDepths = [...hud.depthHistory, hud.depth, ...hud.futureDepths];
    const totalPoints = allDepths.length;
    const shipIndex = hud.depthHistory.length; // Ship is right after history

    const maxDepth = Math.max(...allDepths, 470);
    const minDepth = Math.min(...allDepths, 20);
    const depthRange = maxDepth - minDepth || 100; // Avoid division by zero

    // Draw past depths (left half, dimmer)
    ctx.strokeStyle = 'rgba(42, 133, 149, 0.5)'; // Dimmer for past
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < totalPoints; i++) {
      const x = graphX + (i / (totalPoints - 1)) * graphWidth;
      const normalizedDepth = (allDepths[i] - minDepth) / depthRange;
      const y = graphY + graphHeight - (normalizedDepth * graphHeight);

      // Change color at ship position
      if (i === shipIndex) {
        ctx.stroke(); // Finish past line
        ctx.strokeStyle = '#2a8595'; // Brighter for future
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Ship position indicator (vertical line at center)
    const shipX = graphX + (shipIndex / (totalPoints - 1)) * graphWidth;
    ctx.strokeStyle = 'rgba(255, 169, 64, 0.6)'; // Orange line for ship position
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]); // Dashed line
    ctx.beginPath();
    ctx.moveTo(shipX, graphY);
    ctx.lineTo(shipX, graphY + graphHeight);
    ctx.stroke();
    ctx.setLineDash([]); // Reset to solid line

    // Current depth indicator (dot at ship position)
    const currentNormalized = (hud.depth - minDepth) / depthRange;
    const currentY = graphY + graphHeight - (currentNormalized * graphHeight);
    ctx.fillStyle = '#ffa940'; // Orange dot
    ctx.beginPath();
    ctx.arc(shipX, currentY, 4, 0, Math.PI * 2);
    ctx.fill();
    // Outline for better visibility
    ctx.strokeStyle = '#e8e8d8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Border
    ctx.strokeStyle = '#5a8ca8';
    ctx.lineWidth = 2;
    ctx.strokeRect(graphX, graphY, graphWidth, graphHeight);

    // Current depth text
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    ctx.textAlign = 'left';
    ctx.fillText(`Depth: ${hud.depth}m`, graphX, graphY + graphHeight + 12);
  }

  // Cable breakdown stats (bottom right)
  if (hud.cablesCut > 0) {
    const statsX = canvas.width - 200;
    const statsY = canvas.height - 130;
    const statsWidth = 180;
    const statsHeight = 110;

    // Background
    ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
    ctx.fillRect(statsX, statsY, statsWidth, statsHeight);

    // Border
    ctx.strokeStyle = '#5a8ca8';
    ctx.lineWidth = 2;
    ctx.strokeRect(statsX, statsY, statsWidth, statsHeight);

    // Title
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    ctx.textAlign = 'left';
    ctx.fillText('CABLES DAMAGED', statsX + 10, statsY + 15);

    // Cable type breakdown
    ctx.font = '10px sans-serif';
    let yOffset = 30;

    const cableOrder = ['HVDC', 'MILITARY', 'FIBER', 'RESEARCH', 'SCRAP'];
    cableOrder.forEach(type => {
      const count = hud.cablesByType[type];
      if (count > 0) {
        const cable = CABLE_TYPES[type];
        ctx.fillStyle = cable.color;
        ctx.fillText(`${count}× ${cable.name}`, statsX + 10, statsY + yOffset);
        yOffset += 14;
      }
    });

    // Total
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#a8f088';
    ctx.fillText(`Total: ${hud.cablesCut}`, statsX + 10, statsY + statsHeight - 10);
  }

  ctx.textAlign = 'left';
  ctx.restore();
}

let backgroundSoundsStarted = false;

function backgroundSounds() {
  if (backgroundSoundsStarted) return; // Only start once

  music.volume = 0.75;
  music.play().catch(err => console.log('Music play failed:', err));

  wind1.volume = 0.005;
  wind1.play().catch(err => console.log('Wind play failed:', err));

  waves.volume = 0.05;
  waves.play().catch(err => console.log('Waves play failed:', err));

  ship.volume = 0.01;
  ship.play().catch(err => console.log('Ship play failed:', err));

  backgroundSoundsStarted = true;
}

function randomCreaks() {
  if (gameFrame % randomBetween(2000, 6000) === 0) {
    const audioKey = `metal${randomBetween(1, 5)}`;
    const audio = audioElements[audioKey];
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(() => { });
    }
  }
}

let animationId;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isPaused) {
    backgroundSounds();
    randomCreaks();
    createBackground();
    createHud();
    createTanker();
    createPatrols();
    updateParticles(); // Draw particle effects
    gameFrame++;
  } else {
    // Still draw static elements when paused
    createBackground();
    createTanker();
    createPatrols();
  }

  drawHUD(); // Always draw HUD

  // Win condition: Successfully cut a critical cable
  if (hud.missionSuccess) {
    // Set success message
    const successCable = document.getElementById('success-cable');
    if (hud.lastCableCut) {
      successCable.textContent = `${hud.lastCableCut.name.toUpperCase()} SEVERED`;
    }

    document.getElementById('success').style.display = 'flex';
    cancelAnimationFrame(animationId);
    return; // Stop the animation loop
  }
  // Game over conditions: too many warnings OR detection risk reaches 100% OR no anchors left
  else if (warnings > 1000 || detectionRisk >= 100 || hud.remainingAnchors <= 0) {
    // Set failure message based on cause
    const restartTitle = document.getElementById('restart-title');
    const restartMessage = document.getElementById('restart-message');

    if (hud.remainingAnchors <= 0) {
      restartTitle.textContent = '⚓ NO ANCHORS LEFT';
      restartMessage.textContent = 'All anchors lost - Mission failed!';
    } else if (detectionRisk >= 100) {
      restartTitle.textContent = '⚠ MISSION COMPROMISED';
      restartMessage.textContent = 'You were detected by patrol vessels';
    } else {
      restartTitle.textContent = '⚠ MISSION FAILED';
      restartMessage.textContent = 'Too many warnings from patrols';
    }

    document.getElementById('restart').style.display = 'flex';
    cancelAnimationFrame(animationId);
    return; // Stop the animation loop
  }

  // Continue the animation loop only if game is not over
  animationId = requestAnimationFrame(animate);
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

function initGame() {
  console.log('=== Initializing game ===');

  // Initialize overlays
  const restartDiv = document.getElementById('restart');
  const successDiv = document.getElementById('success');
  const startDiv = document.getElementById('start');

  if (restartDiv) restartDiv.style.display = 'none';
  if (successDiv) successDiv.style.display = 'none';

  // Play button
  const playBtn = document.getElementById('play');
  if (playBtn) {
    console.log('Setting up play button');
    playBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Play button clicked - starting game');
      if (startDiv) startDiv.style.display = 'none';
      animate();
    }, true);
  } else {
    console.error('Play button not found!');
  }

  // Retry button
  const replayBtn = document.getElementById('replay');
  if (replayBtn) {
    console.log('Setting up replay button');
    replayBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Retry Mission button clicked - reloading');
      window.location.reload();
    }, true);
  } else {
    console.error('Replay button not found!');
  }

  // New Mission button
  const replaySuccessBtn = document.getElementById('replay-success');
  if (replaySuccessBtn) {
    console.log('Setting up replay-success button');
    replaySuccessBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('New Mission button clicked - reloading');
      window.location.reload();
    }, true);

    // Also add mousedown as backup
    replaySuccessBtn.addEventListener('mousedown', function (e) {
      console.log('New Mission mousedown event');
    }, true);
  } else {
    console.error('Replay-success button not found!');
  }

  console.log('Game initialization complete');
}

// Handle fullscreen canvas resizing
document.addEventListener('fullscreenchange', function () {
  if (document.fullscreenElement) {
    // Entering fullscreen - scale canvas while maintaining aspect ratio
    const aspectRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT; // 1.6
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const viewportAspectRatio = viewportWidth / viewportHeight;

    let newWidth, newHeight;

    if (viewportAspectRatio > aspectRatio) {
      // Viewport is wider - scale by height
      newHeight = viewportHeight;
      newWidth = newHeight * aspectRatio;
    } else {
      // Viewport is taller - scale by width
      newWidth = viewportWidth;
      newHeight = newWidth / aspectRatio;
    }

    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';
    // Keep internal resolution the same
    canvas.width = DEFAULT_WIDTH;
    canvas.height = DEFAULT_HEIGHT;
  } else {
    // Exiting fullscreen - reset styles
    canvas.style.width = '800px';
    canvas.style.height = '500px';
    canvas.width = DEFAULT_WIDTH;
    canvas.height = DEFAULT_HEIGHT;
  }
  // Reset font size for text rendering
  ctx.font = '24px sans-serif';
});
