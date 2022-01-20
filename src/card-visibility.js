let cardIsVisible = false;

const cardContainerEl = document.getElementById('card-container');

const cardTemplate = (card, player) => `
<div id="card">
    <div id="card-player-name">${player.name}</div>
    <div id="card-text">${card.text}</div>
    <div id="card-position-change-text">${card.positionChangeText}</div>
    <div id="card-close-button-container">
        <button id="card-close-button">Close</button>
    </div>
</div>`;

export function showCard(card, player, onCardClose) {
  cardIsVisible = true;

  cardContainerEl.innerHTML = cardTemplate(card, player);

  setTimeout(() => {
    cardContainerEl.classList.remove('hidden');

    const closeCardButton = document.getElementById('card-close-button');
    console.log('closeCardButton', closeCardButton, onCardClose);
    closeCardButton.addEventListener('click', () => {
      hideCard();
      onCardClose();
    });
  }, 0);
}

export function hideCard() {
  cardIsVisible = false;

  const cardEl = document.getElementById('card');
  cardEl.classList.add('closed');

  setTimeout(() => {
    cardEl.remove();
    cardContainerEl.classList.add('hidden');
  }, 150);
}

export function isCardVisible() {
  return cardIsVisible;
}
