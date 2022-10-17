const MoviesCard = ({ movie, saveMovie }) => {
  const handleSaveMovie = () => {
    saveMovie(movie);
  };
  return (
    <div className='moviecard'>
      <img
        src={`https://api.nomoreparties.co/${movie.image.url}`}
        alt='Постер фильма'
        className='moviecard__image'
      />
      <div className='moviecard__description'>
        <div className='moviecard__title-block'>
          <p className='moviecard__title'>{movie.nameRU}</p>
          <input
            onClick={handleSaveMovie}
            type='checkbox'
            className='moviecard__save-input'
          ></input>
        </div>
        <p className='moviecard__duration'>{movie.duration} мин</p>
      </div>
    </div>
  );
};
export default MoviesCard;
