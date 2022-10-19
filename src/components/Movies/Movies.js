import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import useWindowDimensions from './../../hooks/useWindowDimensions';
import {
  DESKTOP_WIDTH,
  LARGE_DESKTOP_EXTRA_ROW,
  LARGE_DESKTOP_INITIAL_MOVIES,
  TAB_INITIAL_MOVIES,
  MOBILE_WIDTH,
  MOBILE_EXTRA_ROW,
  MINI_MOBILE_INITIAL_MOVIES,
  MINI_MOBILE_EXTRA_ROW,
  MINI_MOBILE_WIDTH,
  MOBILE_INITIAL_MOVIES,
  SHORT_MOVIE_DURATION,
  TAB_EXTRA_ROW,
  TAB_WIDTH,
} from '../../utils/constants';

function Movies({
  movies,
  savedMovies,
  onDeleteMovie,
  onSaveMovie,
  serverResponseError,
  resetError,
  getMovies,
}) {
  const [foundMovies, setFoundMovies] = useState([]);
  const [localSavedMovies, setLocalSavedMovies] = useState(false);
  const [isShortsToggled, setIsShortsToggled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [moviesCount, setMoviesCount] = useState(0);
  const [extraMoviesCount, setExtraMoviesCount] = useState(0);

  useEffect(() => {
    if (foundMovies.length) {
      localStorage.setItem('movies', JSON.stringify(foundMovies));
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
      localStorage.setItem('shortsToggled', JSON.stringify(isShortsToggled));
      setLocalSavedMovies(true);
      setIsNothingFound(false);
    } else if (!foundMovies.length) {
      if (isSearched) {
        setIsNothingFound(true);
      } else if (localStorage.getItem('movies')) {
        setFoundMovies(JSON.parse(localStorage.getItem('movies')));
        setSearchQuery(JSON.parse(localStorage.getItem('searchQuery')));
        setIsShortsToggled(JSON.parse(localStorage.getItem('shortsToggled')));
        setLocalSavedMovies(true);
      } else setIsNothingFound(false);
    } else setLocalSavedMovies(false);
  }, [foundMovies, isShortsToggled, searchQuery, isSearched]);

  useEffect(() => {
    resetError();
  }, []);

  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width > DESKTOP_WIDTH) {
      setMoviesCount(LARGE_DESKTOP_INITIAL_MOVIES);
      setExtraMoviesCount(LARGE_DESKTOP_EXTRA_ROW);
    } else if (width <= DESKTOP_WIDTH && width > TAB_WIDTH) {
      setMoviesCount(TAB_INITIAL_MOVIES);
      setExtraMoviesCount(TAB_EXTRA_ROW);
    } else if (width <= TAB_WIDTH && width > MOBILE_WIDTH) {
      setMoviesCount(MOBILE_INITIAL_MOVIES);
      setExtraMoviesCount(MOBILE_EXTRA_ROW);
    } else if (width <= MOBILE_WIDTH && width >= MINI_MOBILE_WIDTH) {
      setMoviesCount(MINI_MOBILE_INITIAL_MOVIES);
      setExtraMoviesCount(MINI_MOBILE_EXTRA_ROW);
    }
  }, [width]);

  useEffect(() => {
    console.log(moviesCount, foundMovies.length);
    if (
      foundMovies.length === moviesCount ||
      foundMovies.length < moviesCount
    ) {
      setIsDisabledButton(true);
    } else setIsDisabledButton(false);
  }, [moviesCount, foundMovies.length]);

  const showMore = () => {
    setMoviesCount(moviesCount + extraMoviesCount);
  };

  const findMovies = (value) => {
    resetError();
    setSearchQuery(value);

    if (movies.length) {
      setFoundMovies(
        movies.filter((movie) =>
          isShortsToggled
            ? (movie.nameRU.toLowerCase().includes(value) &&
                movie.duration <= SHORT_MOVIE_DURATION) ||
              (movie.nameEN.toLowerCase().includes(value) &&
                movie.duration <= SHORT_MOVIE_DURATION)
            : movie.nameRU.toLowerCase().includes(value) ||
              movie.nameEN.toLowerCase().includes(value)
        )
      );
      setLocalSavedMovies(true);
      setIsSearched(true);
    } else {
      getMovies();
    }
  };

  const toggleShorts = () => {
    setIsShortsToggled(!isShortsToggled);
  };

  return (
    <section className='movies'>
      <SearchForm
        findMovies={findMovies}
        toggleShorts={toggleShorts}
        isShortsToggled={isShortsToggled}
        searchQuery={searchQuery}
      />

      <MoviesCardList
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        onSaveMovie={onSaveMovie}
        isNothingFound={isNothingFound}
        localSavedMovies={localSavedMovies}
        movies={foundMovies}
        moviesCount={moviesCount}
        serverResponseError={serverResponseError}
        resetError={resetError}
      />
      <button
        className={`movies__more ${
          (isDisabledButton || isNothingFound || !localSavedMovies) &&
          'movies__more_hidden'
        }`}
        onClick={showMore}
      >
        Ещё
      </button>
    </section>
  );
}

export default Movies;
