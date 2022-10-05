import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Header from "../Header/Header";

const AuthWithForm = ({
  title,
  isLoading,
  onAuth,
  text,
  linkText,
  buttonText,
  
}) => {
  const location = useLocation();

  const [values, setValues] = useState({});

  useEffect(() => setValues({}), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onAuth(values.name, values.password, values.email);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onAuth(values.password, values.email);
  };

  return (
    <form onSubmit={location.pathname === "/signup" ? handleRegisterSubmit : handleLoginSubmit} className="auth">
      <img className="auth__logo" src={logo} alt="Логотип" />
      <h1 className="auth__title">{title}</h1>
      {location.pathname === "/signup" && (
        <>
          <label className="auth__label" htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            value={values.name || ""}
            className="auth__input"
            type="name"
            required
          />
        </>
      )}
      <label className="auth__label" htmlFor="email">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        onChange={handleChange}
        value={values.email || ""}
        className="auth__input"
        type="email"
        required
      />
      <label className="auth__label" htmlFor="password">
        Пароль
      </label>
      <input
        id="password"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        className="auth__input"
        type="password"
        required
      />
      <button className="auth__button" type="submit" disabled={isLoading}>
        {buttonText}
      </button>
      <span className="auth__sign">
        {text}
        <Link className="auth__sign-in" to="/sign-in">
          {linkText}
        </Link>
      </span>
    </form>
  );
};

export default AuthWithForm;
