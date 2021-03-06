/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import { MAX_MP_POSITION, MAX_COMMONER_POSITION, ROLES, GAME_STATES } from './constants';

const mpPlayerColors = ['#FF0000', '#00FF00', '#0000FF'];
const commonerPlayerColor = '#000000';

const margin = window.innerWidth * 0.015;

const mpPlayerAvatars = [
  document.getElementById('player-1-container'),
  document.getElementById('player-2-container'),
  document.getElementById('player-3-container'),
];
const commonerAvatar = document.getElementById('player-commoner-container');

const mpTrackBackgroundImgContainer = document.getElementById('mp-track-background-container');
const commonerTrackBackgroundContainer = document.getElementById(
  'commoner-track-background-container'
);
const commonerTrackBackgroundImg = document.getElementById('commoner-track-background-img');

export default class GameDisplay {
  constructor(gameState) {
    const canvas = document.getElementById('gameDisplay');
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;

    this.resetSize();

    window.addEventListener('resize', () => {
      this.onResize();
    });

    this.gameState = gameState;

    this.drawTrack = false;
  }

  onResize() {
    this.resetSize();
    this.draw();
  }

  initializeGame() {
    mpTrackBackgroundImgContainer.classList.remove('hidden');
    commonerTrackBackgroundContainer.classList.remove('hidden');
  }

