const nameForm = document.querySelector('.addName');
const nameInput = nameForm.querySelector('input');
const name = document.querySelector('.name');
const todoForm = document.querySelector('.js_form');
const todoInput = todoForm.querySelector('input');
const pending = document.querySelector('#pending');
const finished = document.querySelector('#finished');


function saveName(text) {
    console.log(text);
    localStorage.setItem('userName', text);
}

function handleTodo(e) {
    e.preventDefault();
}



function handleName(e) {
    e.preventDefault();
    name.innerText = `반갑습니다 ${nameInput.value}님👩🏻‍💻`;
    saveName(nameInput.value);
    nameInput.value = "";
    nameForm.style.display = 'none';
    todoForm.addEventListener('submit', handleTodo);

}

function init() {
    //loadName();
    //loadDay();
    nameForm.addEventListener('submit', handleName);

}

init();