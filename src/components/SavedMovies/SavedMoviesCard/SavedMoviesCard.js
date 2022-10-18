import { NavLink } from 'react-router-dom';

const MoviesCard = ({ movie, onDeleteMovie }) => {
  const handleDeleteMovie = (e) => {
    e.preventDefault();
    onDeleteMovie(movie._id);
  };
  return (
    <div className='moviecard'>
      <NavLink to={movie.trailerLink} target='_blank'>
        <img
          src={movie.image}
          alt='Постер фильма'
          className='moviecard__image'
        />
      </NavLink>
      <div className='moviecard__description'>
        <div className='moviecard__title-block'>
          <p className='moviecard__title'>{movie.nameRU}</p>
          <button
            type='checkbox'
            className='savedmoviecard__delete-button'
            onClick={handleDeleteMovie}
          ></button>
        </div>
        <p className='moviecard__duration'>{movie.duration} мин</p>
      </div>
    </div>
  );
};

export default MoviesCard;
