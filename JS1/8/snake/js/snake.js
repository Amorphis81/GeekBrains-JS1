'use strict';

var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300;

function init() {
  prepareGameField();

  document.getElementById('snake-start').addEventListener('click', startGameHandler);

  document.getElementById('snake-renew').addEventListener('click', refreshGameHandler);

  window.addEventListener('keydown', changeDirectionHandler);
}

function prepareGameField() {
  var gameTable = document.createElement('table');
  gameTable.classList.add('game-table');
  gameTable.id = 'game-table';

  for (var i = 0; i < FIELD_SIZE_X; i++) {
    var row = document.createElement('tr');
    row.classList.add('game-table-row');

    for (var j = 0; j < FIELD_SIZE_Y; j++) {
      var cell = document.createElement('td');
      cell.classList.add('game-table-cell');

      row.appendChild(cell);
    }

    gameTable.appendChild(row);
  }

  document.getElementById('snake-field').appendChild(gameTable);
}

//змейка как объект

var snake = {
  body: [],
  direction: 'top'
}

function startGameHandler() {
  isGameStarted(true);
  //isGameStarted = true;
  respawn();  
  snake.snakeTimer = setInterval(move, SNAKE_SPEED);
  var createApple = createFood('apple');
  setTimeout(createApple, 500);
}

function refreshGameHandler() {
  window.location.reload();
}

function changeDirectionHandler(event) {
  switch (event.keyCode) {
    case 37:
      if (snake.direction != 'right') snake.direction = 'left';
      break;
    case 38:
      if (snake.direction != 'bottom') snake.direction = 'top';
      break;
    case 39:
      if (snake.direction != 'left') snake.direction = 'right';
      break;
    case 40:
      if (snake.direction != 'top') snake.direction = 'bottom';
      break;
  }
}

function respawn() {
  snake.snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
  snake.snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);

  var gameTable = document.getElementById('game-table');
  // head
  var snakeHead = gameTable.children[snake.snakeCoordX].children[snake.snakeCoordY];
  snakeHead.classList.add('snake-unit');
  // tail
  var snakeTail = gameTable.children[snake.snakeCoordX + 1].children[snake.snakeCoordY];
  snakeTail.classList.add('snake-unit');

  snake.body.push(snakeTail);
  snake.body.push(snakeHead);
}

function move() {
  var gameTable = document.getElementById('game-table');
  var newUnit;

  //var i = 18;
  switch (snake.direction) {
    case 'top':
      if (snake.snakeCoordX == 0) {
        newUnit = gameTable.children[FIELD_SIZE_X - 1].children[snake.snakeCoordY];
        snake.snakeCoordX = FIELD_SIZE_X;
        snake.snakeCoordX--;
      } else newUnit = gameTable.children[--snake.snakeCoordX].children[snake.snakeCoordY];
      break;
    case 'bottom':
      if (snake.snakeCoordX == FIELD_SIZE_X - 1) {
        newUnit = gameTable.children[0].children[snake.snakeCoordY];
        snake.snakeCoordX = -1;
        snake.snakeCoordX++;
      } else newUnit = gameTable.children[++snake.snakeCoordX].children[snake.snakeCoordY];
      break;
    case 'right':
      if (snake.snakeCoordY == FIELD_SIZE_Y - 1) {
        newUnit = gameTable.children[snake.snakeCoordX].children[0];
        snake.snakeCoordY = -1;
        snake.snakeCoordY++;
      } else newUnit = gameTable.children[snake.snakeCoordX].children[++snake.snakeCoordY];
      break;
    case 'left':
      if (snake.snakeCoordY == 0) {
        newUnit = gameTable.children[snake.snakeCoordX].children[FIELD_SIZE_Y - 1];
        snake.snakeCoordY = FIELD_SIZE_Y;
        snake.snakeCoordY--;
      } else newUnit = gameTable.children[snake.snakeCoordX].children[--snake.snakeCoordY];
      break;
  }

  if (!isSnakeUnit(newUnit)) {
    newUnit.classList.add('snake-unit');
    snake.body.push(newUnit);

    if (!isFood(newUnit)) {
      var snakeRemoved = snake.body.shift();
      snakeRemoved.classList.remove('snake-unit');
    }
  } else {
    gameOver();
  }
}

function isSnakeUnit(unit) {
  return snake.body.includes(unit);
}

function isFood(unit) {
  var score = 0;
  if (unit.classList.contains('food-unit')) {
    unit.classList.remove('food-unit');
    score++;
    addScore(score);
    createFood('apple');
    createFood('mongoose');
    return true;
  } else if (unit.classList.contains('mongoose-unit')) {
    gameOver();
  } else {
    return false;
  }
}

function createFood(obj) {
  var foodCreated = false;
  var gameTable = document.getElementById('game-table');

  while (!foodCreated) {
    var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
    var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

    var foodCell = gameTable.children[foodX].children[foodY];

    if (!foodCell.classList.contains('snake-unit')) {
      if (obj == 'apple') foodCell.classList.add('food-unit');
      if (obj == 'mongoose') foodCell.classList.add('mongoose-unit');
      foodCreated = true;
    }
  }
}

function gameOver() {
  isGameStarted();
  //isGameStarted = false;
  clearInterval(snake.snakeTimer);
  alert('GAME OVER');
  refreshGameHandler();
}

function addScore(score) {
  var totalScore = document.getElementById('total-score');
  totalScore.innerText = score;
}

function isGameStarted(flag) {
  if (flag) {
    return true;
  }
  return false;
}

window.onload = init;