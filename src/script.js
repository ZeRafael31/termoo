// Lista de nomes de Pokémon
const pokemonNames = [
"Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata",
  "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu",
  "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidorino",
  "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff",
  "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras",
  "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian",
  "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
  "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke",
  "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel",
  "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro",
  "Magnemite", "Magneton", "Farfetch’d", "Doduo", "Dodrio", "Seel", "Dewgong",
  "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix",
  "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
  "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
  "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
  "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime",
  "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp",
  "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon",
  "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax",
  "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite",
  "Mewtwo", "Mew"
];

function getRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * pokemonNames.length);// Função para sortear a palavra secreta
  return pokemonNames[randomIndex].toUpperCase();
}

let secret = getRandomPokemon();
let currentRow = 0;
let currentGuess = "";
const maxAttempts = 6;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < maxAttempts; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < secret.length; j++) {
      const tile = document.createElement("div");// Função para criar a grade do jogo
      tile.className = "tile";
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

// Começa nosso joguin.

function createKeyboard() {
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
}

createBoard();

function addLetter(letter) {
  if (currentGuess.length < secret.length && currentRow < maxAttempts) {
    const row = board.children[currentRow];
    row.children[currentGuess.length].textContent = letter; // Funções para adicionar, deletar letras e verificar a tentativa
    currentGuess += letter;
  }
}

function deleteLetter() {
  if (currentGuess.length > 0) {
    const row = board.children[currentRow];
    currentGuess = currentGuess.slice(0, -1);// Funções para adicionar, deletar letras e verificar a tentativa
    row.children[currentGuess.length].textContent = "";
  }
}

function checkGuess() {
  if (currentGuess.length !== secret.length) return;

  const row = board.children[currentRow];
  const guessArray = currentGuess.toUpperCase().split("");// Funções para adicionar, deletar letras e verificar a tentativa
  const secretArray = secret.split("");
  let feedback = Array(secret.length).fill("absent");

  for (let i = 0; i < secret.length; i++) {
    if (guessArray[i] === secretArray[i]) { // Verifica as letras corretas.
      feedback[i] = "correct";
      secretArray[i] = null;
    }
  }

  for (let i = 0; i < secret.length; i++) {
    if (feedback[i] === "correct") continue;
    const idx = secretArray.indexOf(guessArray[i]);// Verifica letras que contem na palavra errada.
    if (idx !== -1) {
      feedback[i] = "present";
      secretArray[idx] = null;
    }
  }

  for (let i = 0; i < secret.length; i++) {
    row.children[i].classList.add(feedback[i]);// Aplica as classes aos feedbacks.
  }

  if (currentGuess === secret) {
    alert("🎉 Você acertou!");// Texto de vitória com o alerta.
    disableKeyboard();
    return;
  }

  currentRow++;
  currentGuess = "";

  if (currentRow === maxAttempts) {
    alert("❌ Fim de jogo! A palavra era: " + secret); // Texto de derrota com o alerta.
    disableKeyboard();
  }
}

function disableKeyboard() {
  document.querySelectorAll(".key").forEach(key => key.disabled = true); // Desabilita o teclado virtual.
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();

  if (key === "BACKSPACE") {
    deleteLetter();
  } else if (key === "ENTER") { // Event listener para o teclado físico
    checkGuess();
  } else if (/^[A-Z]$/.test(key) && key.length === 1) {
    addLetter(key);
  }
});

createBoard();
createKeyboard();