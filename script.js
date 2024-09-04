const question = [
    {
        question: "Which language is commonly used for web development?" ,
        answer: [
            {text: "JavaScript", correct: true },
            {text: "Phyton", correct: false },
            {text: "C++", correct: false },
            {text: "Java", correct: false },
        ]
    },
    {
        question: "What does 'HTTP' stand for?" ,
        answer: [
            {text: "HyperText Transfer Protocol", correct: true },
            {text: "High Text Transfer Protocol", correct: false },
            {text: "Hyper Tech Transmission Protocol", correct: false },
            {text: "High Transfer Text Protocol", correct: false },
        ]
    },
    {
        question: "Which device is used primarily for data storage?" ,
        answer: [
            {text: "Server", correct: false },
            {text: "Switch", correct: false },
            {text: "Router", correct: false },
            {text: "Hardrive", correct: true },
        ]
    },
    {
        question: "What is cybersecurity focused on protecting?" ,
        answer: [
            {text: "Electricity", correct: false },
            {text: "Software", correct: false },
            {text: "Hardware", correct: false },
            {text: "Information", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score= 0;

function startQUIZ(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();

    }else{
        startQUIZ();

    }
})

startQUIZ();