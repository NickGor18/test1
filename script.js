import {cards} from './cards.js';
//var cardsMain = ['A_A', 'A_B', 'A_C', 'Adj', 'An_A', 'An_B', 'Clo', 'Emo']
var menuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('nav');
var lineOne = document.querySelector('nav .menu-btn .line--1');
var lineTwo = document.querySelector('nav .menu-btn .line--2');
var lineThree = document.querySelector('nav .menu-btn .line--3');
var link = document.querySelector('nav .nav-links');
var img_menu = document.querySelectorAll('.img-menu div');
var game = false;
var onCard = false;
var gameStared = false;
var gameFailed = false;
var numPool = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
function shuffle(numPool) {
  for(var j, x, i = numPool.length; i; j = parseInt(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
  return numPool;
};
var randomResult = shuffle(numPool);
var a = randomResult.pop(); 
function soundListener(){
  document.getElementById('sound'+this.id.replace(/[^\d]/g, '')).play();
}
var clickedTile = false;
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');
    link.classList.toggle('fade-in');
});
document.getElementById('gm').addEventListener('click', element=>{
  if(game == false){
    document.body.style.backgroundImage = "radial-gradient(circle 284px at center, #edc511 0%, #e3bc3d 47%, #ebd52c 100%)";
    img_menu.forEach(element => {
      element.style.backgroundColor = '#e0b43a';
      if(onCard) {
        var text = document.querySelectorAll('.img-menu div');
        text.forEach(elem=>{
          elem.querySelector('p').style.display = 'none';
        })
        var imag = document.querySelectorAll('.img-menu div img');
        imag.forEach(elem=>{
          elem.style.position = 'relative';
          elem.style.top = '10%';
          elem.style.left = '30%';
        })

      }
      //document.querySelectorAll('.ch').forEach(element => {
      //  element.style.display = 'none'
      //});
      });
      let audio = document.querySelectorAll('[id^="audioDiv"]');
      audio.forEach(elem=>{
        elem.removeEventListener('click',soundListener)})
      game = true
      if(onCard) document.getElementById('return_button').style.display = 'block';
      document.getElementById('return_button').innerHTML = 'Start Game'
    alert('You are toggling to Play mode');
  }
  else{
    document.body.style.backgroundImage = "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)";
    img_menu.forEach(element => {
      element.style.backgroundColor = '#d8d8d8';
      //if(onCard)
      //document.querySelectorAll('.ch').forEach(element => {
      //  element.style.display = 'inline-block'
      //});
      var text = document.querySelectorAll('.img-menu div');
        text.forEach(elem=>{
          elem.querySelector('p').style.display = 'inline';
        })
        var imag = document.querySelectorAll('.img-menu div img');
        imag.forEach(elem=>{
          elem.style.position = 'relative';
          elem.style.top = '0%';
          elem.style.left = '0%';
        })
        let audio = document.querySelectorAll('[id^="audioDiv"]');
      audio.forEach(elem=>{
        elem.addEventListener('click',soundListener)})
      
    });
    
    document.getElementById('return_button').style.display = 'none';
    game = false;
    alert('You are toggling to Train mode');
  } 
})


for(let i=0;i<cards[0].length;i++){
  document.getElementById(cards[0][i]).addEventListener('click', function(){
    onCard = true;
    if(onCard === true) document.getElementById('stat').style.display = 'none';
    if(gameStared === false){
      //if(game === false){
      //  let col = document.querySelectorAll('.ch');
      //col.forEach(element => {
      //  element.style.display = 'inline-block'
      //});
      //}
      if(game === true) {
        document.getElementById('return_button').style.display = 'block';
        var text = document.querySelectorAll('.img-menu div');
          text.forEach(elem=>{
            elem.querySelector('p').style.display = 'none';
          })
          var imag = document.querySelectorAll('.img-menu div img');
          imag.forEach(elem=>{
            elem.style.position = 'relative';
            elem.style.top = '10%';
            elem.style.left = '30%';
          })
      }
      let arr = document.querySelectorAll('.img-menu div')
      for(let k=0;k<arr.length;k++){
        if(arr[k].id!=('audioDiv' + (k+1))){
          arr[k].id = 'audioDiv' + (k+1);
          arr[k].querySelector('p').innerHTML = cards[i+1][k].word;
          arr[k].querySelector('img').src = cards[i+1][k].image;
          document.getElementById('sound'+(k+1)).src = cards[i+1][k].audioSrc;
          //document.getElementById('ans'+(k+1)).innerHTML = cards[i+1][k].translation;
          let audio = document.querySelectorAll('[id^="audioDiv"]');
          if(game == false)
          audio.forEach(elem=>{
            elem.addEventListener('click',soundListener)  
          })
        }
        }
    }
    else{
      let audio = document.querySelectorAll('[id^="audioDiv"]');
      for(let j =0; j<audio.length;j++){
        audio[j].addEventListener('click', ()=>{
          if(audio[j].id == ('audioDiv'+a)) {
            audio[j].style.backgroundColor = 'green';
            if((a = randomResult.pop())!=null){
              document.getElementById('corr').play();
              document.getElementById('sound'+a).play();
              return;
            }
            else{
              document.querySelector('.img-menu').style.display = 'none';
              document.getElementById('return_button').style.display = 'none';
              if(gameFailed === false)
              document.getElementById('succ').style.display='block';
              else document.getElementById('fail').style.display='block';
              location.reload();
            }
            }
          
        })
      }
    }
  })
}
let links = document.querySelectorAll('.nav-links a')
links.forEach(el=>{
  el.addEventListener('click',e=>{
    e.preventDefault();
  })
})
/*links.forEach((element,i) => {
  element.addEventListener('click', event =>{
    if(element.innerHTML!='Main Page'){
      event.preventDefault();
          let arr = document.querySelectorAll('.img-menu div')
          for(let k=0;k<arr.length;k++){
            if(arr[k].id!=('audioDiv' + (k+1))){
              arr[k].id = 'audioDiv' + (k+1);
              arr[k].querySelector('p').innerHTML = cards[i][k].word;
              arr[k].querySelector('img').src = cards[i][k].image;
              document.getElementById('sound'+(k+1)).src = cards[i][k].audioSrc;
            }
          }
    }
  })
});*/

var gameButton = document.getElementById('return_button');
gameButton.addEventListener('click', function(){
  gameButton.innerHTML = 'Repeat';
  gameButton.style.paddingLeft = '5%';
  gameStared = true;
  document.getElementById('sound'+a).play();
})