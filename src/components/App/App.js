import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from 'react-router-dom';
import Main from './../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/AuthAPI';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Profile from './../Profile/Profile';
import { LoggedInContext } from './../../contexts/LoggedInContext';
import { CurrentUserContext } from './../../contexts/CurrentUserContext';
import Preloader from './../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';
import SavedMovies from './../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as mainapi from '../../utils/MainAPI';
import * as moviesapi from '../../utils/MoviesAPI';
import { serverErrorHandler } from '../../utils/errorHandler';

function App() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});

  const [isRenderLoading, setIsRenderLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [serverResponseError, setServerResponseError] = React.useState('');

  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  const history = useHistory();
  const localToken = localStorage.getItem('token');

  const getMoviesfromBeatFilm = () => {
    moviesapi
      .getMovies()
      .then((data) => setMovies(data))
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      });
  };

  const getSavedMovies = () => {
    mainapi
      .getMovies()
      .then((data) => setSavedMovies(data))
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      });
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
      getMoviesfromBeatFilm();
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    auth
      .getMyUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({ email: res.email, name: res.name });
        }
      })
      .catch((err) => {
        console.log(err);
        signOut();
      });
  };
  const resetError = () => {
    setServerResponseError('');
  };

  const handleRegistration = (name, password, email) => {
    setIsRenderLoading(true);
    auth
      .register(name, password, email)
      .then(() => {
        setInfoTooltipData({
          image: 'success',
          message: 'Вы успешно зарегистрировались!',
        });
        setIsInfoTooltipOpen(true);
      })
      .then(() => {
        handleAuthorization(password, email);
      })
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  };

  const handleAuthorization = (password, email) => {
    setIsRenderLoading(true);
    auth
      .authorization(password, email)
      .then((data) => localStorage.setItem('token', data))
      .then(() => auth.getMyUser())
      .then((res) => {
        if (res) {
          setCurrentUser({ email: res.email, name: res.name });
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  };

  const closeAllPopups = () => {
    setIsInfoTooltipOpen(false);
  };

  const closeHamburgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

  const signOut = () => {
    setIsRenderLoading(true);
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('movies');
        localStorage.removeItem('searchQuery');
        localStorage.removeItem('shortsToggled');
        setInfoTooltipData({
          image: 'success',
          message: 'Вы успешно вышли',
        });
        history.push('/signin');
      })
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
        setInfoTooltipData({
          image: 'fail',
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsRenderLoading(false);
      });
  };

  const handleUpdateUserInfo = ({ name, email }) => {
    setIsRenderLoading(true);
    auth
      .updateUserInfo({ name, email })
      .then((res) => {
        setCurrentUser({ email: res.data.email, name: res.data.name });
        setIsRenderLoading(false);
        setInfoTooltipData({
          image: 'success',
          message: 'Профиль успешно обновлен!',
        });
        setIsInfoTooltipOpen(true);
      })
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      })
      .finally(() => setIsRenderLoading(false));
  };

  const handleGoBack = () => {
    if (loggedIn) {
      history.goBack();
    }
  };

  const handleShowBurgerMenu = () => {
    setIsBurgerMenuOpen(true);
  };

  const handleDeleteMovie = (movie) => {
    resetError();
    setIsRenderLoading(true);

    mainapi
      .deleteMovie(movie)
      .then(() => {
        mainapi
          .getMovies()
          .then((data) => setSavedMovies(data))
          .catch((e) => {
            setServerResponseError(serverErrorHandler(e));
          });
        // setSavedMovies((movies) => movies.filter((item) => item !== movie));
      })
      // .then(() => {

      // })
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      })
      .finally(() => setIsRenderLoading(false));
  };

  const handleSaveMovie = (movie) => {
    resetError();
    setIsRenderLoading(true);
    mainapi
      .saveMovie(movie)
      .then(() => {
        mainapi
          .getMovies()
          .then((data) => setSavedMovies(data))
          .catch((e) => {
            setServerResponseError(serverErrorHandler(e));
          });
      })
      .catch((e) => {
        setServerResponseError(serverErrorHandler(e));
      })
      .finally(() => setIsRenderLoading(false));
  };

  return (
    <LoggedInContext.Provider value={localToken}>
      <CurrentUserContext.Provider value={currentUser}>
        {isRenderLoading && <Preloader />}
        <div className='app'>
          <Header
            onOpenMenu={handleShowBurgerMenu}
            onCloseMenu={closeHamburgerMenu}
            isMenuOpen={isBurgerMenuOpen}
            onClosePopup={closeAllPopups}
          />
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <ProtectedRoute
              loggedIn={localToken}
              component={Movies}
              movies={movies}
              getMovies={getMoviesfromBeatFilm}
              onDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              onSaveMovie={handleSaveMovie}
              serverResponseError={serverResponseError}
              resetError={resetError}
              path='/movies'
            ></ProtectedRoute>
            <ProtectedRoute
              loggedIn={localToken}
              path='/profile'
              component={Profile}
              onSignOut={signOut}
              onUpdateUser={handleUpdateUserInfo}
              serverResponseError={serverResponseError}
              resetError={resetError}
            ></ProtectedRoute>
            <ProtectedRoute
              loggedIn={localToken}
              component={SavedMovies}
              onDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              getSavedMovies={getSavedMovies}
              serverResponseError={serverResponseError}
              resetError={resetError}
              // findMovies={findMovies}
              path='/saved-movies'
            ></ProtectedRoute>

            <Route path='/signup/'>
              <Register
                onRegister={handleRegistration}
                isLoading={isRenderLoading}
                serverResponseError={serverResponseError}
                resetError={resetError}
              />
            </Route>
            <Route path='/signin'>
              <Login
                onLogin={handleAuthorization}
                isLoading={isRenderLoading}
                serverResponseError={serverResponseError}
                resetError={resetError}
              />
            </Route>
            <Route path='/404'>
              <NotFound onGoBack={handleGoBack} />
            </Route>
            <Redirect to='/404' />
          </Switch>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            data={infoTooltipData}
            onClose={closeAllPopups}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default withRouter(App);
