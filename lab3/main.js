function playSound(sound) {
  const audio = document.querySelector(`audio[data-key="${sound.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${sound.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
  if (isRecording) {
      const now = Date.now();
      const timeElapsed = now - recordStartTime;
      records[currentChannel].push({ keyCode: sound.keyCode, time: timeElapsed });
  }
}

let isRecording = false;
let recordStartTime;
let currentChannel = 1;
const records = { 1: [], 2: [], 3: [], 4: [] };

function startRecording(channel) {
  isRecording = true;
  currentChannel = channel;
  records[channel] = [];
  recordStartTime = Date.now();
}

function stopRecording() {
  isRecording = false;
}

function playRecord(channel) {
  records[channel].forEach(note => {
      setTimeout(() => {
          const event = new KeyboardEvent('keydown', { keyCode: note.keyCode });
          playSound(event);
      }, note.time);
  });
}

document.getElementById('recordChannel1').addEventListener('click', () => startRecording(1));
document.getElementById('stopChannel1').addEventListener('click', stopRecording);
document.getElementById('playChannel1').addEventListener('click', () => playRecord(1));
document.getElementById('recordChannel2').addEventListener('click', () => startRecording(2));
document.getElementById('stopChannel2').addEventListener('click', stopRecording);
document.getElementById('playChannel2').addEventListener('click', () => playRecord(2));
document.getElementById('recordChannel3').addEventListener('click', () => startRecording(3));
document.getElementById('stopChannel3').addEventListener('click', stopRecording);
document.getElementById('playChannel3').addEventListener('click', () => playRecord(3));
document.getElementById('recordChannel4').addEventListener('click', () => startRecording(4));
document.getElementById('stopChannel4').addEventListener('click', stopRecording);
document.getElementById('playChannel4').addEventListener('click', () => playRecord(4));

document.getElementById('playAllChannels').addEventListener('click', () => {
  playRecord(1)
  playRecord(2)
  playRecord(3)
  playRecord(4)
});


window.addEventListener('keydown', playSound);
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function removeTransition(sound) {
  if (sound.propertyName !== 'transform') return;
  this.classList.remove('playing');
}
  