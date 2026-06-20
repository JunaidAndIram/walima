// window.addEventListener("load", () => {
//   setTimeout(startConfettiLoop, 10000); // 10s delay
// });

// function startConfettiLoop() {
//   let skew = 1;

//   function randomInRange(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   function updateViewport() {
//     // Fix for mobile browsers (Brave/Safari/Chrome UI bars)
//     document.documentElement.style.setProperty(
//       "--vh",
//       `${(window.innerHeight * 1.2) * 0.01}px`
//     );
//   }

//   updateViewport();
//   window.addEventListener("resize", updateViewport);
//   window.addEventListener("orientationchange", updateViewport);

//   (function frame() {
//     skew = Math.max(0.8, skew - 0.001);

//     // subtle continuous emission
//     if (Math.random() < 0.2) {
//       confetti({
//         particleCount: 1,
//         startVelocity: 0,
//         ticks: 300,

//         origin: {
//           x: Math.random(),
//           y: Math.random() * skew - 0.2,
//         },

//         colors: ["#F8D655"],
//         shapes: ["circle"],

//         gravity: randomInRange(0.4, 0.6),
//         scalar: randomInRange(0.4, 1),
//         drift: randomInRange(-0.4, 0.4),
//       });
//     }

//     requestAnimationFrame(frame);
//   })();
// }


window.addEventListener("load", () => {
  setTimeout(startConfettiLoop, 10000); // 10s delay
});

function startConfettiLoop() {
  let skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function updateViewport() {
    // Mobile browser viewport fix
    document.documentElement.style.setProperty(
      "--vh",
      `${(window.innerHeight * 1.2) * 0.01}px`
    );

    // 🔥 IMPORTANT FIX:
    // Increase INTERNAL canvas height
    // so collapsing mobile bars don't leave empty space
    const canvas = document.querySelector("canvas");

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2;
    }
  }

  updateViewport();

  window.addEventListener("resize", updateViewport);
  window.addEventListener("orientationchange", updateViewport);

  (function frame() {
    skew = Math.max(0.8, skew - 0.001);

    // subtle continuous emission
    if (Math.random() < 0.15) {
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: 300,

        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },

        colors: ["#F8D655"],
        shapes: ["circle"],

        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });
    }

    requestAnimationFrame(frame);
  })();
}