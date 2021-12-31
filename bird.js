const bird = document.querySelector(".bird");
const BIRD_SIZE = 50;
const BIRD_SPEED = 0.5;
const JUMP_TIME = 125;

let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird() {
   setTop(window.innerHeight / 2 - BIRD_SIZE / 2);
   timeSinceLastJump = Number.POSITIVE_INFINITY;
   document.removeEventListener("keydown", jump);
   document.addEventListener("keydown", jump);
}

export function updateBird(delay) {
   if (timeSinceLastJump < JUMP_TIME) {
      setTop(getTop() - delay * BIRD_SPEED);
   } else {
      setTop(getTop() + delay * BIRD_SPEED);
   }
   timeSinceLastJump += delay;
}

export function getBirdRects() {
   return bird.getClientRects()[0];
}

function setTop(val) {
   bird.style.setProperty("--bird-top", val);
}

function getTop() {
   return parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"));
}

function jump(e) {
   if (e.code == "Space") timeSinceLastJump = 0;
}
