import '../pages/index.css';
import {initialCards} from './cards.js';

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(card, callBackDel) {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const buttonDel = placesItem.querySelector(".card__delete-button");
  placesItem.querySelector(".card__image").src = card.link;
  placesItem.querySelector(".card__image").alt = 'Местность ' + card.name;
  placesItem.querySelector(".card__title").textContent = card.name;

  buttonDel.addEventListener("click", function (evt) {
    callBackDel(evt);
  });

  return placesItem;
}

function callBackDel(evt) {
  evt.target.parentElement.remove();
}

initialCards.forEach(function (card) {
  placesList.append(createCard(card, callBackDel));
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
