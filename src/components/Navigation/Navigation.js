import { Link } from 'react-router-dom';

function Navigation({ loggedIn }) {
  return (
    <nav className='navigation'>
      
      {loggedIn ? (
        <div className='navigation__loggedin'>
          <div className='navigation__movies-block'>
            <Link className='navigation__movies' to='/movies'>
              Фильмы
            </Link>
            <Link className='navigation__saved-movies' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
          </div>
          <div className='navigation__account-block'>
            <Link className='navigation__profile-link' to='/profile'>
              Аккаунт
            </Link>
          </div>

        </div>
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
