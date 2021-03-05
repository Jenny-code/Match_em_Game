
let score = 0;
const matches = document.getElementsByClassName('matched');
const cards = document.getElementById('cards');
const openCards = document.getElementsByClassName('show');
const scoreElement = document.getElementById('score');
const resetGame = document.querySelector('.restart');
const currentCardEle = document.getElementById('match-it');

const symbols = [
  'fas fa-anchor',
  'fas fa-apple-alt',
  'fas fa-atom',
  'fas fa-bell',
  'fas fa-bomb',
  'fas fa-bolt',
  'fas fa-brain',
  'fas fa-cogs',
  'fas fa-feather-alt',
  'fas fa-fan',
  'fas fa-frog',
  'fas fa-hat-wizard',
];

let currentSymbol = symbols[matches.length];
currentCardEle.innerHTML = `<i class="${currentSymbol}"></i>`;

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const setupGame = function() {
  shuffle([...symbols]).forEach(function(symbol) {
    cards.insertAdjacentHTML("beforeend", `
      <li class="card">
        <i class="${symbol}"></i>
      </li>
    `);
  });
}

resetGame.addEventListener('click', function() {
  cards.textContent = ""
  score = 0;
  scoreElement.textContent = score;
  setupGame();
  currentSymbol = symbols[0];
  currentCardEle.innerHTML = `<i class="${currentSymbol}"></i>`;
});

cards.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('card') && openCards.length === 0 && !e.target.classList.contains('matched')) {
    e.target.classList.add('show');
    score++;
    scoreElement.textContent = score;

    setTimeout(function() {
      if (e.target.firstElementChild.className === currentSymbol) {
        e.target.classList.replace('show', 'matched');
        if (matches.length !== symbols.length) {
          currentSymbol = symbols[matches.length];
          currentCardEle.innerHTML = `<i class="${currentSymbol}"></i>`;
        } else {          
          alert('winner');
        }
      } else {
        e.target.classList.remove('show');
      }
    }, 500)
  }
});

setupGame();
