//gmail//
const emailValidation = /^[a-zA-Z0-9._%+-]{3,}@gmail\.com$/i;

const checkMailBtn = document.getElementById("gmail_button");
const gmailInput = document.getElementById("gmail_input");
const gmailResult = document.getElementById("gmail_result");

// console.log(checkMailBtn);

checkMailBtn.onclick = () => {
  if (emailValidation.test(gmailInput.value)) {
    gmailResult.innerHTML = "OK";
    gmailResult.style.color = "green";
  } else {
    gmailResult.innerHTML = "NE OK";
    gmailResult.style.color = "red";
  }
};

//красный квадрат//
//ver1
// const parentBlock = document.querySelector('.parent_block');
// const childBlock = document.querySelector('.child_block');

// let position = 0;
// const step = 3;
// const maxPosition = parentBlock.offsetWidth - childBlock.offsetWidth;

// function move() {
//     position += step;

//     if (position >= maxPosition) {
//         childBlock.style.left = maxPosition + 'px';
//         return;
//     }
//     childBlock.style.left = position + 'px';

//     requestAnimationFrame(move);
// }

// move();
//ver2
const parent = document.querySelector(".parent_block");
const child = document.querySelector(".child_block");

const step = 3;
const maxX = parent.offsetWidth - child.offsetWidth;
const maxY = parent.offsetHeight - child.offsetHeight;

let x = 0,
  y = 0,
  dir = 0;
function move() {
  if (dir === 0) x += step;
  if (dir === 1) y += step;
  if (dir === 2) x -= step;
  if (dir === 3) y -= step;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  child.style.left = x + "px";
  child.style.top = y + "px";

  if (dir === 0 && x === maxX) dir = 1;
  else if (dir === 1 && y === maxY) dir = 2;
  else if (dir === 2 && x === 0) dir = 3;
  else if (dir === 3 && y === 0) dir = 0;

  requestAnimationFrame(move);
}

move();

//таймер
// let seconds = 0;
// let timerId = null;

// const secondsEl = document.getElementById('seconds');
// const startBtn = document.getElementById('start');
// const stopBtn = document.getElementById('stop');
// const resetBtn = document.getElementById('reset');

// function startTimer() {
//     if (timerId !== null) return;

//     timerId = setInterval(() => {
//         seconds++;
//         secondsEl.textContent = seconds;
//     }, 1000);
// }

// function stopTimer() {
//     clearInterval(timerId);
//     timerId = null;
// }

// function resetTimer() {
//     stopTimer();
//     seconds = 0;
//     secondsEl.textContent = seconds;
// }

// startBtn.addEventListener('click', startTimer);
// stopBtn.addEventListener('click', stopTimer);
// resetBtn.addEventListener('click', resetTimer);

let seconds = 0;
let timerId = null;

const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function updateDisplay() {
  secondsEl.textContent = seconds;
  secondsEl.style.color = getRandomColor();
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    seconds++;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

//chars
// fetch("https://akabab.github.io/superhero-api/api/id/1.json")
//   .then((response) => response.json())
//   .then((hero) => {
//     document.getElementById("card").innerHTML = `
//       <h2>${hero.name}</h2>
//       <img src="${hero.images.md}" alt="${hero.name}">
//       <p>Сила: ${hero.powerstats.strength}</p>
//       <p>Скорость: ${hero.powerstats.speed}</p>
//       <p>Интеллект: ${hero.powerstats.intelligence}</p>
//     `;
//   });

//   const chars = []

// chars.forEach((char)=>{
//   const card = document.createElement('div')
// })

// const card = document.querySelector("#card");

// async function getCharacters() {
//   const requests = [];

//   for (let id = 1; id <= 8; id++) {
//     requests.push(
//       fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`).then(
//         (response) => response.json(),
//       ),
//     );
//   }

//   const characters = await Promise.all(requests);

//   characters.forEach((character) => {
//     const x = "UNKNOWN";
//     const fullName = character.biography.fullName || x;
//     const publisher = character.biography.publisher || x;
//     const gender = character.appearance.gender || x;
//     const race = character.appearance.race || x;

//     card.innerHTML += `
//       <div class="character-card">
//         <img
//           src="${character.images.sm}"
//           alt="${character.name}"
//         >

//         <h2><span>name:</span> ${character.name}</h2>

//         <p><span>fullname:</span> ${fullName}</p>

//         <p><span>publisher:</span> ${publisher}</p>

//         <p><span>gender:</span> ${gender}</p>
//         <p><span>race:</span> ${race}</p>

//       </div>
//     `;
//   });
// }

// getCharacters();

//1: ЗАПРОС НА СПИСОК ПЕРСОНАЖЕЙ JSON
const card = document.querySelector("#card");

fetch("/data/characters.json")
  .then((response) => response.json())
  .then((characters) => {
    characters.forEach((character) => {
      card.innerHTML += `
        <div class="character-card">
        <img
//           src="${character.img}"
//           alt="${character.name}"
//         >
          <h2><span>Имя:</span> ${character.name}</h2>
          <p><span>Возраст:</span> ${character.age}</p>
          <p><span>Сила:</span> ${character.power}</p>
        </div>
      `;
    });
  })
  .catch((error) => console.error("Ошибка:", error));

//2: ЗАПРОС НА JSON ФАЙЛ ANY

const xhr = new XMLHttpRequest();

xhr.open("GET", "/data/characters.json");

xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);

    console.log(data);
  }
};

xhr.send();
