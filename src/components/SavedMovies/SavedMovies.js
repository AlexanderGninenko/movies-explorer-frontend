import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { SHORT_MOVIE_DURATION } from './../../utils/constants';

const SavedMovies = ({
  savedMovies,
  onDeleteMovie,
  serverResponseError,
  resetError,
  getSavedMovies,
}) => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [isShortsToggled, setIsShortsToggled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    resetError();
  }, []);

  const findMovies = (value = '') => {
    // setSearchQuery(value);
    if (savedMovies.length) {
      setFoundMovies(
        savedMovies.filter((movie) =>
          isShortsToggled
            ? (movie.nameRU.toLowerCase().includes(value) &&
                movie.duration <= SHORT_MOVIE_DURATION) ||
              (movie.nameEN.toLowerCase().includes(value) &&
                movie.duration <= SHORT_MOVIE_DURATION)
            : movie.nameRU.toLowerCase().includes(value) ||
              movie.nameEN.toLowerCase().includes(value)
        )
      );
      // setLocalSavedMovies(true);
      setIsSearched(true);
    } else {
      getSavedMovies();
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
      />
      <SavedMoviesCardList
        isSearched={isSearched}
        foundMovies={foundMovies}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        serverResponseError={serverResponseError}
        resetError={resetError}
      />
    </section>
  );
};

export default SavedMovies;
