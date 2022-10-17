const MoviesCard = ({ movie, deleteMovie }) => {
  const handleDeleteMovie = (e) => {
    e.preventDefault();
    deleteMovie(movie);
  };
  return (
    <div className='moviecard'>
      <img src={movie.image} alt='Постер фильма' className='moviecard__image' />
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
