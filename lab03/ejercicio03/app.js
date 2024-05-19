const questions = [
    { question: "Capital de Francia", answer: "PARIS" },
    { question: "Moneda de Japón", answer: "YEN" },
    { question: "Animal más rápido del mundo", answer: "GUEPARDO" },
    { question: "Planeta más cercano al sol", answer: "MERCURIO" },
    { question: "Autor de 'Cien años de soledad'", answer: "GARCIA MARQUEZ" },
    { question: "País con más medallas olímpicas", answer: "ESTADOS UNIDOS" },
    { question: "Lengua oficial de Brasil", answer: "PORTUGUES" },
    { question: "Elemento químico más abundante en la Tierra", answer: "OXIGENO" },
    { question: "Año de la caída del Muro de Berlín", answer: "1989" },
    { question: "Monarca actual del Reino Unido", answer: "CARLOS III" }
];

let selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
let answer = selectedQuestion.answer;
let guessedLetters = [];
let mistakes = 0;

document.getElementById('question').innerText += selectedQuestion.question;

function displayWord() {
    let display = answer.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById('word').innerText = display;
}

function guessLetter() {
    let input = document.getElementById('letter-input').value.toUpperCase();
    document.getElementById('letter-input').value = '';

    if (input && !guessedLetters.includes(input)) {
        guessedLetters.push(input);
        document.getElementById('used-letters').innerText = guessedLetters.join(' ');

        if (!answer.includes(input)) {
            mistakes++;
            document.getElementById('hangman-image').src = `img/${mistakes}.png`;
            if (mistakes === 6) {
                alert('¡Perdiste! La respuesta era ' + answer);
                resetGame();
            }
        } else {
            displayWord();
            if (!document.getElementById('word').innerText.includes('_')) {
                alert('¡Ganaste! La respuesta es ' + answer);
                resetGame();
            }
        }
    }
}

function resetGame() {
    selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
    answer = selectedQuestion.answer;
    guessedLetters = [];
    mistakes = 0;
    document.getElementById('question').innerText = 'Pregunta: ' + selectedQuestion.question;
    document.getElementById('hangman-image').src = 'img/1.png';
    document.getElementById('used-letters').innerText = '';
    displayWord();
}

displayWord();
