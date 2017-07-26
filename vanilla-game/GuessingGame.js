function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.playersGuessSubmission = function(inputNum) {
	if ((inputNum < 1) || (inputNum > 100) || (typeof inputNum !== "number")) {
		throw "That is an invalid guess.";
	} 
	this.playersGuess = inputNum;
	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	if (this.playersGuess === this.winningNumber) {
		$('#title').text('You Win!');
		$('#subtitle').text('Hit the reset button to play again.');
		$('#hint, #submit').prop("disabled", true);
		return "You Win!";
	} else if (this.pastGuesses.includes(this.playersGuess)) {
		$('#title').text('You already tried that number. Guess again!');
		return "You have already guessed that number."
	} else {
		this.pastGuesses.push(this.playersGuess);
		if (this.pastGuesses.length === 5) {
			$('#title').text('You Lose!');
			$('#subtitle').text('Hit the reset button to play again.');
			$('#hint, #submit').prop("disabled", true);
			return "You Lose.";
		} else {
			if (this.difference() < 10) {
				return "You\'re burning up!";
			} else if (this.difference() < 25) {
				return "You\'re lukewarm."
			} else if (this.difference() < 50) {
				return "You\'re a bit chilly."
			} else {
				return "You\'re ice cold!"
			}
		}
	}
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
}

Game.prototype.provideHint = function() {
	var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	hintArray = shuffle(hintArray);
	return hintArray;
}

function generateWinningNumber() {
	return Math.floor((Math.random() * 100) + 1);
}

function newGame() {
	return new Game();
}

function shuffle(array) {

	for (var i = array.length; i > 0; i--) {
		var nextIdx = Math.floor(Math.random() * i);
		var placeholder = array[i - 1];
		array[i - 1] = array[nextIdx];
		array[nextIdx] = placeholder; 
	}

	return array;

}

$(document).ready(function() {
	var game = new Game();

	$('#submit').on('click', function() {
		recordGuess(game);
	});

	$('#player-input').keypress(function(event) {
		if (event.which == 13) {
			recordGuess(game);
		}
	});
});

function recordGuess(game) {
	var guess = $('#player-input').val();
	$('#player-input').val("");
	console.log(game.playersGuessSubmission(parseInt(guess, 10)));
	console.log('Submit button clicked!');
}