import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from './../../Preloader/Preloader';

const MoviesCardList = ({ movies, isRenderLoading, moviesCount }) => {
  return (
    <div className='moviescardlist'>
      {isRenderLoading && <Preloader />}
      {movies.slice(0, moviesCount).map((card) => (
        <MoviesCard
          key={card.id}
          image={`https://api.nomoreparties.co/${card.image.url}`}
          nameRU={card.nameRU}
          duration={card.duration}
        />
      ))}
    </div>
  );
};

export default MoviesCardList;
