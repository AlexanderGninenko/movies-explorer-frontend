import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useEffect } from 'react';

const Login = ({ onLogin, serverResponseError, resetError }) => {
  useEffect(() => {
    resetError();
  }, []);

  return (
    <AuthWithForm
      title='Рады видеть!'
      onAuth={onLogin}
      text='Ещё не зарегистрированы?'
      linkText='Регистрация'
      buttonText='Войти'
      serverResponseError={serverResponseError}
    ></AuthWithForm>
  );
};

export default Login;
