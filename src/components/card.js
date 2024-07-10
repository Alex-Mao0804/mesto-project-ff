import { cardTemplate } from "./index.js";
import { fetchLikeCard } from "./api.js";
export function createCard(card, likeCard, openImg, openDel, myId) {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const buttonDel = placesItem.querySelector(".card__delete-button");
  const cardImage = placesItem.querySelector(".card__image");
  const buttonLike = placesItem.querySelector(".card__like-button");
  const counterLike = placesItem.querySelector(".card__like-counter");
  counterLike.textContent = card.likes.length;
  card.likes.forEach((like) => {
    if (like._id === myId) {
      buttonLike.classList.add("card__like-button_is-active");
    }
  });
  cardImage.src = card.link;
  cardImage.alt = "Местность " + card.name;
  placesItem.querySelector(".card__title").textContent = card.name;
  cardImage.addEventListener("click", openImg);
  if (card.owner._id === myId) {
    // console.log(card._id);
    buttonDel.addEventListener("click", (evt) => {
      openDel(evt, card._id);
    });
  } else {
    buttonDel.remove();
  }
  buttonLike.addEventListener("click", (evt) => {
    likeCard(evt, card, counterLike);
  });
  return placesItem;
}
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function likeCard(evt, card, counterLike) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    fetchLikeCard("PUT", card._id)
      .then((data) => {
        counterLike.textContent = data.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка добавления лайка:", error);
      });
  } else {
    fetchLikeCard("DELETE", card._id)
      .then((data) => {
        counterLike.textContent = data.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка удаления лайка:", error);
      });
  }
  evt.target.classList.toggle("card__like-button_is-active");
}
