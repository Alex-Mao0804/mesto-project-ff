import "../pages/index.css";
import { initialCards, createCard, deleteCard, likeCard } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const placesList = document.querySelector(".places__list");
const pEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const pAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const formEditProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
const formNewPlace = document.forms["new-place"];
popupTypeImg.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");

initialCards.forEach(function (card) {
  placesList.append(createCard(card, deleteCard, likeCard, openImg));
});

function openImg(evt) {
  openModal(popupTypeImg);
  popupTypeImg.querySelector(".popup__image").src = evt.target.src;
  popupTypeImg.querySelector(".popup__image").alt = evt.target.alt;
  popupTypeImg.querySelector(".popup__caption").textContent = evt.target.alt;
}

pEditButton.addEventListener("click", (evt) => {
  openModal(popupTypeEdit);
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  formEditProfile.addEventListener("submit", handleFormSubmit);
});

pAddButton.addEventListener("click", (evt) => {
  openModal(popupTypeNewCard);
  formNewPlace.addEventListener("submit", handleFormSubmit);
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
  closeModal(evt);
}
