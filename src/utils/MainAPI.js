// const BASE_URL = 'https://moviessearcher.nomorepartiesxyz.ru/api/movies';
const BASE_URL = 'http://localhost:4010/api/movies';

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
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkResponse)
    .then((data) => data.data);
};

export const saveMovie = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  nameRU,
  nameEN,
  movieId,
}) => {
  return fetch(`${BASE_URL}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    }),
  }).then(checkResponse);
};

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
};
