import { Link } from "react-router-dom";


function Navigation({ loggedIn }) {

  return (
    <nav className="navigation">
      {loggedIn ? (
        <div className="navigation__movies-block">
        <Link className="navigation__movies" to="/movies">
            Фильмы
        </Link>
        <Link className="navigation__saved-movies" to="/saved-movies">
            Сохраненные фильмы
        </Link>
        <Link className="navigation__profile-link" to="/profile">
            Аккаунт
        </Link>
        </div>
      ) : (
        <div className="navigation__auth">
          <Link className="navigation__register" to="/signup">
            Регистрация
        </Link>
        <Link className="navigation__login" to="/signin">
            Войти
        </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
