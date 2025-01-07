import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SavedMoviesSearchForm from './SavedMoviesSearchForm';
import { useEffect } from 'react';

const SavedMovies = ({
  savedMovies,
  onDeleteMovie,
  serverResponseError,
  resetError,
  findSavedMovies,
  foundSavedMovies,
  isSearched,
}) => {
  useEffect(() => {
    resetError();
  }, []);

  return (
    <section className='movies'>
      <SavedMoviesSearchForm findSavedMovies={findSavedMovies} />
      <SavedMoviesCardList
        isSearched={isSearched}
        foundSavedMovies={foundSavedMovies}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        serverResponseError={serverResponseError}
        resetError={resetError}
      />
    </section>
  );
};

export default SavedMovies;
