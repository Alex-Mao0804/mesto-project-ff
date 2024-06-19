import { cardTemplate } from "./index.js";
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(card, deleteCard, likeCard, openImg) {
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
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
