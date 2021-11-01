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

function drawLots(event){
    event.preventDefault();
    let randomArray = [];
    winnerArea.innerHTML = '';
    
    for(let i = 0; i < winnerNum.value; i++){
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
        p.innerText = winners;
        winnerArea.append(p);
    });
}

function saveParticipantList(){
    localStorage.setItem(PART_KEY, JSON.stringify(participantArray));
    //console.log(participantArray);
}

function makeParticipantList(){
    let li = '';
    participantArray.forEach((participant,index) => {
        li = li + `<li>${participant} <button type="button" onclick="deletePati(event, ${index})">X</button></li>`;
        eventParticipant.innerHTML = li;
    })

}

function deletePati(event, index){
    console.log(event);
    console.log(index);
    event.path[1].remove();
    participantInput.value = '';
    participantArray.splice(index,1);
    saveParticipantList();
}


function addParticipant(event){
    event.preventDefault();
    participantArray.push(participantInput.value);
    participantInput.value = '';
    makeParticipantList();
    saveParticipantList();
}


const buttonDelete = eventParticipant.querySelector('button');
const getParticipantList = localStorage.getItem(PART_KEY);

participantForm.addEventListener('submit', addParticipant);
startForm.addEventListener('submit', drawLots);

if(getParticipantList){
    participantArray = JSON.parse(getParticipantList);
    makeParticipantList();
}