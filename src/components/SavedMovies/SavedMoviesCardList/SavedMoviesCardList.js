import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import { useEffect } from 'react';

const MoviesCardList = ({
  savedMovies,
  onDeleteMovie,
  foundMovies,
  isSearched,
  serverResponseError,
  resetError,
}) => {
  useEffect(() => {
    resetError();
  }, []);
  return (
    <div className='moviescardlist'>
      {serverResponseError && (
        <p className='moviescardlist__error'>{serverResponseError}</p>
      )}
      {!savedMovies.length && (
        <p
          className={`moviescardlist__notfound ${
            serverResponseError && 'hidden'
          }`}
        >
          Здесь пока ничего нет
        </p>
      )}
      {isSearched && !foundMovies.length && (
        <p
          className={`moviescardlist__notfound ${
            (serverResponseError || !savedMovies.length) && 'hidden'
          }`}
        >
          Ничего не найдено
        </p>
      )}
      {(isSearched ? foundMovies : savedMovies).map((movie) => (
        <SavedMoviesCard
          onDeleteMovie={onDeleteMovie}
          movie={movie}
          key={movie._id}
          serverResponseError={serverResponseError}
        />
      ))}
    </div>
  );
};

export default MoviesCardList;
