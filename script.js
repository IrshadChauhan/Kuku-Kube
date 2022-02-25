const timer = document.getElementById("timer");
const cells = document.getElementsByClassName("cell");
const trs = document.getElementsByClassName("tr");
const table = document.getElementById("table");
const container = document.getElementById("container");
const btn = document.getElementById("btn");
let row = 2;
let col = 2;
let general = "";
let secondLeft = 10;
let score = 0;
let generalNumber = 100;
let topScorer = {};
let result = document.getElementById("result");

// result.classList.add("empty");


btn.addEventListener("click",restartValue);

function restartValue() {
  container.classList.remove("empty");
  // console.log(cells);
  let allTr = document.getElementsByTagName("tr");
  // console.log(allTr);
  // console.log(table);

  for (let i = allTr.length - 1; i >= trs.length; i--) {
      table.deleteRow(i);
  }
  const cellLength =  table.rows[0].cells.length;
  for (let i = 0; i < allTr.length; i++) {
    let tr1 = table.rows[i];
    for (let j = cellLength-1 ; j >= 2; j--) {
      tr1.cells[j].remove();
    }
  }
    table.rows[0].cells[1].classList.add("random");
    table.rows[0].cells[1].style.backgroundColor = "blue"
    row = 2;
    col = 2;
    general = "";
    secondLeft = 10;
    score = 0;
    generalNumber = 100;
    timerDisplay = setInterval(displayTimer, 1000);
}

let timerDisplay = setInterval(displayTimer, 1000);

function displayTimer() {
  timer.innerHTML = ` ${secondLeft}`;
  secondLeft--;
  if (secondLeft < 0) {
    clearInterval(timerDisplay);
    finishGame();
  }
}

for (let index = 0; index < cells.length; index++) {
  cells[index].addEventListener("click", changeColor);
}

function changeColor(e) {
  let cell = e.target;
  // console.log(cell);
  if (cell.classList.contains("random")) {
    cell.classList.remove("random");
    score++;
    row++;
    col++;
    addTable();
    addRandom();
  }
}

function addTable() {
  let currentRow = table.insertRow(row - 1);
  for (let c = 0; c < col - 1; c++) {
    let currentCell = currentRow.insertCell(c);
    currentCell.classList.add("cell");
  }
  for (let i = 0; i < row; i++) {
    let currentCell = table.rows[i].insertCell(col - 1);
    currentCell.classList.add("cell");
  }

  var randomCo = Math.floor(Math.random() * 16777215);
  // console.log(randomCo);
  var randomColor = randomCo.toString(16);
  general = (randomCo + generalNumber).toString(16);
  generalNumber -= 10;
  // console.log(randomColor + " randomColor");
  // console.log(general + " general");
  for (let index = 0; index < cells.length; index++) {
    // console.log("color change");
    cells[index].style.backgroundColor = "#" + randomColor;
  }
}

function addRandom() {
  let randomRow = Math.floor(Math.random() * row);
  // console.log(randomRow);
  let randomCol = Math.floor(Math.random() * col);
  // console.log(randomCol);
  let randomCell = table.rows[randomRow].cells[randomCol];
  randomCell.classList.add("random");
  randomCell.style.backgroundColor = "#" + general;

  for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("click", changeColor);
  }
  // console.log(cells.length);
}

function finishGame() {
  const name = window.prompt("enter your name");
  console.log(name + " score is " + score);
  container.classList.add("empty");
  // console.log(result);
  // result.classList.remove("empty");
  topScorer[name] = score;

  result.innerHTML += `${name} score is ${score} <br>`; 


}