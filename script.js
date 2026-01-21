// VERSION: 2026-01-20-v2 - Force cache refresh
console.log('🐼 Script.js loaded successfully! Version: 2026-01-20-v2');

// Page Navigation - declared with let so they can be assigned later
let page1, calendarPage, page2, page3, openBtn, countdown, notification;
let candleFire, celebrationEffects, pandaWithCake, cakeContainer, cakeImage;
let audioIndicator, smileDetectionSection, cameraFeed, faceCanvas;
let smileStatus, voiceStatus, detectionMessage, smileCheck, voiceCheck;
let daysGrid, monthTitle, calendarMessage, calendarHintText, loadingScreen;

// Initialize elements when DOM is ready
function initializeElements() {
    console.log('🔧 Initializing DOM elements...');
    page1 = document.getElementById('page1');
    calendarPage = document.getElementById('calendarPage');
    page2 = document.getElementById('page2');
    page3 = document.getElementById('page3');
    openBtn = document.getElementById('openBtn');
    countdown = document.getElementById('countdown');
    notification = document.getElementById('notification');
    candleFire = document.getElementById('candleFire');
    celebrationEffects = document.getElementById('celebrationEffects');
    pandaWithCake = document.getElementById('pandaWithCake');
    cakeContainer = document.getElementById('cakeContainer');
    cakeImage = document.getElementById('cakeImage');
    audioIndicator = document.getElementById('audioIndicator');
    smileDetectionSection = document.getElementById('smileDetectionSection');
    cameraFeed = document.getElementById('cameraFeed');
    faceCanvas = document.getElementById('faceCanvas');
    smileStatus = document.getElementById('smileStatus');
    voiceStatus = document.getElementById('voiceStatus');
    detectionMessage = document.getElementById('detectionMessage');
    smileCheck = document.getElementById('smileCheck');
    voiceCheck = document.getElementById('voiceCheck');
    daysGrid = document.getElementById('daysGrid');
    monthTitle = document.getElementById('monthTitle');
    calendarMessage = document.getElementById('calendarMessage');
    calendarHintText = document.getElementById('calendarHintText');
    loadingScreen = document.getElementById('loadingScreen');
    console.log('✅ DOM elements initialized');
}
const musicToggle = document.getElementById('musicToggle');
const customCursor = document.getElementById('customCursor');
const goldenAura = document.getElementById('goldenAura');

let countdownValue = 10;
let countdownInterval;
let blowTimeout;
let candleBlown = false;

// Detection states
let cameraStream = null;
let smileDetected = false;
let phraseDetected = false;
let recognition = null;
let faceApiLoaded = false;

// Calendar states
let currentMonth = 0; // January
let currentYear = 2026;
const ANNIE_BIRTHDAY_MONTH = 0; // January (0-indexed)
const ANNIE_BIRTHDAY_DAY = 21;

// Track if permission was asked
let permissionAsked = false;

// Music state
let backgroundMusicPlaying = false;
let backgroundMusic = null;

// ============ INITIALIZE PAGE 1 EFFECTS ============
document.addEventListener('DOMContentLoaded', () => {
    // FIRST: Initialize all DOM element references
    initializeElements();

    // Initialize Loading Screen
    initLoadingScreen();

    // Initialize Custom Cursor
    initCustomCursor();

    // Initialize Background Music
    initBackgroundMusic();



    // Initialize Page 1 Particles
    initPage1Particles();

    // Initialize Typewriter Effect
    initTypewriter();

    // Initialize GSAP Animations
    initGSAPAnimations();

    // Initialize Star Warp
    initStarWarp();

    // Initialize Snow/Glitter
    initSnowGlitter();

    // Initialize Keyboard Shortcuts
    initKeyboardShortcuts();

    // Initialize Poppable Balloons
    initPoppableBalloons();

    // Initialize 3D Globe
    init3DGlobe();

    // Initialize Parallax
    initParallax();

    // Fire confetti on load
    setTimeout(() => {
        fireLoadConfetti();
    }, 1500);
});

// ============ VOICE FUNCTIONS (No Background Music) ============

// ============ SPEAK FUNCTION ============
let voicesLoaded = false;
let cachedVoices = [];

// Load voices
function loadVoices() {
    if ('speechSynthesis' in window) {
        cachedVoices = window.speechSynthesis.getVoices();
        if (cachedVoices.length > 0) {
            voicesLoaded = true;
            console.log('🎤 Voices loaded:', cachedVoices.length);
        }
    }
}

// Load voices when ready
if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = function() {
        loadVoices();
    };
}

function speak(text, callback) {
    console.log('🔊 speak() called with:', text);

    if ('speechSynthesis' in window) {
        console.log('✅ speechSynthesis is available');

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Small delay to ensure cancellation is complete
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.lang = 'en-US'; // Use US English for better compatibility

            // Get voices fresh each time
            let voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
                voices = cachedVoices;
            }
            console.log('🎤 Available voices:', voices.length);

            // Try to find a good voice
            const preferredVoice = voices.find(voice =>
                voice.name.includes('Microsoft David') ||
                voice.name.includes('David') ||
                voice.name.includes('Google US English') ||
                voice.lang === 'en-US'
            ) || voices.find(voice =>
                voice.lang.includes('en')
            ) || voices[0];

            if (preferredVoice) {
                utterance.voice = preferredVoice;
                console.log('✅ Using voice:', preferredVoice.name);
            }

            // Call callback after speech ends
            utterance.onend = function() {
                console.log('🔊 Speech ended:', text);
                if (callback) callback();
            };

            utterance.onerror = function(e) {
                console.error('❌ Speech error:', e);
                if (callback) callback();
            };

            window.speechSynthesis.speak(utterance);
            console.log('🔊 Speech started');
        }, 100); // End of setTimeout
    } else {
        console.error('❌ speechSynthesis NOT available in this browser');
        if (callback) callback();
    }
}

// Function to sing Happy Birthday song
function singHappyBirthdaySong() {
    const lyrics = [
        "Happy Birthday to you",
        "Happy Birthday to you",
        "Happy Birthday dear Annie",
        "Happy Birthday to you"
    ];

    let lineIndex = 0;

    function singNextLine() {
        if (lineIndex < lyrics.length) {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(lyrics[lineIndex]);
                utterance.rate = 0.6; // Slower for singing
                utterance.pitch = 1.2; // Higher pitch for singing
                utterance.volume = 1.0;
                utterance.lang = 'en-IN';

                const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
                const voice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('Ravi')) || voices[0];
                if (voice) utterance.voice = voice;

                utterance.onend = function() {
                    lineIndex++;
                    setTimeout(singNextLine, 500); // Pause between lines
                };

                window.speechSynthesis.speak(utterance);
            }
        }
    }

    singNextLine();
}

// ============ THREE.JS 3D GLOBE ============
function init3DGlobe() {
    const container = document.getElementById('globeContainer');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(150, 150);
    container.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x4facfe,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add cross on top
    const crossGeometry = new THREE.BoxGeometry(0.3, 1, 0.1);
    const crossMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const crossVertical = new THREE.Mesh(crossGeometry, crossMaterial);
    crossVertical.position.set(0, 2.5, 0);
    scene.add(crossVertical);

    const crossHorizontal = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.1), crossMaterial);
    crossHorizontal.position.set(0, 2.7, 0);
    scene.add(crossHorizontal);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.01;
        crossVertical.rotation.y += 0.01;
        crossHorizontal.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}

// ============ THREE.JS 3D CAKE ============
function init3DCake() {
    const container = document.getElementById('cake3DContainer');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(200, 200);
    container.appendChild(renderer.domElement);

    // Create cake layers
    const layer1Geo = new THREE.CylinderGeometry(2, 2, 1, 32);
    const layer1Mat = new THREE.MeshBasicMaterial({ color: 0xff6b9d });
    const layer1 = new THREE.Mesh(layer1Geo, layer1Mat);
    layer1.position.y = 0;
    scene.add(layer1);

    const layer2Geo = new THREE.CylinderGeometry(1.5, 1.5, 0.8, 32);
    const layer2Mat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const layer2 = new THREE.Mesh(layer2Geo, layer2Mat);
    layer2.position.y = 0.9;
    scene.add(layer2);

    const layer3Geo = new THREE.CylinderGeometry(1, 1, 0.6, 32);
    const layer3Mat = new THREE.MeshBasicMaterial({ color: 0x4facfe });
    const layer3 = new THREE.Mesh(layer3Geo, layer3Mat);
    layer3.position.y = 1.6;
    scene.add(layer3);

    // Add candle
    const candleGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
    const candleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.y = 2.15;
    scene.add(candle);

    // Add flame
    const flameGeo = new THREE.ConeGeometry(0.1, 0.3, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff6b35 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 2.55;
    scene.add(flame);

    camera.position.z = 6;
    camera.position.y = 2;

    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.005;
        flame.scale.y = 0.8 + Math.sin(Date.now() * 0.01) * 0.2;
        renderer.render(scene, camera);
    }

    animate();
}

// ============ LOADING SCREEN ============
function initLoadingScreen() {
    console.log('🎬 Initializing loading screen...');
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // HIDE LOADING SCREEN IMMEDIATELY
        loadingScreen.style.display = 'none';
        loadingScreen.remove();
        console.log('✅ Loading screen removed');
    }

    // Hide all pages first, then show only page1
    hideAllPages();
    showPage('page1');
    console.log('✅ Page 1 shown');

    // Speak welcome message on first user interaction (browser requirement)
    document.body.addEventListener('click', function speakOnce() {
        console.log('🔊 First click detected, speaking welcome message...');
        speak("HAPPY BIRTHDAY ANNIE");
        document.body.removeEventListener('click', speakOnce);
    }, { once: true });

    console.log('✅ Click listener for voice attached to body');
}

