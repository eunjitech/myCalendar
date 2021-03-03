const clock = document.querySelector('.clock');
function getTime(){
    let clockDate = new Date;
    const year = clockDate.getFullYear();
    const month = clockDate.getMonth();
    const day = clockDate.getDay();
    const minutes = clockDate.getMinutes();
    const hours = clockDate.getHours();
    const seconds = clockDate.getSeconds();
    clock.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

getTime();
setInterval(getTime, 1000);