console.log('script.js loaded');

// XP and level tracking
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

const spells = [
  {
    name: "Lumora",
    effect: "Creates magical floating light.",
    rarity: "Common",
    category: "Utility ✨",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Ignis Burst",
    effect: "Launches a burst of fire energy.",
    rarity: "Rare",
    category: "Attack ⚔️",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Aqua Shield",
    effect: "Summons a protective water barrier.",
    rarity: "Common",
    category: "Defense 🛡️",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Tempus Freeze",
    effect: "Slows time briefly.",
    rarity: "Forbidden",
    category: "Attack ⚔️",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Shadow Bind",
    effect: "Immobilizes the target using shadows.",
    rarity: "Rare",
    category: "Control 🔗",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Heal Radiance",
    effect: "Restores health and cures ailments.",
    rarity: "Common",
    category: "Utility ✨",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Meteor Storm",
    effect: "Summons meteors from the sky.",
    rarity: "Forbidden",
    category: "Attack ⚔️",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Iron Fortress",
    effect: "Creates an unbreakable protective barrier.",
    rarity: "Rare",
    category: "Defense 🛡️",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Thunderbolt",
    effect: "Strikes with a powerful bolt of lightning.",
    rarity: "Rare",
    category: "Attack ⚔️",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Vine Entangle",
    effect: "Binds enemies with magical vines.",
    rarity: "Common",
    category: "Control 🔗",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Phoenix Rise",
    effect: "Resurrects fallen allies with fire magic.",
    rarity: "Forbidden",
    category: "Utility ✨",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Frost Armor",
    effect: "Encases the caster in protective ice.",
    rarity: "Common",
    category: "Defense 🛡️",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Void Blast",
    effect: "Unleashes devastating dark energy.",
    rarity: "Forbidden",
    category: "Attack ⚔️",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Teleport",
    effect: "Instantly moves to a chosen location.",
    rarity: "Rare",
    category: "Utility ✨",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Mind Lock",
    effect: "Freezes enemy movement and thought.",
    rarity: "Rare",
    category: "Control 🔗",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Celestial Blessing",
    effect: "Grants divine protection and strength.",
    rarity: "Common",
    category: "Defense 🛡️",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Dark Whirlwind",
    effect: "Unleashes a vortex of shadow energy.",
    rarity: "Rare",
    category: "Attack ⚔️",
    type: "Dark",
    unlockLevel: 1
  },
  {
    name: "Serenity",
    effect: "Calms minds and restores mana.",
    rarity: "Common",
    category: "Utility ✨",
    type: "Light",
    unlockLevel: 1
  },
  {
    name: "Grave Touch",
    effect: "Drains life from the target.",
    rarity: "Forbidden",
    category: "Attack ⚔️",
    type: "Dark",
    unlockLevel: 3
  },
  {
    name: "Arcane Ward",
    effect: "Forms an invisible protective shield.",
    rarity: "Rare",
    category: "Defense 🛡️",
    type: "Light",
    unlockLevel: 5
  },
  {
    name: "Expecto Patronum",
    effect: "Summons protective spirit.",
    rarity: "Legendary",
    category: "Utility ✨",
    type: "Light",
    unlockLevel: 3
  },
  {
    name: "Fiendfyre",
    effect: "Uncontrollable cursed fire.",
    rarity: "Legendary",
    category: "Attack ⚔️",
    type: "Dark",
    unlockLevel: 5
  }
];

// Alignment tracking
let alignment = Number(localStorage.getItem("alignment")) || 0;
// -100 = Dark Wizard
// 0 = Neutral
// +100 = Light Wizard

// State tracking
let lastSpell = null;
let spellCount = 0;
let musicStarted = false;

// Sound elements
const wandSound = document.getElementById("wandSound");
const rareSound = document.getElementById("rareSound");
const legendarySound = document.getElementById("legendarySound");
// TYPING ANIMATION
function typeText(element, text, speed = 60) {
  element.textContent = "";
  let i = 0;
  
  const typing = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i === text.length) clearInterval(typing);
  }, speed);
}