// ============ PAGE NAVIGATION HELPERS ============
function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
}

function showPage(pageId) {
    console.log('📄 showPage() called with:', pageId);
    hideAllPages();
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'flex';
        page.style.visibility = 'visible';
        page.style.opacity = '1';
        page.classList.add('active');
        console.log('✅ Page shown:', pageId);
    } else {
        console.error('❌ Page NOT found:', pageId);
    }
}

// ============ CUSTOM PANDA CURSOR ============
function initCustomCursor() {
    console.log('🐼 Initializing custom cursor...');
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (!cursorDot) {
        console.error('❌ Cursor dot not found!');
        return;
    }

    console.log('✅ Cursor dot found:', cursorDot);

    // Make sure cursor is visible
    cursorDot.style.display = 'block';
    cursorDot.style.visibility = 'visible';
    cursorDot.style.opacity = '1';

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';

        if (cursorRing) {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        }

        // Create sparkle trail
        createSparkleAtPosition(e.clientX, e.clientY);
    });

    console.log('✅ Cursor mousemove listener attached');
}

// ============ SPARKLE TRAIL ============
let sparkleCount = 0;
function createSparkleAtPosition(x, y) {
    sparkleCount++;
    if (sparkleCount % 3 !== 0) return; // Only create sparkle every 3rd move

    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        font-size: ${Math.random() * 15 + 10}px;
        z-index: 999997;
        animation: sparkleFloat 1s ease-out forwards;
        color: #ff69b4;
        text-shadow: 0 0 10px #ff1493;
    `;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// ============ BACKGROUND MUSIC ============
let playlistAudio = null;
let currentPlayingSong = null;

function initBackgroundMusic() {
    // Using existing Happy Birthday Annie audio
    const audioElement = document.getElementById('birthdayAudio');
    if (audioElement) {
        audioElement.loop = true;
        audioElement.volume = 0.3;
        backgroundMusic = audioElement;
    }

    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', togglePlaylist);
    }

    // Initialize playlist functionality
    initPlaylist();
}

function togglePlaylist() {
    const playlist = document.getElementById('songPlaylist');
    if (playlist) {
        playlist.classList.toggle('hidden');
    }
}

function initPlaylist() {
    const closeBtn = document.getElementById('closePlaylist');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const playlist = document.getElementById('songPlaylist');
            if (playlist) playlist.classList.add('hidden');
        });
    }

    // Add click handlers to all play buttons
    const playBtns = document.querySelectorAll('.play-song-btn');
    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const songItem = e.target.closest('.song-item');
            const songPath = songItem.getAttribute('data-song');
            const songName = songItem.querySelector('.song-name').textContent;
            playSong(songPath, songName, songItem);
        });
    });

    // Stop button
    const stopBtn = document.getElementById('stopSong');
    if (stopBtn) {
        stopBtn.addEventListener('click', stopCurrentSong);
    }
}

function playSong(songPath, songName, songItem) {
    // Stop any currently playing song
    if (playlistAudio) {
        playlistAudio.pause();
        playlistAudio = null;
    }

    // Remove playing class from all songs
    document.querySelectorAll('.song-item').forEach(item => {
        item.classList.remove('playing');
        item.querySelector('.play-song-btn').textContent = '▶️';
    });

    // Create new audio and play
    playlistAudio = new Audio(songPath);
    playlistAudio.volume = 0.7;
    playlistAudio.play();
    currentPlayingSong = songName;

    // Update UI
    songItem.classList.add('playing');
    songItem.querySelector('.play-song-btn').textContent = '⏸️';

    // Show now playing
    const nowPlaying = document.getElementById('nowPlaying');
    const currentSongName = document.getElementById('currentSongName');
    if (nowPlaying && currentSongName) {
        nowPlaying.classList.remove('hidden');
        currentSongName.textContent = songName.replace(/^\d+\.\s*/, '');
    }

    // Handle song end
    playlistAudio.addEventListener('ended', () => {
        stopCurrentSong();
    });

    // Pause background music if playing
    if (backgroundMusic && !backgroundMusic.paused) {
        backgroundMusic.pause();
    }
}

function stopCurrentSong() {
    if (playlistAudio) {
        playlistAudio.pause();
        playlistAudio = null;
    }

    // Reset UI
    document.querySelectorAll('.song-item').forEach(item => {
        item.classList.remove('playing');
        item.querySelector('.play-song-btn').textContent = '▶️';
    });

    const nowPlaying = document.getElementById('nowPlaying');
    if (nowPlaying) {
        nowPlaying.classList.add('hidden');
    }

    currentPlayingSong = null;
}

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    if (musicPlaying) {
        if (backgroundMusic) {
            if (backgroundMusic.pause) backgroundMusic.pause();
        }
        musicPlaying = false;
        if (musicToggle) {
            musicToggle.textContent = '🔇';
            musicToggle.classList.add('muted');
        }
    } else {
        if (backgroundMusic) {
            if (backgroundMusic.play) backgroundMusic.play();
        }
        musicPlaying = true;
        if (musicToggle) {
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('muted');
        }
    }
}

// ============ STAR WARP EFFECT ============
function initStarWarp() {
    const canvas = document.getElementById('starWarpCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width - centerX,
            y: Math.random() * canvas.height - centerY,
            z: Math.random() * canvas.width,
            size: Math.random() * 2 + 1
        });
    }

    function animateStars() {
        ctx.fillStyle = 'rgba(26, 26, 46, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.z -= 2;
            if (star.z <= 0) {
                star.z = canvas.width;
                star.x = Math.random() * canvas.width - centerX;
                star.y = Math.random() * canvas.height - centerY;
            }

            const sx = (star.x / star.z) * 300 + centerX;
            const sy = (star.y / star.z) * 300 + centerY;
            const size = (1 - star.z / canvas.width) * star.size * 3;

            ctx.beginPath();
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${1 - star.z / canvas.width})`;
            ctx.fill();
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============ SNOW/GLITTER EFFECT ============
function initSnowGlitter() {
    const container = document.getElementById('snowContainer');
    if (!container) return;

    const snowflakes = ['❄', '✨', '⭐', '💫', '✦'];

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.fontSize = (Math.random() * 1 + 0.5) + 'em';
        container.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 10000);
    }

    setInterval(createSnowflake, 300);
}

// ============ KEYBOARD SHORTCUTS ============
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // SPACE - Fire confetti
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
        // M - Toggle music
        if (e.code === 'KeyM') {
            toggleMusic();
        }
    });
}

// ============ POPPABLE BALLOONS ============
function initPoppableBalloons() {
    const balloons = document.querySelectorAll('.pop-balloon');
    const messages = [
        "God loves you, Annie! 💕",
        "You are blessed! ✝️",
        "Happy Birthday! 🎂",
        "You're amazing! ⭐",
        "Shine bright! ✨"
    ];

    balloons.forEach((balloon, index) => {
        balloon.addEventListener('click', () => {
            if (balloon.classList.contains('popped')) return;

            balloon.classList.add('popped');

            // Show message
            const message = document.createElement('div');
            message.className = 'balloon-message';
            message.textContent = messages[index % messages.length];
            message.style.left = balloon.offsetLeft + 'px';
            message.style.top = balloon.offsetTop + 'px';
            balloon.parentElement.appendChild(message);

            // Speak message
            speak(messages[index % messages.length].replace(/[^\w\s]/g, ''));

            // Pop sound effect
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 30,
                    spread: 50,
                    origin: {
                        x: balloon.offsetLeft / window.innerWidth,
                        y: balloon.offsetTop / window.innerHeight
                    }
                });
            }

            setTimeout(() => {
                message.remove();
            }, 2000);
        });
    });
}

// Initialize Particle Effects for Page 1
function initPage1Particles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-page1", {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: ["#ffd700", "#ff6b9d", "#4facfe", "#43e97b", "#ffffff"] },
                shape: {
                    type: ["circle", "star"],
                    star: { sides: 5 }
                },
                opacity: { value: 0.6, random: true },
                size: { value: 4, random: true },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    out_mode: "out"
                },
                twinkle: {
                    particles: { enable: true, frequency: 0.05, opacity: 1 }
                }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    repulse: { distance: 100 },
                    push: { quantity: 4 }
                }
            }
        });
    }
}

// Initialize Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement && typeof Typed !== 'undefined') {
        new Typed('#typewriter-text', {
            strings: [
                "God's precious daughter...",
                "A blessing to everyone around her...",
                "Happy Birthday, Annie! 🎂",
                "May God bless you abundantly! ✝️"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Initialize GSAP Animations
function initGSAPAnimations() {
    if (typeof gsap !== 'undefined') {
        // Animate gift box floating
        gsap.to('.gift-box', {
            y: -15,
            duration: 2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
        });

        // Animate button glow
        gsap.to('.button-glow', {
            scale: 1.1,
            opacity: 0.8,
            duration: 1.5,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
        });
    }
}

// Fire confetti on page load
function fireLoadConfetti() {
    if (typeof confetti !== 'undefined') {
        // Left side
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b']
        });

        // Right side
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b']
        });
    }
}

