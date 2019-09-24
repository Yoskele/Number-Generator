// Get the Head Title So We Know which Lottery it is.

let lotteryName = document.querySelector('.lotteryName');


// Create an Empty Array That will be the Rows.
let row = [];

// Rules for the Lottery
let balls = 0;
let maxNumber = 0;
let extraBall = 0;
let extraBallMaxNumber = 0;
let startValue = 0;

// Counter to know how many times client clicked on the Spin Again Button.
let counter = 0;

if(lotteryName.innerText === 'Mega Millions'){
	console.log('Mega Millions');
	balls = 5;
	maxNumber = 69;
	extraBalls = 1; 
	extraBallMaxNumber = 25; //Top Level is 25.
}else if(lotteryName.innerText === 'US Powerball'){
	balls = 5;
	maxNumber = 69;
	extraBalls = 1; 
	extraBallMaxNumber = 26; //Top Level is 26.
}else{
	console.log('Didnt Find The Lottey');
}

createRow(balls);
createNumbersToRow(balls);
createExtraBalls(extraBalls);

// Create a function that appends rows to row-container
function createRow(balls){
	// Get the row-container
	rowContainer = document.querySelector('.row-container');
	// Create the row.
	const ul = document.createElement('ul');
	// Give the Row a Class Name.
	ul.classList.add('rowForBalls');
	// Append the Row to the container.
	rowContainer.append(ul);
	// Create the balls in the row.
	for(let i = 0; i < balls; i++){
		// create a li that contains the ball.
		// Get the last Row and append the balls in it.
		ball = document.createElement('li');
		// Give the Li a class name.
		ball.classList.add('ballNumber');
		// Give the Ball a inner Value of 0.
		ball.innerText = startValue;
		// Append the li to the row.
		ul.appendChild(ball);
	}
}
// Pushing balls to a row. And check if the number is valid.
function createNumbersToRow(){
	while(row.length < balls){
		// Check if randomNumber is in the row already.
		checkNumber(randomNumber());
	};
}
// Checking the Number if we have it in the row already. If we dont have the number we push it to the Row.
function checkNumber(number){
	if(row.includes(number)){
		// And we need to put in a new number.
		checkNumber(randomNumber());
	}else{
		row.push(number);
	}
}
// Create function that returns a random number.
function randomNumber(){
	return Math.floor(Math.random()* maxNumber);
}

/* -------------- For Extra Ball.-------------- */

// Creating Extra Balls and Container for them.
// Sending the Ball for Validation if the Ball Number exist already. To Function checkExtraNumber.
function createExtraBalls(extraBalls){
	if(0 < extraBalls){
		let index = 0;
		while(index < extraBalls){
			lastRow = document.querySelector('.row-container').lastChild;
			extraBall = document.createElement('li');
			extraBall.innerText = startValue;
			extraBall.classList.add('ballNumberExtra');
			lastRow.append(extraBall);
			index++
		}
		// Give the Extra Balls a number.
		ball = 0;
		while(ball < extraBalls){
			checkExtraNumber( randomNumberForExtraBall() );
			ball++;
		};
	}
}
// Check if the Ball Number exist or not.
// If it exist we Are sending it Back to the same Function. and pull a new number from number generator.
function checkExtraNumber(number){
	if(row.includes(number)){
		console.log('it contains So we removed and added a new number');
		// And we need to put in a new number.
		checkExtraNumber(randomNumberForExtraBall());

	}else{
		row.push(number);
	}
}
function randomNumberForExtraBall(){
	return Math.floor(Math.random() * extraBallMaxNumber);
}
/*--------------------------------------------*/

// We are taking the last row in the container and sending that row to the spinner function.
function spin(){
	// Get the last Row in the list and send each index to the spinner.
	// Get the Last Row in the container.
	lastRow = document.querySelector('.row-container').lastChild;
	const balls = lastRow.children;
	for(i in balls){
		spinner(balls[i], i++);
	}
	// Take The Button and change the function value.
	spinButton = document.querySelector('.spin-button');
	spinButton.innerText = 'Spin Again';
	spinButton.setAttribute('onclick', 'spinAgain()');
	counter++
}
function spinner(balls,index){
	let startValue = 0;
	let id = setInterval(frame, 50);
	function frame(){
		if (startValue === row[index]) {
			clearInterval(id);
		}else if(startValue === 99){ // This is a stopper if it wouldnt stop it will atleast stop at 99.
			clearInterval(id);
		}else{
			startValue++;
			balls.textContent = startValue;
		}
	}
}

// Its the button the client click after he spin for the first time.
// We are calling all the functions we need to make more spins and rows.
function spinAgain(){
	console.log('SpinAgain Activated')
	createRow(balls);
	row = [];
	createNumbersToRow(balls);
	createExtraBalls(extraBalls);
	spin();

	if(counter === 2){
		console.log('Second Row');
		// Create an Image of Lottery Supplier.
		container = document.querySelector('.commercail-container');
		commercialImage = document.createElement('div');
		commercialImage.classList.add('commercialImage');
		container.append(commercialImage);
		container.innerHTML += "<h4> Testa en av våran Suppliers </h4>"
		// Append Two small images of the supplier with my Link inside it.
		container.innerHTML = " <img src='multilottoForNumberGenerator.png' alt='Smiley face' height='100' width='100'>";
		container.innerText += 'Få 3 rader av priset av en.';




	}else if(counter === 3){
		// Change the button to clear.
		spinButton.innerText = 'Delete Rows';
		spinButton.setAttribute('onclick', 'deleteRows()');
		counter = 0;
	}
}

function deleteRows(){
	console.log('inside clear')
	rowContainer = document.querySelector('.row-container');
	rowContainer.innerHTML = '';
	createRow(balls); // WORKS WELL.
	createNumbersToRow(balls);
	createExtraBalls(extraBalls);
	spinButton.innerText = 'Spin';
	spinButton.setAttribute('onclick', 'spin()');
}

console.log('This is the end of the code. ',row)
