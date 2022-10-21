import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import { useEffect } from 'react';

const SavedMoviesCardList = ({
  savedMovies,
  onDeleteMovie,
  foundSavedMovies,
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
      {!foundSavedMovies.length && isSearched && (
        <p
          className={`moviescardlist__notfound ${
            (serverResponseError || !savedMovies.length) && 'hidden'
          }`}
        >
          Ничего не найдено
        </p>
      )}
      {foundSavedMovies.map((movie) => (
        <SavedMoviesCard
          onDeleteMovie={onDeleteMovie}
          movie={movie}
          key={movie._id}
        />
      ))}
    </div>
  );
};

export default SavedMoviesCardList;
