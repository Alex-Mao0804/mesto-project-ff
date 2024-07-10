import { cardTemplate } from "./index.js";
export function createCard(card, deleteCard, likeCard, openImg, openDel, myId) {
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
    })
  cardImage.src = card.link;
  cardImage.alt = "Местность " + card.name;
  placesItem.querySelector(".card__title").textContent = card.name;
  cardImage.addEventListener("click", openImg);
  if (card.owner._id === myId) {
    // console.log(card._id);
  buttonDel.addEventListener("click", (evt) => {
    openDel(evt, card._id);
  } );
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
    
  
  fetch('https://nomoreparties.co/v1/wff-cohort-18/cards/likes/' + card._id, {
    method: 'PUT',
    headers: {
      authorization: '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff',
      'Content-Type': 'application/json'
    }
  })

  .then((res) =>  res.json())
  .then((data) => {
    counterLike.textContent = data.likes.length;
  })


} else {

  fetch('https://nomoreparties.co/v1/wff-cohort-18/cards/likes/' + card._id, {
    method: 'DELETE',
    headers: {
      authorization: '50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff',
      'Content-Type': 'application/json'
    }
  })

  .then((res) => res.json())
  .then((data) => {
    counterLike.textContent = data.likes.length;
  })

}
evt.target.classList.toggle("card__like-button_is-active");
}
