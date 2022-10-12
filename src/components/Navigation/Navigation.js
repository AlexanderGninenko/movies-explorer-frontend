import { Link, NavLink } from 'react-router-dom';
import HamburgerMenu from '../Header/HamburgerMenu/HamburgerMenu';
import { useLocation } from 'react-router-dom';

function Navigation({
  loggedIn,
  isBurgerMenuOpen,
  onOpenMenu,
  onClosePopup,
  onCloseMenu,
}) {
  const location = useLocation();
  return (
    <nav className='navigation'>
      {loggedIn ? (
        <>
          <HamburgerMenu
            isOpen={isBurgerMenuOpen}
            onOpenMenu={onOpenMenu}
            onCloseMenu={onCloseMenu}
            onClosePopup={onClosePopup}
          />
          <div className='navigation__loggedin'>
            <div className='navigation__movies-block'>
              <NavLink
                className={`navigation__movies ${
                  location.pathname === '/' && 'navigation__movies_light-theme'
                }`}
                activeClassName='active-link'
                to='/movies'
              >
                Фильмы
              </NavLink>
              <NavLink
                className={`navigation__saved-movies ${
                  location.pathname === '/' && 'navigation__movies_light-theme'
                }`}
                activeClassName='active-link'
                to='/saved-movies'
              >
                Сохраненные фильмы
              </NavLink>
            </div>
            <div className='navigation__account-block'>
              <NavLink
                className='navigation__profile-link'
                activeClassName='active-link'
                to='/profile'
              >
                Аккаунт
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <div className='navigation__not-loggedin'>
          <Link className='navigation__register' to='/signup'>
            Регистрация
          </Link>
          <Link className='navigation__login' to='/signin'>
            Войти
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
