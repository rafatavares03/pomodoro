const timerContainer = document.querySelector('#timer');
const timer = new Date;

function WriteTimer() {
    const minutes = (timer.getMinutes() < 10) ? '0' + timer.getMinutes() : timer.getMinutes();
    const seconds = (timer.getSeconds() < 10) ? '0' + timer.getSeconds() : timer.getSeconds();
    timerContainer.innerHTML = `${minutes}:${seconds}`;
}

function Pomodoro() {
    timer.setMinutes(25);
    timer.setSeconds(0);
    WriteTimer();
}
Pomodoro();

function Break() {
    timer.setMinutes(5);
    timer.setSeconds(0);
    WriteTimer();

}

document.querySelector('#start').addEventListener('click', function Count() {
    const interval = setInterval(() => {
        let seconds = timer.getSeconds();
        seconds--;
        timer.setSeconds(seconds);
        WriteTimer();
        if(timer.getMinutes() === 0 && timer.getSeconds() === 0) {
            clearInterval(interval);
            function GoToABreak() {
                const answer = window.confirm("Do you wan't to do a 5 minutes break?")
                if (answer === true) {
                    Break();
                    Count();
                } else {
                    Pomodoro();
                }
            }
            GoToABreak();
        }
    }, 1000)
    
})