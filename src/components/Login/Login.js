import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useEffect } from 'react';

const Login = ({ onLogin, isLoading, serverResponseError, resetError }) => {
  useEffect(() => {
    resetError();
  }, []);

  return (
    <AuthWithForm
      title='Рады видеть!'
      onAuth={onLogin}
      isLoading={isLoading}
      text='Ещё не зарегистрированы?'
      linkText='Регистрация'
      buttonText='Войти'
      serverResponseError={serverResponseError}
    ></AuthWithForm>
  );
};

export default Login;
