import { Link, useLocation, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useForm } from 'react-hook-form';

const AuthWithForm = ({
  title,
  onAuth,
  text,
  linkText,
  buttonText,
  serverResponseError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  });
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
      <NavLink className='auth__logo' to='/'>
        <img src={logo} alt='Логотип' />
      </NavLink>
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
            {...register('name', {
              required: 'Введите имя',
              minLength: { value: 2, message: 'Минимум 2 символа' },
              pattern: {
                value: /^[A-Za-zА-Яа-я -]+$/,
                message: 'Допустимы только буквы',
              },
            })}
          />
          <p
            className={`form__input-error ${
              errors.name && 'form__input-error_active'
            }`}
          >
            {errors?.name?.message}
          </p>
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
        {...register('email', {
          required: 'Введите email',
          pattern: {
            value: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i,
            message: 'Введите корректный email',
          },
        })}
      />
      <p
        className={`form__input-error ${
          errors.email && 'form__input-error_active'
        }`}
      >
        {errors?.email?.message}
      </p>
      <label className='auth__label' htmlFor='password'>
        Пароль
      </label>
      <input
        id='password'
        name='password'
        className={`auth__input ${errors.password && 'auth__input-error'} `}
        type='password'
        {...register('password', {
          required: 'Введите пароль',
          minLength: { value: 4, message: 'Минимум 4 символа' },
        })}
      />
      <p
        className={`form__input-error ${
          errors.password && 'form__input-error_active'
        }`}
      >
        {errors?.password?.message}
      </p>
      <p
        className={`form__error ${
          serverResponseError && 'form__error_active'
        } `}
      >
        {serverResponseError}
      </p>
      <button
        className={`auth__button ${
          location.pathname === '/signin' && 'auth__button-signin'
        }`}
        type='submit'
        disabled={!isValid}
      >
        {buttonText}
      </button>
      <span className='auth__sign'>
        {text}
        <Link
          className='auth__sign-in'
          to={location.pathname === '/signup' ? '/signin' : '/signup'}
        >
          {linkText}
        </Link>
      </span>
    </form>
  );
};

export default AuthWithForm;
