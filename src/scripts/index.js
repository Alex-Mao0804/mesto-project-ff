import "../pages/index.css";
import { initialCards } from "./cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const pEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const pAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const formEditProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title"); // title
const profileDescription = document.querySelector(".profile__description");
const formNewPlace = document.forms["new-place"];
popupTypeImg.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");

function createCard(card, deleteCard, likeCard, openImg) {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const buttonDel = placesItem.querySelector(".card__delete-button");
  const cardImage = placesItem.querySelector(".card__image");
  const buttonLike = placesItem.querySelector(".card__like-button");
  cardImage.src = card.link;
  cardImage.alt = "Местность " + card.name;
  placesItem.querySelector(".card__title").textContent = card.name;
  cardImage.addEventListener("click", openImg);
  buttonDel.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", likeCard);
  return placesItem;
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function openImg(evt) {
  popupTypeImg.classList.add("popup_is-opened");
  // popupTypeImg.classList.add("popup_is-animated");
  popupTypeImg.querySelector(".popup__image").src = evt.target.src;
  popupTypeImg.querySelector(".popup__image").alt = evt.target.alt;
  popupTypeImg.querySelector(".popup__caption").textContent = evt.target.alt;
  openPopup(evt);
}

initialCards.forEach(function (card) {
  placesList.append(createCard(card, deleteCard, likeCard, openImg));
});

pEditButton.addEventListener("click", (evt) => {
  popupTypeEdit.classList.add("popup_is-opened");
  // popupTypeEdit.classList.add("popup_is-animated");
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  openPopup(evt);
  formEditProfile.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target === formEditProfile) {
    profileTitle.textContent = formEditProfile.elements.name.value;
    profileDescription.textContent = formEditProfile.elements.description.value;
  } else {
    const card = {
      name: formNewPlace.elements["place-name"].value,
      link: formNewPlace.elements.link.value,
    };
    placesList.prepend(createCard(card, deleteCard, likeCard, openImg));
    formNewPlace.reset();
  }
  closePopup(evt);
}

pAddButton.addEventListener("click", (evt) => {
  popupTypeNewCard.classList.add("popup_is-opened");
  // popupTypeNewCard.classList.add("popup_is-animated");
  formNewPlace.addEventListener("submit", handleFormSubmit);
  openPopup(evt);
});

function openPopup(evt) {
  document.addEventListener("keydown", closePopup);
  document.addEventListener("click", closePopup);
}

function closePopup(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__form") ||
    evt.target.classList.contains("popup__close") ||
    evt.key === "Escape"){
    document.removeEventListener("keydown", closePopup);
    document.removeEventListener("click", closePopup);
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
  }
}

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
