"use strict";

function createHeader(){
  var header = document.createElement('h1');
  header.innerText = 'Шахмантная доска';
  document.body.appendChild(header);
}

//создание таблицы
function createTable(tableWidth, tableHeight){
  var table = document.createElement('table');
  document.body.appendChild(table);
  for (var i = 0, g = 9; i < tableHeight; i++, g--){
    createTr(tableWidth, tableHeight, i, g);
  }
}

function createTr(tableWidth, tableHeight, i, g){
  var count;
  var tr = document.createElement('tr');    
  var nowTr = document.getElementsByTagName('table')[0].appendChild(tr);
  var str = 'ABCDEFGH';
  for (var j = 0; j < tableWidth; j++){
    var td = document.createElement('td');
    var nowTd = nowTr.appendChild(td);    
    //расставляем буквы
    if (i == 0  && j > 0 && j < (tableWidth - 1) || i == (tableHeight -1) && j > 0 && j < (tableWidth - 1)){
      nowTd.innerText = str[j-1];
    }
    //расставляем цифры
    else if (i > 0 && j == 0 && i < tableHeight -1 || j == tableWidth-1 && i > 0 && i < tableHeight -1){
      nowTd.innerText = g;
    }
    //угловые ячейки
    else if (i == 0 && j == 0 || i == 0 && j == tableWidth -1 || j == 0 && i == tableHeight - 1 || j == tableWidth -1 && i == tableHeight - 1){} 
    //игровое поле
    else {
      count = counter ();
      nowTd.id = j + '' + g;
      //nowTd.innerText = j + '' + g;
      if (i%2 != 0 && count%2 != 0 || i%2 == 0 && count%2 == 0){
        nowTd.className = 'lightCell';
      } else nowTd.className = 'darkCell';      
    }
  }  
}

//инициализация счетчика
function makeCounter() {
  function counter() {
    return counter.currentCount++;
  };
  counter.currentCount = 1;

  return counter;
}

var counter = makeCounter();

//конструктор фигур
function ChessFigure(name){
  this.name = name;
  this.location = function(coordinates1, coordinates2){
    if (!coordinates2){
      document.getElementById(coordinates1).innerText = this.name;
    } else{
      document.getElementById(coordinates1).innerText = this.name;
      document.getElementById(coordinates2).innerText = this.name;
    }
  }
}

//генерация видов фигур
var whitePawn = new ChessFigure('б.пешка');
var whiteRook = new ChessFigure('б.ладья');
var whiteHorse = new ChessFigure ('б.конь');
var whiteElephant = new ChessFigure ('б.слон');
var whiteKing = new ChessFigure ('б.король');
var whiteQueen = new ChessFigure ('б.ферзь');

var blackPawn = new ChessFigure('ч.пешка');
var blackRook = new ChessFigure('ч.ладья');
var blackHorse = new ChessFigure ('ч.конь');
var blackElephant = new ChessFigure ('ч.слон');
var blackKing = new ChessFigure ('ч.король');
var blackQueen = new ChessFigure ('ч.ферзь');

//создание фигур
function createAllFigures(){
  //расстановка пешек
  for (var i = 1; i <= 8; i++){
    whitePawn.location(i + '' + 2);
    blackPawn.location(i + '' + 7);
  }
  //остальные фигуры
  whiteRook.location(11, 81);
  whiteHorse.location(21, 71);
  whiteElephant.location(31, 61);
  whiteQueen.location(41);
  whiteKing.location(51);

  whiteRook.location(18, 88);
  whiteHorse.location(28, 78);
  whiteElephant.location(38, 68);
  whiteQueen.location(48);
  whiteKing.location(58);
}


window.onload = function(){
  createHeader();
  createTable(10, 10);
  createAllFigures();  
}