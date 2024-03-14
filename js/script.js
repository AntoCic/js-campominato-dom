const rank = document.getElementById("rank");
const generate = document.getElementById("generate");
const field_box = document.getElementById("field_box");

let tabsRank = [10, 9, 7];
let bombs;
let score = 0;

let state;

generateTabStart(0);

generate.addEventListener("click", () => {
  generateTabStart(rank.value);
});

rank.addEventListener("change", () => {
  generateTabStart(rank.value);
});

function generateTabStart(difficulty) {
  // set state in game
  state = true;

  // svuoto il box
  while (field_box.firstChild) {
    field_box.firstChild.remove();
  }
  // Creo le bombe
  bombs = getBombs(16, tabsRank[difficulty] * tabsRank[difficulty]);

  // Creo e aggiungo il contenuto
  createFieldBox(tabsRank[difficulty]);
}

function createFieldBox(n = 10) {
  score = 0;
  field_box.style.setProperty("--n_col", String(n));
  for (let index = 1; index <= n * n; index++) {
    const numCasella = String(index);
    const btnSquare = document.createElement("div");
    btnSquare.classList.add("btn-square");
    btnSquare.textContent = numCasella;
    field_box.appendChild(btnSquare);

    btnSquare.addEventListener("click", () => {
      if (bombs.includes(Number(numCasella))) {
        btnSquare.style.backgroundColor = "#850606";
        state = false;
        showBombs(bombs);
        gameOver(String(score).padStart(2, "0"));
      } else {
        if (state) {
          btnSquare.style.backgroundColor = "#16166D";
          score++;
        }
      }
    });
  }
}

function getBombs(quantity, maxVal) {
  let b = [];
  while (b.length < quantity) {
    const n = getRandomNum(maxVal);
    if (!b.includes(n)) {
      b.push(n);
    }
  }
  console.log(b);
  return b;
}

function showBombs(bombs) {
  const btnSquare = document.getElementsByClassName("btn-square");
  for (let index = 0; index < bombs.length; index++) {
    btnSquare[bombs[index] - 1].style.backgroundColor = "#850606";
  }
}

function gameOver(score) {
  const modal = document.createElement("div");
  modal.classList.add("ms_modal");
  modal.innerHTML = `
      <div class="ms_modal-box p-1 p-md-3">
        <h1>GAME OVER</h1>
        <p class="h3">score: ${score}</p>
      </div>
  `;
  field_box.appendChild(modal);
}

function getRandomNum(maxVal) {
  const n = Math.round(Math.random() * (maxVal - 1)) + 1;
  return n;
}
