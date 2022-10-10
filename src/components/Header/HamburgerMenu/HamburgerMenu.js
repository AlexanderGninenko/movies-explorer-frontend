import { NavLink } from 'react-router-dom';

const HamburgerMenu = ({ isOpen, onClose, onOpenMenu }) => {
  return (
    <>
      <button onClick={onOpenMenu} className='hamburger'></button>
      <nav className={`hamburger__menu ${isOpen && 'hamburger__menu_opened'}`}>
        <button
          onClick={onClose}
          type='button'
          className='hamburger__close-icon'
        ></button>
        <div className='hamburger__menu-wrapper'>
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
        </div>
      </nav>
    </>
  );
};

export default HamburgerMenu;
