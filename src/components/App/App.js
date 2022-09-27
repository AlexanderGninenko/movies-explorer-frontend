import React from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from '../Register/Register';
import Login from '../Login/Login';


function App() {
  return (
    <Switch>
      <div className="app">
        <Header />
        <Main />
        <Route path="/signup/">
            {/* <Register
            //   onRegister={handleRegistration}
            //   isLoading={isRenderLoading}
            /> */}
          </Route>
          <Route path="/signin/">
            {/* <Login
            //   onLogin={handleAuthorization}
            //   isLoading={isRenderLoading}
            /> */}
          </Route>
          <Route path="/movies/">
            
          </Route>
      </div>
    </Switch>
  );
}

export default withRouter(App);
