/* eslint-disable prefer-destructuring */
import './style.css';

import {
  startGame, getScores, postScore, render,
} from './modules/Apiconnectivity.js';

const addForm = document.querySelector('form');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');
const refresh = document.querySelector('button');

let gameId;
const startGamesRender = async () => {
  try {
    const response = await startGame('New Game Satrt Session');
    const res = response.result.split(' ');
    [gameId] = res[3];
  } catch (error) {
    throw new Error('Error score Value submitting:', error);
  }
};
const startGames = () => {
  startGamesRender();
};

const renderScores = async (gameId) => {
  try {
    const response = await getScores(gameId);
    render(response.result);
  } catch (error) {
    throw new Error('Error score Value submitting:', error);
  }
};

const getScoress = () => {
  renderScores(gameId);
};

const postScores = (e) => {
  e.preventDefault();
  postScore(gameId, nameInput.value, scoreInput.value);
  addForm.reset();
};

document.addEventListener('DOMContentLoaded', startGames);
addForm.addEventListener('submit', postScores);
refresh.addEventListener('click', getScoress);