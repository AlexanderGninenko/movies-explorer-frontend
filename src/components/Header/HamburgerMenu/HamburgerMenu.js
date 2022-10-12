import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const HamburgerMenu = ({ isOpen, onClosePopup, onCloseMenu, onOpenMenu }) => {
  const location = useLocation();
  useEffect(() => onCloseMenu, [location.pathname]);

  return (
    <>
      <button onClick={onOpenMenu} className='hamburger'></button>
      <div
        className={`hamburger__overlay ${
          isOpen && 'hamburger__overlay_opened'
        }`}
      ></div>
      <nav
        className={`hamburger__menu-wrapper ${
          isOpen && 'hamburger__menu-wrapper_opened'
        }`}
      >
        <button
          onClick={onCloseMenu}
          type='button'
          className='hamburger__close-icon'
        ></button>

        <div className='hamburger__menu-list'>
          <NavLink
            activeClassName='hamburger__active-link'
            exact
            to='/'
            className='hamburger__menu-list-item'
          >
            Главная
          </NavLink>
          <NavLink
            activeClassName='hamburger__active-link'
            to='/movies'
            className='hamburger__menu-list-item'
          >
            Фильмы
          </NavLink>
          <NavLink
            activeClassName='hamburger__active-link'
            to='/saved-movies'
            className='hamburger__menu-list-item'
          >
            Сохраненные фильмы
          </NavLink>
          <NavLink
            to='/profile'
            className='navigation__account-block hamburger__menu-list-item'
          >
            Аккаунт
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default HamburgerMenu;
