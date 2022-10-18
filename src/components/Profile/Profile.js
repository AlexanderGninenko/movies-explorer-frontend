import { useEffect, useContext } from 'react';
import { CurrentUserContext } from './../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function Profile({ onSignOut, onUpdateUser, error }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
              required: 'Введите имя',
              minLength: { value: 2, message: 'Минимум 2 символа' },
              pattern: {
                value: /^[A-Za-zА-Яа-я]+$/,
                message: 'Допустимы только буквы',
              },
            })}
          />
        </div>

        <p
          className={`form__input-error ${
            errors.name && 'form__input-error_active'
          }`}
        >
          {errors?.name?.message}
        </p>

        <div className='profile__block'>
          <label className='profile__label' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            className={`profile__input ${errors.email && 'auth__input-error'}`}
            type='email'
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i,
                message: 'Введите корректный email',
              },
            })}
          />
        </div>
        <p
          className={`form__input-error ${
            errors.email && 'form__input-error_active'
          }`}
        >
          {errors?.email?.message}
        </p>
        <p className={`form__error ${error && 'form__error_active'} `}>
          {error}
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
