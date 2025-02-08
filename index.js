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
        if (display.value == "") {
            display.value += "0."
        } else {
            display.value += point.innerText;
        }
    } else {
        display.value += "";
    }
})