// ============ FIREWORKS ANIMATION ============
class Firework {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.rockets = [];
        this.running = false;
    }

    createRocket() {
        this.rockets.push({
            x: Math.random() * this.canvas.width,
            y: this.canvas.height,
            targetY: Math.random() * (this.canvas.height * 0.5),
            speed: 3 + Math.random() * 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    explode(x, y, color) {
        const particleCount = 80 + Math.floor(Math.random() * 40);
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const velocity = 2 + Math.random() * 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: color,
                alpha: 1,
                size: 2 + Math.random() * 2,
                decay: 0.015 + Math.random() * 0.01
            });
        }
    }

    update() {
        // Update rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const rocket = this.rockets[i];
            rocket.y -= rocket.speed;

            if (rocket.y <= rocket.targetY) {
                this.explode(rocket.x, rocket.y, rocket.color);
                this.rockets.splice(i, 1);
            }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw() {
        // Draw rockets
        this.rockets.forEach(rocket => {
            this.ctx.beginPath();
            this.ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = rocket.color;
            this.ctx.fill();
        });

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('hsl', 'hsla');
            this.ctx.fill();
        });
    }

    animate() {
        if (!this.running) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.update();
        this.draw();

        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.running = true;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.animate();

        // Create rockets periodically
        this.rocketInterval = setInterval(() => {
            if (this.running) this.createRocket();
        }, 500);
    }

    stop() {
        this.running = false;
        if (this.rocketInterval) clearInterval(this.rocketInterval);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

let fireworks = null;
let fireworks2 = null;

function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        fireworks = new Firework(canvas, ctx);
    }

    const canvas2 = document.getElementById('fireworks-canvas-2');
    if (canvas2) {
        const ctx2 = canvas2.getContext('2d');
        fireworks2 = new Firework(canvas2, ctx2);
    }
}

function startFireworks(pageNum = 1) {
    if (pageNum === 1 && fireworks) {
        fireworks.start();
    } else if (pageNum === 2 && fireworks2) {
        fireworks2.start();
    }
}

function stopFireworks(pageNum = 1) {
    if (pageNum === 1 && fireworks) {
        fireworks.stop();
    } else if (pageNum === 2 && fireworks2) {
        fireworks2.stop();
    }
}

// Initialize fireworks on load
document.addEventListener('DOMContentLoaded', () => {
    initFireworks();
});

// ============ SPARKLE CURSOR TRAIL ============
function initSparkleTrail() {
    document.addEventListener('mousemove', (e) => {
        createSparkle(e.clientX, e.clientY);
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-cursor';
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        font-size: 1.5em;
        z-index: 9999;
        animation: sparkleFloat 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// Initialize sparkle trail
initSparkleTrail();

// Step 1: Open Button Click - Attach after DOM is ready
function attachButtonHandler() {
    const openButton = document.getElementById('openBtn');
    if (openButton) {
        console.log('✅ Open button found, attaching click handler');
        // Remove any existing handlers first
        openButton.removeEventListener('click', handleButtonClick);
        openButton.addEventListener('click', handleButtonClick);
        // Also add onclick as backup
        openButton.onclick = handleButtonClick;
    } else {
        console.error('❌ Open button NOT found!');
    }
}

// Try attaching handler immediately and on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachButtonHandler);
} else {
    // DOM already loaded
    attachButtonHandler();
}

// Also try after a short delay as backup
setTimeout(attachButtonHandler, 100);
setTimeout(attachButtonHandler, 500);

function handleButtonClick(e) {
    console.log('🎉 Button clicked!');
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Say THANK YOU
    speak("THANK YOU");

    // Immediately show calendar page (don't wait for speech)
    setTimeout(function() {
        console.log('📖 Showing Bible verses page...');
        showPage('calendarPage');
        initCalendar();
    }, 500);
}

// Make handleButtonClick globally accessible
window.handleButtonClick = handleButtonClick;

// Ask Annie for permission
function askAnniePermission() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance("Annie, would you be okay with this? Are you ready to open?");
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-IN';

        // Try to find an Indian male voice
        const voices = window.speechSynthesis.getVoices();
        const indianMaleVoice = voices.find(voice =>
            voice.lang.includes('en-IN') ||
            voice.name.includes('India') ||
            voice.name.includes('Ravi') ||
            voice.name.includes('Microsoft Ravi')
        ) || voices.find(voice =>
            voice.name.includes('Male') ||
            voice.name.includes('David')
        );

        if (indianMaleVoice) {
            utterance.voice = indianMaleVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
}

// Open Calendar Page first
function openPage2() {
    console.log('Opening calendar page');

    // Force hide page 1
    if (page1) {
        page1.style.display = 'none';
        page1.classList.remove('active');
    }

    // Show calendar page
    if (calendarPage) {
        calendarPage.style.display = 'flex';
        calendarPage.classList.add('active');
    }

    // Initialize calendar
    initCalendar();

    // Welcome message
    if ('speechSynthesis' in window) {
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance("Annie, please select your special birthday!");
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }, 500);
    }
}

// Go to Page 2 (Birthday Celebration) - called from Next button on calendar
function goToPage2() {
    console.log('Going to page 2 from calendar');

    // Fire celebration
    fireMassivePoppers();
    speak("Let's celebrate Annie's birthday!");

    // Hide calendar page
    const calPage = document.getElementById('calendarPage');
    if (calPage) {
        calPage.classList.remove('active');
        calPage.style.display = 'none';
    }

    // Start birthday experience
    startBirthdayExperience();
}

// Start the actual birthday experience (called after correct date selected)
function startBirthdayExperience() {
    console.log('Starting birthday experience');

    // Hide calendar page
    if (calendarPage) {
        calendarPage.style.display = 'none';
        calendarPage.classList.remove('active');
    }

    // Show page 2
    if (page2) {
        page2.style.display = 'block';
        page2.classList.add('active');
    }

    // Initialize Page 2 particles
    initPage2Particles();

    // Initialize 3D Cake
    init3DCake();

    // Initialize floating lanterns
    initFloatingLanterns();

    // Start confetti cannon
    startConfettiCannon();

    // Start verse rain
    startVerseRain();

    // Initialize all 45 Page 2 features
    initRosePetals();
    initGoldenDust();
    initGlitterRain();
    initBokeh();
    initStarConstellation();
    initBlessingBubbles();
    initDiscoLights();
    initPandaParade();
    initInteractiveElements();
    initVoiceMessages();

    // Start fireworks for Page 2
    setTimeout(() => startFireworks(2), 2000);

    // Fire celebration confetti
    fireCelebrationConfetti();

    // Start Happy Birthday karaoke and singing immediately on page 2
    setTimeout(() => {
        playHappyBirthdayKaraoke();
        singHappyBirthdayCasendra();
    }, 500);

    // Start panda carrying cake animation
    setTimeout(startPandaCakeAnimation, 1500);

    // Animate celebration text with GSAP
    animateCelebrationText();
}

// ============ FLOATING LANTERNS ============
function initFloatingLanterns() {
    const container = document.querySelector('.floating-lanterns');
    if (!container) return;

    // Lanterns are created via CSS, just ensure they're visible
    container.style.display = 'block';
}

// ============ CONFETTI CANNON ============
function startConfettiCannon() {
    if (typeof confetti === 'undefined') return;

    // Fire confetti every 5 seconds
    setInterval(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 }
        });

        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 }
            });
        }, 500);
    }, 5000);
}

// ============ VERSE RAIN ============
const bibleVerses = [
    {
        text: "May he give you the desire of your heart and make all your plans succeed.",
        reference: "Psalm 20:4"
    },
    {
        text: "I praise you because I am fearfully and wonderfully made; your works are wonderful.",
        reference: "Psalm 139:14"
    },
    {
        text: "For through wisdom your days will be many, and years will be added to your life.",
        reference: "Proverbs 9:11"
    },
    {
        text: "For he will command his angels concerning you to guard you in all your ways.",
        reference: "Psalm 91:11"
    },
    {
        text: "Delight yourself in the Lord, and he will give you the desires of your heart.",
        reference: "Psalm 37:4"
    },
    {
        text: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you.",
        reference: "Isaiah 41:10"
    },
    {
        text: "Trust in the Lord with all your heart and lean not on your own understanding.",
        reference: "Proverbs 3:5-6"
    }
];

let verseRainInterval = null;

function startVerseRain() {
    const container = document.getElementById('verseRainContainer');
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create marquee track
    const track = document.createElement('div');
    track.className = 'verse-marquee-track';

    // Add all verses twice for seamless loop
    const versesToShow = [...bibleVerses, ...bibleVerses];

    versesToShow.forEach((verse) => {
        const verseElement = document.createElement('div');
        verseElement.className = 'falling-verse';
        verseElement.innerHTML = `"${verse.text}" <span class="verse-reference">— ${verse.reference}</span>`;

        // Click to hear the verse
        verseElement.addEventListener('click', () => {
            verseElement.classList.add('clicked');
            speak(`${verse.text} ${verse.reference}`);

            // Fire mini confetti
            if (typeof confetti !== 'undefined') {
                const rect = verseElement.getBoundingClientRect();
                confetti({
                    particleCount: 30,
                    spread: 60,
                    origin: {
                        x: rect.left / window.innerWidth + 0.1,
                        y: rect.top / window.innerHeight
                    }
                });
            }

            // Remove clicked class after animation
            setTimeout(() => verseElement.classList.remove('clicked'), 500);
        });

        track.appendChild(verseElement);
    });

    container.appendChild(track);
    console.log('✅ Verse marquee started with', bibleVerses.length, 'verses');
}

function stopVerseRain() {
    if (verseRainInterval) {
        clearInterval(verseRainInterval);
        verseRainInterval = null;
    }
}

// ============ ROSE PETALS ============
function initRosePetals() {
    const container = document.getElementById('rosePetalsContainer');
    if (!container) return;

    const petals = ['🌸', '🌺', '🌹', '💮'];

    setInterval(() => {
        const petal = document.createElement('span');
        petal.className = 'rose-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = (Math.random() * 100) + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(petal);

        setTimeout(() => petal.remove(), 15000);
    }, 1000);
}

