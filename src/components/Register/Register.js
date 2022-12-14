import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useEffect } from 'react';

const Register = ({ onRegister, serverResponseError, resetError }) => {
  useEffect(() => {
    resetError();
  }, []);
  return (
    <AuthWithForm
      title='Добро пожаловать!'
      onAuth={onRegister}
      text='Уже зарегистрированы?'
      linkText='Войти'
      buttonText='Зарегистрироваться'
      serverResponseError={serverResponseError}
    ></AuthWithForm>
  );
};

export default Register;
