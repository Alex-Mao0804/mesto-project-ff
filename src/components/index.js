import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
export { cardTemplate };
import { enableValidation, hideInputError } from "./validation.js";

let myId;
const profileImage = document.querySelector('.profile__image');
const placesList = document.querySelector(".places__list");
const pEditButton = document.querySelector(".profile__edit-button");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formUpdateAvatar = document.forms["update-avatar"];
const popupTypeEdit = document.querySelector(".popup_type_edit");
const pAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
const pDelButton = popupTypeDeleteCard.querySelector(".popup__button");
const formEditProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formNewPlace = document.forms["new-place"];
popupTypeImg.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");
popupTypeDeleteCard.classList.add("popup_is-animated");
formEditProfile.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", handleFormSubmit);
formUpdateAvatar.addEventListener("submit", handleFormSubmit);
const cardTemplate = document.querySelector("#card-template").content;

// function search(entity, entityId) {
//   return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}`)
//   }

function openDel(evt, id) {
  openModal(popupTypeDeleteCard);
  
  const clickHandler = () => {
      fetch('https://nomoreparties.co/v1/wff-cohort-18/cards/' + id, {
          method: 'DELETE',
          headers: {
              authorization: '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff',
              'Content-Type': 'application/json'
          }
      })
      .then(res => {
          if(res.ok) {
              return res.json();
          } else {
              return Promise.reject(res.status);
          }
      })
      .catch(error => {
          console.error('Ошибка удаления карточки:', error);
      })
      .finally(() => {
          pDelButton.removeEventListener("click", clickHandler); // Удаление слушателя после получения ответа от сервера
          deleteCard(evt);
          closeModal(popupTypeDeleteCard);
      });
  };

  pDelButton.addEventListener("click", clickHandler);
}


profileImage.addEventListener("click", (evt) => {
  openModal(popupUpdateAvatar);
});


function openImg(evt) {
  openModal(popupTypeImg);
  popupTypeImg.querySelector(".popup__image").src = evt.target.src;
  popupTypeImg.querySelector(".popup__image").alt = evt.target.alt;
  popupTypeImg.querySelector(".popup__caption").textContent = evt.target.alt;
}

pEditButton.addEventListener("click", (evt) => {
  openModal(popupTypeEdit);
  Promise.all([profileRequest])
  .then(([profileResult]) => {
    formEditProfile.elements.name.value = profileResult.name;
    formEditProfile.elements.description.value = profileResult.about;
  })
  clearValidation(popupTypeEdit, validationConfig);
});

pAddButton.addEventListener("click", (evt) => {
  openModal(popupTypeNewCard);
  clearValidation(formNewPlace, validationConfig);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target === formEditProfile) {
    renderLoading(true, formEditProfile);

  fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formEditProfile.elements.name.value,
      about: formEditProfile.elements.description.value
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
  .then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch(error => {
    console.error('Ошибка изменения профиля:', error);
  })
  .finally (() => {
    renderLoading(false, formEditProfile);
    closeModal(evt.target.closest(".popup_is-opened"));
      });
  } else if (evt.target === formNewPlace) {
    renderLoading(true, formNewPlace);

    fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
      method: 'POST',
      headers: {
        authorization: '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formNewPlace.elements["place-name"].value,
        link: formNewPlace.elements.link.value
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      placesList.prepend(createCard(data, deleteCard, likeCard, openImg, openDel, myId));
    })
    .catch(error => {
      console.error('Ошибка добавления карточки:', error);
    })
      .finally (() => {
      renderLoading(false, formNewPlace);
      closeModal(evt.target.closest(".popup_is-opened"));
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
        });

  } else if (evt.target === formUpdateAvatar) {
    renderLoading(true, formUpdateAvatar);

    fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: formUpdateAvatar.elements.link.value
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      formUpdateAvatar.reset();
    })
    .catch(error => {
      console.error('Ошибка изменения аватара:', error);
    })
    .finally (() => {
      renderLoading(false, formUpdateAvatar);
      closeModal(evt.target.closest(".popup_is-opened"));
      formUpdateAvatar.reset();
      clearValidation(formUpdateAvatar, validationConfig);
        });
    
  }
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

enableValidation(validationConfig);


function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, validationConfig);
    inputElement.setCustomValidity("");
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const profileRequest = fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
  headers: {
    'Authorization': '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff'
  }
}).then(res => res.json());

const cardsRequest = fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
  headers: {
    'Authorization': '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff'
  }
}).then(res => res.json());

Promise.all([profileRequest, cardsRequest])
  .then(([profileResult, cardsResult]) => {
    profileTitle.textContent = profileResult.name;
    profileDescription.textContent = profileResult.about;
    myId = profileResult._id;
    profileImage.style.backgroundImage = `url(${profileResult.avatar})`;
    // console.log(profileResult._id);
    console.log(cardsResult);
    // console.log(myId);
    cardsResult.forEach(card => {
        placesList.append(createCard(card, deleteCard, likeCard, openImg, openDel, myId));
    });
  })
  .catch(error => {
    console.error('Ошибка запроса профиля и карточек:', error);
  });

  function renderLoading(isLoading, form) {
    if (isLoading) {
form.querySelector(validationConfig.submitButtonSelector).textContent = "Сохранение...";
    } else {
form.querySelector(validationConfig.submitButtonSelector).textContent = "Сохранить";
    }
  }