// ============ GOLDEN DUST ============
function initGoldenDust() {
    const container = document.getElementById('goldenDust');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const dust = document.createElement('div');
        dust.className = 'gold-dust';
        dust.style.left = (Math.random() * 100) + '%';
        dust.style.animationDuration = (Math.random() * 10 + 10) + 's';
        dust.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(dust);
    }
}

// ============ GLITTER RAIN ============
function initGlitterRain() {
    const container = document.getElementById('glitterRain');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter-piece';
        glitter.style.left = (Math.random() * 100) + '%';
        glitter.style.animationDuration = (Math.random() * 4 + 4) + 's';
        glitter.style.animationDelay = (Math.random() * 5) + 's';
        glitter.style.background = `linear-gradient(45deg, ${['#ffd700', '#ff6b9d', '#4facfe', '#43e97b'][Math.floor(Math.random() * 4)]}, #fff)`;
        container.appendChild(glitter);
    }
}

// ============ BOKEH BACKGROUND ============
function initBokeh() {
    const container = document.getElementById('bokehContainer');
    if (!container) return;

    const colors = ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b', '#fff'];

    for (let i = 0; i < 20; i++) {
        const orb = document.createElement('div');
        orb.className = 'bokeh-orb';
        orb.style.left = (Math.random() * 100) + '%';
        orb.style.top = (Math.random() * 100) + '%';
        orb.style.width = (Math.random() * 60 + 30) + 'px';
        orb.style.height = orb.style.width;
        orb.style.background = colors[Math.floor(Math.random() * colors.length)];
        orb.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(orb);
    }
}

// ============ STAR CONSTELLATION ============
function initStarConstellation() {
    const container = document.getElementById('starConstellation');
    if (!container) return;

    // Create cross pattern of stars
    const crossPattern = [
        { x: 50, y: 15 }, { x: 50, y: 20 }, { x: 50, y: 25 },
        { x: 45, y: 20 }, { x: 55, y: 20 }
    ];

    crossPattern.forEach((pos, i) => {
        const star = document.createElement('span');
        star.className = 'constellation-star';
        star.textContent = '✦';
        star.style.left = pos.x + '%';
        star.style.top = pos.y + '%';
        star.style.animationDelay = (i * 0.2) + 's';
        container.appendChild(star);
    });
}

// ============ BLESSING BUBBLES ============
const blessingMessages = [
    "God loves you!",
    "You're blessed!",
    "Stay joyful!",
    "Peace be with you!",
    "You're precious!",
    "Be happy always!"
];

function initBlessingBubbles() {
    const container = document.getElementById('blessingBubbles');
    if (!container) return;

    setInterval(() => {
        createBlessingBubble(container);
    }, 5000);
}

function createBlessingBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'blessing-bubble';
    bubble.textContent = blessingMessages[Math.floor(Math.random() * blessingMessages.length)];
    bubble.style.left = (Math.random() * 80 + 10) + '%';
    bubble.style.animationDuration = (Math.random() * 8 + 10) + 's';

    bubble.addEventListener('click', () => {
        speak(bubble.textContent);
        bubble.style.transform = 'scale(0)';
        setTimeout(() => bubble.remove(), 300);
    });

    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 18000);
}

// ============ DISCO LIGHTS ============
function initDiscoLights() {
    const container = document.getElementById('discoLights');
    if (!container) return;

    const colors = ['#ff6b9d', '#4facfe', '#43e97b', '#ffd700', '#ff6bff'];

    for (let i = 0; i < 8; i++) {
        const beam = document.createElement('div');
        beam.className = 'disco-beam';
        beam.style.background = `linear-gradient(to bottom, ${colors[i % colors.length]}, transparent)`;
        beam.style.transform = `rotate(${i * 45}deg)`;
        beam.style.animationDelay = (i * 0.2) + 's';
        container.appendChild(beam);
    }
}

// ============ PANDA PARADE ============
function initPandaParade() {
    const container = document.getElementById('pandaParade');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
        const panda = document.createElement('span');
        panda.textContent = '🐼';
        panda.style.fontSize = '2em';
        container.appendChild(panda);
    }
}

// ============ INTERACTIVE ELEMENTS ============
function initInteractiveElements() {
    // Wish Jar
    const wishJar = document.getElementById('wishJar');
    if (wishJar) {
        wishJar.addEventListener('click', () => {
            const wishes = [
                "May all your dreams come true!",
                "Wishing you endless happiness!",
                "May God's grace be upon you!",
                "May this year bring you joy!",
                "Blessings overflow in your life!"
            ];
            speak(wishes[Math.floor(Math.random() * wishes.length)]);
            fireCelebrationConfetti();
        });
    }

    // Fortune Cookie
    const cookie = document.getElementById('fortuneCookie');
    if (cookie) {
        cookie.addEventListener('click', () => {
            const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
            speak(verse.text + ". " + verse.reference);
            fireCelebrationConfetti();
        });
    }

    // Gift Unwrap
    const gift = document.getElementById('giftUnwrap');
    if (gift) {
        gift.addEventListener('click', () => {
            const giftClosed = gift.querySelector('.gift-closed');
            const giftMsg = gift.querySelector('.gift-message');
            if (giftClosed && giftMsg) {
                giftClosed.textContent = '🎊';
                giftMsg.classList.remove('hidden');
                speak("You are God's precious gift to this world, Annie!");
                fireCelebrationConfetti();
            }
        });
    }

    // Bible Open
    const bible = document.getElementById('bibleOpen');
    if (bible) {
        bible.addEventListener('click', () => {
            const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
            speak(verse.reference + ". " + verse.text);
        });
    }

    // Magic Wand Area (click anywhere for sparkles)
    const magicArea = document.getElementById('magicWandArea');
    if (magicArea) {
        page2.addEventListener('click', (e) => {
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 20,
                    spread: 50,
                    origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                    colors: ['#ffd700', '#ff6b9d', '#4facfe']
                });
            }
        });
    }
}

// ============ VOICE MESSAGES ============
function initVoiceMessages() {
    const messages = [
        "Annie, you are loved by God!",
        "Happy Birthday, beautiful soul!",
        "God has amazing plans for you, Annie!",
        "You are fearfully and wonderfully made!"
    ];

    let index = 0;
    setInterval(() => {
        if (page2 && page2.classList.contains('active')) {
            // Speak a blessing every 30 seconds
            speak(messages[index]);
            index = (index + 1) % messages.length;
        }
    }, 30000);
}

// Initialize Page 2 Particles
function initPage2Particles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-page2", {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: ["#ff6b9d", "#ffd700", "#43e97b", "#4facfe", "#ff6bff"] },
                shape: {
                    type: ["circle", "star", "heart"],
                },
                opacity: { value: 0.7, random: true },
                size: { value: 5, random: true },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    out_mode: "out"
                },
                twinkle: {
                    particles: { enable: true, frequency: 0.05, opacity: 1 }
                }
            },
            interactivity: {
                events: {
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    push: { quantity: 5 }
                }
            }
        });
    }
}

// Fire celebration confetti burst
function fireCelebrationConfetti() {
    if (typeof confetti === 'undefined') return;

    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#ff6b9d', '#ffd700', '#43e97b', '#4facfe']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#ff6b9d', '#ffd700', '#43e97b', '#4facfe']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Animate celebration text
function animateCelebrationText() {
    if (typeof gsap !== 'undefined') {
        const letters = document.querySelectorAll('.celeb-letter');
        gsap.fromTo(letters,
            { opacity: 0, y: -50, scale: 0, rotation: -180 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }
        );
    }
}

// Request Audio and Camera Permissions
function requestAudioPermissions() {
    // Enable audio context on user interaction
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Load voices
        window.speechSynthesis.getVoices();
    }

    // Create a silent audio context to unlock audio
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0; // Silent
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start(0);
        oscillator.stop(0.001);
    } catch (e) {
        console.log('Audio context not available');
    }

    // Request camera permission (but don't show yet)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            // Store stream for later use
            cameraStream = stream;
            // Stop the video tracks for now (we'll start them later)
            stream.getVideoTracks().forEach(track => track.enabled = false);
            console.log('Camera and mic permissions granted');
        })
        .catch(err => {
            console.log('Camera/mic permission denied:', err);
        });

    // Load face-api models
    loadFaceApiModels();
}

// Load Face API Models
async function loadFaceApiModels() {
    try {
        if (typeof faceapi !== 'undefined') {
            const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressions.loadFromUri(MODEL_URL)
            ]);
            faceApiLoaded = true;
            console.log('Face API models loaded');
        }
    } catch (error) {
        console.log('Face API loading error:', error);
    }
}

// Panda Carrying Cake Animation
function startPandaCakeAnimation() {
    console.log('Starting panda cake animation');
    pandaWithCake.classList.add('walking');

    // After panda walks to center, place cake on bench
    setTimeout(() => {
        console.log('Panda placing cake on bench');

        // Add 'placed' class to show cake on bench
        cakeContainer.classList.add('placed');

        // Hide the mini cake in panda's arms
        const miniCake = document.querySelector('.mini-cake');
        if (miniCake) {
            miniCake.style.opacity = '0';
        }

        // Hide panda after placing cake
        setTimeout(() => {
            pandaWithCake.style.opacity = '0';
            pandaWithCake.style.transition = 'opacity 1s';
        }, 1000);

        // Start countdown
        setTimeout(startCountdown, 2000);
    }, 3000); // Panda reaches center at 40% of 5s = 2s, wait 3s to be safe
}

