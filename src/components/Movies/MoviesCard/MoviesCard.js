import movieimg from '../../../images/movieimg.svg';

const MoviesCard = () => {
  return (
    <div className='moviecard'>
      <img src={movieimg} alt='Постер фильма' className='moviecard__image' />
      <div className='moviecard__title-block'>
        <p className='moviecard__title'>Название фильма</p>
        <input type='checkbox' className='moviecard__save-input'></input>
      </div>
      <p className='moviecard__duration'>1ч42м</p>
    </div>
  );
};

export default MoviesCard;
