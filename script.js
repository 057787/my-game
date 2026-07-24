const homeScreen = document.getElementById("homeScreen");
const taskScreen = document.getElementById("taskScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const playBtn = document.getElementById("playBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const menuBtn = document.getElementById("menuBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const question = document.getElementById("question");
const visualArea = document.getElementById("visualArea");
const answerArea = document.getElementById("answerArea");
const feedback = document.getElementById("feedback");

const nextBtn = document.getElementById("nextBtn");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const finalScore = document.getElementById("finalScore");

let currentAnswer = 0;
let currentGame = "";
let currentLevel = "";

let score = 0;
let lives = 3;

const emojis = [
"🍎",
"🐶",
"⭐",
"🍌",
"⚽",
"🦋",
"🚗",
"🍓"
];

/* PLAY */

playBtn.onclick = () => {

    showScreen(taskScreen);

};

/* HOME */
backHomeBtn.onclick = () => {

    showScreen(homeScreen);

};

/* MENU */
menuBtn.onclick = () => {

    resetGame();

    showScreen(taskScreen);

};

/* PLAY AGAIN */
playAgainBtn.onclick = () => {

    resetGame();

    showScreen(taskScreen);

};

/* TASKS */
document.querySelectorAll(".task-card").forEach(card => {

    card.onclick = () => {

        currentGame = card.dataset.game;

        showLevelMenu();

    };

});

/* NEXT */
nextBtn.onclick = () => {

    generateQuestion();

};

/* SHOW SCREEN */
function showScreen(screen){

    homeScreen.classList.add("hidden");
    taskScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    screen.classList.remove("hidden");

}

/* RESET */
function resetGame(){

    score = 0;
    lives = 3;

    updateStats();

}

/* UPDATE */
function updateStats(){

    scoreText.textContent = score;
    livesText.textContent = lives;

}

/* RANDOM */
function random(min,max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

/* SHUFFLE */
function shuffle(array){

    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];

    }

    return array;

}

/* LEVEL MENU */
function showLevelMenu(){

    question.textContent =
    "Choose a Level";

    visualArea.innerHTML = "";

    feedback.textContent = "";

    nextBtn.classList.add("hidden");

    answerArea.innerHTML = "";

    const easyBtn =
    createLevelButton("Easy");

    const mediumBtn =
    createLevelButton("Medium");

    const hardBtn =
    createLevelButton("Hard");

    answerArea.appendChild(easyBtn);
    answerArea.appendChild(mediumBtn);
    answerArea.appendChild(hardBtn);

    showScreen(gameScreen);

}

/* CREATE LEVEL BUTTON */
function createLevelButton(level){

    const button =
    document.createElement("button");

    button.className = "answer-btn";

    button.textContent = level;

    button.onclick = () => {

        currentLevel = level;

        resetGame();

        generateQuestion();

    };

    return button;

}

/* GENERATE QUESTION */
function generateQuestion(){

    feedback.textContent = "";
    feedback.className = "feedback";

    nextBtn.classList.add("hidden");

    answerArea.innerHTML = "";
    visualArea.innerHTML = "";

    if(currentGame === "count"){

        countingGame();

    }

    if(currentGame === "addition"){

        additionGame();

    }

    if(currentGame === "missing"){

        missingNumberGame();

    }

    if(currentGame === "compare"){

        biggerNumberGame();

    }

}

/* COUNTING */
function countingGame(){

    let max = 5;

    if(currentLevel === "Medium"){

        max = 10;

    }

    if(currentLevel === "Hard"){

        max = 20;

    }

    const number = random(1,max);

    currentAnswer = number;

    question.textContent =
    "How many are there?";

    const emoji =
    emojis[random(0,emojis.length - 1)];

    let display = "";

    for(let i = 0; i < number; i++){

        display += emoji + " ";

    }

    visualArea.textContent = display;

    createAnswers(number);

}

/* ADDITION */
function additionGame(){

    let max = 5;

    if(currentLevel === "Medium"){

        max = 10;

    }

    if(currentLevel === "Hard"){

        max = 20;

    }

    const num1 = random(1,max);
    const num2 = random(1,max);

    currentAnswer = num1 + num2;

    question.textContent =
    "What is " + num1 + " + " + num2 + "?";

    visualArea.innerHTML = `
    <div class="addition-row">
    <div class="apple-group">${"🍎".repeat(num1)}</div>
    <div class="plus-sign">+</div>
    <div class="apple-group">${"🍎".repeat(num2)}</div>
    </div>
`;
    
    createAnswers(currentAnswer);

}

/* MISSING NUMBER */
function missingNumberGame(){

    let max = 10;

    if(currentLevel === "Medium") max = 20;
    if(currentLevel === "Hard") max = 50;

    const start = random(1, max - 5);

    const sequence = [
        start,
        start + 1,
        start + 2,
        start + 3,
        start + 4
    ];

    const missingIndex = random(0, 4);

    currentAnswer = sequence[missingIndex];

    question.textContent = "What number is missing?";

    // SHOW LINE CLEARLY
    let line = "";

    for(let i = 0; i < sequence.length; i++){
        if(i === missingIndex){
            line += "__ ";
        } else {
            line += sequence[i] + " ";
        }
    }

    visualArea.textContent = line;

    // This keeps answer buttons working
    createAnswers(currentAnswer);
}

/* BIGGER NUMBER */
function biggerNumberGame(){

    let max = 10;

    if(currentLevel === "Medium"){

        max = 50;

    }

    if(currentLevel === "Hard"){

        max = 100;

    }

    const a = random(1,max);
    const b = random(1,max);

    currentAnswer = Math.max(a,b);

    question.textContent =
    "Which number is bigger?";

    visualArea.textContent =
    a + " OR " + b;

    let answers = [a,b];

    if(a === b){

        answers = [a,a+1];

        currentAnswer = a + 1;

    }

    answers.sort((a, b) => a - b);
    answers.forEach(answer => {

        const button =
        document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.onclick =
        () => checkAnswer(answer);

        answerArea.appendChild(button);

    });

}

/* CREATE ANSWERS */
function createAnswers(correct){

    let answers = [correct];

    while(answers.length < 3){

        let wrong =
        correct + random(-5,5);

        if(wrong < 0){

            wrong = 0;

        }

        if(!answers.includes(wrong)){

            answers.push(wrong);

        }

    }

    answers.sort((a, b) => a - b);
    answers.forEach(answer => {

        const button =
        document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.onclick =
        () => checkAnswer(answer);

        answerArea.appendChild(button);

    });

}

/* CHECK ANSWER */
function checkAnswer(answer){

    const buttons =
    document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {

        btn.disabled = true;

    });

    if(answer === currentAnswer){

    const messages = [
        "🎉 Amazing!",
        "⭐ Great Job!",
        "🥳 Awesome!",
        "🌟 Fantastic!",
        "👏 Well Done!"
    ];

    feedback.textContent =
    messages[random(0, messages.length - 1)];

    feedback.classList.add("correct");

    score++;

}else{

        feedback.textContent =
        "❌ Oops! The answer was "
        + currentAnswer;

        feedback.classList.add("wrong");

        lives--;

    }

    updateStats();

    if(lives <= 0){

        setTimeout(() => {

            finalScore.textContent = score;

            showScreen(gameOverScreen);

        },1200);

        return;

    }

    nextBtn.classList.remove("hidden");

}