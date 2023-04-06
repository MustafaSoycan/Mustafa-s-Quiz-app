let questions = [

    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Jason Statham",
        "answer_2": "Elon Musk",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Ruben Winkler",
        "right_answer": 3
    },

    {
        "question": "Wer hat CSS erfunden?",
        "answer_1": "Hakon Wium Lie",
        "answer_2": "Tim Elliot",
        "answer_3": "Mark Zuckerberg",
        "answer_4": "Tom Cruise",
        "right_answer": 1
    },


    {
        "question": "Wer hat Javascript erfunden?",
        "answer_1": "Steve Jobs",
        "answer_2": "Bill Gates",
        "answer_3": "Linus Benedict Torvalds",
        "answer_4": "Brendan Eich",
        "right_answer": 4
    },


    {
        "question": "Wer hat bootstrap erfunden?",
        "answer_1": "Dennis Ritchie",
        "answer_2": "Mark Otto und Jacob Thornton ",
        "answer_3": "Martin Fowler",
        "answer_4": "Larry Page",
        "right_answer": 2
    },


    {
        "question": "Wer hat Typescript erfunden?",
        "answer_1": "Charlie Sheen",
        "answer_2": "Dwayne Johnson",
        "answer_3": "Will Smith",
        "answer_4": "Anders Hejlsberg",
        "right_answer": 4
    },


    {
        "question": "Wer hat GIT erfunden?",
        "answer_1": "Linus Torvalds",
        "answer_2": "Justin Timberlake",
        "answer_3": "Zac Efron",
        "answer_4": "Steven Hawkings",
        "right_answer": 1
    },

    {
        "question": "Wer ist der beste Coach bei der Developer Akademie?",
        "answer_1": "Simon Vitt",
        "answer_2": "Waldemar Matthies",
        "answer_3": "Rebecca Häckl",
        "answer_4": "Alle sind gut!",
        "right_answer": 4
    },


];

let currentQuestion = 0;

let rightQuestions = 0;

let audio_success = new Audio('sounds/success.mp3');
let audio_wrong = new Audio('sounds/wrong.mp3');

function init() {
    let amountQuestions = questions.length

    document.getElementById('amountquestions').innerHTML = amountQuestions;


    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function answer(selection) {
    let question = questions[currentQuestion]; // Sagt um welches Json es gerade geht, in diesem Fall JSON an der Stelle 0, sozusagen steht dort questions[0] = erste frage
    console.log('Selected Answer is', selection) // Sagt welche Antwort angeklickt wurde
    let SelectedQuestionNumber = selection.slice(-1); // Nimmt den letzten String oder buchstaben vom jeweilgen parameter, also zb answer_1 wäre dann in dem fall 1
    console.log('selectedQuestionNumber is', SelectedQuestionNumber); // Sagt "Die nummer der gewählten antwort ist 'nummer' "
    console.log('Current Question-answer is', question['right_answer']); // Sagt welche zahl die richtige antwort ist


    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (SelectedQuestionNumber == question['right_answer']) {  // Sagt dass wenn die Zahl der richtigen Antwort mit der richtigen Antwort übereinstimmt dass dann richtig erscheinen soll, wenn nicht dann falsch
        console.log('Richtig');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audio_success.play();
        rightQuestions++;
    } else {
        console.log('Falsch');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_wrong.play();
    }

    document.getElementById('next-button').disabled = false;

}

function nextQuestion() {
    currentQuestion++; // zb von 0 auf 1 erhöhen, also steht da 1s


    document.getElementById('next-button').disabled = true;


    resetAnswerButtons();

    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    rightQuestions = 0;
    currentQuestion = 0;

    document.getElementById('questionbody').style = 'display: true;' // question body anzeigen
    document.getElementById('endscreen').style = 'display: none;' // endscreen ausblenden
    init();

}

function showEndScreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('questionbody').style = 'display: none;'
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
}

function updateToNextQuestion() {
    
    let question = questions[currentQuestion];
    document.getElementById('currentquestion').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];

}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function gameIsOver(){
   return currentQuestion >= questions.length;
}