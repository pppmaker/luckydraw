'use strict';

const participantForm = document.getElementById('addForm');
const participantInput = participantForm.querySelector('input');
const eventParticipant = document.getElementById('eventParticipant');
const startForm = document.getElementById('lotteryForm');
const winnerNum = startForm.querySelector('input');
const winnerArea = document.getElementById('winnerArea');
const lotteryButton = startForm.querySelector('#lotteryButton');

const PART_KEY = "partList"

let participantArray = [];
let randomNum;
let randomArray;


function saveParticipantList(){
    localStorage.setItem(PART_KEY, JSON.stringify(participantArray));
    //console.log(participantArray);
}


function drawLots(event){
    event.preventDefault();
    randomArray = [];
    winnerArea.innerHTML = '';
    
    for(let i = 0; i < Number(winnerNum.value); i++){ // winnerNum.value 숫자만큼 당첨자 나오기
        randomNum = Math.floor(Math.random() * participantArray.length);
        if (randomArray.indexOf(participantArray[randomNum]) === -1) { // 중복되지 않을 경우
            randomArray.push(participantArray[randomNum]);
        } else { // 중복 될 경우
            i--;
        }
    }
    makeWinnerSection(randomArray);
}


function makeWinnerSection(winnerArray){
    winnerArray.forEach((winners) => {
        let p = document.createElement('p');
        p.innerText = winners.text;
        winnerArea.appendChild(p);
    });
}

function deletePati(event, index){
    let targetLi = event.target.parentElement;
    targetLi.remove();
    participantArray = participantArray.filter(ptc => ptc.id !== parseInt(targetLi.id));
    saveParticipantList();
}


function makeParticipantList(newTodoInfo){
    const li = document.createElement('li');
    li.id = newTodoInfo.id;
    li.innerText = newTodoInfo.text;
    const button = document.createElement('button');
    button.innerText ="삭제"
    li.appendChild(button);
    button.addEventListener("click",deletePati);
    eventParticipant.appendChild(li);
}


function addParticipant(event){
    event.preventDefault();
    const newTodo = participantInput.value;
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    participantArray.push(newTodoObj);
    participantInput.value = '';
    makeParticipantList(newTodoObj);
    saveParticipantList();
}


const buttonDelete = eventParticipant.querySelector('button');
const getParticipantList = localStorage.getItem(PART_KEY);

participantForm.addEventListener('submit', addParticipant);
startForm.addEventListener('submit', drawLots);

if(getParticipantList){
    const parsedArray = JSON.parse(getParticipantList); 
    participantArray = parsedArray;
    participantArray.forEach(makeParticipantList);
}