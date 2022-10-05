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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/AuthAPI';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Profile from './../Profile/Profile';
import { LoggedInContext } from './../../contexts/LoggedInContext';
import { CurrentUserContext } from './../../contexts/CurrentUserContext';

function App() {
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});

  const [isRenderLoading, setIsRenderLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const history = useHistory();

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
      .then((data) => auth.getMyUser(data))
      .then((res) => {
        if (res) {
          setCurrentUser({ email: res.email, name: res.name });
          setLoggedIn(true);
          history.push('/movies');
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

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
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
      });
  };

  return (
    <Switch>
      <LoggedInContext.Provider value={loggedIn}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className='app'>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/movies'>
              {loggedIn ? <Movies /> : <Redirect to='/' />}
            </Route>
            <Route path='/profile'>
              {loggedIn ? <Profile onSignOut={signOut} /> : <Redirect to='/' />}
            </Route>

            {/* <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
          ><Movies /></ProtectedRoute>

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={signOut}
          ><Profile /></ProtectedRoute> */}

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
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              data={infoTooltipData}
              onClose={closeAllPopups}
            />
          </div>
        </CurrentUserContext.Provider>
      </LoggedInContext.Provider>
    </Switch>
  );
}

export default withRouter(App);
