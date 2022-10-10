import movieimg from '../../../images/movieimg.svg';

const MoviesCard = () => {
  return (
    <div className='moviecard'>
      <img src={movieimg} alt='Постер фильма' className='moviecard__image' />
      <div className='moviecard__title-block'>
        <p className='moviecard__title'>Название фильма</p>
        <button type='checkbox' className='savedmoviecard__delete-button'></button>
      </div>
      <p className='moviecard__duration'>1ч42м</p>
    </div>
  );
};

export default MoviesCard;
