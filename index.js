class Fighter {
    strength = 6;
    cunning = 6;
    speed = 6;
    fatigue = 30;
    maxFatigue;
    name;
    isAlive = true;

    constructor(name) {
        this.name = name;
        //choose two values to increase and 2 values to decrease
        let modifyValuesIndex = []
        for (let i = 0; i < 4; i++) {
            modifyValuesIndex.push(Math.floor(Math.random() * 4));
        }
        let arrValues = [];
        arrValues.push(this.strength);
        arrValues.push(this.cunning);
        arrValues.push(this.speed);
        arrValues.push(this.fatigue);
        for (let i = 0; i < modifyValuesIndex.length; i++) {
            let modifierMagnitude = Math.floor(Math.random() * 1) + 1;
            if (i < modifyValuesIndex.length / 2) {
                modifierMagnitude *= -1;
            }
            if (modifyValuesIndex[i] == 3) {
                modifierMagnitude *= 6;
            }
            arrValues[modifyValuesIndex[i]] += modifierMagnitude;
        }
        this.strength = arrValues[0];
        this.cunning = arrValues[1];
        this.speed = arrValues[2];
        this.fatigue = arrValues[3];
        this.maxFatigue = this.fatigue;
    }

    logStats() {
        console.log(this.name);
        console.log(this.strength);
        console.log(this.cunning);
        console.log(this.speed);
        console.log("Fatigue: " + this.fatigue);
    }

    stats() {
        return "Strength:" + this.strength + " Cunning:" + this.cunning + " Speed:" + this.speed;
    }

    attack() {
        let random = Math.floor(Math.random() * 3) + 1;
        return (this.strength + this.speed + this.cunning) / random;
    }

    defend(isDefending) {
        let defenseLevel = 0;
        if (isDefending) {
            defenseLevel = this.speed + this.cunning;
        }
        else {
            defenseLevel = this.speed + Math.floor(Math.random() * 6) + 1;
        }
        return defenseLevel;
    }

    takeDamage(damage) {
        this.fatigue -= damage;
        if (this.fatigue < 0) {
            this.fatigue = 0;
        }
    }

    heal(value) {
        this.fatigue += value;
        if (this.fatigue > this.maxFatigue) {
            this.fatigue = this.maxFatigue;
        }
    }
}

var playerFighter;
var computerFighter;
var computerBirdName;
var playerBirdName;
var playerFighterAttackVal;
var computerFighterAttackVal;
var playerFighterDefenseVal;
var computerFighterDefenseVal;
var playerAttemptFinisher = false;
var computerAttemptFinisher = false;
var gameOver = false;
const birds = ["baldeagle", "chicken", "crow", "flamingo", "goose", "hummingbird", "owl", "parrot", "penguin", "toucan", "turkey"];

function initialize() {
    playerBirdName = birds[Math.floor(Math.random() * birds.length)];
    computerBirdName = birds[Math.floor(Math.random() * birds.length)];
    while (playerBirdName == computerBirdName) {
        computerBirdName = birds[Math.floor(Math.random() * birds.length)];
    }
    playerFighter = new Fighter(playerBirdName);
    computerFighter = new Fighter(computerBirdName);
    document.getElementById("fighter1").src = "images/" + playerBirdName + ".jpg";
    document.getElementById("fighter1nametag").innerHTML = "Player: " + playerBirdName;
    document.getElementById("fighter2").src = "images/" + computerBirdName + ".jpg";
    document.getElementById("fighter2nametag").innerHTML = "Computer: " + computerBirdName;
    logToBattleText("The battle between the " + playerBirdName + " and the " + computerBirdName + " begins!");
    logToBattleText("Stats of player's " + playerBirdName + " stats: " + playerFighter.stats());
    logToBattleText("Stats of computer's " + computerBirdName + " stats: " + computerFighter.stats());
    document.getElementById("finisherbutton").disabled=true;
}

function logToBattleText(text) {
    document.getElementById("battletext").innerHTML += text + "<br />";
}

