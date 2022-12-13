class Fighter {
    strength = 6;
    cunning = 6;
    speed = 6;
    fatigue = 30;
    name;

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
    }

    logStats() {
        console.log(this.name);
        console.log(this.strength);
        console.log(this.cunning);
        console.log(this.speed);
        console.log(this.fatigue);
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
        else{
            defenseLevel = this.speed + Math.floor(Math.random() * 6) + 1;
        }
        return defenseLevel;
    }
}

var fighter1 = new Fighter("joe");
var fighter2 = new Fighter("jo");
fighter1.logStats();
fighter2.logStats();

function initialize() {
    var playerFighter = new Fighter("player");
    var computerFighter = new Fighter("computer");
    while (fighter1.fatigue > 0 && fighter2.fatigue > 0) {

    }
}

function playerAttack() {
    
}