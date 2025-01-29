// Lista delle domande sugli indirizzi IP
const questions = [
    {
        question: "Qual è la classe dell'indirizzo IP 192.168.1.1?",
        options: ["A", "C"],
        correctAnswer: "C"
    },
    {
        question: "Quale dei seguenti è un indirizzo IP privato?",
        options: ["192.168.0.1", "200.100.50.25"],
        correctAnswer: "192.168.0.1"
    },
    {
        question: "Qual è la lunghezza della subnet mask per una rete di classe C?",
        options: ["24", "32"],
        correctAnswer: "24"
    },
    {
        question: "Quale protocollo è utilizzato per ottenere un indirizzo IP dinamico?",
        options: ["DNS", "DHCP"],
        correctAnswer: "DHCP"
    },
    {
        question: "Qual è l'indirizzo di loopback?",
        options: ["127.0.0.1", "192.168.1.1"],
        correctAnswer: "127.0.0.1"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerValue = 10;
let timerInterval;
let countdownInterval;

function startGame() {
    document.getElementById("score").textContent = score;
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    document.getElementById("option-1").textContent = questionData.options[0];
    document.getElementById("option-2").textContent = questionData.options[1];

    document.getElementById("option-1").onclick = () => checkAnswer(questionData.options[0]);
    document.getElementById("option-2").onclick = () => checkAnswer(questionData.options[1]);

    document.getElementById("next-button").style.display = "none"; // Nascondi il pulsante "Prossima domanda"
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("result-message").textContent = "Risposta corretta!";
    } else {
        document.getElementById("result-message").textContent = "Risposta errata!";
    }

    clearInterval(countdownInterval); // Ferma il timer
    document.getElementById("score").textContent = score;
    document.getElementById("next-button").style.display = "block"; // Mostra il pulsante per passare alla domanda successiva
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
        document.getElementById("result-message").textContent = "";
    } else {
        document.getElementById("result-message").textContent = `Gioco finito! Punteggio finale: ${score}`;
        document.getElementById("next-button").style.display = "none"; // Nascondi il pulsante
    }
}

function startTimer() {
    timerValue = 10;
    document.getElementById("timer").textContent = timerValue;
    timerInterval = setInterval(() => {
        timerValue--;
        document.getElementById("timer").textContent = timerValue;
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null); // Tempo scaduto, risposta automatica
        }
    }, 1000);
}

// Inizia il gioco quando il documento è pronto
window.onload = startGame;
