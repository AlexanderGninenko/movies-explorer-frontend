import { React, useContext } from 'react';
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { LoggedInContext } from './../../contexts/LoggedInContext';


function Header() {
  const loggedIn = useContext(LoggedInContext);
  const location = useLocation();
  console.log(loggedIn)
  return (
    <header
      className={`header ${loggedIn ? "header_light-theme" : ""} ${
        location.pathname === "/signup" ? "header_hidden" : ""
      } ${location.pathname === "/signin" ? "header_hidden" : ""}`}
    >
      <img className="header__logo" src={logo} alt="Логотип"></img>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
