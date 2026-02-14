/* ============================================
   VALENTINE'S DAY BEST FRIEND WEBSITE – JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== LOADING SCREEN (Click to Enter + Start Music) ==========
  const loader = document.getElementById('loader');
  const enterBtn = document.getElementById('enter-btn');
  const bgMusic = document.getElementById('bg-music');

  enterBtn.addEventListener('click', () => {
    // User gesture unlocks audio playback
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => { });
    isPlaying = true;

    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 800);

    // Update music toggle state
    const mt = document.getElementById('music-toggle');
    if (mt) mt.classList.add('playing');
  });

  let isPlaying = false;


  // ========== CURSOR HEART TRAIL ==========
  const trailContainer = document.getElementById('cursor-trail');
  const heartChars = ['💖', '💗', '💕', '💝', '❤️', '🤍', '🩷'];
  const heartColors = ['#FFB6C1', '#FF69B4', '#FF1493', '#FFF0F5'];
  let lastTrailTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 60) return; // throttle
    lastTrailTime = now;

    const heart = document.createElement('span');
    heart.classList.add('trail-heart');
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    const size = 10 + Math.random() * 16;
    heart.style.fontSize = size + 'px';
    heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    trailContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
  });


  // ========== FLOATING HEARTS BACKGROUND ==========
  const floatingContainer = document.getElementById('floating-hearts');
  const floatEmojis = ['💕', '💗', '💖', '💝', '🌸', '✨', '💫'];

  function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('float-heart');
    heart.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (0.6 + Math.random() * 1.2) + 'rem';
    const duration = 10 + Math.random() * 15;
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    floatingContainer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + 5) * 1000);
  }

  // Initial batch
  for (let i = 0; i < 15; i++) createFloatingHeart();
  setInterval(createFloatingHeart, 3000);


  // ========== SNOW HEARTS ==========
  const snowContainer = document.getElementById('snow-hearts');
  const snowChars = ['♥', '❤', '💗', '❥'];

  function createSnowHeart() {
    const heart = document.createElement('span');
    heart.classList.add('snow-heart');
    heart.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (0.5 + Math.random() * 0.8) + 'rem';
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    const duration = 8 + Math.random() * 12;
    heart.style.animationDuration = duration + 's';
    snowContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(createSnowHeart, Math.random() * 5000);
  }
  setInterval(createSnowHeart, 2500);


  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));


  // ========== MEMORIES HORIZONTAL SCROLL ==========
  const memTrack = document.getElementById('memories-track');
  const memPrev = document.getElementById('mem-prev');
  const memNext = document.getElementById('mem-next');
  const scrollAmt = 340;

  memPrev.addEventListener('click', () => {
    memTrack.parentElement.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
  });
  memNext.addEventListener('click', () => {
    memTrack.parentElement.scrollBy({ left: scrollAmt, behavior: 'smooth' });
  });


  // ========== FRIENDSHIP QUIZ ==========
  const quizQuestions = [
    {
      q: "Kis Khane Ke Piche Pagal hai",
      options: ['Ass Cream', 'Momos wali Baddie', ' Chocolate 🥵', 'Chaii'],
      answer: 1
    },
    // {
    //   q: "",
    //   options: ['🏖️ Bali', '🗼 Paris', '🏔️ Switzerland', '🏝️ Maldives'],
    //   answer: 2
    // },
    // {
    //   q: "Pareshaan Ho Kar Kya Karta hu",
    //   options: ['Ganne Sunna', '🎨 Draw/Create', '😴 Sleep', '📱 Scroll endlessly'],
    //   answer: 0
    // },
    {
      q: "Kyaa Shub Chize Boltaa Hu",
      options: ['BKL', 'Gandviii', 'Bihar ki Baddie', 'BC'],
      answer: 3
    }
  ];

  let currentQ = 0;
  let score = 0;
  const questionText = document.getElementById('question-text');
  const quizOptions = document.getElementById('quiz-options');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizQuestion = document.getElementById('quiz-question');
  const quizResult = document.getElementById('quiz-result');
  const resultEmoji = document.getElementById('result-emoji');
  const resultText = document.getElementById('result-text');
  const resultDesc = document.getElementById('result-desc');
  const quizRestart = document.getElementById('quiz-restart');
  const confettiCanvas = document.getElementById('confetti-canvas');

  function loadQuestion() {
    const q = quizQuestions[currentQ];
    questionText.textContent = q.q;
    quizOptions.innerHTML = '';
    quizProgressBar.style.width = ((currentQ) / quizQuestions.length * 100) + '%';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.classList.add('quiz-option');
      btn.textContent = opt;
      btn.dataset.answer = i;
      btn.addEventListener('click', () => handleAnswer(i, btn));
      quizOptions.appendChild(btn);
    });
  }

  function handleAnswer(index, btn) {
    const correct = quizQuestions[currentQ].answer === index;
    const allBtns = quizOptions.querySelectorAll('.quiz-option');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (correct) {
      btn.classList.add('correct');
      score++;
      launchConfetti();
    } else {
      btn.classList.add('wrong');
      allBtns[quizQuestions[currentQ].answer].classList.add('correct');
    }

    setTimeout(() => {
      currentQ++;
      if (currentQ < quizQuestions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 1200);
  }

  function showResult() {
    quizQuestion.classList.add('hidden');
    quizResult.classList.remove('hidden');
    quizProgressBar.style.width = '100%';

    const pct = score / quizQuestions.length;
    if (pct === 1) {
      resultEmoji.textContent = '🎉🥳';
      resultText.textContent = 'Perfect Score!';
      resultDesc.textContent = 'You know me better than I know myself! We\'re truly inseparable! 💕';
      launchConfetti();
    } else if (pct >= 0.5) {
      resultEmoji.textContent = '😍';
      resultText.textContent = 'Great Job!';
      resultDesc.textContent = 'You know me so well! That\'s why you\'re my bestie! 💖';
    } else {
      resultEmoji.textContent = '😂😜';
      resultText.textContent = 'Nice Try!';
      resultDesc.textContent = 'Looks like we need more hangouts! More memories to make 🌟';
    }
  }

  quizRestart.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    quizResult.classList.add('hidden');
    quizQuestion.classList.remove('hidden');
    loadQuestion();
  });

  loadQuestion();


  // ========== CONFETTI ==========
  function launchConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    const section = confettiCanvas.parentElement;
    confettiCanvas.width = section.offsetWidth;
    confettiCanvas.height = section.offsetHeight;

    const confetti = [];
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFA500', '#FF6347', '#87CEEB'];

    for (let i = 0; i < 80; i++) {
      confetti.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: 2 + Math.random() * 3,
        vx: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rv: Math.random() * 6 - 3,
        opacity: 1
      });
    }

    let frame = 0;
    const maxFrames = 150;

    function animate() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confetti.forEach(c => {
        c.y += c.vy;
        c.x += c.vx;
        c.rotation += c.rv;
        if (frame > maxFrames - 30) c.opacity -= 0.033;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, c.opacity);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
    animate();
  }


  // ========== MUSIC TOGGLE ==========
  const musicToggle = document.getElementById('music-toggle');
  const musicControls = document.getElementById('music-controls');
  const volumeSlider = document.getElementById('volume-slider');

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicControls.classList.add('hidden');
    } else {
      bgMusic.play().catch(() => { });
      musicToggle.classList.add('playing');
      musicControls.classList.remove('hidden');
    }
    isPlaying = !isPlaying;
  });

  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value / 100;
  });

  // Close volume on outside click
  document.addEventListener('click', (e) => {
    if (!musicToggle.contains(e.target)) {
      musicControls.classList.add('hidden');
    }
  });


  // ========== EASTER EGG ==========
  const easterPopup = document.getElementById('easter-egg-popup');
  const easterClose = document.getElementById('easter-close');
  let easterEggFound = false;

  // Easter egg: click the 5th floating deco heart in hero
  const decoHearts = document.querySelectorAll('.deco-heart');
  decoHearts.forEach(h => {
    h.style.pointerEvents = 'auto';
    h.style.cursor = 'pointer';
    h.addEventListener('click', () => {
      if (!easterEggFound) {
        easterEggFound = true;
        easterPopup.classList.remove('hidden');
        launchConfetti();
      }
    });
  });

  easterClose.addEventListener('click', () => {
    easterPopup.classList.add('hidden');
  });

  easterPopup.addEventListener('click', (e) => {
    if (e.target === easterPopup) easterPopup.classList.add('hidden');
  });


  // ========== SPARKLE ON SPECIAL ELEMENTS ==========
  function addSparkle(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle-particle');
      sparkle.style.left = Math.random() * rect.width + 'px';
      sparkle.style.top = Math.random() * rect.height + 'px';
      sparkle.style.setProperty('--tx', (Math.random() * 40 - 20) + 'px');
      sparkle.style.setProperty('--ty', (Math.random() * 40 - 20) + 'px');
      sparkle.style.background = ['#D4A456', '#FFD700', '#FFC0CB', '#FF69B4'][Math.floor(Math.random() * 4)];
      element.style.position = 'relative';
      element.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    }
  }

  // Sparkle on section titles when they become visible
  const titles = document.querySelectorAll('.section-title');
  const sparkleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => addSparkle(entry.target), 600);
        sparkleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titles.forEach(t => sparkleObserver.observe(t));


  // ========== SMOOTH SCROLL NAV (for any anchors) ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
