/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import { MAX_MP_POSITION, MAX_COMMONER_POSITION, ROLES } from './constants';

const mpPlayerColors = ['#FF0000', '#00FF00', '#0000FF'];
const commonerPlayerColor = '#000000';

const margin = 20;

export default class GameDisplay {
  constructor(gameState) {
    const canvas = document.getElementById('gameDisplay');
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;

    this.width = window.innerWidth;
    this.resetSize();

    window.addEventListener('resize', () => {
      this.onResize();
    });

    console.log(this.ctx);

    this.gameState = gameState;
  }

  onResize() {
    console.log('onResize');
    this.resetSize();
    this.draw();
  }

  resetSize() {
    const { topBorder, width, height } = this.getMpTrackPosition();
    const { commonerLeftBorder, commonerTopBorder, commonerHeight, commonerSectionWidth } =
      this.getCommonerTrackPosition();
    const totalHeight = commonerTopBorder + commonerHeight + margin;

    const windowWidth = window.innerWidth;
    this.canvas.width = windowWidth;
    this.canvas.height = totalHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  getMpTrackPosition() {
    const leftBorder = margin;
    const topBorder = margin;
    const width = this.width - 2 * margin;
    const height = Math.min(window.innerHeight / 3, 200);
    const sectionWidth = width / MAX_MP_POSITION;

    return {
      leftBorder,
      topBorder,
      width,
      height,
      sectionWidth,
    };
  }

  getCommonerTrackPosition() {
    const { topBorder, width, height } = this.getMpTrackPosition();
    const commonerLeftBorder = this.width / 2 - width / 5;
    const commonerTopBorder = topBorder + height + margin;
    const commonerWidth = width / 2.5;
    const commonerHeight = 100;
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

    this.ctx.beginPath();
    this.ctx.rect(leftBorder, topBorder, width, height);
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
    const mpPlayers = this.gameState.players.filter(player => player.role === ROLES.MP);
    const commonerPlayer = this.gameState.players.find(player => player.role === ROLES.COMMONER);

    if (mpPlayers.length === 0 || !commonerPlayer) return;

    const { leftBorder, topBorder, height, sectionWidth } = this.getMpTrackPosition();
    const radius = sectionWidth / 2;

    mpPlayers.forEach(mpPlayer => {
      const gamePosition = mpPlayer.position;

      const xPosition = leftBorder + gamePosition * sectionWidth - sectionWidth / 2;
      const yPosition = topBorder + (height / (mpPlayers.length + 1)) * (mpPlayer.index + 1);

      const color = mpPlayerColors[mpPlayer.index];
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(xPosition, yPosition, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    });

    const { commonerLeftBorder, commonerTopBorder, commonerHeight, commonerSectionWidth } =
      this.getCommonerTrackPosition();

    const commonerGamePosition = commonerPlayer.position;

    const xPosition =
      commonerLeftBorder + commonerGamePosition * commonerSectionWidth - commonerSectionWidth / 2;
    const yPosition = commonerTopBorder + commonerHeight / 2;

    const commonerRadius = commonerSectionWidth / 4;
    const color = commonerPlayerColor;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(xPosition, yPosition, commonerRadius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawSetting();
    this.drawPlayers();
  }
}
