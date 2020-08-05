const iconIdArray = [
	"#icon-one",
	"#icon-two",
	"#icon-three",
	"#icon-four",
	"#icon-five"
];

function randy(max) { return Math.floor(Math.random() * max); }

//clears the icons
function disappear() {
	for (let i = 0; i < iconIdArray.length; i++) {
		document.querySelector(".one").querySelector(iconIdArray[i]).style.display = "none";
		document.querySelector(".two").querySelector(iconIdArray[i]).style.display = "none";
		document.querySelector(".three").querySelector(iconIdArray[i]).style.display = "none";
	}
}

//displays the appropriate icons in the appropriate slots... appropriately.
function magicAct(numOne, numTwo, numThree) {
	disappear(); //icon reset
	for (let i = 0; i < iconIdArray.length; i++) {
		//check slot one
		if (numOne == i) {
			document.querySelector(".one").querySelector(iconIdArray[numOne]).style.display = "initial";
		}
		//check slot two
		if (numTwo == i) {
			document.querySelector(".two").querySelector(iconIdArray[numTwo]).style.display = "initial";
		}
		//check slot three
		if (numThree == i) {
			document.querySelector(".three").querySelector(iconIdArray[numThree]).style.display = "initial";
		}
	}
}

//checks to see if the player has won.
function winCondition(numOne, numTwo, numThree) {
	if (numOne == numTwo && numTwo == numThree) {
		document.getElementById("try-your-luck").innerHTML = "WINNER!";
		document.getElementById("try-your-luck").style.color = "white";
	}
}

///////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
	//clear slots, initialize variables...
	disappear();
	let spinCount = 0;
	const len = iconIdArray.length;

	document.getElementById("spin-button").addEventListener("click", () => {
		//if statement to keep the game from breaking after you have won
		if (document.getElementById("try-your-luck").innerHTML !== "WINNER!") {
			let index1 = randy(len);
			let index2 = randy(len);
			let index3 = randy(len);

			spinCount += 1;
			document.getElementById("number-of-spins").innerHTML = "<ins>Number of Spins</ins>: " + spinCount;

			console.log(index1, index2, index3);
			magicAct(index1, index2, index3);
			winCondition(index1, index2, index3);
		}
	});

	//Time Warp Link (that just reloads the page)
	document.getElementById("reset").addEventListener("click", () => location.reload());
});
