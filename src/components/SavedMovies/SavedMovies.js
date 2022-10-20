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
  // findMovies,
}) => {
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [isShortsToggled, setIsShortsToggled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    resetError();
  }, []);

  const findMovies = (value = '') => {
    if (savedMovies.length) {
      setFoundSavedMovies(
        savedMovies.filter((movie) =>
          isShortsToggled
            ? (movie.nameRU.toLowerCase().includes(value.toLowerCase()) &&
                movie.duration <= SHORT_MOVIE_DURATION) ||
              (movie.nameEN.toLowerCase().includes(value.toLowerCase()) &&
                movie.duration <= SHORT_MOVIE_DURATION)
            : movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(value.toLowerCase())
        )
      );
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
        foundSavedMovies={foundSavedMovies}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        serverResponseError={serverResponseError}
        resetError={resetError}
        getSavedMovies={getSavedMovies}
      />
    </section>
  );
};

export default SavedMovies;
