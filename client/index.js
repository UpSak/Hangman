function drawstick() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.moveTo(250, 60);
  c.lineTo(250, 20);
  c.lineTo(180, 20);
  c.lineTo(180, 235);
  c.lineTo(250, 235);
  c.stroke();
  c.closePath();
}

function head() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.arc(250, 80, 20, 0, 2 * Math.PI);
  c.stroke();
  c.closePath();
}

function torso() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.moveTo(250, 155);
  c.lineTo(250, 100);
  c.stroke();
  c.closePath();
}

function rightarm() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.moveTo(250, 100);
  c.lineTo(300, 150);
  c.stroke();
  c.closePath();
}

function leftarm() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.moveTo(250, 100);
  c.lineTo(210, 150);
  c.stroke();
  c.closePath();
}

function rightleg() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.moveTo(210, 220);
  c.lineTo(250, 155);
  c.lineTo(300, 220);
  c.stroke();
  c.closePath();
}

function leftleg() {
  const canvas = document.querySelector('#stickman');
  const c = canvas.getContext('2d');
  c.fillStyle = 'black';
  c.beginPath();
  c.lineTo(250, 155);
  c.lineTo(300, 220);
  c.stroke();
  c.closePath();
}

let selectedword = '';
function rng() {
  const wordlist = ['hello', 'hi', 'greetings'];
  selectedword = wordlist[Math.floor(Math.random() * wordlist.length)];
  console.log(selectedword);
  document.querySelector('#theword').textContent = selectedword;
}

let textContent = '';
function displayword() {
  for (let index = 0; index < selectedword.length; index++) {
    textContent = textContent + '_';
  }
  document.querySelector('#theword').textContent = textContent;
}

function buttoncreate() {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const key = document.querySelector('#bletters');
  for (let i = 0; i < alphabet.length; i++) {
    const letterBtn = document.createElement('button');
    letterBtn.setAttribute('id', 'letters');
    letterBtn.textContent = alphabet[i];
    letterBtn.addEventListener('click', buttoninput);
    letterBtn.addEventListener('click', highlight);
    key.append(letterBtn);
  }
}

function highlight(e) {
  e.target.classList.add('active');
  e.target.setAttribute('disabled', true);

}

function buttoninput(e) {
  const inputbtn = e.target.textContent;
  console.log(inputbtn);
  if (selectedword.split('').includes(inputbtn)) {
    reveal(inputbtn);
    displayprev(inputbtn)
  } else {
    notinclude();
    displayprev(inputbtn)
  }
}

function presskey(e) {
  const input = e.key.toLowerCase();
  console.log(input);
  if (selectedword.split('').includes(input)) {
    reveal(input);
  } else {
    notinclude();
  }
}

let prevl = '';
function displayprev(inputbtn) {
  const prevlist = prevl.split('');
  prevlist.push(inputbtn);
  prevl = prevlist.join(' ');
  document.querySelector('#prevl').textContent = prevlist.join(' ');
}

function notinclude() {
  console.log('no');
  lives -= 1;
  console.log(lives);
  hangmanprogdraw(lives);
  document.querySelector('#lives').textContent = lives;
  checklost();
}

function reveal(input, inputbtn) {
  const textContentlist = textContent.split('');
  console.log(textContentlist);
  for (let i = 0; i < selectedword.length; i++) {
    if (input === selectedword[i] || inputbtn === selectedword[i]) {
      textContentlist[i] = input;
      console.log(textContent[i]);
      document.querySelector('#theword').textContent = textContentlist.join('');
      textContent = textContentlist.join('');
      console.log(textContent);
      checkwin(textContent);
    }
  }
}

function checkwin(textContent) {
  if (textContent === selectedword) {
    console.log('win');
    winscore();
  }
}

let lives = 6;
function winscore() {
  alert('you won with ' + lives + ' lives');
  disAllB = document.querySelectorAll('#letters');
  for(let i = 0; i < disAllB.length; i++){
    disAllB[i].setAttribute('disabled', true);
  }
}

function checklost() {
  if (lives === 0) {
    lost();
  }
}

function lost() {
  alert('you lose the word is: ' + selectedword);
  disAllB = document.querySelectorAll('#letters');
  for(let i = 0; i < disAllB.length; i++){
    disAllB[i].setAttribute('disabled', true);
  }
}

function hangmanprogdraw(lives) {
  const canvasprog = [rightleg, leftleg, rightarm, leftarm, torso, head];
  for (let i = 0; i < canvasprog.length; i++) {
    if (i === lives) {
      canvasprog[i]();
      console.log(canvasprog[i]);
    }
  }
}

function init() {
  rng();
  drawstick();
  displayword();
  buttoncreate();
  reveal();
}

window.addEventListener('load', init);
document.addEventListener('keypress', presskey);

