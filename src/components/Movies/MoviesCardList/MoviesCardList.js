import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';

const MoviesCardList = ({
  foundMovies,
  moviesCount,
  serverResponseError,
  onSaveMovie,
  foundSavedMovies,
  onDeleteMovie,
  isSearched,
}) => {
  const [localSavedMovies, setLocalSavedMovies] = useState([]);

  useEffect(() => {
    if (foundMovies.length) {
      localStorage.setItem('movies', JSON.stringify(foundMovies));
      setLocalSavedMovies(JSON.parse(localStorage.getItem('movies')));
    }
    setLocalSavedMovies([]);
  }, [foundMovies]);

  useEffect(() => {
    setLocalSavedMovies(JSON.parse(localStorage.getItem('movies')));
  }, []);

  return (
    <div className='moviescardlist'>
      {!foundMovies.length && isSearched && (
        <p
          className={`moviescardlist__notfound ${
            serverResponseError && 'hidden'
          }`}
        >
          Ничего не найдено
        </p>
      )}
      {serverResponseError && (
        <p className='moviescardlist__error'>{serverResponseError}</p>
      )}

      {!localSavedMovies && (
        <p
          className={`moviescardlist__welcome-message ${
            serverResponseError && 'hidden'
          }`}
        >
          Начните поиск
        </p>
      )}
      {localSavedMovies &&
        (!foundMovies.length ? localSavedMovies : foundMovies)
          .slice(0, moviesCount)
          .map((movie) => (
            <MoviesCard
              onDeleteMovie={onDeleteMovie}
              onSaveMovie={onSaveMovie}
              movie={movie}
              key={movie.id}
              foundSavedMovies={foundSavedMovies}
            />
          ))}
    </div>
  );
};

export default MoviesCardList;