// Play Happy Birthday Karaoke (Instrumental)
function playHappyBirthdayKaraoke() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        // Happy Birthday melody notes (in Hz)
        const melody = [
            { note: 262, duration: 0.4 }, // C - Hap-
            { note: 262, duration: 0.4 }, // C - py
            { note: 294, duration: 0.8 }, // D - birth-
            { note: 262, duration: 0.8 }, // C - day
            { note: 349, duration: 0.8 }, // F - to
            { note: 330, duration: 1.6 }, // E - you

            { note: 262, duration: 0.4 }, // C - Hap-
            { note: 262, duration: 0.4 }, // C - py
            { note: 294, duration: 0.8 }, // D - birth-
            { note: 262, duration: 0.8 }, // C - day
            { note: 392, duration: 0.8 }, // G - to
            { note: 349, duration: 1.6 }, // F - you

            { note: 262, duration: 0.4 }, // C - Hap-
            { note: 262, duration: 0.4 }, // C - py
            { note: 523, duration: 0.8 }, // C5 - birth-
            { note: 440, duration: 0.8 }, // A - day
            { note: 349, duration: 0.8 }, // F - dear
            { note: 330, duration: 0.8 }, // E - Ca-
            { note: 294, duration: 1.6 }, // D - sen-dra

            { note: 466, duration: 0.4 }, // Bb - Hap-
            { note: 466, duration: 0.4 }, // Bb - py
            { note: 440, duration: 0.8 }, // A - birth-
            { note: 349, duration: 0.8 }, // F - day
            { note: 392, duration: 0.8 }, // G - to
            { note: 349, duration: 1.6 }  // F - you
        ];

        let currentTime = audioContext.currentTime + 0.1;

        melody.forEach(({ note, duration }) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = note;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

            oscillator.start(currentTime);
            oscillator.stop(currentTime + duration);

            currentTime += duration;
        });

    } catch (error) {
        console.log('Karaoke audio not available:', error);
    }
}

// Voice: Sing Happy Birthday Casendra (Synchronized with Karaoke - Sustained & Spread)
function singHappyBirthdayCasendra() {
    if ('speechSynthesis' in window) {
        // Show audio indicator
        if (audioIndicator) {
            audioIndicator.style.display = 'block';
        }

        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        // Sustained lyrics with repeated consonants for better sound
        const lyrics = [
            "Happpy birrrtthhdayy to you",
            "Happpy birrrtthhdayy to you",
            "Happpy birrrtthhdayy dear Casendra",
            "Happpy birrrtthhdayy to you"
        ];

        // Timing to sync with karaoke music (in milliseconds)
        // Spread out to match the musical phrases better
        const lineTiming = [
            0,      // Start immediately - "Happy birthday to you"
            3400,   // After 3.4 seconds - "Happy birthday to you"
            6800,   // After 6.8 seconds - "Happy birthday dear Casendra"
            11000   // After 11 seconds - "Happy birthday to you"
        ];

        function singLine(lineIndex) {
            if (lineIndex < lyrics.length) {
                const utterance = new SpeechSynthesisUtterance(lyrics[lineIndex]);

                // Very slow and sustained for melodic singing
                utterance.rate = 0.55; // Much slower for sustained effect
                utterance.pitch = 1.2; // Slightly higher pitch for singing
                utterance.volume = 1.0;
                utterance.lang = 'en-IN';

                // Try to find an Indian male voice
                const voices = window.speechSynthesis.getVoices();
                const indianMaleVoice = voices.find(voice =>
                    voice.lang.includes('en-IN') ||
                    voice.name.includes('India') ||
                    voice.name.includes('Ravi') ||
                    voice.name.includes('Microsoft Ravi')
                ) || voices.find(voice =>
                    voice.name.includes('Male') ||
                    voice.name.includes('David')
                );

                if (indianMaleVoice) {
                    utterance.voice = indianMaleVoice;
                }

                utterance.onend = () => {
                    if (lineIndex >= lyrics.length - 1) {
                        // Hide audio indicator when done
                        if (audioIndicator) {
                            setTimeout(() => {
                                audioIndicator.style.display = 'none';
                            }, 2000);
                        }
                    }
                };

                utterance.onerror = (event) => {
                    console.log('Speech error:', event);
                    if (lineIndex >= lyrics.length - 1 && audioIndicator) {
                        audioIndicator.style.display = 'none';
                    }
                };

                window.speechSynthesis.speak(utterance);
            }
        }

        // Load voices first (some browsers need this)
        const startSinging = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                // Schedule each line to sync with karaoke
                lyrics.forEach((_, index) => {
                    setTimeout(() => singLine(index), lineTiming[index]);
                });
            } else {
                setTimeout(startSinging, 100);
            }
        };

        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = startSinging;
        } else {
            startSinging();
        }
    }
}

// Step 2: Countdown from 10 to 0
function startCountdown() {
    countdown.classList.remove('hidden');
    
    countdownInterval = setInterval(() => {
        countdownValue--;
        countdown.textContent = countdownValue;
        
        if (countdownValue === 0) {
            clearInterval(countdownInterval);
            countdown.classList.add('hidden');
            showBlowCandleNotification();
        }
    }, 1000);
}

// Step 3: Show "Blow the Candle" notification
function showBlowCandleNotification() {
    notification.textContent = '💨 BLOW THE CANDLE! 💨';
    notification.classList.add('show');
    
    // Enable candle blowing (click or spacebar)
    enableCandleBlowing();
    
    // Auto-blow after 6 seconds if not blown
    blowTimeout = setTimeout(() => {
        if (!candleBlown) {
            blowCandle();
        }
    }, 6000);
}

// Step 4: Enable Candle Blowing Interaction
function enableCandleBlowing() {
    // Click on candle to blow
    candleFire.style.cursor = 'pointer';
    candleFire.addEventListener('click', blowCandle);
    
    // Press spacebar to blow
    document.addEventListener('keydown', handleKeyPress);
    
    // Try to use microphone (optional - may require user permission)
    tryMicrophoneBlowing();
}

function handleKeyPress(e) {
    if (e.code === 'Space' && !candleBlown) {
        e.preventDefault();
        blowCandle();
    }
}

function tryMicrophoneBlowing() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                
                microphone.connect(analyser);
                analyser.fftSize = 256;
                
                function detectBlow() {
                    if (candleBlown) {
                        stream.getTracks().forEach(track => track.stop());
                        return;
                    }
                    
                    analyser.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    
                    // If sound level is high enough, consider it a blow
                    if (average > 50) {
                        blowCandle();
                        stream.getTracks().forEach(track => track.stop());
                    } else {
                        requestAnimationFrame(detectBlow);
                    }
                }
                
                detectBlow();
            })
            .catch(err => {
                console.log('Microphone not available, use click or spacebar instead');
            });
    }
}

// Step 5: Blow the Candle
function blowCandle() {
    if (candleBlown) return;
    candleBlown = true;

    clearTimeout(blowTimeout);
    document.removeEventListener('keydown', handleKeyPress);

    // Animate candle going out
    candleFire.style.animation = 'none';
    candleFire.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    candleFire.style.opacity = '0';
    candleFire.style.transform = 'translateX(-50%) scale(0.5)';

    notification.textContent = '🎊 HAPPY BIRTHDAY ANNIE! 🎊';

    // Start celebration after 1.5 seconds
    setTimeout(startCelebration, 1500);
}

// Step 8: Celebration with Poppers and Crackers
function startCelebration() {
    celebrationEffects.classList.remove('hidden');

    // Create confetti
    createConfetti();

    // Play celebration sound (optional)
    playCelebrationSound();

    // Say "God Bless You Annie" after 3 seconds
    setTimeout(() => {
        sayGodBlessYou();
    }, 3000);
}

// Voice: Say "God Bless You Annie"
function sayGodBlessYou() {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Wait a moment before speaking
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance("God bless you Annie! May all your dreams come true! Glory to God for this special day!");
            utterance.rate = 0.85;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.lang = 'en-IN';

            // Try to find an Indian male voice
            const voices = window.speechSynthesis.getVoices();
            const indianMaleVoice = voices.find(voice =>
                voice.lang.includes('en-IN') ||
                voice.name.includes('India') ||
                voice.name.includes('Ravi') ||
                voice.name.includes('Microsoft Ravi')
            ) || voices.find(voice =>
                voice.name.includes('Male') ||
                voice.name.includes('David')
            );

            if (indianMaleVoice) {
                utterance.voice = indianMaleVoice;
            }

            utterance.onend = () => {
                // Transition to page 3 after speech ends
                setTimeout(transitionToPage3, 2000);
            };

            utterance.onerror = (event) => {
                console.log('Speech error:', event);
                // Go to page 3 anyway
                setTimeout(transitionToPage3, 3000);
            };

            window.speechSynthesis.speak(utterance);
        }, 500);
    } else {
        // No speech synthesis, go to page 3 after delay
        setTimeout(transitionToPage3, 5000);
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const pandaConfettiContainer = document.querySelector('.panda-confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#6bcf7f', '#ff6bff', '#ffa07a', '#000', '#fff'];

    // Create 150 confetti pieces
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 20);
    }

    // Create panda emoji confetti
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const pandaConfetti = document.createElement('div');
            pandaConfetti.textContent = '🐼';
            pandaConfetti.style.position = 'absolute';
            pandaConfetti.style.fontSize = '2em';
            pandaConfetti.style.left = Math.random() * 100 + '%';
            pandaConfetti.style.animation = `confettiFall ${Math.random() * 2 + 3}s linear forwards`;
            pandaConfetti.style.animationDelay = Math.random() * 0.5 + 's';

            pandaConfettiContainer.appendChild(pandaConfetti);

            setTimeout(() => {
                pandaConfetti.remove();
            }, 6000);
        }, i * 50);
    }
}

function playCelebrationSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create celebration melody
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00]; // C, D, E, G, A

        notes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            const startTime = audioContext.currentTime + (index * 0.2);
            const endTime = startTime + 0.15;

            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);

            oscillator.start(startTime);
            oscillator.stop(endTime);
        });
    } catch (error) {
        console.log('Audio not available');
    }
}