// SPELL FUNCTION
function generateSpell() {
  // Start background music on first user interaction (if available)
  const music = document.getElementById("bgMusic");
  if (!musicStarted && music) {
    music.play().catch(err => console.log("Audio autoplay blocked by browser"));
    musicStarted = true;
  }

  // Play optional short spell sound file if present (spell.mp3)
  try {
    const s = new Audio("spell.mp3");
    s.play().catch(() => {});
  } catch (e) {
    // ignore
  }

  const card = document.querySelector(".card");
  
  // Trigger reveal animation
  card.classList.remove("reveal");
  void card.offsetWidth; // forces animation reset
  card.classList.add("reveal");
  // Filter spells according to current level
  const availableSpells = spells.filter(s => level >= (s.unlockLevel || 1));

  // Prevent same spell twice
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * availableSpells.length);
  } while (availableSpells[randomIndex] === lastSpell && availableSpells.length > 1);

  const chosenSpell = availableSpells[randomIndex];
  lastSpell = chosenSpell;
  spellCount++;

  // Typing animation for spell name
  typeText(document.getElementById("spellName"), chosenSpell.name, 50);

  // Typing animation for effect
  typeText(document.getElementById("spellEffect"), chosenSpell.effect, 40);

  // Display category
  document.getElementById("category").textContent = 
    "Category: " + chosenSpell.category;

  // Display rarity
  document.getElementById("rarity").textContent =
    "Rarity: " + chosenSpell.rarity;

  // Change card glow color based on rarity
  if (chosenSpell.rarity === "Common") {
    card.style.boxShadow = "0 0 20px lightblue, 0 0 30px lightblue";
  } else if (chosenSpell.rarity === "Rare") {
    card.style.boxShadow = "0 0 20px violet, 0 0 30px violet, 0 0 40px violet";
  } else if (chosenSpell.rarity === "Forbidden") {
    card.style.boxShadow = "0 0 20px red, 0 0 30px red, 0 0 40px darkred";
  }
  // Keep the page background unchanged (Hogwarts image/gradient).
  // Rarity visual is represented on the card only.

  // Play sound effect (using Web Audio API for magic sound)
  playMagicSound();

  // Add to history
  addToHistory(chosenSpell.name);

  // Update counter
  document.getElementById("spellCounter").textContent = spellCount;

  // Save to localStorage
  saveProgress();

  return chosenSpell;
}

// MAGIC SOUND EFFECT (using Web Audio API)
function playMagicSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Create oscillator for magical sound
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {
    console.log("Audio not available");
  }
}

