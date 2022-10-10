import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies () {
    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList />
            <button className='movies__more'>Ещё</button>
        </div>
    )
}

export default Movies;