import { React, useContext } from 'react';
import logo from '../../images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { LoggedInContext } from './../../contexts/LoggedInContext';

function Header({ onOpenMenu, isMenuOpen, onCloseMenu, onClosePopup }) {
  const loggedIn = useContext(LoggedInContext);
  const location = useLocation();
  return (
    <header
      className={`header ${loggedIn && 'header_light-theme'} ${
        location.pathname === '/signup' && 'hidden'
      } ${location.pathname === '/signin' && 'hidden'}
      ${location.pathname === '/404' && 'hidden'}`}
    >
      <NavLink className='header__logo' to='/'>
        <img src={logo} alt='Логотип'></img>
      </NavLink>
      <Navigation
        loggedIn={loggedIn}
        isBurgerMenuOpen={isMenuOpen}
        onOpenMenu={onOpenMenu}
        onClose={onClosePopup}
        onCloseMenu={onCloseMenu}
      />
    </header>
  );
}

export default Header;