function playerAttack() {//when the user clicks the attack button
    if(gameOver) {return;}
    playerFighterAttackVal = playerFighter.attack();
    playerFighterDefenseVal = playerFighter.speed + playerFighter.cunning;
    computerTurn();
    playRound();
}

function playerDefend() {//user clicks the defend button
    if(gameOver) {return;}
    playerFighterAttackVal = 0;
    playerFighterDefenseVal = playerFighter.speed + Math.floor(Math.random() * 6) + 1;
    computerTurn();
    playRound();
}

function playerFinisher() {//user clicks the finisher button
    playerAttemptFinisher = true;
    computerTurn();
    playRound();
}

function computerTurn() {
    if (playerFighter.fatigue <= 0 || playerFighter.fatigue * 2 <= computerFighter.fatigue) {
        computerAttemptFinisher = true;
    }
    else {
        choice = Math.floor(Math.random() * 2);
        if (choice) {
            //attack
            console.log("computer attacks");
            computerFighterAttackVal = computerFighter.attack();
            computerFighterDefenseVal = computerFighter.speed + computerFighter.cunning;
        }
        else {
            //defend
            console.log("computer defends");
            computerFighterAttackVal = 0;
            computerFighterDefenseVal = computerFighter.speed + Math.floor(Math.random() * 6) + 1;
        }
    }
}

