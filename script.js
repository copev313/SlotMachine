/*****************************************************************************
 *  script.js
 *  ---------
 *  Where all the fun happens :)
 *  
 *  Created by: E.Cope						Last edit: 3/27/21
 *****************************************************************************/

//store the classes and ids we'll be manipulating
const iconIdsArr = ["#icon-1", "#icon-2", "#icon-3", "#icon-4", "#icon-5"];
const slotClassArr = [".s1", ".s2", ".s3"];

//setup stat variables
let DataStore = { "wins": 0, "loses": 0, "most": 0, "least": 0 };
const LocalStore = window.localStorage;

//generates random number btw min and max
function rng(min, max) {
	const rand = Math.random() * (max - min) + min;
	return Math.floor(rand);
}

//clears the slot icons
function disappear() {
	for (let i = 0; i < iconIdsArr.length; i++) {
		for (let j = 0; j < slotClassArr.length; j++) {
			$(`${slotClassArr[j]}`).find(`${iconIdsArr[i]}`)
								   .css("display", "none");
		}
	}
}

//displays the appropriate icons in their slots given three random numbers
function magicAct(num1, num2, num3) {
	//reset icons
	disappear(); 
	for (let i = 0; i < iconIdsArr.length; i++) {
		//check slot one
		if (num1 == i) {
			$(".s1").find(`${iconIdsArr[num1]}`)
					.css("display", "initial");
		}
		//check slot two
		if (num2 == i) {
			$(".s2").find(`${iconIdsArr[num2]}`)
					.css("display", "initial");
		}
		//check slot three
		if (num3 == i) {
			$(".s3").find(`${iconIdsArr[num3]}`)
					.css("display", "initial");
		}
	}
}

//checks to see if the player has won
function winCondition(num1, num2, num3, spinCount) {
	if (num1 == num2 && num2 == num3) {
		//change sign to say WINNER!
		$("#try-your-luck").text("WINNER!");
		$("#try-your-luck").css("color", "lawngreen");

		//display PLAY AGAIN button
		$("#reset-btn").css("visibility", "visible");

		//add 1 to wins stat
		let DS = DataStore;
		let LS = LocalStore;
		DS.wins += 1;
		LS.setItem("NUM_WINS", DataStore.wins);

		//update least and most spins stats
		let least = DS.least;
		if (least == 0) {
			least = 9999;
		}
		let most = DS.most;
		if (spinCount > most) {
			LS.setItem("MOST_SPINS", spinCount);
		}
		if (spinCount < least) {
			LS.setItem("LEAST_SPINS", spinCount);
		}
		//refresh stats data
		refreshStats();
	}
}

//start localStorage
function startStorage() {
	const LS = LocalStore;
	let DS = DataStore;
	//CASE -- data is already established --> retrieve and store it in DS
	if (LS.getItem("NUM_WINS") !== null) {
		DS.wins = parseInt(LS.getItem("NUM_WINS"));
		DS.loses = parseInt(LS.getItem("NUM_LOSES"));
		DS.most = parseInt(LS.getItem("MOST_SPINS"));
		DS.least = parseInt(LS.getItem("LEAST_SPINS"));
	}
	//CASE -- data needs established --> initialize values in LS
	else {
		LS.setItem("NUM_WINS", DS.wins);
		LS.setItem("NUM_LOSES", DS.loses);
		LS.setItem("MOST_SPINS", DS.most);
		LS.setItem("LEAST_SPINS", DS.least);
	}
	return DS;
}

//refreshes our stats data displayed on the site
function refreshStats() {
	//use localStorage to load our game stats
	let DS = DataStore;
	$("#win-spins").text(DS.wins);
	$("#lose-spins").text(DS.loses);
	$("#most-spins").text(DS.most);
	$("#least-spins").text(DS.least);
}

//resets our games stats in localStorage
function resetLocalStorage() {
	const conf = confirm("Are you sure you want to reset you game stats?");
	if (conf) {
		DataStore = { "wins": 0, "loses": 0, "most": 0, "least": 0 };
		refreshStats();
	}
}

///////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	//clear slots
	disappear();
	let spinCount = 0;
	//load spinCount stats data
	$("#num-spins").text(spinCount);

	//check browser support for localStorage:
	if (typeof(Storage) !== "undefined") {
		//setup localStorage
		DataStore = startStorage();
		//load our stats data
		refreshStats();

	} else { 
		console.warn("Web Storage not supported! \
					 Features for this site will be missing.");
	}

	//spin-btn event listener:
	$("#spin-btn").click(function(){

		//CASE -- We Won:
		if ($("#try-your-luck").text() === "WINNER!") {
			
			return;
		}
		//CASE -- We Lost:
		else {
			//generate our random indices for the slot icons
			let dice = [];
			for (let i = 0; i < slotClassArr.length; i++) {
				let r = rng(0, iconIdsArr.length);
				dice.push(r);
			}

			//increment spinCount (number of spins)							
			spinCount += 1;
			$("#num-spins").text(spinCount);
			//increment lose in DataStore (number of loses stat)
			DataStore.loses += 1;
			//update NUM_LOSES data in localStorage
			localStorage.setItem("NUM_LOSES", DataStore.loses);

			console.log(`DEBUG: (${dice[0]}, ${dice[1]}, ${dice[2]})`); //debug

			//display the appropriate icons based on the random indices
			magicAct(dice[0], dice[1], dice[2]);
			//check if we've won
			winCondition(dice[0], dice[1], dice[2], spinCount);
		}
		
		//refresh stats
		refreshStats();
	});

	//reset-btn event listener:
	$("#reset-btn").click(() => {
		location.reload();
	});
});
