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

const gameState = {};

function setInitialGameState() {
  gameState.status = GAME_STATES.INITIALIZING;
  gameState.numPlayers = 0;
  gameState.currentRound = 0;
  gameState.nextPlayerTurn = 0;
  gameState.players = [];
  gameState.lastCardDrawn = null;
}
setInitialGameState();

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

function showGameIntroOverlay() {
  const gameOverleyEl = document.getElementById('game-overlay-wrapper');
  const gameIntroScreen = document.getElementById('game-intro-screen');

  gameOverleyEl.classList.remove('hidden');
  gameIntroScreen.classList.remove('hidden');

  setTimeout(() => playCommonerAudio(), 250);
}

function hideGameIntroOverlay() {
  const gameOverleyEl = document.getElementById('game-overlay-wrapper');
  const gameIntroScreen = document.getElementById('game-intro-screen');

  gameOverleyEl.classList.add('hidden');
  gameIntroScreen.classList.add('hidden');

  pauseCommonerAudio();
  playBeepUp2();
  setTimeout(() => playMpAudio(), 250);
}

function showGameOverOverlay() {
  const gameOverleyEl = document.getElementById('game-overlay-wrapper');
  const gameOverScreen = document.getElementById('game-over-screen');

  gameOverleyEl.classList.remove('hidden');
  gameOverScreen.classList.remove('hidden');

  setTimeout(() => playCommonerAudio(), 250);
}

function hideGameOverOverlay() {
  const gameOverleyEl = document.getElementById('game-overlay-wrapper');
  const gameOverScreen = document.getElementById('game-over-screen');

  gameOverleyEl.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
}

function onGameOverBtnClick() {
  const initializeGameStateEl = document.getElementById('game-start-view');
  const nextTurnStateEl = document.getElementById('next-turn-state');

  initializeGameStateEl.classList.remove('hidden');
  nextTurnStateEl.classList.add('hidden');
  gameDisplay.endGame();

  hideGameOverOverlay();
  playBeepUp2();
  setInitialGameState();

  // gameDisplay = new GameDisplay(gameState);
}

function updateGameOverStatus(player) {
  const nextTurnStateEl = document.getElementById('next-turn-state');
  const gameOverContentEl = document.getElementById('game-over-content');

  nextTurnStateEl.classList.add('hidden');

  const gameOverHtml = `<p>${player.name} the ${player.role} has won the game in ${gameState.currentRound} rounds</p>`;
  gameOverContentEl.innerHTML = gameOverHtml;

  showGameOverOverlay();
}

function startGame(playerCount) {
  const initializeGameStateEl = document.getElementById('game-start-view');
  const nextTurnStateEl = document.getElementById('next-turn-state');

  createPlayers(playerCount);
  gameState.status = GAME_STATES.PLAYING;

  initializeGameStateEl.classList.add('hidden');
  nextTurnStateEl.classList.remove('hidden');

  updateGameTurnUI();
  gameDisplay.initializeGame();

  playBeepUp2();

  showGameIntroOverlay();
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

    setTimeout(() => {
      updateGameOverStatus(currPlayer, currentPlayerTurnIndex);

      pauseMpAudio();
      playCommonerAudio();
    }, 750); // delay so user can see player move across finish line
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

const gameIntroScreenBtn = document.getElementById('game-intro-screen-btn');
gameIntroScreenBtn.addEventListener('click', hideGameIntroOverlay);

const gameOverScreenBtn = document.getElementById('game-over-screen-btn');
gameOverScreenBtn.addEventListener('click', onGameOverBtnClick);

const gameDisplay = new GameDisplay(gameState);

function draw() {
  gameDisplay.draw();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