// Add sparkle effect to background
function addSparkles() {
    const sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.backgroundColor = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.boxShadow = '0 0 10px #fff';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';

        page2.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }, 100);

    // Stop sparkles after 5 seconds
    setTimeout(() => clearInterval(sparkleInterval), 5000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(style);

// Start sparkles when celebration begins
const originalStartCelebration = startCelebration;
startCelebration = function() {
    originalStartCelebration();
    addSparkles();
};

// ============ SMILE AND VOICE DETECTION ============

// Start the smile and voice detection process
function startSmileVoiceDetection() {
    console.log('Starting smile and voice detection');

    // Show the detection section
    smileDetectionSection.classList.remove('hidden');

    // Start camera
    startCamera();

    // Start voice recognition
    startVoiceRecognition();
}

// Start Camera Feed
async function startCamera() {
    try {
        // If we already have a stream, reuse it
        if (cameraStream) {
            cameraStream.getVideoTracks().forEach(track => track.enabled = true);
            cameraFeed.srcObject = cameraStream;
        } else {
            // Request new stream
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 320, height: 240 },
                audio: false
            });
            cameraFeed.srcObject = cameraStream;
        }

        cameraFeed.onloadedmetadata = () => {
            cameraFeed.play();
            // Start smile detection loop
            detectSmile();
        };
    } catch (error) {
        console.error('Camera error:', error);
        smileStatus.textContent = '📷 Camera not available';
        // Allow proceeding without smile detection
        smileDetected = true;
        smileCheck.textContent = '✅';
        smileCheck.classList.add('success');
        checkBothConditions();
    }
}

// Detect Smile using Face API
async function detectSmile() {
    if (smileDetected) return;

    try {
        if (faceApiLoaded && typeof faceapi !== 'undefined') {
            const detections = await faceapi
                .detectSingleFace(cameraFeed, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections) {
                const expressions = detections.expressions;
                const happiness = expressions.happy || 0;

                if (happiness > 0.7) {
                    // Smile detected!
                    smileDetected = true;
                    smileStatus.textContent = '😊 Beautiful smile detected!';
                    smileCheck.textContent = '✅';
                    smileCheck.classList.add('success');
                    detectionMessage.textContent = '';
                    checkBothConditions();
                    return;
                } else if (happiness > 0.3) {
                    smileStatus.textContent = '🙂 Almost there... bigger smile!';
                    detectionMessage.textContent = 'Please smile more, Annie! 😊';
                } else {
                    smileStatus.textContent = '😐 Waiting for smile...';
                    detectionMessage.textContent = 'Please smile, Annieee! 😊';
                }
            } else {
                smileStatus.textContent = '👀 Looking for your face...';
            }
        } else {
            // Fallback: Simple brightness-based detection (basic)
            smileStatus.textContent = '😊 Show your beautiful smile!';
            detectionMessage.textContent = 'Smile for the camera, Annie!';
        }
    } catch (error) {
        console.log('Smile detection error:', error);
    }

    // Continue detection loop
    if (!smileDetected) {
        requestAnimationFrame(detectSmile);
    }
}

// Start Voice Recognition
function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        voiceStatus.textContent = '🎤 Voice recognition not available';
        // Allow manual confirmation
        createManualConfirmButton();
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        console.log('Heard:', transcript);
        voiceStatus.textContent = '🎤 Heard: "' + transcript.substring(0, 30) + '..."';

        // Check for the magic phrase (flexible matching)
        const lowerTranscript = transcript.toLowerCase();
        if (
            (lowerTranscript.includes('hey') || lowerTranscript.includes('heyyy')) &&
            (lowerTranscript.includes('glory') || lowerTranscript.includes('god')) &&
            (lowerTranscript.includes('victory') || lowerTranscript.includes('from him'))
        ) {
            phraseDetected = true;
            voiceStatus.textContent = '🎤 Perfect! Phrase detected!';
            voiceCheck.textContent = '✅';
            voiceCheck.classList.add('success');
            recognition.stop();
            checkBothConditions();
        }
    };

    recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
            voiceStatus.textContent = '🎤 Speak louder, Annie!';
        }
    };

    recognition.onend = () => {
        // Restart if phrase not detected
        if (!phraseDetected) {
            try {
                recognition.start();
            } catch (e) {
                console.log('Could not restart recognition');
            }
        }
    };

    try {
        recognition.start();
        voiceStatus.textContent = '🎤 Listening... Say the phrase!';
    } catch (error) {
        console.log('Could not start recognition:', error);
    }
}

// Create manual confirm button as fallback
function createManualConfirmButton() {
    const btn = document.createElement('button');
    btn.textContent = '🎤 I said the phrase! (Click to confirm)';
    btn.style.cssText = 'padding: 15px 30px; font-size: 1.2em; background: #4ecdc4; border: none; border-radius: 25px; cursor: pointer; margin-top: 15px;';
    btn.onclick = () => {
        phraseDetected = true;
        voiceCheck.textContent = '✅';
        voiceCheck.classList.add('success');
        checkBothConditions();
    };
    document.querySelector('.detection-card').appendChild(btn);
}

// Check if both conditions are met
function checkBothConditions() {
    console.log('Checking conditions - Smile:', smileDetected, 'Phrase:', phraseDetected);

    if (smileDetected && phraseDetected) {
        // Both conditions met! Celebrate and go to page 3
        detectionMessage.style.color = '#4ecdc4';
        detectionMessage.textContent = '🎉 Amazing! Glory to God indeed! 🎉';

        // Play success sound
        playCelebrationSound();

        // Stop camera
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }

        // Go to page 3 after 2 seconds
        setTimeout(goToPage3, 2500);
    }
}

// Navigate to Page 3
function goToPage3() {
    // Hide page 2
    page2.style.display = 'none';
    page2.classList.remove('active');

    // Show page 3
    page3.style.display = 'flex';
    page3.classList.add('active');

    // Fire more confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b']
        });
    }

    // Say congratulations
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Glory to God, Annie! All your victory is from Him! You are so blessed!");
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.lang = 'en-IN';

        const voices = window.speechSynthesis.getVoices();
        const indianMaleVoice = voices.find(voice =>
            voice.lang.includes('en-IN') || voice.name.includes('Ravi')
        ) || voices.find(voice => voice.name.includes('Male') || voice.name.includes('David'));
        if (indianMaleVoice) utterance.voice = indianMaleVoice;

        window.speechSynthesis.speak(utterance);
    }
}

// Transition to Page 3 (after birthday song)
function transitionToPage3() {
    // Stop any ongoing processes
    stopFireworks(2);

    // Hide page 2
    page2.style.display = 'none';
    page2.classList.remove('active');

    // Show page 3
    page3.style.display = 'flex';
    page3.classList.add('active');

    // Initialize Page 3 features
    initPage3();

    // Celebration confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b', '#ff6bff']
        });
    }

    // Say final message
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance("Glory to God, Annie! All your victory is from Him! You are God's precious daughter!");
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.lang = 'en-IN';

        const voices = window.speechSynthesis.getVoices();
        const indianMaleVoice = voices.find(voice =>
            voice.lang.includes('en-IN') || voice.name.includes('Ravi')
        ) || voices.find(voice => voice.name.includes('Male') || voice.name.includes('David'));
        if (indianMaleVoice) utterance.voice = indianMaleVoice;

        window.speechSynthesis.speak(utterance);
    }
}

// ============ CALENDAR FUNCTIONS ============

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Initialize Calendar (now Bible Verse navigation)
function initCalendar() {
    initCalendarParticles();
    initBibleVerseNavigation();
}

// Initialize Bible Verse Navigation
function initBibleVerseNavigation() {
    const verseSlide1 = document.getElementById('verseSlide1');
    const verseSlide2 = document.getElementById('verseSlide2');
    const nextBtn1 = document.getElementById('verseNextBtn1');
    const nextBtn2 = document.getElementById('verseNextBtn2');
    const calPage = document.getElementById('calendarPage');

    // First Next button - go to verse 2 and change background
    if (nextBtn1) {
        nextBtn1.addEventListener('click', () => {
            console.log('Going to verse 2');

            // Hide verse 1, show verse 2
            verseSlide1.classList.remove('active');
            verseSlide2.classList.add('active');

            // Change background to her image
            calPage.classList.add('verse2-active');
        });
    }

    // Second Next button - say happy expansion year and go to page 3
    if (nextBtn2) {
        nextBtn2.addEventListener('click', () => {
            console.log('Going to celebration!');

            // Say Happy Expansion Year Casendra
            speak("HAPPY EXPANSION YEAR CASENDRA");

            // Fire celebration confetti
            try { fireCalendarConfetti(); } catch(e) { console.log('Confetti error:', e); }

            // Go to page 3 after 2 seconds
            setTimeout(function() {
                console.log('Navigating to page3...');

                // Hide calendar page
                const calPage = document.getElementById('calendarPage');
                if (calPage) {
                    calPage.style.display = 'none';
                    calPage.classList.remove('active');
                }

                // Show page 3
                const pg3 = document.getElementById('page3');
                if (pg3) {
                    pg3.style.display = 'flex';
                    pg3.style.visibility = 'visible';
                    pg3.style.opacity = '1';
                    pg3.classList.add('active');
                    console.log('Page 3 shown!');
                }

                // Initialize page 3
                try { initPage3(); } catch(e) { console.log('Page 3 init error:', e); }
            }, 2000);
        });
    }

    // GSAP animation for verse content
    if (typeof gsap !== 'undefined') {
        gsap.from('.verse-content-box', {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 1,
            ease: 'back.out(1.7)'
        });
    }
}

