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
import { getMovies } from './../../utils/MoviesAPI';

function App() {
  React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});

  const [isRenderLoading, setIsRenderLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [error, setError] = React.useState('');

  const [email, setEmail] = React.useState('');

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  const history = useHistory();
  const localToken = localStorage.getItem('token');

  React.useEffect(() => {
    tokenCheck();

    // if (loggedIn) {
    //   api
    //     .getInitialCards()
    //     .then((cards) => {
    //       setCards(cards.reverse());
    //     })
    //     .catch((err) => console.log(err));

    //   api
    //     .getUserInfo()
    //     .then((user) => {
    //       setCurrentUser(user);
    //     })
    //     .catch((err) => console.log(err));
    // }
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
      .catch((err) => console.log(err));
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
        history.push('/signin');
      })
      .catch((e) => {
        console.log(e);
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
          history.push('/profile');
        }
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipData({
          image: 'fail',
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsInfoTooltipOpen(true);
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
        setInfoTooltipData({
          image: 'success',
          message: 'Вы успешно вышли',
        });
        history.push('/signin');
      })
      .catch((e) => {
        console.log(e);
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
      })
      .catch((err) => {
        setError(err.message);
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

  // getMovies();

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
              path='/movies'
            ></ProtectedRoute>
            <ProtectedRoute
              loggedIn={localToken}
              path='/profile'
              component={Profile}
              onSignOut={signOut}
              onUpdateUser={handleUpdateUserInfo}
              error={error}
            ></ProtectedRoute>
            <ProtectedRoute
              loggedIn={localToken}
              component={SavedMovies}
              path='/saved-movies'
            ></ProtectedRoute>

            <Route path='/signup/'>
              <Register
                onRegister={handleRegistration}
                isLoading={isRenderLoading}
              />
            </Route>
            <Route path='/signin'>
              <Login
                onLogin={handleAuthorization}
                isLoading={isRenderLoading}
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
