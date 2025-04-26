const images = [
    'media/kitten1.jpeg', 'media/kitten2.jpeg', 'media/kitten3.jpeg', 'media/kitten4.jpeg',
    'media/kitten5.jpeg', 'media/kitten6.jpeg', 'media/kitten7.jpeg', 'media/kitten8.jpeg'
  ];
  const cards = [...images, ...images]; 
  let firstCard, secondCard;
  let lockBoard = false;
  let matchedPairs = 0;

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  function createBoard() {
    const board = document.getElementById('gameBoard');
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach((imgSrc, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = imgSrc;
      card.dataset.index = index;

      const front = document.createElement('img');
      front.src = imgSrc;
      front.classList.add('card-face', 'front');
      front.style.display = 'none';

      const back = document.createElement('div');
      back.classList.add('card-face', 'back');
      back.textContent = '?';

      card.appendChild(front);
      card.appendChild(back);
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    const img = this.querySelector('.front');
    const back = this.querySelector('.back');

    img.style.display = 'block';
    back.style.display = 'none';
    this.classList.add('flipped');

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedPairs++;
      if (matchedPairs === images.length) {
        setTimeout(() => alert('🎉 You won!'), 500);
      }
      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.querySelector('.front').style.display = 'none';
        firstCard.querySelector('.back').style.display = 'block';
        secondCard.querySelector('.front').style.display = 'none';
        secondCard.querySelector('.back').style.display = 'block';

        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 1000);
    }
  }

  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  createBoard();