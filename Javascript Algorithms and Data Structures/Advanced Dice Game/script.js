const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll('#score-options input');
const scoreSpans = document.querySelectorAll('#score-options span');

const roundElement = document.getElementById('current-round');
const rollsElement = document.getElementById('current-round-rolls');
const totalScoreElement = document.getElementById('total-score');
const scoreHistory = document.getElementById('score-history');

const rollDiceBtn = document.getElementById('roll-dice-btn');
const keepScoreBtn = document.getElementById('keep-score-btn');
const rulesBtn = document.getElementById('rules-btn');
const rulesContainer = document.querySelector('.rules-container');

let diceValuesArr = [];

let rolls = 0;
let score = 0;
let round = 1;

let isModalShowing = false;

const outcomeScores = [
    
    {
        id: "three-of-a-kind",
        rules: [(counts, faces, diceValuesArr) => Math.max(...counts) >= 3],
        kept: false,
        index: 0,
        scoreValue: (counts, faces, diceValuesArr) => diceValuesArr.reduce((acc, die) => acc + die, 0)
    },
    {
        id: "four-of-a-kind",
        rules: [(counts, faces, diceValuesArr) => Math.max(...counts) >= 4],
        kept: false,
        index: 1,
        scoreValue: (counts, faces, diceValuesArr) => diceValuesArr.reduce((acc, die) => acc + die, 0)
    },
    {
        id: "full-house",
        rules: [(counts, faces, diceValuesArr) => counts.length === 2, (counts, faces, diceValuesArr) => (counts[0] === 2 && counts[1] === 3) || (counts[0] === 3 && counts[1] === 2)],
        kept: false,
        index: 2,
        scoreValue: (counts, faces, diceValuesArr) => 25
    },
    {
        id: "small-straight",
        rules: [(counts, faces, diceValuesArr) => counts.length >= 4, (counts, faces, diceValuesArr) => findStraight(4,faces)],
        kept: false,
        index: 3,
        scoreValue: (counts, faces, diceValuesArr) => 30
    },
    {
        id: "large-straight",
        rules: [(counts, faces, diceValuesArr) => counts.length === 5, (counts, faces, diceValuesArr) => findStraight(5,faces)],
        kept: false,
        index: 4,
        scoreValue: (counts, faces, diceValuesArr) => 40
    },
    {      
        id: "none",
        rules: [(counts, faces, diceValuesArr) => true],
        kept: false,
        index: 5,
        scoreValue: (counts, faces, diceValuesArr) => diceValuesArr.reduce((acc, die) => acc + die, 0)
    },
]

const toggleRulesDisplay = () => {
    if (rulesContainer.style.display === "block") {
        rulesContainer.style.display = "none"
        rulesBtn.textContent = "Show rules"
        isModalShowing = false
    } else{
        rulesContainer.style.display = "block"
        rulesBtn.textContent = "Hide rules"
        isModalShowing = true
    }
};

rulesBtn.addEventListener("click", toggleRulesDisplay);

const rollTheDice = () => {

    keepScoreBtn.disabled = false;
    keepScoreBtn.classList.remove('disabled');
    
    rolls++;
    rollsElement.textContent = rolls;

    rollDiceBtn.textContent = "Roll the dice";
    
    diceValuesArr = [];
    
    [...listOfAllDice].forEach(
        die => {
            const dieRoll = Math.floor(Math.random() * 6) + 1
            die.textContent = dieRoll
            diceValuesArr.push(dieRoll)
        }
    );
    
    const nonSelectedInputScores = document.querySelectorAll('div[class="score-wrapper"] input');

    clearScores(nonSelectedInputScores);
    calculateScores(diceValuesArr, outcomeScores);

    if (rolls === 3) {
         rollDiceBtn.textContent = "End Round";
        }
        
    }

rollDiceBtn.addEventListener("click", (event) => {
    if (rolls >= 3) {
        const confirmed = confirm("You're out of rolls. Continue without selecting a score?");
        if (confirmed) {
            progressRound();
        } else {
            return;
        }
        
    } else {
        rollTheDice()
    }
});

const gameOver = () => {
    alert("game over!")
}

const progressRound = () => {
    if (roundElement.textContent === "6") {
        gameOver();
        keepScoreBtn.disabled = true;
        keepScoreBtn.classList.add('disabled');
        rollDiceBtn.disabled = true;
        rollDiceBtn.classList.add('disabled');
        return;
    }
    roundElement.textContent = Number(roundElement.textContent) + 1;
    rolls = 0
}

keepScoreBtn.addEventListener("click", () => {
    const selectedOutcome = document.querySelector('input[name="score-options"]:checked');
    // lock the outcome
    
    if (selectedOutcome) {

        selectedOutcomeScoresIndex = outcomeScores.findIndex(outcome => outcome.id === selectedOutcome.id);
        outcomeScores[selectedOutcomeScoresIndex].kept = true;

        // Grey out score
        const selectedWrapper = selectedOutcome.closest('.score-wrapper');
        selectedWrapper.classList.add('disabled');

        selectedOutcome.disabled = true;
        selectedOutcome.checked = false;
        
        keepScoreBtn.disabled = true;
        keepScoreBtn.classList.add('disabled');

        rollDiceBtn.textContent = "New Round: " + rollDiceBtn.textContent;

        totalScoreElement.textContent = Number(totalScoreElement.textContent) + Number(selectedOutcome.value);
    }

    progressRound(); 

})

const findStraight = (straightLength, faces, startIndex=0) => {

    const sortedFaces = faces.map(Number).sort((a,b) => a-b);
    let firstCheckStraight = true;

    for (let i = startIndex; i < straightLength - 1; i++) {
        if (sortedFaces[i + 1] !== sortedFaces[i] + 1) {
            firstCheckStraight = false;
            break;
        }
    };

    if (firstCheckStraight) {
        return true
    } else if (startIndex === 0 && straightLength === 4 && faces.length > 4) {
        return findStraight(straightLength, faces, startIndex=1)
    }
    
    return false
};

const calculateScores = (diceValuesArr, outcomeScores) => {
    let dieFaceCount = {};
    diceValuesArr.forEach(
        dieFace => dieFaceCount[dieFace] = (dieFaceCount[dieFace] || 0) + 1
    )

    counts = Object.values(dieFaceCount);
    faces = Object.keys(dieFaceCount);

    [...outcomeScores].forEach(
        (outcome) => {
            if (!outcome.kept && outcome.rules.every(rule => rule(counts, faces, diceValuesArr))) {
                updateRadioScores(outcome.index, outcome.scoreValue(counts, faces, diceValuesArr))
            }
        }
    )
}

const clearScores = (nonSelectedInputScores) => {
    [...nonSelectedInputScores].forEach(
        (element) => {
            element.setAttribute("disabled", true);
            element.value = 0
            const nearestSpan = element.closest('.score-wrapper').querySelector('span');
            if (nearestSpan) {
                nearestSpan.textContent = "";
            }
            }
    );
}

const updateRadioScores = (index, scoreValue) => {
    

    const element = [...scoreInputs][index]
    element.removeAttribute("disabled");
    element.value = scoreValue;

    [...scoreSpans][index].textContent = `, score = ${scoreValue}`;

}

// TESTS

