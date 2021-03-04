const input = document.querySelector('.js_form input');
const pending = document.querySelector('#pending');
const finished = document.querySelector('#finished');
let pendingTask = [];
let finishedTask = [];

function taskObj(text) {
    return {
        id: String(Date.now()),
        text: text
    };
}

function removeFromPending(taskId) {
    pendingTask = pendingTask.filter(function (task) {
        return task.id !== taskId;
    });
}

function removeFromFinished(taskId) {
    finishedTask = finishedTask.filter(function (task) {
        return task.id !== taskId;
    });
}

function handleDelete(e) {
    e.preventDefault();
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromPending(li.id);
    removeFromFinished(li.id);
    saveState();
}

function genericTask(task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    span.innerText = "◾ " + task.text;
    delBtn.innerText = " ❎";
    delBtn.addEventListener('click', handleDelete);
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function findPending(taskId) {
    return pendingTask.find(function (task) {
        return task.id === taskId;
    });
}

function addToFinished(task) {
    finishedTask.push(task);
}

function addToPending(task) {
    pendingTask.push(task);
}

function findFinished(taskId) {
    return finishedTask.find(function (task) {
        return task.id === taskId;
    });
}

function handleBackClick(e) {
    e.preventDefault();
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findFinished(li.id);
    removeFromFinished(li.id);
    savePendingTask(task);
    addTask(task);
    saveState();
}

function addFinished(task) {
    const genericLi = genericTask(task);
    const backBtn = document.createElement('button');
    backBtn.innerText = "👈🏻";
    genericLi.append(backBtn);
    backBtn.addEventListener('click', handleBackClick);
    finished.append(genericLi);
}

function handleFinished(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findPending(li.id);
    removeFromPending(li.id);
    addToFinished(task);
    addFinished(task);
    saveState();
}

function addTask(task) {
    const genericLi = genericTask(task);
    const completeBtn = document.createElement('button');
    completeBtn.innerText = "✅";
    genericLi.append(completeBtn);
    completeBtn.addEventListener('click', handleFinished);
    pending.appendChild(genericLi);
}

function savePendingTask(task) {
    pendingTask.push(task)
}

function saveState() {
    localStorage.setItem("PENDING", JSON.stringify(pendingTask));
    localStorage.setItem("FINISHED", JSON.stringify(finishedTask));
}

function handleAddTask(e) {
    e.preventDefault();
    const newTask = taskObj(input.value);
    input.value = "";
    addTask(newTask);
    savePendingTask(newTask);
    saveState();
}

function loadTask() {
    pendingTask = JSON.parse(localStorage.getItem("PENDING")) || [];
    finishedTask = JSON.parse(localStorage.getItem("FINISHED")) || [];
}

function restoreTask() {
    pendingTask.forEach(function (task) {
        addTask(task);
    });
    finishedTask.forEach(function (task) {
        addFinished(task);
    });
}

function handleError(e) {
    e.preventDefault();
    if (e.target.textLength > 13) {
        window.alert('13자 미만으로 작성해주세요!');
    }
}

function init() {
    document.querySelector('.js_form input').addEventListener('input', handleError);
    document.querySelector('.js_form').addEventListener('submit', handleAddTask);
    loadTask();
    restoreTask();
}

init();