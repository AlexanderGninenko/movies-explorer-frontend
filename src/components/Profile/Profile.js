import Header from '../Header/Header';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './../../contexts/CurrentUserContext';

function Profile({ onSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({});

  useEffect(
    () => setValues({ name: currentUser.name, email: currentUser.email }),
    [currentUser]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function editProfile(e) {
    e.preventDefault();
    if (
      currentUser.name !== values.name ||
      currentUser.email !== values.email
    ) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
    }
  }

  return (
    <>
      <Header />

      <form onSubmit={editProfile} className='profile'>
        <h1 className='proifle__title'>Привет, {currentUser.name}!</h1>
        <div className='profile__block'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            id='name'
            name='name'
            onChange={handleChange}
            value={values.name || ''}
            className='profile__input'
            type='name'
            required
          ></input>
        </div>
        <div className='profile__block'>
          <label className='profile__label' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            onChange={handleChange}
            value={values.email || ''}
            className='profile__input'
            type='email'
            required
          ></input>
        </div>
        <button className='profile__button' type='submit'>
          Редактировать
        </button>
        <button onClick={onSignOut} className='profile__button' type='button'>
          Выйти из аккаунта
        </button>
      </form>
    </>
  );
}

export default Profile;
