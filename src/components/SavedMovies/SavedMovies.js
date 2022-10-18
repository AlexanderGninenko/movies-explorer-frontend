import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { useState } from 'react';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [isShortsToggled, setIsShortsToggled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const findMovies = (value = '') => {
    // setSearchQuery(value);
    setFoundMovies(
      savedMovies.filter((movie) =>
        isShortsToggled
          ? (movie.nameRU.includes(value) && movie.duration <= 40) ||
            (movie.nameEN.includes(value) && movie.duration <= 40)
          : movie.nameRU.includes(value) || movie.nameEN.includes(value)
      )
    );
    // setLocalSavedMovies(true);
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
      />
      <SavedMoviesCardList
        isSearched={isSearched}
        foundMovies={foundMovies}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  );
};

export default SavedMovies;
