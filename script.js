let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]; // keep data about the game in a 2-D array
let boardElement; // the element that contains the rows and squares
let boardContainer; // the element that contains the entire board // we can empty it out for convenience

let currentPlayer = "X"; // current player global starts at X
const gameMessage = document.querySelector(".game-message");
const squareContainer = document.querySelectorAll(".square");

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";

  for (let i = 0; i < board.length; i += 1) {
    // move through the board data array and create the current state of the board
    const row = board[i]; // separate var for one row / row element
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
  return boardContainer;
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement("div");
  boardContainer.classList.add("board");

  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    gameMessage.innerText = `${currentPlayer}'s turn.`;
    currentPlayer = "O";
  } else if (currentPlayer === "O") {
    gameMessage.innerText = `${currentPlayer}'s turn.`;
    currentPlayer = "X";
  }
};
const squareClick = (column, row) => {
  console.log("coordinates", column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    console.log(board);

    if (checkWin(board) === true) {
      gameMessage.innerHTML = `${currentPlayer} player wins!`;
      setTimeout(() => {
        board = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
        gameMessage.innerHTML = "CLICK A SQUARE TO BEGIN";
        buildBoard(board);
      }, 1000);
    } else {
      // change the player
      togglePlayer();
    }
    // if checkwin false and all squares filled up, its a draw
    if (
      checkWin(board) === false &&
      board[0][0] !== "" &&
      board[1][0] !== "" &&
      board[2][0] !== "" &&
      board[0][1] !== "" &&
      board[0][2] !== "" &&
      board[1][1] !== "" &&
      board[1][2] !== "" &&
      board[2][1] !== "" &&
      board[2][2] !== ""
    ) {
      gameMessage.innerHTML = "It's a draw!";
      setTimeout(() => {
        board = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
        gameMessage.innerHTML = "CLICK A SQUARE TO BEGIN";

        buildBoard(board);
      }, 1000);
    }
    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);
  }
};

const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions
  if (
    board[0][0] !== "" &&
    board[0][0] === board[0][1] &&
    board[0][1] === board[0][2]
  ) {
    return true;
  }
  if (
    board[1][0] !== "" &&
    board[1][0] === board[1][1] &&
    board[1][1] === board[1][2]
  ) {
    return true;
  }
  if (
    board[2][0] !== "" &&
    board[2][0] === board[2][1] &&
    board[2][1] === board[2][2]
  ) {
    return true;
  }
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][0] &&
    board[1][0] === board[2][0]
  ) {
    return true;
  }
  if (
    board[0][1] !== "" &&
    board[0][1] === board[1][1] &&
    board[1][1] === board[2][1]
  ) {
    return true;
  }
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][2] &&
    board[1][2] === board[2][2]
  ) {
    return true;
  }
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }
  if (
    board[2][0] !== "" &&
    board[2][0] === board[1][1] &&
    board[1][1] === board[0][2]
  ) {
    return true;
  }
  return false;
};


const startOfGame = () => {
  // creating form to enter username
  let form = document.createElement("div");
  form.id = "form";
  let name = document.createElement("input");
  name.id = "username";
  var submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.id = "submit";
  form.appendChild(name);
  form.appendChild(submit);
  document.body.appendChild(form);
  submit.addEventListener("click", () => {
    if (name.value !== "" && typeof name.value === "string" && typeof name.value !== "number") {
		console.log(name.value !== "" && typeof name.value === "string" && typeof name.value !== "number")
      let userName = name.value;
      gameMessage.innerHTML = `Welcome ${userName}! Plese input your desired board size.`;
      name.value = "";
    } else if (name.value !== "" && typeof name.value === "number" && typeof name.value !== "string") {
      let userChoice = name.value;
      gameMessage.innerHTML = `You have chosen a ${userChoice}x${userChoice} board size for your game.`;
      name.value = "";
	  initGame();
    } else if (name.value === "") {
      gameMessage.innerHTML = "Please enter name. Field cannot be empty.";
    }
  });
};

startOfGame(); 


/* CLICK A SQUARE TO BEGIN */
