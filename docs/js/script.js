const weddingDate = new Date("2026-06-29T17:00").getTime();
//  const weddingDate = new Date().getTime() + 10 * 1500;
// const weddingDate = Date.now() + 0.5 * 24 * 60 * 60 * 1000;

let fireworksStarted = false;
let fireworksInterval = null;
let lastSecond = null;
let countdownEnded = false;

// fast refresh for smooth countdown (prevents skipped seconds)
setInterval(updateCountdown, 200);

function updateCountdown() {
  const now = Date.now();
  let distance = weddingDate - now;

  // 💍 ZERO STATE
 if (distance <= 200)  {
    if (countdownEnded) return;
    countdownEnded = true;

    const counterSection = document.getElementById("countdown-content");
    const message = document.getElementById("countdown-message");
    const btn = document.querySelector(".primary-button");

    if (counterSection) counterSection.classList.add("invisible");

    if (message) {
      message.classList.remove("invisible");
      message.classList.add("reduce-text-size");
    }

    if (btn) {
      btn.removeAttribute("onclick");
    }

    // stop any old loop (safe cleanup)
    clearTimeout(fireworksInterval);

    // initial burst
    setTimeout(() => {
      runFireworks(5);
    }, 100);

    // natural repeating fireworks loop
    function fireworksLoop() {
      runFireworks(3);

      const delay = 6000 + Math.random() * 4000; // 6–10s pause
      fireworksInterval = setTimeout(fireworksLoop, delay);
    }

    if (!fireworksStarted) {
      fireworksStarted = true;
      fireworksLoop();
    }

    return;
  }

  // 🔢 prevent unnecessary DOM updates
  const totalSeconds = Math.floor(distance / 1000);
  if (totalSeconds === lastSecond) return;
  lastSecond = totalSeconds;

  // time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

  const weddingText = document.querySelector("#wedding-day-text");

  if (weddingText) {
    if (distance <= 5000 && distance > 0 && weddingText) {
      weddingText.textContent = "It’s happening";
    } 
  }
}

function openInvite() {
  const intro = document.getElementById("intro");
  const content = document.querySelector(".content");

  setTimeout(() => {
    intro.classList.add("show_corners");
  }, 100);

  setTimeout(() => {
    intro.classList.add("split");
  }, 1800);

  setTimeout(() => {
    intro.classList.add("hide");
    content.classList.add("show");
  }, 3000);

  setTimeout(() => {
    if (!fireworksStarted) {
      runFireworks(5);
    }
  }, 3000);
}

window.onload = function () {
  updateCountdown();
  openInvite();
};


let finalSceneTriggered = false;
const weddingEndSceneTime = new Date("2026-06-29T22:30").getTime();

function checkFinalScene() {
  if (finalSceneTriggered) return;

  const now = Date.now();

  if (now >= weddingEndSceneTime) {
    finalSceneTriggered = true;

    const mainContent = document.querySelector(".content");

    // 🧹 remove / hide everything old
    if (mainContent) {
      mainContent.classList.add("invisible");
      mainContent.classList.remove("show");
    }

    // 🎉 show final wedding content
    const finalContent = document.getElementById("finished-content");

    if (finalContent) {
      finalContent.classList.remove("invisible");
      finalContent.classList.add("show");
    }
    return;
  }

  requestAnimationFrame(checkFinalScene);
}

/* =========================
   START
========================= */
window.onload = function () {
  openInvite();
  requestAnimationFrame(checkFinalScene);
};