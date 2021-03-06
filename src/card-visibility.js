import { POSITION_CHANGE_SPECIAL } from './constants';

let cardIsVisible = false;

const cardContainerEl = document.getElementById('card-container');

export const cardTemplate = (card, player, isSinglePlayerMode) => {
  let positionChangeText = card.positionChangeText;

  let computerText = '';
  if (isSinglePlayerMode) {
    if (player.isComputer) {
      computerText = '<div id="card-player-subtitle">(computer)</div>';
    } else {
      computerText = '<div id="card-player-subtitle">(you)</div>';
    }
  }

  if (isSinglePlayerMode) {
    if (player.isComputer) {
      positionChangeText = card.positionChangeText;
    } else {
      positionChangeText = `You ${positionChangeText.toLowerCase()}`;
    }
  }

  // wrap position change text
  if (card.positionChange > 0 || card.positionChange === POSITION_CHANGE_SPECIAL.ADVANCE) {
    positionChangeText = `<span class="position_change_forward" >${positionChangeText}</span>`;
  } else {
    positionChangeText = `<span class="position_change_backward" >${positionChangeText}</span>`;
  }

  // remove ending period
  positionChangeText = positionChangeText.replace(/\./g, '');

  let sourceHtml = '';
  if (card.source) {
    sourceHtml = `<a href="${card.source}" target="_blank"><i class="fas fa-link"></i></a>`;
  }

  return `

    <div id="card-player-name">${player.name} ${computerText}</div>
    <div id="card-text">
      ${card.text}${sourceHtml}
    </div>
    <div id="card-position-change-text">${positionChangeText}</div>
    <div id="card-close-button-container">
        <button id="card-close-button">Close</button>
    </div>
`;
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
