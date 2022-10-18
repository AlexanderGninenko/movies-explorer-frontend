import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movies,
  moviesCount,
  localSavedMovies,
  isNothingFound,
  error,
  onSaveMovie,
  savedMovies,
  onDeleteMovie,
}) => {
  return (
    <div className='moviescardlist'>
      {isNothingFound && <p>Ничего не найдено</p>}
      {error && (
        <p className='moviescardlist__error'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {
        <p
          className={`moviescardlist__welcome-message ${
            localSavedMovies && 'hidden'
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
