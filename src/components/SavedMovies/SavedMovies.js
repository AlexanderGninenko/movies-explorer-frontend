import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

const SavedMovies = () => {
  return (
    <section className='movies'>
      <SearchForm />
      <SavedMoviesCardList />
      <button className='movies__more'>Ещё</button>
    </section>
  );
};

export default SavedMovies;
