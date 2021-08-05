// JSON-Variable 
// {
//     "question": "Frage",
//     "answer_1": "",
//     "answer_2": "",
//     "answer_3": "",
//     "answer_4": "",
//     "right_answer": 0
// }

// ---------die JSON-Variable enthält die Fragen und Antworten ------------
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
        "answer_2": "der Spitzname von Homer J. Simpson!",
        "answer_3": "Dabei handelt es sich um ein standardisiertes Datenformat für die Codierung von Daten!",
        "answer_4": "ein alkoholfreies Getränk!",
        "right_answer": 3
    },
    {
        "question": "Für was wird der Befehl 'slice' verwendet?",
        "answer_1": "einen String einfrieren!",
        "answer_2": "einen char, Teil eines String oder einen String aus einem Array extrahieren!",
        "answer_3": "zum löschen eines Strings!",
        "answer_4": "diesen Befehl gibt´s nicht!",
        "right_answer": 2
    }
];

let currentQuestion = 0; //...................................................Variable für die Frage aus dem aktuellem JSON-Array-Eintrag 
let points = 0; //............................................................Variable für die richtig beantworteten Fragen
let AUDIO_SUCCESS = new Audio('audio/correct.mp3');
let AUDIO_FAIL = new Audio('audio/wrong-buzzer.mp3');
let AUDIO_WIN = new Audio('audio/you-win.mp3');


function init() {
    document.getElementById('numberOfQuestions').innerHTML = questions.length; //.........Anzahl der Fragen wird dem html-Tag mit der id 'play-screen' übergeben
    document.getElementById('questions-amount').innerHTML = questions.length; //.........Anzahl der Fragen wird dem html-Tag mit der id 'end-screen' übergeben
    showQuestion();
}

function showQuestion() { //.............................................................Fragen und mögliche Antworten werden den jeweiligen html-Tags übergeben
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
    }

    disableButton('next-button', true); //...............................................Funktionsaufruf um den Button für die nächste Frage zu deaktivieren

    updateProgressbar(); //..............................................................Funktionsaufruf um die Progress-Leiste zu aktualisieren
}



function checkAnswer(selection) {
    let question = questions[currentQuestion]; //......................................Übergabe des aktuellen Arra-Eintrags an die neue Variable
    let selectedQuestionNumber = selection.slice(-1); //...............................aus dem mitgeliefertem String (der bei der Übergabe in der Variablen 'selection')
    //.................................................................................gespeichert wurde, wir mit 'splice' ein Teil des Strings (in diesem Fall das letzte Char-Zeichen)
    //.................................................................................aus dem String extrahiert und der neuen Variable übergeben

    let correctAnswer = `answer_${question['right_answer']}`; //.......................die korrekte Antort zur zugehörigen Frage wird in der neuen Variable gespeichert

    if (selectedQuestionNumber == question['right_answer']) { //.......................die selektierte Antwort wird mit der korrekten Antwort verglichen
        document.getElementById(selection).parentNode.classList.add('bg-success'); //..wenn Bedingung erfüllt (Antwort korrekt) dann wird mit 'parentNode' dem übergeordnetem Element (Elternelement) eine Klasse hinzugefügt.Antwort wird (grün) markiert.
        AUDIO_SUCCESS.play();
        points++; //...................................................................Anzahl der korreken Antworten wird erhöht.
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); //........auch hier wird dem Elternelement eine Klasse hinzugefügt.Antwort wird rot markiert da falsche Antwort
        document.getElementById(correctAnswer).parentNode.classList.add('bg-success'); //...und hier auch, die richtige Antwort wird grün markiert
        AUDIO_FAIL.play();
    }
    disableButton('next-button', false); //................................................Funktionsaufruf um den Button für die nächste Frage zu aktivieren
}

// ........... Funktion um die nächste Frage anzuzeigen ..................................................................................................................
function nextQuestion() {
    if (enoughQuestionsAvailable()) {
        currentQuestion++; //............................................................Array-Eintrag wird um 1 hochgezählt, quasi wird die nächste Frage gestellt
        resetSelections(); //............................................................Funktionsaufruf zum entfernen der Markierung der Antwort
        showQuestion(); //...............................................................Fragen und Antworten anzeigen
        document.getElementById('questionNumber').innerHTML = currentQuestion + 1; //....Anzeige der wievielten Frage im 'play-Screen' (question-footer)
    } else {
        showEndscreen();
    }
}

function enoughQuestionsAvailable() {
    return currentQuestion < questions.length - 1; //.....................................Abfrage aktueller Arra-Eintrag kleiner ist als Anzahl der Einträge im Array
}

// ........... Funktion um die Auswahl zu löschen ..................................................................................................................
function resetSelections() { //..........................................................in dieser Funktion werden die Antwortmarkierungen durch Entfernung der Klassen aus der Classlist entfernt
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
    }
}

function disableButton(button, state) {
    document.getElementById(button).disabled = state; //..........................der button für die nächste Frage wird deaktiviert
}

// ........... Funktion um die Progress-Leiste zu aktualisieren ......................................................................................
function updateProgressbar() {
    let percent = calcPercent();
    document.getElementById('progress-bar').style = `width:${percent}%`;
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
}

// ........... Funktion um den Fortschritt zu errechnen .........................................................................................
function calcPercent() {
    let result = Math.round(((currentQuestion + 1) / questions.length) * 100);
    return result;
}

function showEndscreen() {
    document.getElementById('play-screen').classList.add('d-none'); //...............wenn alle Fragen durch sind wird der play-screen entfernt
    document.getElementById('end-screen').classList.remove('d-none'); //.............und der end-screen sichtbar gemacht
    document.getElementById('points').innerHTML = points; //.........................die Anzahl der richtig beantworteten Fragen wir übergeben
    AUDIO_WIN.play();
}

function showPlayscreen() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('play-screen').classList.remove('d-none'); //...............wenn alle Fragen durch sind wird der play-screen entfernt
}

// ........... Funktion um das Quiz neu zu starten.........................................................................................
function restart_quiz() {
    currentQuestion = 0;
    points = 0;
    resetSelections();
    showPlayscreen();
    init();
}