const timerContainer = document.querySelector('#timer');
const jsonTimer = (localStorage.getItem("timer")) ? localStorage.getItem("timer") : false;
const timer = (jsonTimer) ? new Date(JSON.parse(jsonTimer)) : new Date;
//timer.pomodoroSession = true;
console.log(jsonTimer, typeof jsonTimer);
console.log(timer, typeof timer);



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

if (timer.inPomodro || timer.inBreak) {
  WriteTimer();
} else {
  Pomodoro();
}

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
    const jsonTimer = JSON.stringify(timer);
    window.localStorage.removeItem('timer');
    window.localStorage.setItem("timer", jsonTimer);
    WriteTimer();
    if (timer.getMinutes() === 0 && timer.getSeconds() === 0) {
      WriteTimer();
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
  }, 1000);
});

/*
const circle = document.querySelector(".progress-bar--circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
console.log(radius, circumference)

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}
*/