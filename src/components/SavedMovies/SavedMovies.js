import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

const SavedMovies = () => {
  return (
    <div className='movies'>
      <SearchForm />
      <SavedMoviesCardList />
      <button className='movies__more'>Ещё</button>
    </div>
  );
};

export default SavedMovies;
