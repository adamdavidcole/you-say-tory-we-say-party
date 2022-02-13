import { cardTemplate } from './card-visibility';

const cardContainerWrapper = document.getElementById('card-selection-wrapper');
const cardContainer = document.getElementById('cards-selection-container');

const delayTime = 500;
const wrapperBackgroundDelayTime = 150;

export default function init() {
  return 0;
}

function cardOptionTemplate(count) {
  return `
    <div class="flip-card card-selection-option"  id="card-selection-option-${count}" data-id="${count}">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                Card front TBD
            </div>
            <div class="flip-card-back">

            </div>
        </div>
    </div>
    `;
}

function generateCardUI() {
  // card 1
  const cardHtml1 = cardOptionTemplate(0);
  const cardHtml2 = cardOptionTemplate(1);
  const cardHtml3 = cardOptionTemplate(2);
  const cardHtml4 = cardOptionTemplate(3);

  cardContainer.innerHTML = `
    ${cardHtml1}
    ${cardHtml2}
    ${cardHtml3}
    ${cardHtml4}
  `;
}

function getCardElements() {
  const card1 = document.getElementById('card-selection-option-0');
  const card2 = document.getElementById('card-selection-option-1');
  const card3 = document.getElementById('card-selection-option-2');
  const card4 = document.getElementById('card-selection-option-3');

  return [card1, card2, card3, card4];
}

function attachClickHandlers({ cardDeck, player, isSinglePlayer, onCardClose }) {
  const cards = getCardElements();
  cards.forEach(card => {
    card.addEventListener('click', e =>
      onClickHandler({ e, cardDeck, player, isSinglePlayer, onCardClose })
    );
  });
}

function getCardSize() {
  const totalWidth = cardContainer.offsetWidth;
  const cardWidth = totalWidth / 3;
  const cardHeight = cardWidth * 0.5625;

  return { cardWidth, cardHeight };
}

function getCardGridPosition() {
  const { cardWidth, cardHeight } = getCardSize();

  const totalWidth = cardContainer.offsetWidth;
  const totalHeight = cardContainer.offsetHeight;

  const horizontalGap = (totalWidth - 2 * cardWidth) / 3;
  const verticalGap = (totalHeight - 2 * cardHeight) / 3;

  const constCardPositions = [{}, {}, {}, {}];

  constCardPositions[0].left = `${horizontalGap}px`;
  constCardPositions[2].left = `${horizontalGap}px`;
  constCardPositions[1].left = `${2 * horizontalGap + cardWidth}px`;
  constCardPositions[3].left = `${2 * horizontalGap + cardWidth}px`;

  constCardPositions[0].top = `${verticalGap}px`;
  constCardPositions[1].top = `${verticalGap}px`;
  constCardPositions[2].top = `${2 * verticalGap + cardHeight}px`;
  constCardPositions[3].top = `${2 * verticalGap + cardHeight}px`;

  return constCardPositions;
}

function setCardSizes() {
  const cards = getCardElements();
  const { cardWidth, cardHeight } = getCardSize();

  cards.forEach(card => {
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
  });
}

function arrangeCardsOffscreen(excludeCardIndex) {
  const cardPositions = getCardGridPosition();
  const cards = getCardElements();
  const windowHeight = window.innerHeight;

  cards.forEach((card, i) => {
    if (excludeCardIndex == i) return;

    card.style.left = `${cardPositions[i].left}`;
    card.style.top = `${windowHeight}px`;
  });
}

function arrangeCardsOnscreen() {
  const cardPositions = getCardGridPosition();

  const cards = getCardElements();

  cards.forEach((card, i) => {
    card.style.left = `${cardPositions[i].left}`;
    card.style.top = `${cardPositions[i].top}`;
  });
}

function insertCardData({ cardEl, cardDeck, player, isSinglePlayer }) {
  const cardData = cardDeck.drawCard();

  console.log('insertCardData', isSinglePlayer);
  const cardHTML = cardTemplate(cardData, player, isSinglePlayer);

  const cardBackEl = cardEl.querySelector('.flip-card-back');
  cardBackEl.innerHTML = cardHTML;
}

function attachOnCloseHandler({ cardEl, onCardClose }) {
  const cardCloseEl = document.getElementById('card-close-button');

  console.log('onCardClose', onCardClose);

  cardCloseEl.addEventListener('click', () => {
    const windowHeight = window.innerHeight;
    cardEl.style.transform = 'top 0.15s ease'; // make close animation faster
    cardEl.style.top = `${windowHeight}px`;

    cardContainerWrapper.classList.add('fade-out');
    setTimeout(() => {
      cardContainerWrapper.classList.add('hidden');
      cardContainerWrapper.classList.remove('fade-out');
    }, wrapperBackgroundDelayTime);

    onCardClose();
    console.log('handle card close');
  });
}

function moveCardToCenter(cardIndex) {
  const { cardWidth, cardHeight } = getCardSize();
  const totalWidth = cardContainer.offsetWidth;
  const totalHeight = cardContainer.offsetHeight;

  const centerLeft = totalWidth / 2 - cardWidth / 2;
  const centerTop = totalHeight / 2 - cardHeight / 2;

  const cards = getCardElements();
  const card = cards[cardIndex];

  card.style.left = `${centerLeft}px`;
  card.style.top = `${centerTop}px`;

  setTimeout(() => {
    card.style.transform = 'scale(2)';

    card.classList.add('flipped');
  }, delayTime);
}

function onClickHandler({ e, cardDeck, player, isSinglePlayer, onCardClose }) {
  const cardEl = e.target.closest('.card-selection-option');
  if (cardEl.dataset.hasBeenClick) return;

  const cardIndex = parseInt(cardEl.getAttribute('data-id'));
  cardEl.dataset.hasBeenClick = true;

  arrangeCardsOffscreen(cardIndex);
  insertCardData({ cardEl, cardDeck, player, isSinglePlayer });
  attachOnCloseHandler({ cardEl, onCardClose });
  moveCardToCenter(cardIndex);

  cardEl.removeEventListener('click', this);
}

export function showCards({ cardDeck, player, isSinglePlayer, onCardClose }) {
  cardContainerWrapper.classList.remove('hidden');
  setTimeout(() => cardContainerWrapper.classList.add('fade-in'), 0);

  console.log('showCards', isSinglePlayer);

  if (player.isComputer) {
    cardContainer.classList.add('computer-selection');
  } else {
    cardContainer.classList.remove('computer-selection');
  }

  generateCardUI();
  attachClickHandlers({ cardDeck, player, isSinglePlayer, onCardClose });
  setCardSizes();

  arrangeCardsOffscreen();
  arrangeCardsOnscreen();
}
