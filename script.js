/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { cards } from './cards.js';

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const lineOne = document.querySelector('nav .menu-btn .line--1');
const lineTwo = document.querySelector('nav .menu-btn .line--2');
const lineThree = document.querySelector('nav .menu-btn .line--3');
const link = document.querySelector('nav .nav-links');
const img_menu = document.querySelectorAll('.img-menu div');
let game = false;
let onCard = false;
let gameStared = false;
const gameFailed = false;
const numPool = [1, 2, 3, 4, 5, 6, 7, 8];
// eslint-disable-next-line no-shadow
function shuffle(numPool) {
  for (let j, x, i = numPool.length; i; j = parseInt(Math.random() * i),
  x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
  return numPool;
}
const randomResult = shuffle(numPool);
let a = randomResult.pop();
function soundListener() {
  document.getElementById(`sound${this.id.replace(/[^\d]/g, '')}`).play();
}

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  lineOne.classList.toggle('line-cross');
  lineTwo.classList.toggle('line-fade-out');
  lineThree.classList.toggle('line-cross');
  link.classList.toggle('fade-in');
});
document.getElementById('gm').addEventListener('click', () => {
  if (game === false) {
    document.body.style.backgroundImage = 'radial-gradient(circle 284px at center, #edc511 0%, #e3bc3d 47%, #ebd52c 100%)';
    img_menu.forEach((element) => {
      element.style.backgroundColor = '#e0b43a';
      if (onCard) {
        const text = document.querySelectorAll('.img-menu div');
        text.forEach((elem) => {
          elem.querySelector('p').style.display = 'none';
        });
        const imag = document.querySelectorAll('.img-menu div img');
        imag.forEach((elem) => {
          elem.style.position = 'relative';
          elem.style.top = '10%';
          elem.style.left = '30%';
        });
      }
      document.querySelectorAll('.ch').forEach((element) => {
        element.style.display = 'none';
      });
    });
    const audio = document.querySelectorAll('[id^="audioDiv"]');
    audio.forEach((elem) => {
      elem.removeEventListener('click', soundListener);
    });
    game = true;
    if (onCard) document.getElementById('return_button').style.display = 'block';
    document.getElementById('return_button').innerHTML = 'Start Game';
    alert('You are toggling to Play mode');
  } else {
    document.body.style.backgroundImage = 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)';
    img_menu.forEach((element) => {
      element.style.backgroundColor = '#d8d8d8';
      if (onCard) {
        document.querySelectorAll('.ch').forEach((element) => {
          element.style.display = 'inline-block';
        });
      }
      const text = document.querySelectorAll('.img-menu div');
      text.forEach((elem) => {
        elem.querySelector('p').style.display = 'inline';
      });
      const imag = document.querySelectorAll('.img-menu div img');
      imag.forEach((elem) => {
        elem.style.position = 'relative';
        elem.style.top = '0%';
        elem.style.left = '0%';
      });
      const audio = document.querySelectorAll('[id^="audioDiv"]');
      audio.forEach((elem) => {
        elem.addEventListener('click', soundListener);
      });
    });

    document.getElementById('return_button').style.display = 'none';
    game = false;
    alert('You are toggling to Train mode');
  }
});

