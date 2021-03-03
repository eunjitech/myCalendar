const date = new Date();

const nameForm = document.querySelector('.addName');
const nameInput = nameForm.querySelector('input');
const userName = document.querySelector('.name');

const dates = [];

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.querySelector('.date h1').innerHTML = months[date.getMonth()];

    document.querySelector('.date p').innerHTML = date.toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`
        } else {
            days += `<div>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }

    const day = document.querySelectorAll('.days div');

    day.forEach(function (d) {
        d.addEventListener('click', function (da) {
            const day = document.querySelectorAll('.days div');
            const currentDay = da.target;
            const currentMonth = document.querySelector('.date h1').textContent;

            for (i = 0; i < day.length; i++) {
                day[i].classList.remove('clicked');
            }
            currentDay.classList.add('clicked');
            currentDate = {
                month: currentMonth,
                day: currentDay.textContent
            };

            dates.push(currentDate)

            console.log(dates);
        });
    });

}

function saveName(text) {
    console.log(text);
    localStorage.setItem('userName', text);
}

function handleTodo(e) {
    e.preventDefault();
}

function handleName(e) {
    e.preventDefault();
    userName.innerText = `반갑습니다 ${nameInput.value}님👩🏻‍💻`;
    saveName(nameInput.value);
    nameInput.value = "";
    nameForm.style.display = 'none';
    document.querySelector('.listWrap').style.display = 'block'
}

function init() {
    renderCalendar();

    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    nameForm.addEventListener('submit', handleName);
    const today = document.querySelector('.today');
    today.classList.add('clicked');
}

init();