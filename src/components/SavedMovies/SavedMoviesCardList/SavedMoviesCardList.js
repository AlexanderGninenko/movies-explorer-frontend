import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';

const MoviesCardList = ({
  savedMovies,
  onDeleteMovie,
  foundMovies,
  isSearched,
}) => {
  return (
    <div className='moviescardlist'>
      {(isSearched ? foundMovies : savedMovies).map((movie) => (
        <SavedMoviesCard
          onDeleteMovie={onDeleteMovie}
          movie={movie}
          key={movie._id}
        />
      ))}
    </div>
  );
};

export default MoviesCardList;
