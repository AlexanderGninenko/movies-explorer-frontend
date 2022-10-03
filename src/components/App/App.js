import React from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from "../../utils/AuthAPI";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});

  const [isRenderLoading, setIsRenderLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const history = useHistory();

  const handleRegistration = (name, password, email) => {
    setIsRenderLoading(true);
    auth
      .register(name, password, email)
      .then(() => {
        setInfoTooltipData({
          image: "success",
          message: "Вы успешно зарегистрировались!",
        });
        history.push("/signin");
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipData({
          image: "fail",
          message: "Что-то пошло не так! Попробуйте ещё раз.",
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
          setEmail(res.data.email);
          setLoggedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipData({
          image: "fail",
          message: "Что-то пошло не так! Попробуйте ещё раз.",
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


  return (
    <Switch>
      <div className="app">
        <Route
            exact
            path="/">
            <Main loggedIn={loggedIn} />
            </Route>
            
        <Route path="/signup/">
            <Register
              onRegister={handleRegistration}
              isLoading={isRenderLoading}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleAuthorization}
              isLoading={isRenderLoading}
            />
          </Route>
          <Route path="/movies/">

          </Route>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            data={infoTooltipData}
            onClose={closeAllPopups}
          />
      </div>
    </Switch>
  );
}

export default withRouter(App);