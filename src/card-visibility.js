let cardIsVisible = false;

const cardContainerEl = document.getElementById('card-container');

export function showCard(card, player) {
  cardIsVisible = true;

  const playerNameEl = document.getElementById('card-player-name');
  const cardTextEl = document.getElementById('card-text');
  const cardPositionChangeTextEl = document.getElementById('card-position-change-text');

  playerNameEl.innerHTML = player.name;
  cardTextEl.innerHTML = card.text;
  cardPositionChangeTextEl.innerHTML = card.positionChangeText;

  cardContainerEl.classList.remove('hidden');
}

export function hideCard() {
  cardIsVisible = false;

  cardContainerEl.classList.add('hidden');
}

export function isCardVisible() {
  return cardIsVisible;
}

cardContainerEl.addEventListener('click', () => {
  if (cardIsVisible) {
    hideCard();
  }
});
