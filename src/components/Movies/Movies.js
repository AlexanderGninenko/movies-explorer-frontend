import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import * as moviesapi from '../../utils/MoviesAPI';
import * as mainapi from '../../utils/MainAPI';
import { useState, useEffect } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [localSavedMovies, setLocalSavedMovies] = useState(false);
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  const [moviesCount, setMoviesCount] = useState(5);
  const [isShortsToggled, setIsShortsToggled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    if (foundMovies.length) {
      localStorage.setItem('movies', JSON.stringify(foundMovies));
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
      localStorage.setItem('shortsToggled', JSON.stringify(isShortsToggled));
      setLocalSavedMovies(true);
      setIsNothingFound(false);
    } else if (!foundMovies.length) {
      if (isSearched) {
        setIsNothingFound(true);
      } else if (localStorage.getItem('movies')) {
        setFoundMovies(JSON.parse(localStorage.getItem('movies')));
        setSearchQuery(JSON.parse(localStorage.getItem('searchQuery')));
        setIsShortsToggled(JSON.parse(localStorage.getItem('shortsToggled')));
        setLocalSavedMovies(true);
      } else setIsNothingFound(true);
    } else setLocalSavedMovies(false);
  }, [foundMovies, isShortsToggled, searchQuery, isSearched]);

  const max_width = 1280;
  const medium_width = 768;
  const min_width = 480;

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      console.log(windowSize);
    }
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const showMore = () => {
    if (foundMovies.length >= moviesCount) {
      setMoviesCount(moviesCount + 5);
      console.log(moviesCount);
    } else setIsDisabledButton(true);
  };

  const findMovies = (value) => {
    setIsRenderLoading(true);
    setSearchQuery(value);
    moviesapi
      .getMovies()
      .then((data) => {
        setFoundMovies(
          data.filter((movie) =>
            isShortsToggled
              ? (movie.nameRU.includes(value) && movie.duration <= 40) ||
                (movie.nameEN.includes(value) && movie.duration <= 40)
              : movie.nameRU.includes(value) || movie.nameEN.includes(value)
          )
        );
      })
      .catch((e) => setError(e))
      .finally(() => {
        setIsRenderLoading(false);
      });
    setLocalSavedMovies(true);
    setIsSearched(true);
  };

  const toggleShorts = () => {
    setIsShortsToggled(!isShortsToggled);
  };

  const saveMovie = (movie) => {
    mainapi
      .saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className='movies'>
      <SearchForm
        findMovies={findMovies}
        toggleShorts={toggleShorts}
        isShortsToggled={isShortsToggled}
        searchQuery={searchQuery}
      />

      <MoviesCardList
        saveMovie={saveMovie}
        isNothingFound={isNothingFound}
        localSavedMovies={localSavedMovies}
        movies={foundMovies}
        isRenderLoading={isRenderLoading}
        moviesCount={moviesCount}
        error={error}
      />
      <button
        className={`movies__more ${isDisabledButton && 'movies__more_hidden'}`}
        onClick={showMore}
      >
        Ещё
      </button>
    </section>
  );
}

export default Movies;