  endGame() {
    mpTrackBackgroundImgContainer.classList.add('hidden');
    commonerTrackBackgroundContainer.classList.add('hidden');

    mpPlayerAvatars.forEach(mpPlayerAvatar => {
      mpPlayerAvatar.classList.add('hidden');
    });
    commonerAvatar.classList.add('hidden');

    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  resetSize() {
    const container = document.getElementById('game-container');

    this.canvas.height = container.clientHeight;
    this.canvas.width = container.clientWidth;

    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    console.log('this.width', this.width, ' this.height ', this.height);
  }

  getMpTrackPosition() {
    const heightUnit = this.height / 8;

    const leftBorder = this.width / 20;
    const topBorder = 2.85 * heightUnit;
    const width = this.width - 2 * leftBorder;
    const height = heightUnit;
    const sectionWidth = width / MAX_MP_POSITION;

    const gapSize = this.width / 16.5;
    const spacedSectionWidth = (width - gapSize * 3) / MAX_MP_POSITION;

    return {
      leftBorder,
      topBorder,
      width,
      height,
      sectionWidth,

      gapSize,
      spacedSectionWidth,
    };
  }

  getCommonerTrackPosition() {
    const heightUnit = this.height / 8;
    const { topBorder, width, height } = this.getMpTrackPosition();

    const commonerLeftBorder = this.width / 2 - width / 8.75;
    const commonerTopBorder = topBorder + 2 * heightUnit;
    const commonerWidth = width / 4.38;
    const commonerHeight = heightUnit;
    const commonerSectionWidth = commonerWidth / MAX_COMMONER_POSITION;

    return {
      commonerLeftBorder,
      commonerTopBorder,
      commonerWidth,
      commonerHeight,
      commonerSectionWidth,
    };
  }

  // gets mp position offset from left border
  getMpXPos(mpPos) {
    const { leftBorder, gapSize, spacedSectionWidth } = this.getMpTrackPosition();

    const gaps = Math.floor(mpPos / 4);
    const xPos = leftBorder + mpPos * spacedSectionWidth + gaps * gapSize;
    return xPos;
  }

  drawSetting() {
    // MP border
    const { leftBorder, topBorder, width, height, spacedSectionWidth } = this.getMpTrackPosition();

    // this.ctx.drawImage(mpTrackBackgroundImg, leftBorder, topBorder, width, height);

    if (this.drawTrack) {
      this.ctx.beginPath();
      this.ctx.rect(leftBorder, topBorder, width, height);
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.stroke();
      this.ctx.closePath();

      for (let i = 0; i < MAX_MP_POSITION; i += 1) {
        const lineStartX = this.getMpXPos(i);

        if ((i + 1) % 4 === 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(lineStartX + spacedSectionWidth, topBorder);
          this.ctx.lineTo(lineStartX + spacedSectionWidth, topBorder + height);
          this.ctx.stroke();
        }

        this.ctx.beginPath();
        this.ctx.moveTo(lineStartX, topBorder);
        this.ctx.lineTo(lineStartX, topBorder + height);
        this.ctx.stroke();
      }
    }

    // commoner Border
    const {
      commonerLeftBorder,
      commonerTopBorder,
      commonerWidth,
      commonerHeight,
      commonerSectionWidth,
    } = this.getCommonerTrackPosition();

    // this.ctx.drawImage(
    //   commonerTrackBackgroundImg,
    //   leftBorder,
    //   commonerTopBorder - height / 4,
    //   width,
    //   height
    // );

    if (this.drawTrack) {
      this.ctx.beginPath();
      this.ctx.rect(commonerLeftBorder, commonerTopBorder, commonerWidth, commonerHeight);
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.stroke();
      this.ctx.closePath();

      for (let i = 0; i < MAX_COMMONER_POSITION; i += 1) {
        const lineStartX = commonerLeftBorder + i * commonerSectionWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(lineStartX, commonerTopBorder);
        this.ctx.lineTo(lineStartX, commonerTopBorder + commonerHeight);
        this.ctx.stroke();
      }
    }
  }

  drawPlayers() {
    const { offsetTop, offsetLeft } = this.canvas;

    const mpPlayers = this.gameState.players.filter(player => player.role === ROLES.MP);
    const commonerPlayer = this.gameState.players.find(player => player.role === ROLES.COMMONER);

    if (mpPlayers.length === 0 || !commonerPlayer) return;

    const { leftBorder, topBorder, height, sectionWidth } = this.getMpTrackPosition();
    const radius = sectionWidth * 1.2;

    mpPlayers.forEach((mpPlayer, i) => {
      const mpPlayerAvatar = mpPlayerAvatars[i];
      const gamePosition = mpPlayer.position;

      // set width according to section width and get resulting height
      mpPlayerAvatar.style.width = `${radius}px`;
      const mpPlayerAvaterHeight = mpPlayerAvatar.clientHeight;

      const xPosition =
        offsetLeft + // canvas offset
        leftBorder + // mp track offset
        this.getMpXPos(gamePosition - 1) - // player position offset
        sectionWidth / 2 - // negative offset to be in middle of section
        radius / 2; // negative offset for avater to be centered in section
      const yPosition =
        offsetTop + // canvas offset
        topBorder + // mp track offset
        (height / (mpPlayers.length + 1)) * (mpPlayer.index + 1) - // height offset within section based on how many players there are
        mpPlayerAvaterHeight + // negative offset to center avater within height bounding box
        this.height / 40; // slight shift down

      mpPlayerAvatar.classList.remove('hidden');
      mpPlayerAvatar.style.left = `${xPosition}px`;
      mpPlayerAvatar.style.top = `${yPosition}px`;
    });

    const { commonerLeftBorder, commonerTopBorder, commonerHeight, commonerSectionWidth } =
      this.getCommonerTrackPosition();

    const commonerGamePosition = commonerPlayer.position;

    // set width according to section width and get resulting height
    const commonerRadius = commonerSectionWidth;
    commonerAvatar.style.width = `${commonerRadius}px`;
    const commonerAvaterHeight = commonerAvatar.clientHeight;

    const xPosition =
      offsetLeft +
      commonerLeftBorder +
      commonerGamePosition * commonerSectionWidth -
      commonerSectionWidth / 2 -
      commonerRadius / 2;
    const yPosition =
      offsetTop + // canvas offset
      commonerTopBorder + // commoner track within canvas offset
      commonerHeight / 2 - // offset avatar to start halfway within section
      commonerAvaterHeight / 2; // negative offset so avatar is centered within section

    //commonerAvatar
    commonerAvatar.classList.remove('hidden');
    commonerAvatar.style.left = `${xPosition}px`;
    commonerAvatar.style.top = `${yPosition}px`;
  }

  draw() {
    if (this.gameState.status === GAME_STATES.INITIALIZING) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawSetting();
    this.drawPlayers();
  }
}
