const iconIdArray = [
	"#icon-one",
	"#icon-two",
	"#icon-three",
	"#icon-four",
	"#icon-five"
];

let spinCount = 0;

function myFriendRandy(min, max) {
	let randy = Math.random() * (max - min) + min;
	return Math.floor(randy);
}

//clears the icons
function disappear() {
	for (let i = 0; i < iconIdArray.length; i++) {
		document.querySelector(".one").querySelector(iconIdArray[i]).style.display = "none";
		document.querySelector(".two").querySelector(iconIdArray[i]).style.display = "none";
		document.querySelector(".three").querySelector(iconIdArray[i]).style.display = "none";
	}
}

//displays the appropriate icons in the slots
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
	} //end loop
}

//checks to see if the player has won
function winCondition(numOne, numTwo, numThree) {
	if (numOne == numTwo && numTwo == numThree) {
		document.getElementById("try-your-luck").innerHTML = "WINNER!";
		document.getElementById("try-your-luck").style.color = "white";
	}
}

///////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
	//clear slots
	disappear();

	document.getElementById("spin-button").addEventListener("click", () => {
		if (document.getElementById("try-your-luck").innerHTML !== "WINNER!") {
			let index1 = myFriendRandy(0, iconIdArray.length);
			let index2 = myFriendRandy(0, iconIdArray.length);
			let index3 = myFriendRandy(0, iconIdArray.length);

			spinCount += 1;
			document.getElementById("number-of-spins").innerHTML = spinCount;
			console.log(index1, index2, index3);
			magicAct(index1, index2, index3);
			winCondition(index1, index2, index3);
		}
	});

	//Time Warp Link
	document
		.getElementById("reset")
		.addEventListener("click", () => location.reload());
});
