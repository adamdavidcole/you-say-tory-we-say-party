const commonerAudio = document.getElementById('commoner-audio');
const mpAudio = document.getElementById('mp-audio');

const beepUp1 = document.getElementById('beep-up-1-audio');
const beepUp2 = document.getElementById('beep-up-2-audio');
const beepDown1 = document.getElementById('beep-down-1-audio');

const commonerSound = document.getElementById('commoner-sound');
const borisSound = document.getElementById('boris-sound');
const nadineSound = document.getElementById('nadine-sound');
const moggSound = document.getElementById('mogg-sound');

export function playCommonerAudio() {
  if (!commonerAudio.paused) return;

  commonerAudio.volume = 0.1;
  commonerAudio.play();
}

export function pauseCommonerAudio() {
  commonerAudio.pause();
  commonerAudio.currentTime = 0;
}

export function playMpAudio() {
  if (!mpAudio.paused) return;

  mpAudio.volume = 0.05;
  mpAudio.play();
}

export function pauseMpAudio() {
  mpAudio.pause();
  mpAudio.currentTime = 0;
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

const characterSoundVolume = 0.075;

export function playCommonerSound() {
  commonerSound.volume = characterSoundVolume;

  commonerSound.play();
}

export function playNadineSound() {
  nadineSound.volume = characterSoundVolume;

  nadineSound.play();
}

export function playBorisSound() {
  borisSound.volume = characterSoundVolume;

  borisSound.play();
}

export function playMoggSound() {
  moggSound.volume = characterSoundVolume;

  moggSound.play();
}

export function playPlayerSound(player, delay = 0) {
  setTimeout(() => {
    switch (player.name) {
      case 'Boris J.':
        playBorisSound();
        break;
      case 'Nadine D.':
        playNadineSound();
        break;
      case 'Jacob R.M.':
        playMoggSound();
        break;
      case 'Commoner':
        playCommonerSound();
        break;
      default:
    }
  }, delay);
}
