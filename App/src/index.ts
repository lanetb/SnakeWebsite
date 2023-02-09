
const offlineBtn = document.getElementById("Local");
const onlineBtn = document.getElementById("Online");
const joinBtn = document.getElementById("Join");
const hostBtn = document.getElementById("Host");
const homeBtn = document.getElementById("Home");
const input = document.getElementById("Input");
const submit = document.getElementById("Submit");

offlineBtn.onclick = function(){
    window.location.href = "./snake.html";
};

onlineBtn.onclick = function(){
    offlineBtn.style.display = "none";
    onlineBtn.style.display = "none";
    joinBtn.style.display = "inline-block";
    hostBtn.style.display = "inline-block";
    homeBtn.style.display = "inline-block";
};

homeBtn.onclick = function(){
    offlineBtn.style.display = "inline-block";
    onlineBtn.style.display = "inline-block";
    joinBtn.style.display = "none";
    hostBtn.style.display = "none";
    homeBtn.style.display = "none";
    input.style.display = "none";
    submit.style.display = "none";
};

joinBtn.onclick = function(){
    input.style.display = "inline-block";
    submit.style.display = "inline-block";
}