// Initialize Calendar Particles
function initCalendarParticles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-calendar", {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: ["#ffd700", "#ffffff", "#a0c4ff"] },
                shape: {
                    type: ["circle", "star"],
                    star: { sides: 5 }
                },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "top",
                    random: true,
                    out_mode: "out"
                },
                twinkle: {
                    particles: { enable: true, frequency: 0.08, opacity: 1 }
                }
            }
        });
    }
}

// Typewriter for calendar hint
function initCalendarTypewriter() {
    if (calendarHintText && typeof Typed !== 'undefined') {
        new Typed('#calendarHintText', {
            strings: [
                "Select Annie's special birthday...",
                "Hint: It's in January 🎂",
                "When was God's precious daughter born?",
                "Find the blessed day..."
            ],
            typeSpeed: 40,
            backSpeed: 20,
            backDelay: 2500,
            loop: true,
            showCursor: false
        });
    }
}

// Render Calendar
function renderCalendar() {
    // Re-fetch elements to ensure they exist
    const grid = document.getElementById('daysGrid');
    const title = document.getElementById('monthTitle');

    if (!grid || !title) {
        console.error('❌ Calendar elements not found!');
        return;
    }

    title.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    grid.innerHTML = '';

    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        grid.appendChild(emptyCell);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        dayCell.dataset.day = day;
        dayCell.dataset.month = currentMonth;
        dayCell.dataset.year = currentYear;

        // Add click handler
        dayCell.addEventListener('click', () => handleDateClick(day, currentMonth, currentYear, dayCell));

        grid.appendChild(dayCell);
    }

    console.log('✅ Calendar rendered with', daysInMonth, 'days');
}

// Handle Date Click
function handleDateClick(day, month, year, cellElement) {
    // Create ripple effect
    createRippleEffect(cellElement);

    // Check if correct date
    if (month === ANNIE_BIRTHDAY_MONTH && day === ANNIE_BIRTHDAY_DAY) {
        // Correct date!
        cellElement.classList.add('correct');
        calendarMessage.style.color = '#ff1493';
        calendarMessage.innerHTML = '🎉 <span style="font-family: Dancing Script, cursive; font-size: 1.5em;">Happy Expansion Year Casendra!</span> 🎉';

        // Fire celebration confetti
        fireCalendarConfetti();

        // Say HAPPY EXPANSION YEAR CASENDRA
        speak("HAPPY EXPANSION YEAR CASENDRA");

        // GSAP celebration animation
        if (typeof gsap !== 'undefined') {
            gsap.to(cellElement, {
                scale: 1.3,
                duration: 0.3,
                yoyo: true,
                repeat: 3
            });
        }

        // GO TO PAGE 3 AFTER 2 SECONDS
        setTimeout(function() {
            showPage('page3');
            initPage3();
        }, 2000);

    } else {
        // Wrong date
        cellElement.classList.add('wrong');
        calendarMessage.style.color = '#ff6b6b';
        calendarMessage.innerHTML = '❌ <span style="font-family: Dancing Script, cursive;">That\'s not the right date, Annie!</span>';

        // Remove wrong class after animation
        setTimeout(() => {
            cellElement.classList.remove('wrong');
        }, 500);

        // Say SELECT CORRECT DATE ANNIE
        speak("SELECT CORRECT DATE ANNIE");

        // Clear message after delay
        setTimeout(() => {
            calendarMessage.innerHTML = '';
        }, 3000);
    }
}

// Fire massive poppers for correct date
function fireMassivePoppers() {
    if (typeof confetti === 'undefined') return;

    // Multiple popper bursts
    const popperPositions = [
        { x: 0.1, y: 0.9 },
        { x: 0.3, y: 0.85 },
        { x: 0.5, y: 0.9 },
        { x: 0.7, y: 0.85 },
        { x: 0.9, y: 0.9 }
    ];

    popperPositions.forEach((pos, index) => {
        setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: pos,
                colors: ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b', '#ff6bff'],
                shapes: ['circle', 'square'],
                scalar: 1.2
            });
        }, index * 200);
    });

    // Big center burst
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ffd700', '#ff6b9d', '#4facfe'],
            shapes: ['star'],
            scalar: 1.5
        });
    }, 1000);
}

// Fire celebration confetti for correct date
function fireCalendarConfetti() {
    if (typeof confetti === 'undefined') return;

    // Massive celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ffd700', '#ff6b9d', '#4facfe', '#43e97b', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: colors
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();

    // Add some stars and hearts
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#ffd700', '#ff6b9d'],
            shapes: ['star']
        });
    }, 500);
}

// ============ RIPPLE EFFECT ============
function createRippleEffect(element) {
    const canvas = document.getElementById('rippleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    let radius = 0;
    const maxRadius = Math.max(canvas.width, canvas.height);

    function animateRipple() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 215, 0, ${1 - radius / maxRadius})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        radius += 10;

        if (radius < maxRadius / 2) {
            requestAnimationFrame(animateRipple);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animateRipple();
}

// ============ GOLDEN AURA ============
function activateGoldenAura() {
    const aura = document.getElementById('goldenAura');
    if (aura) {
        aura.classList.add('active');
        setTimeout(() => {
            aura.classList.remove('active');
        }, 2000);
    }
}

// ============ VOICE COUNTDOWN ============
function voiceCountdown(callback) {
    const numbers = ['3', '2', '1'];
    let index = 0;

    function sayNumber() {
        if (index < numbers.length) {
            speak(numbers[index]);
            index++;
            setTimeout(sayNumber, 1000);
        } else {
            if (callback) callback();
        }
    }

    sayNumber();
}

// ============ PAGE TRANSITIONS ============
function transitionToPage(targetPage, callback) {
    const currentPage = document.querySelector('.page.active');

    if (currentPage) {
        currentPage.classList.add('transitioning-out');

        setTimeout(() => {
            currentPage.classList.remove('active', 'transitioning-out');
            targetPage.classList.add('active', 'transitioning-in');

            setTimeout(() => {
                targetPage.classList.remove('transitioning-in');
                if (callback) callback();
            }, 500);
        }, 500);
    } else {
        targetPage.classList.add('active');
        if (callback) callback();
    }
}

// ============ PARALLAX EFFECT ============
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.5;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ============ LOTTIE ANIMATION ============
function initLottieAnimation() {
    const container = document.getElementById('lottieCelebration');
    if (container && typeof lottie !== 'undefined') {
        lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets2.lottiefiles.com/packages/lf20_u4yrau.json' // Celebration animation
        });
    }
}

// ============ AGE DISPLAY ============
function displayAge() {
    const ageNumber = document.getElementById('ageNumber');
    if (ageNumber) {
        // Calculate age (birthday is Jan 21)
        const today = new Date();
        const birthDate = new Date(2006, 0, 21); // Annie's birth year - turning 20
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Animate number
        let currentNum = 0;
        const interval = setInterval(() => {
            currentNum++;
            ageNumber.textContent = currentNum;
            if (currentNum >= age) {
                clearInterval(interval);
                // Celebration effect
                if (typeof confetti !== 'undefined') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.3 }
                    });
                }
            }
        }, 50);
    }
}

// ============ INITIALIZE PAGE 3 ============
function initPage3() {
    initLottieAnimation();
    displayAge();
    initFloatingHearts();
    initPage3Buttons();
    initFeedbackForm();

    // Initialize Page 3 particles
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-page3", {
            particles: {
                number: { value: 30 },
                color: { value: ["#ffd700", "#ff6b9d", "#4facfe"] },
                shape: { type: "star" },
                opacity: { value: 0.7 },
                size: { value: 5, random: true },
                move: { enable: true, speed: 2 }
            }
        });
    }
}

// ============ FLOATING HEARTS ============
function initFloatingHearts() {
    const container = document.getElementById('floatingHeartsBg');
    if (!container) return;

    const hearts = ['💕', '💖', '💝', '💗', '💓', '❤️', '🩷'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (Math.random() * 100) + '%';
        heart.style.top = (Math.random() * 100) + '%';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(heart);
    }
}

// ============ PAGE 3 INTERACTIVE BUTTONS ============
function initPage3Buttons() {
    // Confetti Boom Button
    const confettiBtn = document.getElementById('confettiBoomBtn');
    if (confettiBtn) {
        confettiBtn.addEventListener('click', () => {
            fireCelebrationConfetti();
            fireMassivePoppers();
            speak("Celebration time! Woohoo!");
        });
    }

    // Replay Music Button
    const replayBtn = document.getElementById('replayMusicBtn');
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            const audio = document.getElementById('birthdayAudio');
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
            playHappyBirthdayKaraoke();
            speak("Happy Birthday to you, Annie!");
        });
    }

    // Get Blessing Button
    const blessingBtn = document.getElementById('blessingBtn');
    if (blessingBtn) {
        blessingBtn.addEventListener('click', () => {
            const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
            speak(verse.reference + ". " + verse.text);

            // Show small confetti
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ffd700', '#ff6b9d']
                });
            }
        });
    }
}

