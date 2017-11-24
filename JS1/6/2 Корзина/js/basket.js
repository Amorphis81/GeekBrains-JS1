'use strict';
var sum = document.getElementById('total_price');

function addGood(){
  var price1 = document.getElementById('price_1').innerHTML;
  console.log(price1);
  var count = document.getElementById('total_count');
  var sum = document.getElementById('total_price');
  sum.innerHTML = price1;
  count.innerHTML += 1;
}


window.onload = function(){
  var buttonBuy1 = document.getElementById('buy_1');
  buttonBuy1.addEventListener('click', addGood);
}