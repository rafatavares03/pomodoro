const timerContainer = document.querySelector('#timer');
const timer = new Date;
timer.pomodoroSession = true;

function WriteTimer() {
  const minutes = (timer.getMinutes() < 10) ? '0' + timer.getMinutes() : timer.getMinutes();
  const seconds = (timer.getSeconds() < 10) ? '0' + timer.getSeconds() : timer.getSeconds();
  timerContainer.innerHTML = `${minutes}:${seconds}`;
}

function Pomodoro() {
  const button = document.querySelector('#start');
  if (button.classList.contains('hide')) {
    button.classList.remove('hide');
  }

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
  if (!document.querySelector('#start').classList.contains('hide')) {
    document.querySelector('#start').classList.add('hide');
  }

  const interval = setInterval(() => {
    let seconds = timer.getSeconds();
    seconds--;
    timer.setSeconds(seconds);
    WriteTimer();
    if (timer.getMinutes() === 0 && timer.getSeconds() === 0) {
      clearInterval(interval);

      function GoToABreak() {
        const answer = window.confirm("Do you want to do a 5 minutes break?");
        if (answer === true) {
          Break();
          Count();
          timer.pomodoroSession = false;
        } else {
          Pomodoro();
        }
      }

      function AnotherPomodoroSession() {
        const answer = window.confirm("Do you want to make another pomodoro session?");
        Pomodoro();
        if (answer === true) {
          Count();
          timer.pomodoroSession = true;
        }
      }


      if (timer.pomodoroSession === true) {
        GoToABreak();
      } else {
        AnotherPomodoroSession();
      }
    }
  }, 1000)
})