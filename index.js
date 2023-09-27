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
	row = 4,
	columns = 4,
    swipeDirection;
    
let rectLeft = grid.getBoundingClientRect().left;
let rectTop = grid.getBoundingClientRect().top;

const getXY = (e) => {

}
