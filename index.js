const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const point = document.querySelector('.point');

numbers.forEach(number => {
    number.addEventListener('click', () => {
        display.value += number.innerText;
    });
});

point.addEventListener('click', () => {
    if (!display.value.includes(point.innerText)) {
        display.value += point.innerText;
    } else {
        display.value += "";
    }
})