// ============ FEEDBACK FORM (EMAIL) ============
function initFeedbackForm() {
    const sendBtn = document.getElementById('sendFeedbackBtn');
    const messageInput = document.getElementById('feedbackMessage');
    const statusDiv = document.getElementById('feedbackStatus');

    if (!sendBtn || !messageInput || !statusDiv) return;

    sendBtn.addEventListener('click', async () => {
        const message = messageInput.value.trim();

        if (!message) {
            statusDiv.className = 'feedback-status error';
            statusDiv.textContent = '❌ Please write something before sending!';
            speak("Please write a message first!");
            return;
        }

        // Show sending status
        statusDiv.className = 'feedback-status sending';
        statusDiv.textContent = '✨ Sending your beautiful message...';
        sendBtn.disabled = true;

        try {
            // Use EmailJS or FormSubmit service to send email
            // FormSubmit is a free service that forwards form data to email
            const response = await fetch('https://formsubmit.co/ajax/bhanuprakash618556@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    subject: '💝 Message from Annie - Birthday Celebration',
                    message: message,
                    _subject: 'Annie Birthday Feedback',
                    _template: 'table'
                })
            });

            if (response.ok) {
                statusDiv.className = 'feedback-status success';
                statusDiv.textContent = '💕 Thank you! Your message has been sent with love! 💕';
                messageInput.value = '';
                speak("Thank you Annie! Your beautiful message has been sent!");

                // Celebration confetti
                fireCelebrationConfetti();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            // Fallback: Use mailto link
            const mailtoLink = `mailto:bhanuprakash618556@gmail.com?subject=💝 Message from Annie - Birthday Celebration&body=${encodeURIComponent(message)}`;

            // Try opening mail client
            window.open(mailtoLink, '_blank');

            statusDiv.className = 'feedback-status success';
            statusDiv.textContent = '💕 Opening your email app to send the message! 💕';
            speak("Opening email to send your message!");
        }

        sendBtn.disabled = false;
    });
}

// ============ VOICE MESSAGE PLAYER ============
function initVoiceMessagePlayer() {
    const playBtn = document.getElementById('playMessageBtn');
    const audio = document.getElementById('specialMessage');

    if (!playBtn || !audio) return;

    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            // Pause audio
            audio.pause();
            playBtn.classList.remove('playing');
            playBtn.querySelector('.play-icon').textContent = '▶️';
            playBtn.querySelector('.play-text').textContent = 'Listen to My Message';
            isPlaying = false;
        } else {
            // Play audio
            audio.play();
            playBtn.classList.add('playing');
            playBtn.querySelector('.play-icon').textContent = '⏸️';
            playBtn.querySelector('.play-text').textContent = 'Playing...';
            isPlaying = true;
        }
    });

    // When audio ends
    audio.addEventListener('ended', () => {
        playBtn.classList.remove('playing');
        playBtn.querySelector('.play-icon').textContent = '▶️';
        playBtn.querySelector('.play-text').textContent = 'Listen Again';
        isPlaying = false;
    });
}

// Initialize voice message player when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initVoiceMessagePlayer, 1000);
});

// ============ BIBLE VERSE RAIN ============
// Disabled - Using marquee style in startVerseRain() instead
// The verse rain now runs as a horizontal marquee at the bottom of the page

// ============ GOOGLE SIGN-IN & EMAIL FUNCTIONALITY ============

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = "Rp9CBlaIAn9jQaojc";
const EMAILJS_SERVICE_ID = "service_ary36e5";
const EMAILJS_TEMPLATE_ID = "template_1fjqcei";
const RECIPIENT_EMAIL = "bhanuprakash618556@gmail.com";

let currentUser = null;

// Initialize Auth and Email
function initAuthAndEmail() {
    console.log('🔐 Initializing Auth and Email...');

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS initialized with public key');
    } else {
        console.error('❌ EmailJS not loaded!');
    }

    // Setup event listeners
    setupAuthEventListeners();
    console.log('✅ Email system ready');
}

// Setup authentication event listeners
function setupAuthEventListeners() {
    const googleSigninBtn = document.getElementById('googleSigninBtn');
    const signoutBtn = document.getElementById('signoutBtn');
    const sendFeedbackBtn = document.getElementById('sendFeedbackBtn');

    if (googleSigninBtn) {
        googleSigninBtn.addEventListener('click', handleGoogleSignIn);
        console.log('✅ Google Sign-In button ready');
    }

    if (signoutBtn) {
        signoutBtn.addEventListener('click', handleSignOut);
    }

    if (sendFeedbackBtn) {
        sendFeedbackBtn.addEventListener('click', handleSendMessage);
    }
}

// Handle Google Sign-In - Shows a nice modal for Annie to enter her details
async function handleGoogleSignIn() {
    console.log('🔐 Starting Sign-In...');

    // Create a beautiful sign-in modal
    showSignInModal();
}

// Beautiful Sign-In Modal
function showSignInModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'signinModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #fff0f5, #ffe4e1);
            padding: 40px;
            border-radius: 30px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(255, 105, 180, 0.4);
            border: 3px solid #ff69b4;
        ">
            <h2 style="font-family: 'Dancing Script', cursive; font-size: 2em; color: #ff1493; margin-bottom: 20px;">
                🐼 Welcome, Annie! 🐼
            </h2>
            <p style="font-family: 'Playfair Display', serif; color: #666; margin-bottom: 25px;">
                Please enter your details to send a message
            </p>
            <input type="text" id="modalName" placeholder="Your Name" value="Annie" style="
                width: 100%;
                padding: 15px;
                border: 2px solid #ffb6c1;
                border-radius: 25px;
                font-size: 1.1em;
                margin-bottom: 15px;
                text-align: center;
                font-family: 'Playfair Display', serif;
            ">
            <input type="email" id="modalEmail" placeholder="Your Email" style="
                width: 100%;
                padding: 15px;
                border: 2px solid #ffb6c1;
                border-radius: 25px;
                font-size: 1.1em;
                margin-bottom: 25px;
                text-align: center;
                font-family: 'Playfair Display', serif;
            ">
            <button id="modalSubmit" style="
                background: linear-gradient(135deg, #ff69b4, #ff1493);
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 1.2em;
                border-radius: 50px;
                cursor: pointer;
                font-family: 'Dancing Script', cursive;
                box-shadow: 0 5px 20px rgba(255, 105, 180, 0.5);
            ">
                ✨ Continue ✨
            </button>
            <button id="modalCancel" style="
                background: transparent;
                color: #999;
                border: none;
                padding: 10px 20px;
                font-size: 1em;
                cursor: pointer;
                margin-top: 15px;
                display: block;
                width: 100%;
            ">
                Cancel
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Focus on name input
    document.getElementById('modalName').focus();

    // Handle submit
    document.getElementById('modalSubmit').addEventListener('click', () => {
        const name = document.getElementById('modalName').value.trim();
        const email = document.getElementById('modalEmail').value.trim();

        if (name && email) {
            currentUser = {
                displayName: name,
                email: email,
                photoURL: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=ff69b4&color=fff&size=100"
            };

            modal.remove();
            updateUIAfterSignIn(currentUser);
            speak("Welcome, " + name + "! You can now send your message.");
            console.log('✅ Signed in as:', name);
        } else {
            alert("Please enter both name and email!");
        }
    });

    // Handle cancel
    document.getElementById('modalCancel').addEventListener('click', () => {
        modal.remove();
    });

    // Handle Enter key
    modal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('modalSubmit').click();
        }
    });
}

// Update UI after successful sign-in
function updateUIAfterSignIn(user) {
    const googleSigninSection = document.getElementById('googleSigninSection');
    const userInfoSection = document.getElementById('userInfoSection');
    const messageForm = document.getElementById('messageForm');
    const userPhoto = document.getElementById('userPhoto');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');

    if (googleSigninSection) googleSigninSection.style.display = 'none';
    if (userInfoSection) userInfoSection.style.display = 'block';
    if (messageForm) messageForm.style.display = 'block';

    if (userPhoto) userPhoto.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName) + "&background=ff69b4&color=fff";
    if (userName) userName.textContent = user.displayName || 'User';
    if (userEmail) userEmail.textContent = user.email || '';

    console.log('✅ UI updated for signed-in user');
}

// Handle Sign-Out
function handleSignOut() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut();
    }

    currentUser = null;

    const googleSigninSection = document.getElementById('googleSigninSection');
    const userInfoSection = document.getElementById('userInfoSection');
    const messageForm = document.getElementById('messageForm');

    if (googleSigninSection) googleSigninSection.style.display = 'block';
    if (userInfoSection) userInfoSection.style.display = 'none';
    if (messageForm) messageForm.style.display = 'none';

    speak("Signed out successfully!");
    console.log('✅ User signed out');
}

// Handle Send Message - Using EmailJS
async function handleSendMessage() {
    const feedbackMessage = document.getElementById('feedbackMessage');
    const feedbackStatus = document.getElementById('feedbackStatus');

    if (!currentUser) {
        alert("Please sign in first!");
        return;
    }

    const message = feedbackMessage ? feedbackMessage.value.trim() : '';

    if (!message) {
        alert("Please type a message first!");
        return;
    }

    // Show sending status
    if (feedbackStatus) {
        feedbackStatus.textContent = "💫 Sending your message...";
        feedbackStatus.className = "feedback-status sending";
    }

    console.log('📧 Sending message via EmailJS...');

    // Prepare template parameters
    const templateParams = {
        from_name: currentUser.displayName,
        from_email: currentUser.email,
        to_email: RECIPIENT_EMAIL,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    try {
        // Send via EmailJS
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('✅ EmailJS success:', response);
        showMessageSuccess(feedbackStatus, feedbackMessage);
    } catch (error) {
        console.error('❌ EmailJS error:', error);
        if (feedbackStatus) {
            feedbackStatus.textContent = "❌ Error sending message. Please try again.";
            feedbackStatus.className = "feedback-status error";
        }
    }
}

// Show success message
function showMessageSuccess(feedbackStatus, feedbackMessage) {
    if (feedbackStatus) {
        feedbackStatus.textContent = "✅ Message sent successfully! 💕";
        feedbackStatus.className = "feedback-status success";
    }

    if (feedbackMessage) {
        feedbackMessage.value = '';
    }

    speak("Your message has been sent! Thank you!");

    // Celebration effect
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ffd700', '#ff1493']
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAuthAndEmail, 1000);
});

