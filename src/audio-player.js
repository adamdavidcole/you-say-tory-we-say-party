const commonerAudio = document.getElementById('commoner-audio');
const mpAudio = document.getElementById('mp-audio');

const beepUp1 = document.getElementById('beep-up-1-audio');
const beepUp2 = document.getElementById('beep-up-2-audio');
const beepDown1 = document.getElementById('beep-down-1-audio');

export function playCommonerAudio() {
  commonerAudio.volume = 0.1;
  commonerAudio.play();
}

export function pauseCommonerAudio() {
  commonerAudio.pause();
}

export function playMpAudio() {
  mpAudio.volume = 0.05;
  mpAudio.play();
}

export function pauseMpAudio() {
  mpAudio.pause();
}

export function playBeepUp1() {
  beepUp1.play();
}

export function playBeepUp2() {
  beepUp2.play();
}

export function playBeepDown1() {
  beepDown1.play();
}
