import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
// export { cardTemplate };
import { enableValidation, clearValidation } from "./validation.js";
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
formEditProfile.addEventListener("submit", handleEditProfile);
formNewPlace.addEventListener("submit", handleNewPlace);
formUpdateAvatar.addEventListener("submit", handleUpdateAvatar);
pDelButton.addEventListener("click", handleSubmitConfirmPopupForm);

// Элементы модального окна
const elementsImg = popupTypeImg.querySelector(".popup__image");

const cardTemplate = document.querySelector("#card-template").content;

let handleSubmitConfirmPopup;
function handleSubmitConfirmPopupForm() {
  handleSubmitConfirmPopup();
}

function openDel(evt, CardId) {
  handleSubmitConfirmPopup = () => {
    fetchDeleteCard(CardId)
      .then(() => {
        deleteCard(evt);
        closeModal(popupTypeDeleteCard);
      })
      .catch((error) => {
        console.error("Ошибка удаления карточки:", error);
      });
  };
  openModal(popupTypeDeleteCard);
}

profileImage.addEventListener("click", () => {
  formUpdateAvatar.reset();
  clearValidation(popupUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

function openImg(card) {
  openModal(popupTypeImg);
  elementsImg.src = card.link;
  elementsImg.alt = "Местность " + card.name;
  popupTypeImg.querySelector(".popup__caption").textContent = card.name;
}

pEditButton.addEventListener("click", () => {
  formEditProfile.reset();
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;

  clearValidation(popupTypeEdit, validationConfig);

  openModal(popupTypeEdit);
});

pAddButton.addEventListener("click", (evt) => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupTypeNewCard);
});

function handleEditProfile(evt) {
  evt.preventDefault();

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
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error("Ошибка изменения профиля:", error);
    })
    .finally(() => {
      renderLoading(false, formEditProfile);
    });
}

function handleNewPlace(evt) {
  evt.preventDefault();

  renderLoading(true, formNewPlace);
  postCardData({
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.elements.link.value,
  })
    .then((data) => {
      placesList.prepend(
        createCard(data, likeCard, openImg, openDel, myId, cardTemplate)
      );
      closeModal(popupTypeNewCard);
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
    })
    .catch((error) => {
      console.error("Ошибка добавления карточки:", error);
    })
    .finally(() => {
      renderLoading(false, formNewPlace);
    });
}

function handleUpdateAvatar(evt) {
  evt.preventDefault();

  renderLoading(true, formUpdateAvatar);
  patchProfileData({ avatar: formUpdateAvatar.elements.link.value }, "avatar")
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupUpdateAvatar);
      formUpdateAvatar.reset();
      clearValidation(formUpdateAvatar, validationConfig);
    })
    .catch((error) => {
      console.error("Ошибка изменения аватара:", error);
    })
    .finally(() => {
      renderLoading(false, formUpdateAvatar);
    });
}

enableValidation(validationConfig);

Promise.all([getInitialProfile(), getInitialCards()])
  .then(([profileResult, cardsResult]) => {
    profileTitle.textContent = profileResult.name;
    profileDescription.textContent = profileResult.about;
    myId = profileResult._id;
    profileImage.style.backgroundImage = `url(${profileResult.avatar})`;
    cardsResult.forEach((card) => {
      placesList.append(
        createCard(card, likeCard, openImg, openDel, myId, cardTemplate)
      );
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
