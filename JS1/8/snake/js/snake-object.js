'use strict';

var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300;

function init() {
  prepareGameField();

  document.getElementById('snake-start').addEventListener('click', startGameHandler);

  document.getElementById('snake-renew').addEventListener('click', refreshGameHandler);

  window.addEventListener('keydown', snake.changeDirectionHandler.bind(snake));
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

//змейка в прототипном стиле
//прототип змейки
function Snake (){
  this.body = [],
  this.direction = 'top'
}
//методы
Snake.prototype.respawn = function (){
  this.snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
  this.snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);

  var gameTable = document.getElementById('game-table');
  // head
  var snakeHead = gameTable.children[this.snakeCoordX].children[this.snakeCoordY];
  snakeHead.classList.add('snake-unit');
  // tail
  var snakeTail = gameTable.children[this.snakeCoordX + 1].children[this.snakeCoordY];
  snakeTail.classList.add('snake-unit');

  this.body.push(snakeTail);
  this.body.push(snakeHead);
}

Snake.prototype.move = function (){
  var gameTable = document.getElementById('game-table');
  var newUnit; 
  
  switch (this.direction) {
    case 'top':
    if (this.snakeCoordX == 0) {
      newUnit = gameTable.children[FIELD_SIZE_X - 1].children[this.snakeCoordY];
      this.snakeCoordX = FIELD_SIZE_X - 1;
    } else newUnit = gameTable.children[--this.snakeCoordX].children[this.snakeCoordY];
    break;
    case 'bottom':
    if (this.snakeCoordX == FIELD_SIZE_X - 1) {
      newUnit = gameTable.children[0].children[this.snakeCoordY];        
      this.snakeCoordX = 0;        
    } else newUnit = gameTable.children[++this.snakeCoordX].children[this.snakeCoordY];
    break;
    case 'right':
    if (this.snakeCoordY == FIELD_SIZE_Y - 1) {
      newUnit = gameTable.children[this.snakeCoordX].children[0];       
      this.snakeCoordY = 0;        
    } else newUnit = gameTable.children[this.snakeCoordX].children[++this.snakeCoordY];
    break;
    case 'left':
    if (this.snakeCoordY == 0) {
      newUnit = gameTable.children[this.snakeCoordX].children[FIELD_SIZE_Y - 1];
      this.snakeCoordY = FIELD_SIZE_Y - 1;        
    } else newUnit = gameTable.children[this.snakeCoordX].children[--this.snakeCoordY];
    break;
  }
  
  if (!isSnakeUnit(newUnit)) {
    newUnit.classList.add('snake-unit');
    this.body.push(newUnit);

    if (!isFood(newUnit)) {
      var snakeRemoved = this.body.shift(); 
      snakeRemoved.classList.remove('snake-unit');
    }
  } else {
    gameOver();
  }
}

Snake.prototype.changeDirectionHandler = function (event) {
  switch (event.keyCode) {
    case 37:
      if (this.direction != 'right') this.direction = 'left';
      //console.log(1);
      break;
    case 38:
      if (this.direction != 'bottom') this.direction = 'top';
      break;
    case 39:
      if (this.direction != 'left') this.direction = 'right';
      break;
    case 40:
      if (this.direction != 'top') this.direction = 'bottom';
      break;
  }
}

//создаем объект
var snake = new Snake();

//инициализация игры
function startGameHandler() {
  isGameStarted(true);
  snake.respawn();
  snake.snakeTimer = setInterval(snake.move.bind(snake), SNAKE_SPEED);
  var createApple = createFood('apple');
  setTimeout(createApple, 500);
}

function refreshGameHandler() {
  window.location.reload();
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