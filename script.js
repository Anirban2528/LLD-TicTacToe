const TicTacToe = {
  board: [],
  n: 0,
  rowSum: [],
  colSum: [],
  diagSum: 0,
  revDiagSum: 0,
  winner: 0,
  cPlayer: "X",
  resetGame: function () {
    TicTacToe.board = [];
    TicTacToe.n = 0;
    TicTacToe.rowSum = [];
    TicTacToe.colSum = [];
    TicTacToe.diagSum = 0;
    TicTacToe.revDiagSum = 0;
    TicTacToe.winner = 0;
    TicTacToe.cPlayer = "X";

    document.getElementById("newGameModal").style.display = "block";
    document.getElementById("board").remove();
  },
  move: function (player, row, col) {
    console.log(TicTacToe.board);
    if (row < 0 || col < 0 || row >= TicTacToe.n || col >= TicTacToe.n) {
      alert("Move out of board boundary!");
      return;
    } else if (TicTacToe.board[row][col] != 0) {
      alert("Square is already occupied!");
      return null;
    } else if (player != 0 && player != 1) {
      alert("Invalid player!");
      return null;
    } else if (TicTacToe.winner != 0) {
      alert("Current game winner is already decided");
      return null;
    } else {
      player = player == 0 ? -1 : +1;
      TicTacToe.board[row][col] = player;
      TicTacToe.rowSum[row] += player;
      TicTacToe.colSum[col] += player;
      if (row == col) {
        TicTacToe.diagSum += player;
      }
      if (row == TicTacToe.n - 1 - col) {
        TicTacToe.revDiagSum += player;
      }
      if (
        Math.abs(TicTacToe.rowSum[row]) == TicTacToe.n ||
        Math.abs(TicTacToe.colSum[col]) == TicTacToe.n ||
        Math.abs(TicTacToe.diagSum) == TicTacToe.n ||
        Math.abs(TicTacToe.revDiagSum) == TicTacToe.n
      ) {
        TicTacToe.winner = player;
      }

      return TicTacToe.winner;
    }
  },
  createBoard: function (size) {
    TicTacToe.n = size;
    TicTacToe.board = new Array(size);
    TicTacToe.rowSum = new Array(size);
    TicTacToe.colSum = new Array(size);
    for (let i = 0; i < TicTacToe.n; i++) {
      TicTacToe.board[i] = [];
      TicTacToe.rowSum[i] = 0;
      TicTacToe.colSum[i] = 0;
      for (let j = 0; j < TicTacToe.n; j++) {
        TicTacToe.board[i][j] = 0;
      }
    }
  },
  createGame: function () {
    var size = document.getElementById("boardSize").value;
    if (size == null || size == undefined || size <= 0) {
      alert("Please enter valid square board dimension");
      return;
    }
    document.getElementById("newGameModal").style.display = "none";
    TicTacToe.createBoard(size);
    document.getElementById("boardSize").value = "";
    var t = document.createElement("TABLE");
    t.setAttribute("id", "board");
    for (let i = 0; i < size; i++) {
      var tRow = document.createElement("tr");
      for (let j = 0; j < size; j++) {
        var tData = document.createElement("td");
        tData.setAttribute("class", "cell");
        tData.setAttribute("row", i);
        tData.setAttribute("col", j);
        tData.setAttribute("onClick", "TicTacToe.makeMove(this)");
        tRow.appendChild(tData);
      }
      t.appendChild(tRow);
    }
    document.getElementById("console").appendChild(t);
  },
  makeMove: function (that) {
    var cRow = that.getAttribute("row");
    var cCol = that.getAttribute("col");
    var p = TicTacToe.cPlayer == "X" ? 0 : 1;
    var w = TicTacToe.move(p, cRow, cCol);
    if (w == null || that.innerText.length != 0) {
      return;
    }
    that.innerText = TicTacToe.cPlayer;
    var cColor = "red";
    if (TicTacToe.cPlayer == "X") {
      TicTacToe.cPlayer = "O";
      cColor = "blue";
    } else {
      TicTacToe.cPlayer = "X";
      cColor = "red";
    }
    that.setAttribute("style", "color:" + cColor);
    if (w == -1) {
      setTimeout(function () {
        alert("X won");
        TicTacToe.resetGame();
      }, 10);
    }
    if (w == 1) {
      setTimeout(function () {
        alert("O won");
        TicTacToe.resetGame();
      }, 10);
    }
  },
};