// SPELL HISTORY
function addToHistory(spellName) {
  const historyList = document.getElementById("history");
  const li = document.createElement("li");
  li.textContent = spellName;
  li.className = "history-item";
  historyList.insertBefore(li, historyList.firstChild);
  
  // Limit history to 10 items
  while (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// LOCAL STORAGE
function saveProgress() {
  localStorage.setItem("spellCount", spellCount);
  const history = Array.from(document.getElementById("history").children)
    .map(li => li.textContent);
  localStorage.setItem("spellHistory", JSON.stringify(history));
}

function loadProgress() {
  const saved = localStorage.getItem("spellCount");
  if (saved) {
    spellCount = parseInt(saved);
    document.getElementById("spellCounter").textContent = spellCount;
  }
  
  const savedHistory = localStorage.getItem("spellHistory");
  if (savedHistory) {
    const history = JSON.parse(savedHistory);
    const historyList = document.getElementById("history");
    history.forEach(spell => {
      const li = document.createElement("li");
      li.textContent = spell;
      li.className = "history-item";
      historyList.appendChild(li);
    });
  }
}

// Load saved progress on page load
window.addEventListener("load", loadProgress);
window.addEventListener("load", updateXPUI);
window.addEventListener("load", updateAlignmentUI);
window.generateSpell = generateSpell;

/* ===== Magical Particle Background ===== */
;(function() {
  const canvas = document.getElementById("magicCanvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  let particles = [];
  const PARTICLE_COUNT = 80;

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
      grd.addColorStop(0, `rgba(255,240,200,${p.alpha})`);
      grd.addColorStop(1, `rgba(180,140,255,0)`);
      ctx.fillStyle = grd;
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      p.y -= p.speedY;
      p.x += Math.sin((p.y + p.x) * 0.001) * 0.6;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();

/* ===== Cinematic Effects ===== */

// Alignment System
function updateAlignment(spell) {
  if (spell.type === "Light") alignment += 10;
  if (spell.type === "Dark") alignment -= 10;

  alignment = Math.max(-100, Math.min(100, alignment));

  localStorage.setItem("alignment", alignment);

  updateAlignmentUI();
}

function updateAlignmentUI() {
  const text = document.getElementById("alignmentText");

  if (alignment > 40) {
    text.innerText = "Alignment: Light Wizard ✨";
    document.body.style.backgroundImage =
      `url("../hogwarts.webp"), radial-gradient(circle, #2b1055, #7597de)`;
  }
  else if (alignment < -40) {
    text.innerText = "Alignment: Dark Wizard ⚫";
    document.body.style.backgroundImage =
      `url("../hogwarts.webp"), radial-gradient(circle, #000000, #2a0845)`;
  }
  else {
    text.innerText = "Alignment: Neutral ⚖️";
    document.body.style.backgroundImage =
      `url("../hogwarts.webp"), radial-gradient(circle, #1a1a2e, #16213e)`;
  }
}

// XP and Level System
function gainXP(amount = 10) {
  xp += amount;

  if (xp >= 100) {
    xp = 0;
    level++;
    checkUnlocks();
  }

  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);

  updateXPUI();
}

function updateXPUI() {
  const xpBar = document.getElementById("xpBar");
  const levelText = document.getElementById("levelText");

  if (xpBar) {
    xpBar.style.width = xp + "%";
  }

  if (levelText) {
    levelText.innerText = "Level " + level + " Wizard";
  }
}

// notify player when new high‑level spells unlock
function checkUnlocks() {
  if (level === 3) {
    alert("✨ New Spell Unlocked: Patronus Magic!");
  }
  if (level === 5) {
    alert("🔥 Dark Forbidden Magic Unlocked!");
  }
}

// Legendary spell flash effect
function legendaryFlash() {
  const flash = document.getElementById("flash");
  if (flash) {
    flash.classList.remove("flash-active");
    void flash.offsetWidth; // trigger reflow
    flash.classList.add("flash-active");
  }
}

// Floating spell text animation
function showFloatingText(text, x, y) {
  const el = document.createElement("div");
  el.className = "floating-text";
  el.innerText = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  
  setTimeout(() => el.remove(), 2000);
}

// Spark effect on button click
function createSparkles(x, y) {
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement("div");
    spark.style.position = "fixed";
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    spark.style.width = "8px";
    spark.style.height = "8px";
    spark.style.background = "radial-gradient(circle, #ffd700, #ff69b4)";
    spark.style.borderRadius = "50%";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "100";
    
    const angle = (Math.PI * 2 * i) / 10;
    const velocity = 3 + Math.random() * 4;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(spark);
    
    let frame = 0;
    const sparkInterval = setInterval(() => {
      frame++;
      x += vx;
      y += vy;
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.opacity = 1 - frame / 30;
      
      if (frame >= 30) {
        clearInterval(sparkInterval);
        spark.remove();
      }
    }, 16);
  }
}

// Button click handler with all cinematic effects
const castButton = document.getElementById("castButton");
if (castButton) {
  castButton.addEventListener("click", (e) => {
    const spell = generateSpell();
    
    // Game mechanics
    updateAlignment(spell);
    gainXP(15);
    
    // Play wand sound
    if (wandSound) {
      wandSound.currentTime = 0;
      wandSound.play().catch(() => {});
    }
    
    // Play rarity-based sounds
    if (spell.rarity === "Rare" && rareSound) {
      rareSound.currentTime = 0;
      rareSound.play().catch(() => {});
    }
    
    if (spell.rarity === "Forbidden" && legendarySound) {
      legendarySound.currentTime = 0;
      legendarySound.play().catch(() => {});
      legendaryFlash();
    }
    
    // Visual effects
    createSparkles(e.clientX, e.clientY);
    showFloatingText(spell.name, e.clientX, e.clientY);
  });
}

// Keep window.generateSpell for console access if needed
window.generateSpell = generateSpell;