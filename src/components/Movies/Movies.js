import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import * as moviesapi from '../../utils/MoviesAPI';
import { useState, useEffect } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  const [moviesCount, setMoviesCount] = useState(95);

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    setIsRenderLoading(true);
    moviesapi
      .getMovies()
      .then((data) => setMovies(data))
      .catch((e) => console.log(e))
      .finally(() => {
        setIsRenderLoading(false);
      });
  }, []);

  const showMore = () => {
    if (movies.length !== moviesCount) {
      setMoviesCount(moviesCount + 5);
      console.log(moviesCount);
    } else setIsDisabledButton(true);
  };

  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList
        movies={movies}
        isRenderLoading={isRenderLoading}
        moviesCount={moviesCount}
      />
      <button
        className={`movies__more ${isDisabledButton && 'movies__more_hidden'}`}
        onClick={showMore}
      >
        Ещё
      </button>
    </section>
  );
}

export default Movies;
