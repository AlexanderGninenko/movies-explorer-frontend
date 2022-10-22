import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import useWindowDimensions from './../../hooks/useWindowDimensions';
import {
  LARGE_TAB_INITIAL_MOVIES,
  MINI_TAB_EXTRA_ROW,
  MINI_TAB_INITIAL_MOVIES,
  MINI_TAB_WIDTH,
  DESKTOP_WIDTH,
  LARGE_DESKTOP_EXTRA_ROW,
  LARGE_DESKTOP_INITIAL_MOVIES,
  TAB_INITIAL_MOVIES,
  MINI_MOBILE_INITIAL_MOVIES,
  MINI_MOBILE_EXTRA_ROW,
  MINI_MOBILE_WIDTH,
  TAB_EXTRA_ROW,
  TAB_WIDTH,
  LARGE_TAB_WIDTH,
  LARGE_TAB_EXTRA_ROW,
} from '../../utils/constants';

function Movies({
  foundSavedMovies,
  onDeleteMovie,
  onSaveMovie,
  serverResponseError,
  resetError,
  findMovies,
  foundMovies,
  isSearched,
}) {
  const [moviesCount, setMoviesCount] = useState(0);
  const [extraMoviesCount, setExtraMoviesCount] = useState(0);
  const [localSavedMovies, setLocalSavedMovies] = useState([]);

  useEffect(() => {
    if (foundMovies.length) {
      setLocalSavedMovies(JSON.parse(localStorage.getItem('movies')));
    }
    setLocalSavedMovies([]);
  }, [foundMovies]);
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      setLocalSavedMovies(JSON.parse(localStorage.getItem('movies')));
    }
  }, []);
  useEffect(() => {
    resetError();
  }, []);

  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width > DESKTOP_WIDTH) {
      setMoviesCount(LARGE_DESKTOP_INITIAL_MOVIES);
      setExtraMoviesCount(LARGE_DESKTOP_EXTRA_ROW);
    } else if (width >= LARGE_TAB_WIDTH && width <= DESKTOP_WIDTH) {
      setMoviesCount(LARGE_TAB_INITIAL_MOVIES);
      setExtraMoviesCount(LARGE_TAB_EXTRA_ROW);
    } else if (width >= TAB_WIDTH && width < LARGE_TAB_WIDTH) {
      setMoviesCount(TAB_INITIAL_MOVIES);
      setExtraMoviesCount(TAB_EXTRA_ROW);
    } else if (width >= MINI_TAB_WIDTH && width < TAB_WIDTH) {
      setMoviesCount(MINI_TAB_INITIAL_MOVIES);
      setExtraMoviesCount(MINI_TAB_EXTRA_ROW);
    } else if (width >= MINI_MOBILE_WIDTH && width < MINI_TAB_WIDTH) {
      setMoviesCount(MINI_MOBILE_INITIAL_MOVIES);
      setExtraMoviesCount(MINI_MOBILE_EXTRA_ROW);
    }
  }, [width]);

  const showMore = () => {
    setMoviesCount(moviesCount + extraMoviesCount);
  };

  return (
    <section className='movies'>
      <SearchForm findMovies={findMovies} />

      <MoviesCardList
        foundSavedMovies={foundSavedMovies}
        onDeleteMovie={onDeleteMovie}
        onSaveMovie={onSaveMovie}
        foundMovies={foundMovies}
        moviesCount={moviesCount}
        serverResponseError={serverResponseError}
        resetError={resetError}
        isSearched={isSearched}
        setLocalSavedMovies={setLocalSavedMovies}
      />
      {(foundMovies.length > moviesCount ||
        localSavedMovies.length > moviesCount) && (
        <button className={`movies__more`} onClick={showMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default Movies;
