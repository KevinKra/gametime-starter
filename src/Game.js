import gameData from "./data.js";
import domObject from "./DOMupdates.js";
import Round from "./Round.js";
import $ from "jquery";

let round = new Round();

class Game {
  constructor() {
    this.currentTurn = "player1";
    this.cycleTurn = true;
    this.currentAnswers = [];
    this.currentRound = 1;
  }
  startGame() {
    round.generateRound();
    this.currentAnswers = round.currentAnswers;
  }

  startNextRound() {
    if (this.currentAnswers.length === 0 && this.currentRound < 2) {
      round.generateRound();
      this.currentAnswers = round.currentAnswers;
      this.currentRound++;
      console.log("not Round 3");
    } else if (this.currentAnswers.length === 0 && this.currentRound < 4) {
      // console.log('Game currentAnswers:', this.currentAnswers);
      console.log("// ROUND 3");
      //FOLLOWING THE TIMER WE ENTER HERE

      $(".round3").removeClass("hidden");
      this.currentRound++;
      round.generateRoundTimed();
      this.currentAnswers = round.currentAnswers;
    } else if (this.currentRound === 4) {
      console.log("END OF GAME // ROUND 4");
      this.currentRound++;
      round.generateRoundTimed();
      this.currentAnswers = round.currentAnswers;
      //FOLLOWING THE TIMER WE ENTER HERE?
    }
  }

  startNextRoundTimed() {}

  timer(time) {
    let duration = time;
    const timer = setInterval(() => {
      $(".countdown-timer").html(time);
      time--;
      if (time < 0) {
        // console.log('The current round is ', this.currentRound);
        this.currentRound++;
        clearInterval(timer);
        console.log("The current round is ", this.currentRound);
        this.startNextRound();
      }
    }, 1000);
  }
  //SET TIMER TO START NEXT ROUND AND LET PLAYER 2 GO FOR 30 SECONDS WHEN TIMER HITS 0 -- KEEP MULTIPLIER

  checkAnswers(guess, answers) {
    let userGuess = guess.toLowerCase();
    let correctAnswersPoints = 0;
    answers.forEach(element => {
      if (element.answer.toLowerCase() === userGuess) {
        correctAnswersPoints = element.respondents;
        this.currentAnswers.splice(this.currentAnswers.indexOf(element), 1);
        this.startNextRound();
      }
    });
    return correctAnswersPoints;

    //if the variable matches any answer, give player the points and show answer on the DOM.
    //move the answer object into the player's correct answer array
  }

  multiplyValues(multiple) {
    console.log("multiple value:", multiple);
    this.currentAnswers.forEach(answer => {
      answer.respondents = answer.respondents * multiple;
    });
    domObject.createAnswers(this.currentAnswers);
    console.log("Game currentAnswers(post multi):", this.currentAnswers);
  }
  restartGame() {
    //clear all fields
    //revert back to starting arrays
  }
  whoseTurn() {
    if (this.cycleTurn) {
      this.currentTurn = "player1";
    } else {
      this.currentTurn = "player2";
    }
    this.cycleTurn = !this.cycleTurn;
  }
}

export default Game;
