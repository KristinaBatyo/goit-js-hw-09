import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() < new Date().getTime()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        clearInterval(intervalId);
        updateTimerValue({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        startBtn.disable = false;
      }
    },
  };
  const flatpickrGet = flatpickr(input, options);
  startBtn.addEventListener('click', onStart);

  function onStart() {
    intervalId = setInterval(() => {
        const newDate = new Date();
    const selectedData = flatpickrGet.selectedDates[0];
    const timer = selectedData.getTime() - newDate.getTime();
    if (timer < 0) {
      clearInterval(intervalId);
      return;
    }
    const convertedData = convertMs(timer);
    updateTimerValue(convertedData);
    startBtn.disable = true;
  }, 1000);
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  
  function updateTimerValue(e) {
    dataDays.textContent = addLeadingZero(e.days);
    dataHours.textContent = addLeadingZero(e.hours);
    dataMinutes.textContent = addLeadingZero(e.minutes);
    dataSeconds.textContent = addLeadingZero(e.seconds);
  }