import { goBackwards } from "./goBackwards.js";
import { showMonths } from "./month.js";

// logic on to have only years on start
const section = document.getElementById('years');
const captions = document.querySelectorAll('caption');
captions.forEach(c => c.addEventListener('click', goBackwards));

function loadCalendar() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    section.style.display = 'block';
}
loadCalendar();

// on click to show the year with the months 
section.addEventListener('click', showMonths);