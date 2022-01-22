/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import { MAX_MP_POSITION, MAX_COMMONER_POSITION, ROLES, GAME_STATES } from './constants';

const mpPlayerColors = ['#FF0000', '#00FF00', '#0000FF'];
const commonerPlayerColor = '#000000';

const margin = 20;

const mpPlayerAvatars = [
  document.getElementById('player-1-container'),
  document.getElementById('player-2-container'),
  document.getElementById('player-3-container'),
];
const commonerAvatar = document.getElementById('player-commoner-container');

const mpTrackBackgroundImgContainer = document.getElementById('mp-track-background-container');
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
  }

  onResize() {
    this.resetSize();
    this.draw();
  }

  initializeGame() {
    mpTrackBackgroundImgContainer.classList.remove('hidden');
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

    const leftBorder = margin;
    const topBorder = 2 * heightUnit;
    const width = this.width - 2 * margin;
    const height = heightUnit;
    const sectionWidth = width / MAX_MP_POSITION;

    console.log('width', width, height);

    return {
      leftBorder,
      topBorder,
      width,
      height,
      sectionWidth,
    };
  }

  getCommonerTrackPosition() {
    const heightUnit = this.height / 8;
    const { topBorder, width, height } = this.getMpTrackPosition();

    const commonerLeftBorder = this.width / 2 - width / 5;
    const commonerTopBorder = topBorder + 3 * heightUnit;
    const commonerWidth = width / 2.5;
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

  drawSetting() {
    // MP border
    const { leftBorder, topBorder, width, height, sectionWidth } = this.getMpTrackPosition();

    // this.ctx.drawImage(mpTrackBackgroundImg, leftBorder, topBorder, width, height);

    this.ctx.beginPath();
    this.ctx.rect(leftBorder, topBorder, width, height);
    console.log('rect', leftBorder, topBorder, width, height);
    this.ctx.strokeStyle = '#FF0000';
    this.ctx.stroke();
    this.ctx.closePath();

    for (let i = 0; i < MAX_MP_POSITION; i += 1) {
      const lineStartX = leftBorder + i * sectionWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(lineStartX, topBorder);
      this.ctx.lineTo(lineStartX, topBorder + height);
      this.ctx.stroke();
    }

    // commoner Border
    const {
      commonerLeftBorder,
      commonerTopBorder,
      commonerWidth,
      commonerHeight,
      commonerSectionWidth,
    } = this.getCommonerTrackPosition();

    this.ctx.drawImage(
      commonerTrackBackgroundImg,
      leftBorder,
      commonerTopBorder - height / 4,
      width,
      height
    );

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

  drawPlayers() {
    const { offsetTop, offsetLeft } = this.canvas;

    const mpPlayers = this.gameState.players.filter(player => player.role === ROLES.MP);
    const commonerPlayer = this.gameState.players.find(player => player.role === ROLES.COMMONER);

    if (mpPlayers.length === 0 || !commonerPlayer) return;

    const { leftBorder, topBorder, height, sectionWidth } = this.getMpTrackPosition();
    const radius = sectionWidth / 2;

    mpPlayers.forEach((mpPlayer, i) => {
      const mpPlayerAvatar = mpPlayerAvatars[i];
      const gamePosition = mpPlayer.position;

      // set width according to section width and get resulting height
      mpPlayerAvatar.style.width = `${radius}px`;
      const mpPlayerAvaterHeight = mpPlayerAvatar.clientHeight;

      const xPosition =
        offsetLeft + // canvas offset
        leftBorder + // mp track offset
        gamePosition * sectionWidth - // player position offset
        sectionWidth / 2 - // negative offset to be in middle of section
        radius / 2; // negative offset for avater to be centered in section
      const yPosition =
        offsetTop + // canvas offset
        topBorder + // mp track offset
        (height / (mpPlayers.length + 1)) * (mpPlayer.index + 1) - // height offset within section based on how many players there are
        mpPlayerAvaterHeight / 2; // negative offset to center avater within height bounding box

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
    console.log('this.wd/hg', this.width, this.height);
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawSetting();
    this.drawPlayers();
  }
}
