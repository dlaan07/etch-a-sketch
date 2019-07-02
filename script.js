let sketch = document.querySelector('#sketch');
let mode = "classic";

function generateGrid(gridSize){
	sketch.style.gridTemplateColumns  = "repeat("+gridSize+", 1fr)";
	for(var i = 0; i < gridSize*gridSize; i++){
		let sketchGrid = document.createElement("div");
		sketchGrid.className = "sketch-grid";
		sketchGrid.style.filter = "brightness(100%)";
		// sketchGrid.style.backgroundColor = "rgba(0,0,0,0)";
		sketchGrid.addEventListener("mouseover", function(){
			changeColor(this);
		});
		sketch.appendChild(sketchGrid);
	}
}

function resetGrid(){
	sketch.innerHTML = "";
	let gridSize = parseInt(window.prompt("How many cells per side? (1-100)"));
	while(isNaN(parseInt(gridSize)) || gridSize > 100 || gridSize < 1) {
		gridSize = window.prompt("Please enter a number between 1 and 100");
	}
	generateGrid(gridSize);
}

function changeColor(event){
	if(mode === "classic") classic(event);
	else if(mode === "steps") steps(event);
	else if(mode === "rainbow") rainbow(event);
}

function steps(event){
	event.style.backgroundColor = "#fff";
	let regex = /[0-9]+/gi;
	let currentBrightness = parseInt((event.style.filter).match(regex)[0]);
	if(currentBrightness > 30){
		currentBrightness -= 10;
		event.style.filter = "brightness("+currentBrightness+"%)";
	}
}
function classic(event){
	event.style.backgroundColor = "#fff";
	event.style.filter = "brightness(30%)";
}
function rainbow(event){
	event.style.filter = "brightness(100%)";
	// event.style.backgroundColor = "rgb("+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+")";
	event.style.backgroundColor = "hsl("+Math.floor(Math.random()*360)+", "+100+"%, "+(Math.floor(Math.random()*15)+85)+"%)";
}



let restartButton = document.querySelector('#restartButton');
let restartInput = document.querySelector('#restartInput');
restartButton.addEventListener("click", function(){
	resetGrid();
});
let classicButton = document.querySelector('#classicButton');
classicButton.addEventListener("click", function(){
	mode = "classic";
});
let stepsButton = document.querySelector('#stepsButton');
stepsButton.addEventListener("click", function(){
	mode = "steps";
});
let rainbowButton = document.querySelector('#rainbowButton');
rainbowButton.addEventListener("mouseover", function(){
	rainbowButton.style.backgroundColor = "hsl("+Math.floor(Math.random()*360)+", "+100+"%, "+(Math.floor(Math.random()*15)+85)+"%)";
});
rainbowButton.addEventListener("click", function(){
	mode = "rainbow";
});
generateGrid(16);
rainbowButton.style.backgroundColor = "hsl("+Math.floor(Math.random()*360)+", "+100+"%, "+(Math.floor(Math.random()*15)+85)+"%)";