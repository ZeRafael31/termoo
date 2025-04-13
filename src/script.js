const secretWords = ["poder", "comer", "odiar", "cegar", "gerar", "calor", "morar", "louca", "touca", "jogar", "maior"];
const secret = secretWords[Math.floor(Math.random() * secretWords.length)].toUpperCase();

let currentRow = 0;
let currentGuess = "";
const maxRows = 6;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");

for (let i = 0; i < maxRows; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }
  board.appendChild(row);
}

const layout = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
];

layout.forEach((line, i) => {
  const rowDiv = document.getElementById(`row-${i}`);

  for (let char of line) {
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.className = "key";
    btn.onclick = () => addLetter(char);
    rowDiv.appendChild(btn);
  }

  if (i === 2) {
    const del = document.createElement("button");
    del.textContent = "⌫";
    del.className = "key large";
    del.onclick = deleteLetter;
    rowDiv.appendChild(del);
  }

  if (i === 2) {
    const enter = document.createElement("button");
    enter.textContent = "ENTER";
    enter.className = "key large";
    enter.onclick = checkGuess;
    rowDiv.appendChild(enter);
  }
});

function addLetter(letter) {
  if (currentGuess.length < 5 && currentRow < maxRows) {
    const row = board.children[currentRow];
    row.children[currentGuess.length].textContent = letter;
    currentGuess += letter;
  }
}

function deleteLetter() {
  if (currentGuess.length > 0) {
    const row = board.children[currentRow];
    currentGuess = currentGuess.slice(0, -1);
    row.children[currentGuess.length].textContent = "";
  }
}

function checkGuess() {
  if (currentGuess.length !== 5) return;

  const row = board.children[currentRow];
  const guessArray = currentGuess.toUpperCase().split("");
  const secretArray = secret.split("");
  let feedback = Array(5).fill("absent");

  for (let i = 0; i < 5; i++) {// Primeiro: letras corretas
    if (guessArray[i] === secretArray[i]) {// Primeiro: letras corretas
      feedback[i] = "correct";// Primeiro: letras corretas
      secretArray[i] = null;// Primeiro: letras corretas
    }
  }

  for (let i = 0; i < 5; i++) { // Depois: letras em posições erradas
    if (feedback[i] === "correct") continue; // Depois: letras em posições erradas
    const idx = secretArray.indexOf(guessArray[i]); // Depois: letras em posições erradas
    if (idx !== -1) { // Depois: letras em posições erradas
      feedback[i] = "present"; // Depois: letras em posições erradas
      secretArray[idx] = null; // Depois: letras em posições erradas
    }
  }

  for (let i = 0; i < 5; i++) {  // Aplica classes
    row.children[i].classList.add(feedback[i]);  // Aplica classes
  }  // Aplica classes

  if (currentGuess === secret) {
    alert("🎉 Você acertou!");
    disableKeyboard();
    return;
  }

  currentRow++;
  currentGuess = "";

  if (currentRow === maxRows) {
    alert("❌ Fim de jogo! A palavra era: " + secret);
    disableKeyboard();
  }
}

function disableKeyboard() {
  document.querySelectorAll(".key").forEach(key => key.disabled = true);
}

document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
  
    if (key === "BACKSPACE") {
      deleteLetter();
    } else if (key === "ENTER") {
      checkGuess();
    } else if (/^[A-Z]$/.test(key) && key.length === 1) {
      addLetter(key);
    }
  });
  