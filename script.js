const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();
let nextPlayerTurn = '';
let timer;
const gameTimer = document.querySelector('.game--timer');

// for reseting, sorry po
const _1 = document.querySelector('#_1');
const _2 = document.querySelector('#_2');
const _3 = document.querySelector('#_3');
const _4 = document.querySelector('#_4');
const _5 = document.querySelector('#_5');
const _6 = document.querySelector('#_6');
const _7 = document.querySelector('#_7');
const _8 = document.querySelector('#_8');
const _9 = document.querySelector('#_9');
const gameRestart = document.querySelector('.game--restart');

// listeners
document
  .querySelectorAll('.cell')
  .forEach((cell) => cell.addEventListener('click', handleCellClick));
gameRestart.addEventListener('click', handleRestartGame);

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyQ') {
    _1.click();
  }
  if (e.code === 'KeyW') {
    _2.click();
  }
  if (e.code === 'KeyE') {
    _3.click();
  }
  if (e.code === 'KeyA') {
    _4.click();
  }
  if (e.code === 'KeyS') {
    _5.click();
  }
  if (e.code === 'KeyD') {
    _6.click();
  }
  if (e.code === 'KeyZ') {
    _7.click();
  }
  if (e.code === 'KeyX') {
    _8.click();
  }
  if (e.code === 'KeyC') {
    _9.click();
  }
  if (e.code === 'KeyR') {
    gameRestart.click();
  }
});

function handleCellClick(clickedCellEvent) {
  document.querySelector('#time-running-out').currentTime = 0;
  document.querySelector('#time-running-out').pause();
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  clickedCell.classList.add('cell--occupied');
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
  handleTimerPerTurn();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  if (currentPlayer === 'X') {
    document.querySelector('#xTurn').play();
  } else {
    document.querySelector('#oTurn').play();
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      clearInterval(timer);
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    gameTimer.classList.add('game--timer--idle');
    document.querySelector('#winner').play();
    return;
  }
  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    gameTimer.classList.add('game--timer--idle');
    document.querySelector('#draw').play();
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  clearInterval(timer);
  gameTimer.innerHTML = '&nbsp;';
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove('cell--occupied');
  });
  document.querySelector('#restart').play();
  _1.innerText = '1';
  _2.innerText = '2';
  _3.innerText = '3';
  _4.innerText = '4';
  _5.innerText = '5';
  _6.innerText = '6';
  _7.innerText = '7';
  _8.innerText = '8';
  _9.innerText = '9';
  gameTimer.classList.add('game--timer--idle');
}

function handleTimerPerTurn() {
  // clear any existing timers
  clearInterval(timer);
  if (!gameActive) {
    gameTimer.innerHTML = '&nbsp;';
    return;
  }

  let timeleft = parseInt(document.querySelector('#duration').value);
  
  timer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(timer);
      handlePlayerChange();
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      gameTimer.classList.add('game--timer--idle');
      gameTimer.innerHTML = '&nbsp;';
    } else {
      gameTimer.innerHTML = timeleft;
  gameTimer.classList.remove('game--timer--idle');

    }

    timeleft--;

    if (timeleft < 3) {
      gameTimer.classList.add('game--timer--red');
      document.querySelector('#time-running-out').play();
    } else {
      gameTimer.classList.remove('game--timer--red');
    }
  }, 1000);
}
