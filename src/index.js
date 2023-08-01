import './style.css';

import {
  startGame, getScores, postScore, render,
} from './modules/Apiconnectivity.js';

const addForm = document.querySelector('form');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');
const refresh = document.querySelector('button');

let gameId;
const startGames = () => {
  startGame('New Game Satrt Session')
    .then((response) => response.result.split(' '))
    .then((res) => {
      [gameId] = [res[3]];
    });
};

const getScoress = () => {
  getScores(gameId)
    .then((response) => render(response.result));
};

const postScores = (e) => {
  e.preventDefault();
  postScore(gameId, nameInput.value, scoreInput.value);
  addForm.reset();
};

document.addEventListener('DOMContentLoaded', startGames);
addForm.addEventListener('submit', postScores);
refresh.addEventListener('click', getScoress);