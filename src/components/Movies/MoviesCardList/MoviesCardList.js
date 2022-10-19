import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movies,
  moviesCount,
  localSavedMovies,
  isNothingFound,
  serverResponseError,
  onSaveMovie,
  savedMovies,
  onDeleteMovie,
}) => {
  return (
    <div className='moviescardlist'>
      {isNothingFound && (
        <p
          className={`moviescardlist__notfound ${
            serverResponseError && 'hidden'
          }`}
        >
          Ничего не найдено
        </p>
      )}
      {(serverResponseError || !localSavedMovies) && (
        <p className='moviescardlist__error'>{serverResponseError}</p>
      )}
      {
        <p
          className={`moviescardlist__welcome-message ${
            (localSavedMovies || serverResponseError) && 'hidden'
          }`}
        >
          Начните поиск
        </p>
      }
      {localSavedMovies &&
        movies
          .slice(0, moviesCount)
          .map((movie) => (
            <MoviesCard
              onDeleteMovie={onDeleteMovie}
              onSaveMovie={onSaveMovie}
              movie={movie}
              key={movie.id}
              savedMovies={savedMovies}
            />
          ))}
    </div>
  );
};

export default MoviesCardList;
