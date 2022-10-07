import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useEffect } from 'react';

const AuthWithForm = ({
  title,
  isLoading,
  onAuth,
  text,
  linkText,
  buttonText,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();

  const handleRegisterSubmit = (data) => {
    onAuth(data.name, data.password, data.email);
  };

  const handleLoginSubmit = (data) => {
    onAuth(data.password, data.email);
  };

  return (
    <form
      onSubmit={handleSubmit(
        location.pathname === '/signup'
          ? handleRegisterSubmit
          : handleLoginSubmit
  )}
      className='auth__form'
      noValidate
    >
      <img className='auth__logo' src={logo} alt='Логотип' />
      <h1 className='auth__title'>{title}</h1>
      {location.pathname === '/signup' && (
        <>
          <label className='auth__label' htmlFor='name'>
            Имя
          </label>
          <input
            id='name'
            name='name'
            className={`auth__input ${errors.name && 'auth__input-error'} `}
            type='name'
            {...register("name", {required: true, minLength : 2, pattern: /^[A-Za-zА-Яа-я]+$/})}
          />
          <p className={`form__input-error ${errors.name && 'form__input-error_active'} `}>Минимум 2 буквы</p>
        </>
      )}
      <label className='auth__label' htmlFor='email'>
        E-mail
      </label>
      <input
        id='email'
        name='email'
        className={`auth__input ${errors.email && 'auth__input-error'} `}
        type='email'
        {...register("email", { required: true, pattern: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i})}
      />
          {errors.email && <p className='form__input-error'>Введите корректный email</p>}
      <label className='auth__label' htmlFor='password'>
        Пароль
      </label>
      <input
        id='password'
        name='password'
        className={`auth__input ${errors.password && 'auth__input-error'} `}
        type='password'
        {...register("password", { required: true, minLength:4})}
      />
          {errors.password && <p className='form__input-error'>Минимум 4 знака</p>}
      <button
        className='auth__button form__button'
        type='submit'
        disabled={isLoading}
      >
        {buttonText}
      </button>
      <span className='auth__sign'>
        {text}
        <Link className='auth__sign-in' to={location.pathname === '/signup' ? '/signin' : '/signup'}>
          {linkText}
        </Link>
      </span>
    </form>
  );
};

export default AuthWithForm;
