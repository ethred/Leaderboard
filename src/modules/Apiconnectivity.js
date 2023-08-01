const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const list = document.querySelector('.list-score');

const startGame = async (gameName) => {
  const responseStart = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: gameName,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const responseData = await responseStart.json();
  return responseData;
};

const getScores = async (gameId) => {
  try {
    const responseStart = await fetch(`${url}${gameId}/scores/`);
    const responseData = await responseStart.json();
    return responseData;
  } catch (error) {
    return [];
  }
};

const postScore = async (gameId, name, score) => {
  if (name === '' || score === '') {
    alert('Please enter a valid name or Score');
  }
  const data = {
    user: name,
    score: Number(score),
  };
  try {
    const responseStart = await fetch(`${url}${gameId}/scores/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!responseStart.ok) {
      throw new Error('Failed to submit value.');
    }
    const responseData = await responseStart.json();
    return responseData;
  } catch (error) {
    throw new Error('Error score Value submitting:', error);
  }
};

const render = (arr) => {
  list.innerHTML = '';
  arr.forEach((el) => {
    list.innerHTML += `
      <li class="item">${el.user} : ${el.score}</li>
      `;
  });
};

export {
  startGame,
  getScores,
  postScore,
  render,
};