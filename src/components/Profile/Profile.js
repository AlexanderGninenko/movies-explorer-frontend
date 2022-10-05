import Header from "../Header/Header";
import { useEffect, useState } from 'react';

function Profile({ onSignOut }) {
  const editProfile = () => {};

  const [values, setValues] = useState({});

  useEffect(() => setValues({}), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile">
      <Header />
      <form onSubmit={editProfile} className="profile__form">
        <h1 className="proifle__title">Привет,{}</h1>
        <div className="profile__name">
          <label className="profile__label" htmlFor="name">Имя</label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            value={values.name || ""}
            className="profile__input"
            type="name"
            required
          >{}</input>
        </div>
        <div className="profile__email">
          <label className="profile__label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            className="profile__input"
            type="email"
            required
          >{}</input>
        </div>
        <button className="profile__edit" type="submit">Редактировать</button>
        <button onClick={onSignOut} className="profile__edit" type="button">Выйти из аккаунта</button>
      </form>
    </div>
  );
}

export default Profile;
