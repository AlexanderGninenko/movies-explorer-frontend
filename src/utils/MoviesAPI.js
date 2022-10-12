const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((res) => {
    throw new Error(res.message);
  });
};

export const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkResponse)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
