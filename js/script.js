let field = document.querySelector(".content__field");
let fieldCells = Array.from(document.querySelectorAll(".content__field-cell"));
let result = document.querySelector(".content__result");
let resetBtn = document.querySelector(".content__field-reset");

let blockCheckDevice = document.querySelector(".checking-device");
let blockCheckDeviceContent = document.querySelector(".checking-device-content");
let blockCheckDeviceBtn = document.querySelector(".checking-device-content-btn");
let blockCheckDeviceTxt = document.querySelector(".checking-device-content-txt");

let agentInfo = navigator.userAgent;

if (agentInfo.includes("Android")) {
    blockCheckDevice.style.display = "flex";
} else if (agentInfo.includes("iPhone")) {
    blockCheckDevice.style.display = "flex"
}

blockCheckDeviceBtn.addEventListener("click", () => {
    setTimeout(() => {
        blockCheckDevice.style.display = "none";
    }, 2300);
    setTimeout(() => {
        blockCheckDevice.classList.add("checking-device-close")
    }, 1200);
    setTimeout(() => {
        blockCheckDeviceContent.classList.add("checking-device-content-close")
    }, 400);
    blockCheckDeviceBtn.classList.add("checking-device-content-btn-close")
    blockCheckDeviceTxt.classList.add("checking-device-content-txt-close")
})

let playerX = "x";
let player0 = "0";

let board = [
	"", "", "",
	"", "", "",
	"", "", ""
];

let winsCells = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4 ,7], [2, 5 ,8],
	[0, 4, 8], [2, 4, 6]
];

let currentCell = 0;

field.addEventListener("click", clickCell);

function clickCell(event) {
	let cellTarget = event.target;
	if (cellTarget.classList.contains("content__field-cell")) {
		if (currentCell < 9) {
			if ((currentCell % 2) == 0 && cellTarget.textContent == "") {
				cellTarget.textContent = playerX;
				console.log(currentCell);
				board[cellTarget.id] = playerX;
				currentCell++;
			}
			else if ((currentCell % 2) !== 0 && cellTarget.textContent == "") {
				cellTarget.textContent = player0;
				console.log(currentCell);
				board[cellTarget.id] = player0;
				currentCell++;
			}
			checkWin()
			console.log(board);
		}
	}
}

resetBtn.addEventListener("click", () => {
	resetAll()
})

function resetAll() {
	fieldCells.map((cell) => {
		cell.textContent = "";
		cell.classList.remove("cell-win")
	})
	currentCell = 0;
	result.textContent = "";
	board = [
		"", "", "",
		"", "", "",
		"", "", ""
	];
	result.classList.remove("content__result-open");
	field.addEventListener("click", clickCell);
}

function checkWin() {
	winsCells.map((cell) => {
		let [a, b, c] = cell;
		if (board[a] == playerX && board[b] == playerX && board[c] == playerX) {
			result.textContent = "Выйиграл игрок X";
			result.classList.add("content__result-open");
			fieldCells[a].classList.add("cell-win")
			fieldCells[b].classList.add("cell-win")
			fieldCells[c].classList.add("cell-win")
			field.removeEventListener("click", clickCell);
		} else if (board[a] == player0 && board[b] == player0 && board[c] == player0) {
			result.textContent = "Выйиграл игрок 0";
			result.classList.add("content__result-open");
			fieldCells[a].classList.add("cell-win")
			fieldCells[b].classList.add("cell-win")
			fieldCells[c].classList.add("cell-win")
			field.removeEventListener("click", clickCell);
		}
	})
}