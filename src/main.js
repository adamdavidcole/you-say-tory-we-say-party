/* eslint-disable arrow-parens */
import { ROLES, GAME_STATES } from './constants';
import CardDeck from './card-deck';
import Player from './player';
import GameDisplay from './game-display';

const gameState = {
  status: GAME_STATES.INITIALIZING,
  numPlayers: 0,
  currentRound: 0,
  nextPlayerTurn: 0,
  players: [],
};

function createPlayers(playerCount) {
  gameState.players = [];

  if (playerCount === 1) {
    // if one person is playing, set second player as computer
    const playerA = new Player({ role: ROLES.MP, index: 0, isComputer: false });
    const playerB = new Player({ role: ROLES.COMMONER, index: 1, isComputer: true });
    gameState.players.push(playerA, playerB);
  } else {
    // if two to four people are playing, no player is a computer and there is one Commoner
    for (let i = 0; i < playerCount; i += 1) {
      // last player is a commoner
      const role = i === playerCount - 1 ? ROLES.COMMONER : ROLES.MP;
      const player = new Player({ role, index: i, isComputer: false });
      gameState.players.push(player);
    }
  }

  gameState.numPlayers = gameState.players.length;
}

function updateGameTurnUI({ card, currentPlayerTurnIndex } = {}) {
  const currPlayer = gameState.players[currentPlayerTurnIndex];
  const nextPlayer = gameState.players[gameState.nextPlayerTurn];

  const currentPlayerTextEl = document.getElementById('current-player-turn');
  const currentTurnCardTextEl = document.getElementById('current-turn-card-text');
  const nextPlayerTurnEl = document.getElementById('next-player-turn');

  const currentTurnCardPositionChangeTextEl = document.getElementById(
    'current-turn-card-position-change-text'
  );

  if (card) {
    currentPlayerTextEl.innerHTML = currPlayer.name;
    currentTurnCardTextEl.innerHTML = card.text;
    currentTurnCardPositionChangeTextEl.innerHTML = card.positionChangeText;
  }

  nextPlayerTurnEl.innerText = nextPlayer.name;
}

function updateGameOverStatus(player) {
  const nextTurnStateEl = document.getElementById('next-turn-state');
  const gameOverStateEl = document.getElementById('game-over-state');

  nextTurnStateEl.style.display = 'none';
  gameOverStateEl.innerHTML = `<h3>Game Over</h3> ${player.name} the ${player.role} has won the game in ${gameState.currentRound} rounds`;
}

function startGame() {
  const initializeGameStateEl = document.getElementById('initialize-game-state');
  const curentTurnStateEl = document.getElementById('current-turn-state');
  const nextTurnStateEl = document.getElementById('next-turn-state');

  const playerCountValue = document.querySelector(
    'input[name="select-player-count"]:checked'
  ).value;

  const playerCount = parseInt(playerCountValue, 10);

  createPlayers(playerCount);
  gameState.status = GAME_STATES.PLAYING;

  initializeGameStateEl.remove();
  curentTurnStateEl.style.display = 'block';
  nextTurnStateEl.style.display = 'block';

  updateGameTurnUI();
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

  updateGameTurnUI({ card, currentPlayerTurnIndex });
}

const nextTurnButton = document.getElementById('next-turn-button');
nextTurnButton.addEventListener('click', nextTurn);

const startGameButton = document.getElementById('start-game-button');
startGameButton.addEventListener('click', startGame);

const gameDisplay = new GameDisplay(gameState);

function draw() {
  gameDisplay.draw();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
