// JSON-Variable 
// {
//     "question": "Frage",
//     "answer_1": "",
//     "answer_2": "",
//     "answer_3": "",
//     "answer_4": "",
//     "right_answer": 0
// }

let questions = [{
        "question": "Mit welchem Befehl ist es mir möglich einen Eintrag aus einem Array zu löschen?",
        "answer_1": "splice",
        "answer_2": "delete",
        "answer_3": "forget",
        "answer_4": "ignore",
        "right_answer": 1
    },
    {
        "question": "welche Schreibweise zum löschen eines Array-Eintrages ist korrekt?",
        "answer_1": "array.delete(index, 1)",
        "answer_2": "array.delete[index]",
        "answer_3": "array.splice(index,1)",
        "answer_4": "erase.array[index]",
        "right_answer": 3
    },
    {
        "question": "welche Schreibweise zum erstellen eines Array ist korrekt?",
        "answer_1": "const array = ['1','2','3']",
        "answer_2": "let array = ['1','2','3']",
        "answer_3": "let array['1','2','3']",
        "answer_4": "let array = ('1','2','3')",
        "right_answer": 2
    },
    {
        "question": "Wie häufig kann/darf eine 'id' vergeben werden?",
        "answer_1": "so oft wie sie benötigt wird!",
        "answer_2": "maximal 100 mal!",
        "answer_3": "sowas wie eine 'id' gibt es nicht!",
        "answer_4": "maximal einmal, eine 'id' sollte immer einzigartig sein!",
        "right_answer": 4
    },
    {
        "question": "Was ist ein JSON?",
        "answer_1": "ein Mitglied einer Boyband!",
        "answer_2": "der Spitzname von Homer J. Simpson",
        "answer_3": "Dabei handelt es sich um ein standardisiertes Datenformat für die Codierung von Daten",
        "answer_4": "ein alkoholfreies Getränk!",
        "right_answer": 3
    }
];

let currentQuestion = 0;

function init() {
    document.getElementById('numberOfQuestions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    // showAnswers();
}

// function showAnswers() {
//     let answer = questions[currentQuestion];
//     for (let i = 1; i < 5; i++) {
//         document.getElementById(`answer_${i}`).innerHTML = answer[`answer_${i}`];
//     }
// }

function checkAnswer(x) {
    let answercheck = questions[currentQuestion];
    if (x == answercheck['right_answer']) {
        document.getElementById(`answer_${x}`).style.backgroundColor = "rgba(140,190,140,0.5";
    } else {
        document.getElementById(`answer_${x}`).style.backgroundColor = "rgba(230,110,110,0.5";
    }
}