const links = document.querySelectorAll('.nav-links a');
for (let i = 0; i < cards[0].length; i++) {
  document.getElementById(cards[0][i]).addEventListener('click', () => {
    links.forEach((el) => {
      el.style.textDecoration = 'none';
    });
    document.getElementById(`${cards[0][i]}l`).style.textDecoration = 'underline';
    onCard = true;
    if (onCard === true) document.getElementById('stat').style.display = 'none';
    if (gameStared === false) {
      if (game === true) {
        document.getElementById('return_button').style.display = 'block';
        const text = document.querySelectorAll('.img-menu div');
        text.forEach((elem) => {
          elem.querySelector('p').style.display = 'none';
        });
        const imag = document.querySelectorAll('.img-menu div img');
        imag.forEach((elem) => {
          elem.style.position = 'relative';
          elem.style.top = '10%';
          elem.style.left = '30%';
        });
      }
      if (onCard && !game) {
        document.querySelectorAll('.ch').forEach((element) => {
          element.style.display = 'inline-block';
        });
      }
      const arr = document.querySelectorAll('.img-menu div');
      for (let k = 0; k < arr.length; k++) {
        if (arr[k].id !== (`audioDiv${k + 1}`)) {
          arr[k].id = `audioDiv${k + 1}`;
          arr[k].querySelector('p').innerHTML = cards[i + 1][k].word;
          arr[k].querySelector('img').src = cards[i + 1][k].image;
          arr[k].querySelector('i').innerHTML = cards[i + 1][k].translation;
          document.getElementById(`sound${k + 1}`).src = cards[i + 1][k].audioSrc;
          const audio = document.querySelectorAll('[id^="audioDiv"]');
          if (game === false) {
            audio.forEach((elem) => {
              elem.addEventListener('click', soundListener);
            });
          }
        }
      }
    } else {
      const audio = document.querySelectorAll('[id^="audioDiv"]');
      for (let j = 0; j < audio.length; j++) {
        audio[j].addEventListener('click', () => {
          if (audio[j].id === (`audioDiv${a}`)) {
            audio[j].style.backgroundColor = 'green';
            // eslint-disable-next-line no-cond-assign
            if ((a = randomResult.pop()) != null) {
              document.getElementById('corr').play();
              document.getElementById(`sound${a}`).play();
            } else {
              document.querySelector('.img-menu').style.display = 'none';
              document.getElementById('return_button').style.display = 'none';
              document.getElementById('gm').style.display = 'none';
              if (gameFailed === false) {
                document.getElementById('succ').style.display = 'block';
                document.getElementById('a_succ').play();
              } else {
                document.getElementById('fail').style.display = 'block';
                document.getElementById('a_fail').play();
              }
              const div = document.createElement('div');
              div.innerHTML = 'Press Enter to go back to Main Page';
              div.style.fontFamily = 'cursive';
              div.style.position = 'relative';
              div.style.top = '-100%';
              document.body.append(div);
              // eslint-disable-next-line no-restricted-globals
              document.addEventListener('keydown', (event) => {
                // eslint-disable-next-line no-restricted-globals
                if (event.code === 'Enter') location.reload();
              });
            }
          } // else {
          // errCount++;
          // if (errCount > 0) {
          // gameFailed = true;
          // document.getElementById('err').play();
          // corrCount++;
          // }
          // }
        });
      }
    }
  });
}

links.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (el.innerHTML !== 'Main Page') e.preventDefault();
  });
  el.addEventListener('click', () => {
    links.forEach((elem) => {
      elem.style.textDecoration = 'none';
    });
    el.style.textDecoration = 'underline';
    for (let i = 0; i < cards[0].length; i++) {
      if ((el.id).slice(0, -1) === cards[0][i]) {
        onCard = true;
        if (onCard === true) document.getElementById('stat').style.display = 'none';
        if (game === true) {
          document.getElementById('return_button').style.display = 'block';
          const text = document.querySelectorAll('.img-menu div');
          text.forEach((elem) => {
            elem.querySelector('p').style.display = 'none';
          });
          const imag = document.querySelectorAll('.img-menu div img');
          imag.forEach((elem) => {
            elem.style.position = 'relative';
            elem.style.top = '10%';
            elem.style.left = '30%';
          });
        }
        if (onCard && !game) {
          document.querySelectorAll('.ch').forEach((element) => {
            element.style.display = 'inline-block';
          });
        }
        const arr = document.querySelectorAll('.img-menu div');
        for (let k = 0; k < arr.length; k++) {
          arr[k].id = `audioDiv${k + 1}`;
          arr[k].querySelector('p').innerHTML = cards[i + 1][k].word;
          arr[k].querySelector('img').src = cards[i + 1][k].image;
          document.getElementById(`sound${k + 1}`).src = cards[i + 1][k].audioSrc;
          const audio = document.querySelectorAll('[id^="audioDiv"]');
          if (game === false) {
            audio.forEach((elem) => {
              elem.addEventListener('click', soundListener);
            });
          }
        }
      }
    }
  });
});
const gameButton = document.getElementById('return_button');
gameButton.addEventListener('click', () => {
  gameButton.innerHTML = 'Repeat';
  gameButton.style.paddingLeft = '5%';
  gameStared = true;
  document.querySelector('.menu-btn').style.display = 'none';
  document.getElementById(`sound${a}`).play();
});
function leave(k) {
  k = this.querySelector('p').innerHTML;
  this.querySelector('p').innerHTML = this.querySelector('i').innerHTML;
  this.querySelector('i').innerHTML = k;
}
function cl() {
  let k = '';
  k = this.parentElement.querySelector('p').innerHTML;
  this.parentElement.querySelector('p').innerHTML = this.parentElement.querySelector('i').innerHTML;
  this.parentElement.querySelector('i').innerHTML = k;
  this.parentElement.addEventListener('mouseleave', leave);
}
document.querySelectorAll('.ch').forEach((elem) => {
  elem.addEventListener('click', cl);
  elem.parentElement.addEventListener('mouseenter', () => {
    elem.parentElement.removeEventListener('mouseleave', leave);
  });
});
