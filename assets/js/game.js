let questions = [
    {
        question: "How can be initialized a static array since C++ 11?",
        choice: [
            "std::array<int, 3> num{1, 2, 3}",
            "std::array<3, int> num{1, 2, 3}",
            "std::array<int, 1> num{1, 2, 3}",
            "int array{1, 2, 3}"
        ],
        answer: 1,
        score: 0.5
    },
    {
        question: "Which library is used to determine a dynamic array?",
        choice: [
            "array",
            "string",
            "vector",
            "iostream"
        ],
        answer: 3,
        score: 0.5
    },
    {
        question: "Which variable declaration is wrong?",
        choice: [
            "int i{1}",
            "int i = 1",
            "bool i = true",
            "let i = 1"
        ],
        answer: 4,
        score: 0.5
    },
    {
        question: "What is a pointer?",
        choice: [
            "a variable that stores the memory address as its value",
            "a variable that stores value",
            "an array member that stores the memory address as its value",
            "a variable that points to the end of an array"
        ],
        answer: 1,
        score: 2
    },
    {
        question: "Which method is used in C++ as end of string?",
        choice: [
            "/n",
            "std::endl",
            "/t",
            "endl"
        ],
        answer: 2,
        score: 1
    },
    {
        question: "All members of a structure by default are...",
        choice: [
            "protected",
            "private",
            "public",
            "float"
        ],
        answer: 3,
        score: 1
    },
    {
        question: "All members of a class by default are...",
        choice: [
            "public",
            "protected",
            "double",
            "private"
        ],
        answer: 4,
        score: 0.5
    },
    {
        question: "How can we access a member age of a Person structure?",
        choice: [
            "Person[age]",
            "Person.age",
            "Person->age",
            "Person.[age]"
        ],
        answer: 2,
        score: 2
    },
    {
        question: "What are the basic concepts of OOP?",
        choice: [
            "class, object, inheritance and polymorphism",
            "inheritance and polymorphism",
            "encapsulation, inheritance and polymorphism",
            "encapsulation, abstraction, inheritance and polymorphism"
        ],
        answer: 4,
        score: 1
    },
    {
        question: "How can we declare a reference variable?",
        choice: [
            "int& ref = x",
            "&int ref = x",
            "int&& ref = x",
            "int ref& = x"
        ],
        answer: 1,
        score: 1
    }
];

const questionAmount = 10;
let questionCounter = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let index;
let score = 0;

document.addEventListener("DOMContentLoaded", function() {
    let answer;
    const choices = document.getElementsByClassName('choices-container');

    for (let choice of choices) {
        choice.addEventListener("click", function() {
            if (choice.dataset["number"] === "1") {
                answer = 1;
            } else if (choice.dataset["number"] === "2") {
                answer = 2;
            } else if (choice.dataset["number"] === "3") {
                answer = 3;
            } else if (choice.dataset["number"] === "4") {
                answer = 4;
            }

            checkAnswer(answer);
        });
    }

    runGame();
});

function runGame() {
    if (questionAmount === questionCounter) {
        endOfGame();
    } else {
        index = Math.floor(Math.random() * (questionAmount - questionCounter - 1));
        displayQuestion();
    }
}

function checkAnswer(choice) {
    let choices = document.getElementsByClassName('choices-container');

    for (let i = 0; i < choices.length; i++) {
        choices[i].style.pointerEvents = "none";
    }

    if (choice === questions[index].answer) {
        choices[choice-1].style.borderColor = "green";
        incrementScore();
    } else {
        choices[choice-1].style.borderColor = "red";
        incrementWrongAnswer();
    }

    setTimeout(function() {
        for (let i = 0; i < choices.length; i++) {
            choices[i].style.pointerEvents = "auto";
            choices[i].style.borderColor = "black";
            runGame();
        }
    }, 2000);

    questions.splice(index, 1);
    questionCounter++;
}

function incrementScore() {
    document.getElementsByClassName('circle')[questionCounter].style.backgroundColor = "green";
    rightAnswers++;
    score += questions[index].score;
}

function incrementWrongAnswer() {
    document.getElementsByClassName('circle')[questionCounter].style.backgroundColor = "red";
    let rightAnswer = questions[index].choice[questions[index].answer-1];
    alert(`You gave wrong answer. The right one is: ${rightAnswer}`);
    wrongAnswers++;
}

function displayQuestion() {
    document.getElementById('question').textContent = questions[index].question;
    let choices = document.getElementsByClassName('choices-container');

    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = questions[index].choice[i];
    }
}

function endOfGame() {
    let choices = document.getElementsByClassName('choices-container');
    document.getElementById('question').textContent = 'Congratulations you have finished the Quiz!';
    
    while (choices.length > 0) {
        choices[0].remove();
    }

    localStorage.setItem("NewHighScore", score);

    setTimeout(function() {
        alert(`You gave ${rightAnswers} right and ${wrongAnswers} wrong answers. Your score is ${score}`);
        window.location.assign('end.html');
    }, 2000);
}