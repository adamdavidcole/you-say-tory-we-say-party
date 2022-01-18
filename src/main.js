/* eslint-disable arrow-parens */
import { ROLES } from './constants';
import CardDeck from './card-deck';

const gameState = {
  status: 'PLAYING',
  numPlayers: 2,
  currentRound: 0,
  nextPlayerTurn: 0,
  playersState: [
    {
      role: ROLES.MP,
      position: 0,
    },
    {
      role: ROLES.COMMONER,
      position: 0,
    },
  ],
};

function updateGameStateUI() {
  const currentStatusEl = document.getElementById('current-status');
  const currentRoundEl = document.getElementById('current-round');
  const nextPlayerTurnEl = document.getElementById('next-player-turn');
  const currentPlayerPositionsEl = document.getElementById('current-player-positions');

  currentStatusEl.innerText = gameState.status;
  currentRoundEl.innerText = gameState.currentRound;
  nextPlayerTurnEl.innerText = gameState.nextPlayerTurn;

  currentPlayerPositionsEl.innerHTML = gameState.playersState
    .map(
      (playerState, i) => `
    <div>
      <b>ID:</b> ${i}
      <b>, Role: </b> ${playerState.role} 
      <b>, Position: </b> ${playerState.position}
    </div>`
    )
    .join(' ');
}

function updateGameTurnUI({ card, currentPlayerTurnId }) {
  const currentPlayerTextEl = document.getElementById('current-player-turn');
  const currentTurnCardTextEl = document.getElementById('current-turn-card-text');
  const currentTurnCardPositionChangeTextEl = document.getElementById(
    'current-turn-card-position-change-text'
  );

  currentPlayerTextEl.innerHTML = currentPlayerTurnId;
  currentTurnCardTextEl.innerHTML = card.text;
  currentTurnCardPositionChangeTextEl.innerHTML = card.positionChangeText;
}

const MpCardDeck = new CardDeck(ROLES.MP);
const CommonerCardDeck = new CardDeck(ROLES.COMMONER);
function getCardDeck(role) {
  return role === ROLES.MP ? MpCardDeck : CommonerCardDeck;
}

function nextTurn() {
  const currentPlayerTurnId = gameState.nextPlayerTurn;
  const currPlayerState = gameState.playersState[currentPlayerTurnId];

  const cardDeck = getCardDeck(currPlayerState.role);
  const card = cardDeck.drawCard();
  const nextPosition = currPlayerState.position + card.positionChange;
  currPlayerState.position = Math.max(0, nextPosition); //   // ensure we don't move behind 0

  gameState.nextPlayerTurn = (gameState.nextPlayerTurn + 1) % gameState.numPlayers;
  if (gameState.nextPlayerTurn === 0) gameState.currentRound += 1;

  updateGameStateUI();
  updateGameTurnUI({ card, currentPlayerTurnId });
}

const nextTurnButton = document.getElementById('next-turn-button');
nextTurnButton.addEventListener('click', nextTurn);

updateGameStateUI();
