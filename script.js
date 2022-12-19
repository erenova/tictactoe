let gameModule = (function () {
  let winnerIs = document.getElementById("winner-is");
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  // Variables
  const playerTurn = document.getElementById("text-players-turn");
  let gameActive = true;
  let currentPlayer = `X`;

  const winningMsg = () => `Player ${currentPlayer} Wins!`;
  const tieMsg = `It's a tie`;
  const currentPlayerTurnMessage = () => `It's ${currentPlayer}'s turn`;
  playerTurn.innerText = currentPlayerTurnMessage();

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //! // // // //
  function gameClick(e) {
    const clickedBox = e.target;
    const clickedBoxNumber = parseInt(clickedBox.getAttribute("data-key"));

    if (gameBoard[clickedBoxNumber] !== "" || !gameActive) {
      return;
    }

    gamePlay(clickedBox, clickedBoxNumber);
    gameResult();
  }

  function gamePress(e) {
    let pressedKey;
    switch (e.keyCode) {
      case 55:
        pressedKey = 0;
        break;
      case 56:
        pressedKey = 1;
        break;
      case 57:
        pressedKey = 2;
        break;
      case 52:
        pressedKey = 3;
        break;
      case 53:
        pressedKey = 4;
        break;
      case 54:
        pressedKey = 5;
        break;
      case 49:
        pressedKey = 6;
        break;
      case 50:
        pressedKey = 7;
        break;
      case 51:
        pressedKey = 8;
    }
    let getElement = document.getElementById(`box${pressedKey}`);

    if (gameBoard[pressedKey] !== "" || !gameActive) {
      return;
    }

    gamePlay(getElement, pressedKey);
    gameResult();
  }
  //   game content player side

  function gamePlay(clElem, boxIn) {
    gameBoard[boxIn] = currentPlayer;
    clElem.innerText = currentPlayer;
    clElem.classList.add("mouse");
    if (currentPlayer === `X`) {
      clElem.style.color = `#50C878`;
    } else {
      clElem.style.color = `#FF0000`;
    }
  }
  function gameResult() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
      let a = gameBoard[winningCombinations[i][0]];
      let b = gameBoard[winningCombinations[i][1]];
      let c = gameBoard[winningCombinations[i][2]];

      if (!a || !b || !c) {
        continue;
      }
      if (a === b && b === c) {
        gameWon = true;
        break;
      }
    }
    if (gameWon) {
      winnerIs.innerText = winningMsg();
      gameActive = false;
      playerTurn.innerText = ``;
      changeMessageColor("004466");
      return;
    }
    let tie = !gameBoard.includes("");
    if (tie) {
      playerTurn.innerText = ``;
      winnerIs.innerText = tieMsg;
      changeMessageColor("000000");
      gameActive = false;
      return;
    }
    changePlayer();
  }
  function changeMessageColor(color) {
    playerTurn.style.color = `#${color}`;
  }
  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.innerText = currentPlayerTurnMessage();
    if (currentPlayer === "X") {
      changeMessageColor("50C878");
    } else {
      changeMessageColor("FF0000");
    }
  }

  function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    winnerIs.innerText = "";
    document
      .querySelectorAll(".game-box")
      .forEach((cell) => cell.classList.remove("mouse"));
    document
      .querySelectorAll(".game-box")
      .forEach((cell) => (cell.innerText = ""));
    gameActive = true;
    currentPlayer = "X";
    changeMessageColor("50C878");
    playerTurn.innerText = currentPlayerTurnMessage();
  }

  function resetGameKey(e) {
    let key = "Numpad0";
    if (e.code == key) {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      winnerIs.innerText = "";
      document
        .querySelectorAll(".game-box")
        .forEach((cell) => cell.classList.remove("mouse"));
      document
        .querySelectorAll(".game-box")
        .forEach((cell) => (cell.innerText = ""));
      gameActive = true;
      currentPlayer = "X";
      changeMessageColor("50C878");
      playerTurn.innerText = currentPlayerTurnMessage();
    }
  }
  return { gameClick, resetGame, resetGameKey, gamePress };
})();

document
  .querySelectorAll(".game-box")
  .forEach((cell) => cell.addEventListener("click", gameModule.gameClick));

document
  .getElementById("btn-reset")
  .addEventListener("click", gameModule.resetGame);

document.addEventListener("keypress", gameModule.resetGameKey);

document.addEventListener("keypress", gameModule.gamePress);
