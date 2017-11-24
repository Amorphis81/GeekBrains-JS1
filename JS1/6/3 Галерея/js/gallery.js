'use strict';

var activeImageSrc = ''; //ресурс отдельной картинки
var isScrollToLeft = false; //листается влево или вправо
var images = document.getElementsByClassName('image'); //вынес, чтобы каждый раз не перечитывать

//то, что на уроке было
function changeBigPicture(event) {
  var bigDiv = document.getElementById('big_pic');
  bigDiv.innerHTML = '';
  var smallSrc = activeImageSrc = event.target.getAttribute('src');

  var newImg = document.createElement('img');
  newImg.src = smallSrc.replace('small', 'big');
  bigDiv.appendChild(newImg);
}

//одна функция для кнопок направо и налево 
function changePic() {
  var bigDiv = document.getElementById('big_pic');
  for (var i = 0; i < images.length; i++) { 
    var direction = i + 1;
    //проверяется флаг направления
    if (isScrollToLeft){
      var direction = i - 1;
    } 
    if (activeImageSrc == images[i].getAttribute('src') && images[direction]) {        
        bigDiv.innerHTML = '';
        var newImg = document.createElement('img');
        newImg.src = images[direction].getAttribute('src');
        bigDiv.appendChild(newImg);
        activeImageSrc = newImg.getAttribute('src');        
        break;
    }    
  }
}

window.onload = function () {
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', changeBigPicture);  
  }  
  var rightButton = document.getElementById('right-arrow');
  rightButton.addEventListener('click', function(){
    isScrollToLeft = false;
  });
  rightButton.addEventListener('click', changePic);

  var leftButton = document.getElementById('left-arrow');
  leftButton.addEventListener('click', function(){
    isScrollToLeft = true;
  });
  leftButton.addEventListener('click', changePic);
}