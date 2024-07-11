const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export const postCardData = (body) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const fetchDeleteCard = (CardId) => {
  return fetch(`${config.baseUrl}/cards/${CardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export const patchProfileData = (body, avatar) => {
  return fetch(`${config.baseUrl}/users/me/` + avatar, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const fetchLikeCard = (fetchMethod, CardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${CardId}`, {
    method: fetchMethod,
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};
