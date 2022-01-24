/* eslint-disable arrow-parens */
import { ROLES, GAME_STATES } from './constants';
import CardDeck from './card-deck';
import Player from './player';
import GameDisplay from './game-display';
import { showCard, hideCard } from './card-visibility';
import {
  playCommonerAudio,
  pauseCommonerAudio,
  playMpAudio,
  pauseMpAudio,
  playBeepUp1,
  playBeepUp2,
  playBeepDown1,
} from './audio-player';

const gameState = {
  status: GAME_STATES.INITIALIZING,
  numPlayers: 0,
  currentRound: 0,
  nextPlayerTurn: 0,
  players: [],
  lastCardDrawn: null,
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

function updateGameTurnUI() {
  const nextPlayer = gameState.players[gameState.nextPlayerTurn];

  const nextPlayerTurnEl = document.getElementById('next-player-turn');
  nextPlayerTurnEl.innerText = nextPlayer.name;
}

function updateGameOverStatus(player) {
  const nextTurnStateEl = document.getElementById('next-turn-state');
  const gameOverStateEl = document.getElementById('game-over-state');

  nextTurnStateEl.style.display = 'none';
  gameOverStateEl.innerHTML = `<h3>Game Over</h3> ${player.name} the ${player.role} has won the game in ${gameState.currentRound} rounds`;
}

function startGame(playerCount) {
  const initializeGameStateEl = document.getElementById('game-start-view');
  const nextTurnStateEl = document.getElementById('next-turn-state');

  createPlayers(playerCount);
  gameState.status = GAME_STATES.PLAYING;

  initializeGameStateEl.remove();
  nextTurnStateEl.style.display = 'flex';

  updateGameTurnUI();
  gameDisplay.initializeGame();

  playBeepUp2();
  setTimeout(() => playMpAudio(), 250);
}

const MpCardDeck = new CardDeck(ROLES.MP);
const CommonerCardDeck = new CardDeck(ROLES.COMMONER);
function getCardDeck(role) {
  return role === ROLES.MP ? MpCardDeck : CommonerCardDeck;
}

function onCardClose() {
  nextTurnButton.disabled = false;

  const currentPlayerTurnIndex = gameState.nextPlayerTurn;
  const currPlayer = gameState.players[currentPlayerTurnIndex];

  const card = gameState.lastCardDrawn;
  currPlayer.updatePosition(card.positionChange);
  const hasPlayerWon = currPlayer.checkHasPlayerWon();

  if (hasPlayerWon) {
    gameState.status = GAME_STATES.GAME_OVER;
    updateGameOverStatus(currPlayer, currentPlayerTurnIndex);

    pauseMpAudio();
    playCommonerAudio();
  } else {
    if (card.positionChange > 0) {
      playBeepUp1();
    } else {
      playBeepDown1();
    }

    gameState.nextPlayerTurn = (gameState.nextPlayerTurn + 1) % gameState.numPlayers;
    if (gameState.nextPlayerTurn === 0) gameState.currentRound += 1;
  }

  updateGameTurnUI();
}

function nextTurn() {
  const currentPlayerTurnIndex = gameState.nextPlayerTurn;
  const currPlayer = gameState.players[currentPlayerTurnIndex];

  const cardDeck = getCardDeck(currPlayer.role);
  const card = cardDeck.drawCard();
  showCard(card, currPlayer, onCardClose);
  playBeepUp2();

  gameState.lastCardDrawn = card;

  nextTurnButton.disabled = true;
}

const nextTurnButton = document.getElementById('next-turn-button');
nextTurnButton.addEventListener('click', nextTurn);

// const startGameButton = document.getElementById('start-game-button');
// startGameButton.addEventListener('click', startGame);

const startSinglePlayerGameBtn = document.getElementById('start-single-player-mode-btn');
startSinglePlayerGameBtn.addEventListener('click', () => startGame(1));
const multiPlayerGameBtn = document.getElementsByClassName('multi-player-mode-btn');
for (let i = 0; i < multiPlayerGameBtn.length; i++) {
  const btn = multiPlayerGameBtn[i];
  btn.addEventListener('click', e => {
    const playerCount = parseInt(e.target.getAttribute('data-player-count'));
    startGame(playerCount);
  });
}

//multi-player-mode-btn

const gameDisplay = new GameDisplay(gameState);

function draw() {
  gameDisplay.draw();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
