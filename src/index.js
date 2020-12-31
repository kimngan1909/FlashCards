import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
//variables
const card = document.querySelector("#card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const count = document.querySelector("#count");

const endpoint =
  "https://gist.githubusercontent.com/kimngan1909/1016efc49ae996481b7d14842160278e/raw/60037a0502bcd76e99f3333f6c4a76fdd70b0898/flashcard.json";
const questions = [];

let current = 0;
let turned = false;



  //remember that fetch doesn't return the data, fetch returns a promise
   fetch(endpoint)
  //blog.json also returns a promise
  .then(blob => blob.json())
  //using spread operator means that we don't get an nested arrays, we just get an array
  .then(data => questions.push(...data))
  //we set the initial state after data is ready
  .then(populateNextCard);
 
function resetCard() {
  next.disabled = false;
  prev.disabled = false;
  card.classList.remove("turned");
}

function populateNextCard() {
  resetCard();
  front.innerHTML = `<p>${questions[current].question}</p>`;
  back.innerHTML = `<p>${questions[current].answer}</p>`;
  count.innerHTML = `<p>${[current + 1]} / ${questions.length}</p>`;
  current++;
}

function getNextCard() {
  if (current < questions.length) {
    populateNextCard();
  } else {
    next.disabled = true;
  }
}

function getPrevCard() {
  if (current > 1) {
    resetCard();
    front.innerHTML = `<p>${questions[current - 2].question}</p>`;
    back.innerHTML = `<p>${questions[current - 2].answer}</p>`;
    count.innerHTML = `<p>${[current - 1]} / ${questions.length}</p>`;
    current--;
  } else {
    prev.disabled = true;
  }
}

function toggleTurn(e) {
  turned = !turned;
  if (turned) {
    this.classList.add("turned");
  } else {
    this.classList.remove("turned");
  }
}


card.addEventListener("click", toggleTurn);
next.addEventListener("click", getNextCard);
prev.addEventListener("click", getPrevCard);

