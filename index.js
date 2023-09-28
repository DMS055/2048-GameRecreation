// Imports
let grid = document.querySelector(".grid");
const startButton = document.getElementById("startButton");
const container = document.querySelector(".container");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const overText = document.getElementById("over-text");

let matrix,
	score,
	isSwiped,
	touchY,
	initialY = 0,
	touchX,
	initialX = 0,
	rows = 4,
	columns = 4,
	swipeDirection;

let rectLeft = grid.getBoundingClientRect().left;
let rectTop = grid.getBoundingClientRect().top;

const getXY = (e) => {
	touchX = e.touches[0].pageX - rectLeft;
	touchY = e.touches[0].pageY - rectTop;
};

// Create the grid
const createGrid = () => {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			const boxDiv = document.createElement("div");
			boxDiv.classList.add("box");
			boxDiv.setAttribute("data-position", `${i}_${j}`);
			grid.appendChild(boxDiv);
		}
	}
};

const adjacentCheck = (arr) => {
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] == arr[i + 1]) {
			return true;
		}
	}
	return false;
};

const possibleMovesCheck = () => {
	for (let i in matrix) {
		if (adjacentCheck(matrix[i])) {
			return true;
		}
		let collar = [];
		for (let j = 0; j < columns; j++) {
			collar.push(matrix[i][j]);
		}
		if (adjacentCheck(collar)) {
			return true;
		}
	}
	return false;
};

const randomPos = (arr) => {
	return Math.floor(Math.random() * arr.length);
};

const emptyBoxCheck = () => {
	for (let r in matrix) {
		for (let c in matrix[r]) {
			if (matrix[r][c] == 0) {
				return true;
			}
		}
	}
	return false;
};

const gameOverCheck = () => {
	if (!possibleMovesCheck()) {
		coverScreen.classList.remove("hide");
		container.classList.add("hide");
		overText.classList.remove("hide");
		result.innerText = `Final score: ${score}`;
		startButton.innerText = "Restart Game";
	}
};

// Generate "2" Tiles
const generateTwo = () => {
	if (hasEmptyBox()) {
		let randomRow = randomPosition(matrix);
		let randomCol = randomPosition(matrix[randomPosition(matrix)]);
		if (matrix[randomRow][randomCol] == 0) {
			matrix[randomRow][randomCol] = 2;
			let element = document.querySelector(
				`[data-position = '${randomRow}_${randomCol}']`
			);
			element.innerHTML = 2;
			element.classList.add("box-2");
		} else {
			generateTwo();
		}
	} else {
		gameOverCheck();
	}
};

// Generate "4" Tiles
const generateFour = () => {
	if (hasEmptyBox()) {
		let randomRow = randomPosition(matrix);
		let randomCol = randomPosition(matrix[randomPosition(matrix)]);
		if (matrix[randomRow][randomCol] == 0) {
			matrix[randomRow][randomCol] = 4;
			let element = document.querySelector(
				`[data-position= '${randomRow}_${randomCol}']`
			);
			element.innerHTML = 4;
			element.classList.add("box-4");
		} else {
			generateFour();
		}
	} else {
		gameOverCheck();
	}
};

const removeZero = (arr) => arr.filter((num) => num);
const checker = (arr, reverseArr = false) => {
	arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] == arr[i + 1]) {
			arr[i] += arr[i + 1];
			arr[i + 1] = 0;
			score += arr[i];
		}
	}
	arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);

	let missingCount = 4 - arr.length;
	while (missingCount > 0) {
		if (reverseArr) {
			arr.unshift(0);
		} else {
			arr.push(0);
		}
		missingCount -= 1;
	}
	return arr;
};




