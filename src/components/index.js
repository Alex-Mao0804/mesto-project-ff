import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
export { cardTemplate };
import { enableValidation, hideInputError } from "./validation.js";
import {
  getInitialCards,
  getInitialProfile,
  postCardData,
  patchProfileData,
  fetchDeleteCard,
} from "./api.js";


let myId;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Профиль
const pEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Аватар
const profileImage = document.querySelector(".profile__image");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formUpdateAvatar = document.forms["update-avatar"];

// Карточки
const placesList = document.querySelector(".places__list");
const pAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
const pDelButton = popupTypeDeleteCard.querySelector(".popup__button");
const formNewPlace = document.forms["new-place"];

// КарточкА
const popupTypeImg = document.querySelector(".popup_type_image");

// Слушатели submit и стили
popupTypeImg.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");
popupTypeDeleteCard.classList.add("popup_is-animated");
popupUpdateAvatar.classList.add("popup_is-animated");
formEditProfile.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", handleFormSubmit);
formUpdateAvatar.addEventListener("submit", handleFormSubmit);

const cardTemplate = document.querySelector("#card-template").content;

function openDel(evt, CardId) {
  openModal(popupTypeDeleteCard);

  const clickHandler = () => {
    fetchDeleteCard(CardId)
      .catch((error) => {
        console.error("Ошибка удаления карточки:", error);
      })
      .finally(() => {
        pDelButton.removeEventListener("click", clickHandler);
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
  getInitialProfile()
    .then((profileResult) => {
      formEditProfile.elements.name.value = profileResult.name;
      formEditProfile.elements.description.value = profileResult.about;
    })
    .catch((error) => {
      console.error("Ошибка получения профиля:", error);
    })
    .finally(() => {
      openModal(popupTypeEdit);
    });
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
    patchProfileData(
      {
        name: formEditProfile.elements.name.value,
        about: formEditProfile.elements.description.value,
      },
      ""
    )
      .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
      })
      .catch((error) => {
        console.error("Ошибка изменения профиля:", error);
      })
      .finally(() => {
        renderLoading(false, formEditProfile);
        closeModal(evt.target.closest(".popup_is-opened"));
      });
  } else if (evt.target === formNewPlace) {
    renderLoading(true, formNewPlace);
    postCardData({
      name: formNewPlace.elements["place-name"].value,
      link: formNewPlace.elements.link.value,
    })
      .then((data) => {
        placesList.prepend(createCard(data, likeCard, openImg, openDel, myId));
      })
      .catch((error) => {
        console.error("Ошибка добавления карточки:", error);
      })
      .finally(() => {
        renderLoading(false, formNewPlace);
        closeModal(evt.target.closest(".popup_is-opened"));
        formNewPlace.reset();
        clearValidation(formNewPlace, validationConfig);
      });
  } else if (evt.target === formUpdateAvatar) {
    renderLoading(true, formUpdateAvatar);
    patchProfileData({ avatar: formUpdateAvatar.elements.link.value }, "avatar")
      .then((data) => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        formUpdateAvatar.reset();
      })
      .catch((error) => {
        console.error("Ошибка изменения аватара:", error);
      })
      .finally(() => {
        renderLoading(false, formUpdateAvatar);
        closeModal(evt.target.closest(".popup_is-opened"));
        formUpdateAvatar.reset();
        clearValidation(formUpdateAvatar, validationConfig);
      });
  }
}



enableValidation(validationConfig);

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
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

Promise.all([getInitialProfile(), getInitialCards()])
  .then(([profileResult, cardsResult]) => {
    profileTitle.textContent = profileResult.name;
    profileDescription.textContent = profileResult.about;
    myId = profileResult._id;
    profileImage.style.backgroundImage = `url(${profileResult.avatar})`;
    cardsResult.forEach((card) => {
      placesList.append(createCard(card, likeCard, openImg, openDel, myId));
    });
  })
  .catch((error) => {
    console.error("Ошибка запроса профиля и карточек:", error);
  });

function renderLoading(isLoading, form) {
  if (isLoading) {
    form.querySelector(validationConfig.submitButtonSelector).textContent =
      "Сохранение...";
  } else {
    form.querySelector(validationConfig.submitButtonSelector).textContent =
      "Сохранить";
  }
}
