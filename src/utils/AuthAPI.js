const BASE_URL = "https://moviessearcher.nomorepartiesxyz.ru/api";
// const BASE_URL = "http://localhost:4010/api";


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (name, password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email }),
  }).then(checkResponse);
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        return data.token;
      }
    });
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
};

export const getMyUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const updateUserInfo = ({name, email}) => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email })
  })
  .then(checkResponse)
};