function playRound() {//gets called to compute values everytime the player clicks the attack, defend, or finisher option
    if(playerAttemptFinisher && computerAttemptFinisher) {
        let random = Math.floor(Math.random() * 3) + 1;
        let finisherAttackVal = (playerFighter.strength + playerFighter.speed) / random;
        if(finisherAttackVal > computerFighterDefenseVal) {
            gameOver = true;
            logToBattleText("The player's " + playerBirdName + " has finished the " + computerBirdName + ".");
            logToBattleText("YOU WIN");
            document.getElementById("header").innerHTML="YOU WIN!";
            return;
        }
        else{
            random = Math.floor(Math.random() * 3) + 1;
            finisherAttackVal = (computerFighter.strength + computerFighter.speed) / random;
            if(finisherAttackVal > playerFighterDefenseVal) {
                gameOver = true;
                logToBattleText("The computer's " + computerBirdName + " has finished the " + playerBirdName + ".");
                logToBattleText("YOU LOSE");
                document.getElementById("header").innerHTML="YOU LOSE!";
                return;
            }
            else{
                logToBattleText("Both the player's " + playerBirdName + " and computer's + " + computerBirdName + " finishers failed!");
            }
        }

    }
    else if(playerAttemptFinisher) {
        let random = Math.floor(Math.random() * 3) + 1;
        let finisherAttackVal = (playerFighter.strength + playerFighter.speed) / random;
        if(finisherAttackVal > computerFighterDefenseVal) {
            gameOver = true;
            logToBattleText("The player's " + playerBirdName + " has finished the " + computerBirdName + ".");
            logToBattleText("YOU WIN");
            document.getElementById("header").innerHTML="YOU WIN!";
        }
        else{
            let healValue = Math.floor(Math.random() * 6) + 1;
            logToBattleText("The computer's " + computerBirdName + " narrowly escaped being finished and healed for " + healValue + " health.");
            computerFighter.heal(healValue);
        }
    }
    else if(computerAttemptFinisher) {
        let random = Math.floor(Math.random() * 3) + 1;
        let finisherAttackVal = (computerFighter.strength + computerFighter.speed) / random;
        if(finisherAttackVal > playerFighterDefenseVal) {
            gameOver = true;
            logToBattleText("The computer's " + computerBirdName + " has finished the " + playerBirdName + ".");
            logToBattleText("YOU LOSE");
            document.getElementById("header").innerHTML="YOU LOSE!";
        }
        else{
            let healValue = Math.floor(Math.random() * 6) + 1;
            logToBattleText("The player's " + playerBirdName + " narrowly escaped being finished and healed for " + healValue + "health.");
            playerFighter.heal(healValue);
        }
    }
    playerAttemptFinisher = false;
    computerAttemptFinisher = false;
    if(playerFighterAttackVal === 0 && computerFighterAttackVal === 0) {//both defend
        logToBattleText("Both birds defended.");
        let healValue = Math.floor(Math.random() * 6) + 1;
        playerFighter.heal(healValue);
        logToBattleText("The player's " + playerBirdName + " healed for " + healValue + " health.");
        healValue = Math.floor(Math.random() * 6) + 1;
        computerFighter.heal(healValue);
        logToBattleText("The computer's " + computerBirdName + " healed for " + healValue + " health.");
    }
    else if(playerFighterAttackVal === 0 && computerFighterAttackVal > 0) {//only computer attacks, player defends
        let damageTakenByPlayer = playerFighterDefenseVal - computerFighterAttackVal;
        if(damageTakenByPlayer <= 0) {//successful defense
            let healValue = Math.floor(Math.random() * 6) + 1;
            playerFighter.heal(healValue);
            logToBattleText("The player's " + playerBirdName + " defended the " + computerBirdName + "\'s attack and healed for " + healValue + " health.");
        }
        else{
            playerFighter.takeDamage(damageTakenByPlayer);
            logToBattleText("The player's " + playerBirdName + " defended but still took " + damageTakenByPlayer + " damage from the " + computerBirdName + ".");
        }
    }
    else if(playerFighterAttackVal > 0 && computerFighterAttackVal === 0) {//only player attacks, computer defends
        let damageTakenByComputer = computerFighterDefenseVal - playerFighterAttackVal;
        if(damageTakenByComputer <= 0) {
            let healValue = Math.floor(Math.random() * 6) + 1;
            computerFighter.heal(healValue);
            logToBattleText("The computer's " + computerBirdName + " defended the " + playerBirdName + "\'s attack and healed for " + healValue + " health.");
        }
        else{
            computerFighter.takeDamage(damageTakenByComputer);
            logToBattleText("The computer's " + computerBirdName + " defended but still took " + damageTakenByComputer + " damage from the " + playerBirdName + ".");
        }
    }
    else{//both computer and player attacks
        let playerAttackDamage = Math.max(0, computerFighterDefenseVal - playerFighterAttackVal);
        logToBattleText("The player's " + playerBirdName + " attacked the " + computerBirdName + " for " + playerAttackDamage + ".");
        computerFighter.takeDamage(playerAttackDamage);
        let computerAttackDamage = Math.max(0, playerFighterDefenseVal - computerFighterAttackVal);
        logToBattleText("The computer's " + computerBirdName + " attacked the " + playerBirdName + " for " + computerAttackDamage + ".");
        playerFighter.takeDamage(computerAttackDamage);
    }

    document.getElementById("fighter1health").style.width = "" + (Math.max(0, playerFighter.fatigue / playerFighter.maxFatigue) * 100) + "%";
    document.getElementById("fighter2health").style.width = "" + (Math.max(0, computerFighter.fatigue / computerFighter.maxFatigue) * 100) + "%";
    console.log("player" + playerFighter.fatigue);
    console.log("computer" + computerFighter.fatigue);
    document.getElementById("fighter1fatiguetext").innerHTML = "Fatigue: " + playerFighter.fatigue;
    document.getElementById("fighter2fatiguetext").innerHMTL = "Fatigue: " + computerFighter.fatigue;
    document.getElementById("fighter2fatiguetext").innerHMTL = "WHAT IS THIS?";

    checkForPlayerFinisher();
}

function checkForPlayerFinisher() {//TODO put it also in the button that calls the finisher
    if((playerFighter.fatigue >= computerFighter.fatigue * 2) || (computerFighter.fatigue === 0)) {//player may attempt a finishing move, button appears
        document.getElementById("finisherbutton").disabled=false;
    }
    else{
        console.log("worked");
        document.getElementById("finisherbutton").disabled=true;
    }
}
