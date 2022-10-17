import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from './../../Preloader/Preloader';

const MoviesCardList = ({
  movies,
  isRenderLoading,
  moviesCount,
  localSavedMovies,
  isNothingFound,
  error,
  saveMovie,
}) => {
  return (
    <div className='moviescardlist'>
      {isRenderLoading && <Preloader />}
      {isNothingFound && <p>Ничего не найдено</p>}
      {error && (
        <p className='moviescardlist__error'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {localSavedMovies ? (
        movies
          .slice(0, moviesCount)
          .map((movie) => (
            <MoviesCard saveMovie={saveMovie} movie={movie} key={movie.id} />
          ))
      ) : (
        <p>Начните поиск</p>
      )}
    </div>
  );
};

export default MoviesCardList;
