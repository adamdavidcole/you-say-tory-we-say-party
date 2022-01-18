/* eslint-disable arrow-parens */
import { ROLES, GAME_STATES } from './constants';
import CardDeck from './card-deck';
import Player from './player';

const gameState = {
  status: GAME_STATES.PLAYING,
  numPlayers: 0,
  currentRound: 0,
  nextPlayerTurn: 0,
  players: [],
};

function createPlayers() {
  const playerA = new Player({ role: ROLES.MP });
  const playerB = new Player({ role: ROLES.COMMONER });

  gameState.numPlayers = 2;
  gameState.players = [playerA, playerB];
}

function updateGameStateUI() {
  const currentStatusEl = document.getElementById('current-status');
  const currentRoundEl = document.getElementById('current-round');
  const nextPlayerTurnEl = document.getElementById('next-player-turn');
  const currentPlayerPositionsEl = document.getElementById('current-player-positions');

  currentStatusEl.innerText = gameState.status;
  currentRoundEl.innerText = gameState.currentRound;
  nextPlayerTurnEl.innerText = gameState.nextPlayerTurn;

  currentPlayerPositionsEl.innerHTML = gameState.players
    .map(
      (playerState, i) => `
    <div>
      <b>Index:</b> ${i}
      <b>, Role: </b> ${playerState.role} 
      <b>, Position: </b> ${playerState.position}
    </div>`
    )
    .join(' ');
}

function updateGameTurnUI({ card, currentPlayerTurnIndex }) {
  const currentPlayerTextEl = document.getElementById('current-player-turn');
  const currentTurnCardTextEl = document.getElementById('current-turn-card-text');
  const currentTurnCardPositionChangeTextEl = document.getElementById(
    'current-turn-card-position-change-text'
  );

  currentPlayerTextEl.innerHTML = currentPlayerTurnIndex;
  currentTurnCardTextEl.innerHTML = card.text;
  currentTurnCardPositionChangeTextEl.innerHTML = card.positionChangeText;
}

function updateGameOverStatus(player, playerIndex) {
  const nextTurnStateEl = document.getElementById('next-turn-state');
  const gameOverStateEl = document.getElementById('game-over-state');

  nextTurnStateEl.style.display = 'none';
  gameOverStateEl.innerHTML = `<h3>Game Over</h3>  Player ${playerIndex} the ${player.role} has won the game`;
}

const MpCardDeck = new CardDeck(ROLES.MP);
const CommonerCardDeck = new CardDeck(ROLES.COMMONER);
function getCardDeck(role) {
  return role === ROLES.MP ? MpCardDeck : CommonerCardDeck;
}

function nextTurn() {
  const currentPlayerTurnIndex = gameState.nextPlayerTurn;
  const currPlayer = gameState.players[currentPlayerTurnIndex];

  const cardDeck = getCardDeck(currPlayer.role);
  const card = cardDeck.drawCard();
  currPlayer.updatePosition(card.positionChange);
  const hasPlayerWon = currPlayer.checkHasPlayerWon();

  if (hasPlayerWon) {
    gameState.status = GAME_STATES.GAME_OVER;
    updateGameOverStatus(currPlayer, currentPlayerTurnIndex);
  } else {
    gameState.nextPlayerTurn = (gameState.nextPlayerTurn + 1) % gameState.numPlayers;
    if (gameState.nextPlayerTurn === 0) gameState.currentRound += 1;
  }

  updateGameStateUI();
  updateGameTurnUI({ card, currentPlayerTurnIndex });
}

const nextTurnButton = document.getElementById('next-turn-button');
nextTurnButton.addEventListener('click', nextTurn);

createPlayers();
updateGameStateUI();
