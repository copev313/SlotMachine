
const iconIdArray = ["#icon-1", "#icon-2", "#icon-3", "#icon-4", "#icon-5" ];

let spinCount, winCount, loseCount, leastCount, mostCount;
[spinCount, winCount, loseCount, leastCount, mostCount] = [0, 0, 0, 0, 0];

//generates random number btw min and max
function rng(min, max) {
	const rand = Math.random() * (max - min) + min;
	return Math.floor(rand);
}

//clears the icons
function disappear() {
	for (let i = 0; i < iconIdArray.length; i++) {
		document.querySelector(".s1").querySelector(iconIdArray[i]).style.display = "none";
		document.querySelector(".s2").querySelector(iconIdArray[i]).style.display = "none";
		document.querySelector(".s3").querySelector(iconIdArray[i]).style.display = "none";
	}
}

//displays the appropriate icons in their slots
function magicAct(numOne, numTwo, numThree) {

	//clear icons
	disappear(); 

	for (let i = 0; i < iconIdArray.length; i++) {
		//check slot one
		if (numOne == i) {
			document.querySelector(".s1")
					.querySelector(iconIdArray[numOne]).style.display = "initial";
		}
		//check slot two
		if (numTwo == i) {
			document.querySelector(".s2").querySelector(iconIdArray[numTwo]).style.display = "initial";
		}
		//check slot three
		if (numThree == i) {
			document.querySelector(".s3").querySelector(iconIdArray[numThree]).style.display = "initial";
		}
	}
}

//checks to see if the player has won
function winCondition(numOne, numTwo, numThree) {
	if (numOne == numTwo && numTwo == numThree) {
		//change sign to say WINNER!
		$("#try-your-luck").text("WINNER!");
		$("#try-your-luck").css("color", "white");

		//display PLAY AGAIN button
		$("#reset-btn").css("visibility", "visible");

		//TODO: add 1 to wins stat

	}
}

//stores our records in the browser's localStorage
function store(wins, loses, leastSpins, mostSpins) {

}

///////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

	console.info("DEBUG: Ready!");	//debug

	//clear slots
	disappear();

	//check browser support for localStorage:
	if (typeof(Storage) !== "undefined") {
		console.info("DEBUG: Web Storage activated!"); //debug
		//store();
	} else { 
		console.warn("DEBUG: Sorry! No Web Storage support!"); //debug
	}

	//spin-btn event listener:
	$("#spin-btn").click(function(){

		$(document)

		//CASE -- We Won!:
		if ($("#try-your-luck").innerHTML === "WINNER!") {
			//
		}
		//CASE -- We Lost:
		else {
			//declare and initialize our indexes for icon selection:
			let index1, index2, index3;
			[index1, index2, index3] = [rng(0, iconIdArray.length),
										rng(0, iconIdArray.length),
										rng(0, iconIdArray.length)];
			//increment spinCount:							
			spinCount += 1;
			document.getElementById("num-spins").innerHTML = spinCount;

			console.log(`DEBUG: (${index1}, ${index2}, ${index3})`); //debug
			magicAct(index1, index2, index3);
			winCondition(index1, index2, index3);
		}
	});

	//reset-btn event listener:
	$("#reset-btn").click(function(){
		location.reload();
	});
});


/*
document.addEventListener("DOMContentLoaded", () => {

	document.getElementById("spin-btn").addEventListener("click", () => {

		// [CASE] We Haven't Won Yet:
		if (document.getElementById("try-your-luck").innerHTML !== "WINNER!") {
			let index1, index2, index3;
			[index1, index2, index3] = [rng(0, iconIdArray.length),
										rng(0, iconIdArray.length),
										rng(0, iconIdArray.length)];
			spinCount += 1;
			document.getElementById("num-spins").innerHTML = spinCount;
			console.log(index1, index2, index3);
			magicAct(index1, index2, index3);
			winCondition(index1, index2, index3);
		}
	});
});
*/
