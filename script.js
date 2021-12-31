import { setupBird, updateBird, getBirdRects } from "./bird.js";
import { getPipeRects, setupPipe, updatePipe, getScore } from "./pipe.js";
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");

document.addEventListener("keypress", start, { once: true });

setupBird();

let lastUpdate = null;
let score = 0;

function start() {
   title.classList.add("hidden");
   setupBird();
   setupPipe();
   lastUpdate = null;
   score = 0;
   requestAnimationFrame(updateScreen);
}

function updateScreen(delay) {
   if (lastUpdate == null) {
      lastUpdate = delay;
      requestAnimationFrame(updateScreen);
      return;
   }
   const delta = delay - lastUpdate;
   lastUpdate = delay;
   updateBird(delta);
   updatePipe(delta);
   const birdRects = getBirdRects();
   const pipeRects = getPipeRects();
   if (pipeRects[0].right < birdRects.left) score++;
   if (haveCollided() === true) {
      setTimeout(() => {
         title.classList.remove("hidden");
         subtitle.classList.remove("hidden");
         subtitle.textContent = `${getScore()} pipes.`;
         document.addEventListener("keypress", start, { once: true });
      }, 200);
      return;
   }
   requestAnimationFrame(updateScreen);
}

function haveCollided() {
   const birdRects = getBirdRects();
   const pipeRects = getPipeRects();
   const outOfScreen =
      birdRects.top < 0 || birdRects.bottom > window.innerHeight;
   const pipeCollision = pipeRects.some(rect => {
      return (
         birdRects.top < rect.bottom &&
         birdRects.bottom > rect.top &&
         birdRects.left < rect.right &&
         birdRects.right > rect.left
      );
   });
   return outOfScreen || pipeCollision;
}
