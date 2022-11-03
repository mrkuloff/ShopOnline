'use strict';

const timer = (deadline) => {
  const timerBlockDay = document.querySelectorAll('.list-banner__texts_1')[0];
  const timerBlockHour = document.querySelectorAll('.list-banner__texts_1')[1];
  const timerBlockMin = document.querySelectorAll('.list-banner__texts_1')[2];
  const timerBlockSec = document.querySelectorAll('.list-banner__texts_1')[3];

  const declinationDay = document.querySelectorAll('.list-banner__texts_2')[0];
  const declinationHour = document.querySelectorAll('.list-banner__texts_2')[1];
  const declinationMin = document.querySelectorAll('.list-banner__texts_2')[2];
  const declinationSec = document.querySelectorAll('.list-banner__texts_2')[3];

  const timerList = document.querySelector('.list-banner__texts');

  const getTimeRemaining = () => {
    const dateStop = new Date(new Date(deadline).toUTCString()).getTime();
    const dateNow = new Date(new Date().toUTCString()).getTime();

    const timeRemaining = dateStop - dateNow;

    const minutes = Math.floor(timeRemaining / (1000 * 60) % 60);
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const seconds = Math.floor(timeRemaining / 1000 % 60);

    const declMin = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    const declHours = declensionNum(hours, ['час', 'часа', 'часов']);
    const declDays = declensionNum(days, ['день', 'дня', 'дней']);
    const declSeconds = declensionNum(seconds, ['секунда','секунды','секунд']);

    return {timeRemaining, days, minutes, hours, seconds, declHours, declMin, declDays, declSeconds};
  }

  const start = () => {
    const timer = getTimeRemaining();

    timerBlockDay.textContent = timer.days;
    timerBlockHour.textContent = timer.hours;
    timerBlockMin.textContent = timer.minutes;
    timerBlockSec.textContent = timer.seconds;

    declinationDay.textContent = timer.declDays;
    declinationHour.textContent = timer.declHours;
    declinationMin.textContent = timer.declMin;
    declinationSec.textContent = timer.declSeconds;

    const intervalID = setInterval(start, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalID);
      document.querySelector('.list-banner__text').classList.toggle('timer-remove');
    } else if (timer.timeRemaining <= 86400000) {
      document.querySelector('.list-banner__texts_item-day').classList.add('not-visible');
      document.querySelector('.list-banner__texts_item-seconds').classList.remove('not-visible');
    }
  }

  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }

  start();

}

const searchTimer = () => {
  const timerDiv = document.querySelector(`[data-timer-deadline]`);
  const renderTimer = () => {
    timerDiv.classList.add('timer');
    timerDiv.insertAdjacentHTML('beforeend', '<p class="list-banner__texts_main">\n' +
      '          До конца акции:\n' +
      '        </p>\n' +
      '\n' +
      '        <div class="list-banner__texts" >\n' +
      '          <p class="list-banner__texts_item list-banner__texts_item-day">\n' +
      '            <span class="list-banner__texts_1"></span>\n' +
      '            <span class="list-banner__texts_2">дня</span>\n' +
      '          </p>\n' +
      '\n' +
      '          <p class="list-banner__texts_item list-banner__texts_item-hours">\n' +
      '            <span class="list-banner__texts_1"></span>\n' +
      '            <span class="list-banner__texts_2">часов</span>\n' +
      '          </p>\n' +
      '\n' +
      '          <p class="list-banner__texts_item list-banner__texts_item-minutes">\n' +
      '            <span class="list-banner__texts_1"></span>\n' +
      '            <span class="list-banner__texts_2">минуты</span>\n' +
      '          </p>\n' +
      '\n' +
      '          <p class="list-banner__texts_item list-banner__texts_item-seconds not-visible">\n' +
      '            <span class="list-banner__texts_1"></span>\n' +
      '            <span class="list-banner__texts_2">cекунда</span>\n' +
      '          </p>\n' +
      '      </div>')
  }
  if (timerDiv!== null) {
    renderTimer();
    timer(String(timerDiv.dataset.timerDeadline));
  }
}

searchTimer();



