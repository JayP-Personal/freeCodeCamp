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
        scoreValue: (counts, faces, diceValuesArr)
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
    
    rolls++;
    rollsElement.textContent = rolls
    
    diceValuesArr = [];
    
    [...listOfAllDice].forEach(
        die => {
            const dieRoll = Math.floor(Math.random() * 6) + 1
            die.textContent = dieRoll
            diceValuesArr.push(dieRoll)
        }
    )

    // TESTS

    // diceValuesArr = [2,5,4,3,2];

    // END TESTS

    clearScores();
    calculateScores(diceValuesArr, outcomeScores);

}

rollDiceBtn.addEventListener("click", () => {
    if (rolls >= 3) {
        alert("You're out of rolls. Please select a score");
    } else {
        rollTheDice()
    }
});

keepScoreBtn.addEventListener("click", () => {
    const selectedOutcome = document.querySelector('input[name="score-options"]:checked');
    selectedOutcomeScoresIndex = outcomeScores.findIndex(outcome => outcome.id === selectedOutcome.id);
    outcomeScores[selectedOutcomeScoresIndex].kept = true;

    const element = [...scoreInputs][selectedOutcomeScoresIndex];

    totalScoreElement.textContent = Number(totalScoreElement.textContent) + element.value

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

    console.log(Object.entries(outcomeScores));

    [...outcomeScores].forEach(
        (outcome) => {
            if (!outcome.kept && outcome.rules.every(rule => rule(counts, faces, diceValuesArr))) {
                updateRadioScores(outcome.index, outcome.scoreValue(counts, faces, diceValuesArr))
            }
        }
    )
}

const clearScores = () => {
    [...scoreInputs].forEach(
        (element) => {
                element.setAttribute("disabled", true);
                element.value = 0
            }
    );

    [...scoreSpans].forEach(
        element => element.textContent = ""
    );
}

const updateRadioScores = (index, scoreValue) => {
    

    const element = [...scoreInputs][index]
    element.removeAttribute("disabled");
    element.value = scoreValue;

    [...scoreSpans][index].textContent = `, score = ${scoreValue}`;

}

// TESTS

