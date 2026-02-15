let breakLength = 5;
let sessionLength = 25;
let time = sessionLength * 60;
let timer = null;
let isRunning = false;
let isWork = true;

const timeLeft = document.getElementById("time-left");
const timerLabel = document.getElementById("timer-label");
const progress = document.querySelector(".progress");
const beep = document.getElementById("beep");

const circumference = 2 * Math.PI * 115;
progress.style.strokeDasharray = circumference;

function updateDisplay() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timeLeft.textContent =
        (min < 10 ? "0" + min : min) + ":" +
        (sec < 10 ? "0" + sec : sec);

    let total = (isWork ? sessionLength : breakLength) * 60;
    let offset = circumference - (time / total) * circumference;
    progress.style.strokeDashoffset = offset;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        return;
    }

    isRunning = true;

    timer = setInterval(() => {
        time--;

        if (time < 0) {
            beep.play();
            isWork = !isWork;

            if (isWork) {
                time = sessionLength * 60;
                timerLabel.textContent = "Work";
            } else {
                time = breakLength * 60;
                timerLabel.textContent = "Break";
            }
        }

        updateDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    breakLength = 5;
    sessionLength = 25;
    isWork = true;
    time = sessionLength * 60;

    document.getElementById("break-length").textContent = breakLength;
    document.getElementById("session-length").textContent = sessionLength;
    timerLabel.textContent = "Work";
    beep.pause();
    beep.currentTime = 0;

    updateDisplay();
}

function changeLength(type, amount) {
    if (isRunning) return;

    if (type === "break") {
        breakLength = Math.max(1, breakLength + amount);
        document.getElementById("break-length").textContent = breakLength;
    } else {
        sessionLength = Math.max(1, sessionLength + amount);
        document.getElementById("session-length").textContent = sessionLength;
        time = sessionLength * 60;
    }

    updateDisplay();
}

document.getElementById("start_stop").onclick = startTimer;
document.getElementById("reset").onclick = resetTimer;

document.getElementById("break-inc").onclick = () => changeLength("break", 1);
document.getElementById("break-dec").onclick = () => changeLength("break", -1);
document.getElementById("session-inc").onclick = () => changeLength("session", 1);
document.getElementById("session-dec").onclick = () => changeLength("session", -1);

updateDisplay();
