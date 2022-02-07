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
  playPlayerSound,
} from './audio-player';
import getGameOverContent from './utilities/get-game-over-content';

const gameState = {};

function setInitialGameState() {
  gameState.status = GAME_STATES.INITIALIZING;
  gameState.numPlayers = 0;
  gameState.currentRound = 0;
  gameState.nextPlayerTurn = 0;
  gameState.players = [];
  gameState.lastCardDrawn = null;
  gameState.isSinglePlayer = false;
  gameState.commonerSpriteSrc = '';
}
setInitialGameState();

function isSinglePlayer() {
  return !!gameState.isSinglePlayer;
}

function createPlayers(playerCount) {
  gameState.players = [];

  if (playerCount === 1) {
    // if one person is playing, set second player as computer
    const playerA = new Player({ role: ROLES.MP, index: 0, isComputer: true });
    const playerB = new Player({ role: ROLES.COMMONER, index: 1, isComputer: false });
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

function setPlayerSkinTone() {
  const playerSpriteEl = document.getElementById('player-commoner-img');
  playerSpriteEl.src = gameState.commonerSpriteSrc;
}

// function showComputerTurnUI() {}

function updateGameTurnUI() {
  const nextPlayer = gameState.players[gameState.nextPlayerTurn];
  const nextTurnButton = document.getElementById('next-turn-button');
  const nextPlayerTurnDetailsEl = document.getElementById('next-turn-state-details');

  if (isSinglePlayer()) {
    if (nextPlayer.isComputer) {
      nextTurnButton.classList.add('hidden');

      let ellipseCount = 0;
      let messageContent = 'Boris is drawing a card';
      nextPlayerTurnDetailsEl.innerHTML = messageContent;
      const ellipseInterval = setInterval(() => {
        if (ellipseCount === 3) {
          clearInterval(ellipseInterval);
          if (gameState.status !== GAME_STATES.GAME_OVER) {
            // if computer has not already run, automatically begin turn
            nextTurn();
          }
          return;
        }

        messageContent += '.';
        ellipseCount += 1;
        nextPlayerTurnDetailsEl.innerHTML = messageContent;
      }, 500);
    } else {
      nextTurnButton.classList.remove('hidden');
      nextPlayerTurnDetailsEl.innerHTML = 'Your turn! Click to draw card...';
    }
  } else {
    nextPlayerTurnDetailsEl.innerHTML = `Next player turn <b><span id="next-player-turn">${nextPlayer.name}</span></b>`;
  }
}

function showGameIntroOverlay() {
  const gameOverleyEl = document.getElementById('game-overlay-wrapper');
  const gameIntroScreen = document.getElementById('game-intro-screen');
  const singlePlayerIntroContent = document.getElementById('game-overlay-content-single');
  const multiPlayerIntroContent = document.getElementById('game-overlay-content-multi');

  gameOverleyEl.classList.remove('hidden');
  gameIntroScreen.classList.remove('hidden');

  if (isSinglePlayer()) {
    singlePlayerIntroContent.classList.remove('hidden');
  } else {
    multiPlayerIntroContent.classList.remove('hidden');
  }

  setTimeout(() => playCommonerAudio(), 250);
}

function hideGameIntroOverlay() {
  const gameOverleyEl = document.getElementById('game-overlay-wrapper');
  const gameIntroScreen = document.getElementById('game-intro-screen');
  const singlePlayerIntroContent = document.getElementById('game-overlay-content-single');
  const multiPlayerIntroContent = document.getElementById('game-overlay-content-multi');

  gameOverleyEl.classList.add('hidden');
  gameIntroScreen.classList.add('hidden');

  if (isSinglePlayer()) {
    singlePlayerIntroContent.classList.add('hidden');
  } else {
    multiPlayerIntroContent.classList.add('hidden');
  }

  updateGameTurnUI();

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

  const gameOverContentHTML = getGameOverContent(player, gameState);
  gameOverContentEl.innerHTML = gameOverContentHTML;

  showGameOverOverlay();
}

function startGame(playerCount) {
  const initializeGameStateEl = document.getElementById('game-start-view');
  const nextTurnStateEl = document.getElementById('next-turn-state');

  createPlayers(playerCount);
  gameState.status = GAME_STATES.PLAYING;
  if (playerCount === 1) {
    gameState.isSinglePlayer = true;
    gameState.nextPlayerTurn = 1; // start game with real person
  }

  initializeGameStateEl.classList.add('hidden');
  nextTurnStateEl.classList.remove('hidden');

  // updateGameTurnUI();
  gameDisplay.initializeGame();

  playBeepUp2();

  showGameIntroOverlay();
}

/**
 * CARD DECKS
 */
const CommonerCardDeck = new CardDeck(ROLES.COMMONER);
let MpCardDeck = new CardDeck(ROLES.MP);
for (let i = 0; i < 5; i += 1) {
  // ensure we start with positive move for MP
  const card = MpCardDeck.peekCard();
  if (card.positionChange > 0) break;
  MpCardDeck = new CardDeck(ROLES.MP);
}
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

    const nextTurnStateEl = document.getElementById('next-turn-state');
    // nextTurnStateEl.classList.add('hidden'); TODO hide next turn without losing black bar

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
      playPlayerSound(currPlayer, 400);
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

  if (currPlayer.isComputer && gameState.currentRound <= 1 && card.positionChange <= 0) {
    console.log('bad start!');
  }

  showCard({ card, player: currPlayer, onCardClose, isSinglePlayerMode: isSinglePlayer() });
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

const selectPlayerSpriteBtns = document.getElementsByClassName('select-commoner-player-sprite');
for (let i = 0; i < selectPlayerSpriteBtns.length; i++) {
  const btn = selectPlayerSpriteBtns[i];
  btn.addEventListener('click', e => {
    // get sprite source and use it to set primary game character sprite
    gameState.commonerSpriteSrc = e.target.firstElementChild.src;
    setPlayerSkinTone();

    hideGameIntroOverlay();
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

  // This hides the address bar
  window.scrollTo(0, 2);
}

requestAnimationFrame(draw);
