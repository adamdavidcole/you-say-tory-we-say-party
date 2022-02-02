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

  let sourceHtml = '';
  if (card.source) {
    sourceHtml = `<a href="${card.source}" target="_blank">*</a>`;
  }

  return `
<div id="card">
    <div id="card-player-name">${player.name}</div>
    <div id="card-text">
      ${card.text}${sourceHtml}
    </div>
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
  cardContainerEl.classList.add('closed');
  cardEl.classList.add('closed');

  setTimeout(() => {
    cardEl.remove();
    cardContainerEl.classList.remove('closed');
    cardContainerEl.classList.add('hidden');
    cardContainerEl.classList.add('out-of-view');
  }, 1000);
}

export function isCardVisible() {
  return cardIsVisible;
}
