const PIPE_DURATION = 1000;
const PIPE_SPEED = 0.5;
const PIPE_WIDTH = 50;
const GAP_LENGTH = 175;

let timeSinceLastPipe = 0;
let pipes = [];
let score = 0;

export function setupPipe() {
   document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH);
   document.documentElement.style.setProperty("--gap-length", GAP_LENGTH);
   pipes.forEach(pipe => {
      pipe.remove();
   });
   pipes = [];
   score = 0;
   timeSinceLastPipe = PIPE_DURATION + 1;
}

export function updatePipe(delta) {
   if (timeSinceLastPipe > PIPE_DURATION) {
      createPipe();
      timeSinceLastPipe -= PIPE_DURATION;
   } else {
      timeSinceLastPipe += delta;
   }
   pipes.forEach(pipe => {
      pipe.left -= PIPE_SPEED * delta;
      if (pipe.left < -PIPE_WIDTH) {
         pipe.remove();
         score++;
         pipes = pipes.filter(p => p != pipe);
      }
   });
}

export function getPipeRects() {
   return pipes.flatMap(pipe => {
      return pipe.rects();
   });
}

export function getScore() {
   return score;
}

function createPipe() {
   const pipe = document.createElement("div");
   pipe.classList.add("pipe");
   const top = document.createElement("div");
   top.classList.add("top");
   const bottom = document.createElement("div");
   bottom.classList.add("bottom");
   pipe.appendChild(top);
   pipe.appendChild(bottom);
   const pipeData = {
      get left() {
         return parseFloat(
            getComputedStyle(pipe).getPropertyValue("--pipe-left")
         );
      },
      set left(val) {
         pipe.style.setProperty("--pipe-left", val);
      },
      remove() {
         pipe.remove();
      },
      rects() {
         return [top.getClientRects()[0], bottom.getClientRects()[0]];
      },
   };
   pipeData.left = window.innerWidth;
   pipe.style.setProperty("--pipe-length", findPipeLength());
   document.body.appendChild(pipe);
   pipes.push(pipeData);
}

function findPipeLength() {
   const randomNumber = Math.floor(Math.random() * 10) / 10;
   const pipeLength =
      randomNumber * (window.innerHeight - 2 * GAP_LENGTH) + GAP_LENGTH;
   return pipeLength;
}
