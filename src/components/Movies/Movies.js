import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import useWindowDimensions from './../../hooks/useWindowDimensions';

function Movies({ movies, savedMovies, onDeleteMovie, onSaveMovie }) {
  const [foundMovies, setFoundMovies] = useState([]);
  const [localSavedMovies, setLocalSavedMovies] = useState(false);
  const [isShortsToggled, setIsShortsToggled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState('');
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

  const { width } = useWindowDimensions();
  useEffect(() => {
    console.log(width);

    if (width > 1280) {
      setMoviesCount(15);
      setExtraMoviesCount(5);
    } else if (width <= 1280 && width >= 769) {
      setMoviesCount(12);
      setExtraMoviesCount(3);
    } else if (width <= 768 && width >= 481) {
      setMoviesCount(8);
      setExtraMoviesCount(2);
    } else if (width <= 480 && width >= 320) {
      setMoviesCount(5);
      setExtraMoviesCount(2);
    }
  }, [width]);

  const showMore = () => {
    if (foundMovies.length >= moviesCount) {
      setMoviesCount(moviesCount + extraMoviesCount);
      console.log(moviesCount);
    } else setIsDisabledButton(true);
  };

  const findMovies = (value) => {
    setIsDisabledButton(false);
    setSearchQuery(value);
    setFoundMovies(
      movies.filter((movie) =>
        isShortsToggled
          ? (movie.nameRU.includes(value) && movie.duration <= 40) ||
            (movie.nameEN.includes(value) && movie.duration <= 40)
          : movie.nameRU.includes(value) || movie.nameEN.includes(value)
      )
    );
    setLocalSavedMovies(true);
    setIsSearched(true);
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
        error={error}
      />
      <button
        className={`movies__more ${
          (isDisabledButton || isNothingFound) && 'movies__more_hidden'
        }`}
        onClick={showMore}
      >
        Ещё
      </button>
    </section>
  );
}

export default Movies;
