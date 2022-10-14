const MoviesCard = ({ image, nameRU, duration }) => {
  return (
    <div className='moviecard'>
      <img src={image} alt='Постер фильма' className='moviecard__image' />
      <div className='moviecard__description'>
        <div className='moviecard__title-block'>
          <p className='moviecard__title'>{nameRU}</p>
          <input type='checkbox' className='moviecard__save-input'></input>
        </div>
        <p className='moviecard__duration'>{duration} мин</p>
      </div>
    </div>
  );
};

export default MoviesCard;
