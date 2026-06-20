const container = document.getElementById("fireworks");

const baseOptions = {
  speed: 3,
  acceleration: 1.02,
  friction: 0.96,
  gravity: 1.1,
  particles: 90,
  trace: 3,
  explosion: 6,
  intensity: 18,
  brightness: { min: 70, max: 100 },
  hue: {  min: 40, max: 55  }, 
  autoresize: true,
};
const fireworks = new Fireworks.default(container, baseOptions);

let fadeTimeout;
let stopTimeout;

function runFireworks(duration) {
  // clear any previous run
  clearTimeout(fadeTimeout);
  clearTimeout(stopTimeout);

  // reset to full power
  fireworks.updateOptions(baseOptions);
  fireworks.start();

  fadeTimeout = setTimeout(() => {
    // fade phase
    fireworks.updateOptions({
      intensity: 5,
      particles: 20,
      trace: 1,
      speed: 1,
    });

    stopTimeout = setTimeout(() => {
      fireworks.stop();
    }, 1500);

  }, duration * 1000);
}





// const container = document.getElementById("fireworks");

// let fireworks;
// let fadeTimeout;
// let stopTimeout;

// const isMobile = /iPhone|Android/i.test(navigator.userAgent);

// /* -----------------------------
//    CREATE INSTANCE
// ------------------------------*/
// function createFireworks() {
//   fireworks = new Fireworks.default(container, {
//     autoresize: true,

//     speed: isMobile ? 1.35 : 1.7,
//     acceleration: 1.02,

//     friction: isMobile ? 0.98 : 0.97,
//     gravity: isMobile ? 1.02 : 1.08,

//     // 🔥 richer but still mobile-safe density
//     particles: isMobile ? 90 : 160,
//     trace: isMobile ? 5 : 6,
//     explosion: isMobile ? 6 : 7,
//     intensity: isMobile ? 16 : 22,

//     brightness: {
//       min: 78,
//       max: 100,
//     },

//     hue: {
//       min: 42,
//       max: 55,
//     },
//   });
// }

// /* -----------------------------
//    DPI FIX (SHARP ON MOBILE)
// ------------------------------*/
// function fixDPI() {
//   const canvas = container.querySelector("canvas");
//   if (!canvas) return;

//   const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
//   const rect = canvas.getBoundingClientRect();

//   canvas.width = rect.width * dpr;
//   canvas.height = rect.height * dpr;

//   canvas.style.width = rect.width + "px";
//   canvas.style.height = rect.height + "px";

//   const ctx = canvas.getContext("2d");
//   if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// }

// /* -----------------------------
//    MAIN FIREWORKS FUNCTION
// ------------------------------*/
// function runFireworks(duration = 5) {
//   clearTimeout(fadeTimeout);
//   clearTimeout(stopTimeout);

//   if (!fireworks) createFireworks();

//   fixDPI();

//   fireworks.stop();

//   /* 🔥 FULL POWER RESET EVERY TIME */
//   fireworks.updateOptions({
//     speed: isMobile ? 1.35 : 1.7,
//     acceleration: 1.02,

//     friction: isMobile ? 0.98 : 0.97,
//     gravity: isMobile ? 1.02 : 1.08,

//     particles: isMobile ? 90 : 160,
//     trace: isMobile ? 5 : 6,
//     explosion: isMobile ? 6 : 7,
//     intensity: isMobile ? 16 : 22,

//     brightness: {
//       min: 78,
//       max: 100,
//     },

//     hue: {
//       min: 42,
//       max: 55,
//     },
//   });

//   fireworks.start();

//   /* 🌙 soft fade (luxury decay, not abrupt stop) */
//   fadeTimeout = setTimeout(() => {
//     fireworks.updateOptions({
//       speed: 0.85,
//       gravity: 0.9,
//       intensity: 4,
//       particles: isMobile ? 25 : 40,
//       trace: 2,
//     });
//   }, duration * 1000);

//   /* 🛑 guaranteed stop */
//   stopTimeout = setTimeout(() => {
//     fireworks.stop();
//   }, (duration + 1.5) * 1000);
// }