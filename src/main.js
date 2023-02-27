// Decalring Varaibles
const daysList = document.querySelector('.c-body__list--days');
const monthLabel = document.querySelector('.c-heading__date--month');
const yearLabel = document.querySelector('.c-heading__date--year');
const leftBtn = document.querySelector('.c-heading__button--left');
const rightBtn = document.querySelector('.c-heading__button--right');

// Init Variables
const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// ------------------------------------------------------------------------------------
// FUNCTIONS
const getDays = function () {
  const NUM_DAYS_OF_CURR_MONTH = new Date(year, month + 1, 0).getDate();
  const START_DAY_OF_WEEK = new Date(year, month, 1).getDay();
  const LAST_DAY_OF_PREV_MONTH = new Date(year, month, 0).getDate();
  const LAST_DAY_OF_WEEK = new Date(year, month + 1, 0).getDay();

  return {
    currMonthDays: NUM_DAYS_OF_CURR_MONTH,
    startDayofWeek: START_DAY_OF_WEEK,
    lastDayOfPrevMonth: LAST_DAY_OF_PREV_MONTH,
    lastDayOfWeek: LAST_DAY_OF_WEEK,
  };
};

const renderCalendar = function (days) {
  monthLabel.textContent = months[month];
  yearLabel.textContent = year;

  const newDate = new Date();
  const isDay = newDate.getFullYear() === year && newDate.getMonth() === month;
  let daysMarkup = '';

  // fill days before current month
  for (let i = days.startDayofWeek - 1; i >= 0; i--) {
    daysMarkup += `<li class="c-body__item c-body__item--day unactive-day"><span>${
      days.lastDayOfPrevMonth - i
    }</span></li>`;
  }

  // fill days in this month
  for (let i = 1; i <= days.currMonthDays; i++) {
    daysMarkup += `<li class="c-body__item c-body__item--day ${
      isDay && newDate.getDate() === i && 'active-day'
    }"><span>${i}</span></li>`;
  }

  // fill days after current month
  for (let i = 1; i <= 6 - days.lastDayOfWeek; i++) {
    daysMarkup += `<li class="c-body__item c-body__item--day unactive-day"><span>${i}</span></li>`;
  }

  daysList.innerHTML = '';
  daysList.insertAdjacentHTML('afterbegin', daysMarkup);
};

renderCalendar(getDays());

const btnEventHandler = function (btn) {
  const currMonth = btn === 'left' ? month - 1 : month + 1;

  const newDate = new Date(year, currMonth);
  month = newDate.getMonth();
  year = newDate.getFullYear();

  renderCalendar(getDays());
};

// ------------------------------------------------------------------------------------
// EVENT HANDLER
leftBtn.addEventListener('click', btnEventHandler.bind(this, 'left'));
rightBtn.addEventListener('click', btnEventHandler.bind(this, 'right'));
