import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthWithForm = ({ title, onAuth, text, buttonText, children }) => {
  const [values, setValues] = useState({});

  useEffect(() => setValues({}), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(values.password, values.email);
  };

  return (
    <form onSubmit={handleSubmit} className="auth">
      <h1 className="auth__title">{title}</h1>
      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        name="email"
        onChange={handleChange}
        value={values.email || ""}
        className="auth__input"
        type="email"
        required
      />
      <label htmlFor="password">Пароль</label>

      <input
        id="password"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        className="auth__input"
        type="password"
        required
      />
      {children}
      <span className="auth__sign-in">
        {text}
        <Link className="auth__sign-in" to="/sign-in">
          {buttonText}
        </Link>
      </span>
    </form>
  );
};

export default AuthWithForm;
