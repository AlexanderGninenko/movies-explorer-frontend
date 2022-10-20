const BASE_URL = 'https://moviessearcher.nomorepartiesxyz.ru/api/movies';
// const BASE_URL = 'http://localhost:4010/api/movies';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);

  // return res.json().then((res) => {
  //   console.log(res.message);
  //   throw new Error(res.message);
  // });
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

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      movieId: movie.id,
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
