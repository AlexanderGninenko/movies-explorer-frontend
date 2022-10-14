import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function Profile({ onSignOut, onUpdateUser, error }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: { name: currentUser.name, email: currentUser.email },
    mode: 'onChange',
  });

  useEffect(() => {
    reset(currentUser);
  }, [currentUser]);

  function editProfile(data) {
    if (currentUser.name !== data.name || currentUser.email !== data.email) {
      onUpdateUser({
        name: data.name,
        email: data.email,
      });
      setValue('name', data.name);
      setValue('email', data.email);
    }
  }

  return (
    <section className='profile__form'>
      <form
        onSubmit={handleSubmit(editProfile)}
        className='profile__form form'
        noValidate
      >
        <h1 className='proifle__title'>Привет, {currentUser.name}!</h1>
        <div className='profile__block'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            id='name'
            name='name'
            className={`profile__input ${errors.name && 'auth__input-error'}`}
            type='name'
            {...register('name', {
              required: true,
              minLength: 2,
              pattern: /^[A-Za-zА-Яа-я]+$/,
            })}
          />
        </div>
        <div className='profile__block'>
          <label className='profile__label' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            className={`profile__input ${
              (errors.email || error) && 'auth__input-error'
            }`}
            type='email'
            {...register('email', {
              required: true,
              pattern: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i,
            })}
          />
        </div>
        <p
          className={`form__input-error ${
            (errors.name || errors.email || error) && 'form__input-error_active'
          } `}
        >
          {error ? error : 'Что-то пошло не так...'}
        </p>
        <button
          className='profile__button'
          type='submit'
          disabled={!isDirty || !isValid}
        >
          Редактировать
        </button>
        <button
          onClick={onSignOut}
          className='profile__button form__button'
          type='button'
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
