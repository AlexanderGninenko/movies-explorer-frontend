import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import Preloader from './../../Preloader/Preloader';
import * as mainapi from '../../../utils/MainAPI';
import { useState, useEffect } from 'react';

const MoviesCardList = () => {
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    setIsRenderLoading(true);
    mainapi
      .getMovies()
      .then((data) => setSavedMovies(data))
      .catch((e) => console.log(e))
      .finally(() => setIsRenderLoading(false));
  }, []);

  const handleDeleteMovie = (movie) => {
    setIsRenderLoading(true);
    mainapi
      .deleteMovie(movie._id)
      .then(setSavedMovies((movies) => movies.filter((item) => item !== movie)))
      .catch((e) => console.log(e))
      .finally(() => setIsRenderLoading(false));
  };

  console.log(savedMovies);

  return (
    <div className='moviescardlist'>
      {isRenderLoading && <Preloader />}
      {savedMovies.map((movie) => (
        <SavedMoviesCard
          deleteMovie={handleDeleteMovie}
          movie={movie}
          key={movie._id}
        />
      ))}
      {/* <SavedMoviesCard />
            <SavedMoviesCard />
            <SavedMoviesCard />
            <SavedMoviesCard />
            <SavedMoviesCard />
            <SavedMoviesCard />
            <SavedMoviesCard />
            <SavedMoviesCard /> */}
    </div>
  );
};

export default MoviesCardList;
