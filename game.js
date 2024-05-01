
let isGameRun = false;
let currLevel = [];
let userInput = [];

document.addEventListener('keydown', (e) => {
  if (!isGameRun){
    isGameRun = true;
    console.log("Game start!");
    generateLevel();
  }

})

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener('click', () => {
    let audio = new Audio(`sounds/${btn.id}.mp3`);
    audio.play();
    btn.classList.toggle('pressed');
    setTimeout(() => {
      btn.classList.toggle('pressed');
    }, 100);

    userInput.push(btn.id);

    if ((currLevel.length === userInput.length) && isUserInputCorrect(currLevel, userInput)){
      generateLevel();
    }
    else if (isUserInputCorrect(currLevel, userInput)){
    }
    else{
      gameOver();
    }
  })
})

function isUserInputCorrect(a, b) {
  if (a.length < b.length) {
    return false;
  }
  for (let i = 0; i < b.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function generateLevel() {
  setTimeout(() => {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const nxt = colors[Math.floor(Math.random() * colors.length)];
    let audio = new Audio(`sounds/${nxt}.mp3`);
    audio.play();
    document.querySelector(`#${nxt}`).classList.toggle('hidden');
    
    setTimeout(() => {
      document.querySelector(`#${nxt}`).classList.toggle('hidden');
    }, 200);
    
    currLevel.push(nxt);
    document.querySelector('h1').innerText = `Level ${currLevel.length}`;
    userInput = [];
    console.log(`Level ${currLevel.length}`);
    console.log(currLevel);
  }, 1000); // Delay of 1000 milliseconds or 1 second
}


function gameOver(){
  document.querySelector('h1').innerText = 'Game over, Press Any Key to Restart';
  console.log("Game over");
  let audio = new Audio(`sounds/wrong.mp3`);
  audio.play();
  document.querySelector('body').classList.toggle('gameover');
  setTimeout(() => {
    document.querySelector('body').classList.toggle('gameover');
  }, 100);
  isGameRun = false;
  currLevel = [];
  userInput = [];
}