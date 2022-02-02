let cardIsVisible = false;

const cardContainerEl = document.getElementById('card-container');

const cardTemplate = (card, player, isSinglePlayerMode) => {
  let positionChangeText = card.positionChangeText;

  if (isSinglePlayerMode) {
    if (player.isComputer) {
      positionChangeText = card.positionChangeText;
    } else {
      positionChangeText = `You ${positionChangeText.toLowerCase()}`;
    }
  }

  return `
<div id="card">
    <div id="card-player-name">${player.name}</div>
    <div id="card-text">${card.text}</div>
    <div id="card-position-change-text">${positionChangeText}</div>
    <div id="card-close-button-container">
        <button id="card-close-button">Close</button>
    </div>
</div>`;
};

export function showCard({ card, player, onCardClose, isSinglePlayerMode }) {
  cardContainerEl.classList.remove('hidden');

  cardIsVisible = true;

  cardContainerEl.innerHTML = cardTemplate(card, player, isSinglePlayerMode);

  setTimeout(() => {
    cardContainerEl.classList.remove('out-of-view');

    const closeCardButton = document.getElementById('card-close-button');
    closeCardButton.addEventListener('click', () => {
      hideCard();
      onCardClose();
    });
  }, 3);
}

export function hideCard() {
  cardIsVisible = false;

  const cardEl = document.getElementById('card');
  cardEl.classList.add('closed');

  setTimeout(() => {
    cardEl.remove();
    cardContainerEl.classList.add('hidden');
    cardContainerEl.classList.add('out-of-view');
  }, 150);
}

export function isCardVisible() {
  return cardIsVisible;
}
