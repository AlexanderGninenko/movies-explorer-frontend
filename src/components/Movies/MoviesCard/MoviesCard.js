import { NavLink } from 'react-router-dom';

const MoviesCard = ({ movie, onSaveMovie, savedMovies, onDeleteMovie }) => {
  const handleSaveMovie = () => {
    onSaveMovie(movie);
  };

  const handleDeleteMovie = () => {
    const movieToDelete = savedMovies.find((i) => i.movieId === movie.id);
    onDeleteMovie(movieToDelete._id);
  };

  const isSaved = savedMovies.some((i) => i.movieId === movie.id);

  return (
    <div className='moviecard'>
      <NavLink to={movie.trailerLink} target='_blank'>
        <img
          src={`https://api.nomoreparties.co/${movie.image.url}`}
          alt='Постер фильма'
          className='moviecard__image'
        />
      </NavLink>
      <div className='moviecard__description'>
        <div className='moviecard__title-block'>
          <p className='moviecard__title'>{movie.nameRU}</p>
          <input
            onClick={isSaved ? handleDeleteMovie : handleSaveMovie}
            type='checkbox'
            className='moviecard__save-input'
            checked={isSaved}
            readOnly
          ></input>
        </div>
        <p className='moviecard__duration'>{movie.duration} мин</p>
      </div>
    </div>
  );
};
export default MoviesCard;
