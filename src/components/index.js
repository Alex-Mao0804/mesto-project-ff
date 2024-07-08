import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
export { cardTemplate };
import { enableValidation, hideInputError } from "./validation.js";

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
formEditProfile.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", handleFormSubmit);
const cardTemplate = document.querySelector("#card-template").content;

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
  clearValidation(popupTypeEdit, validationConfig);
});

pAddButton.addEventListener("click", (evt) => {
  openModal(popupTypeNewCard);
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
    clearValidation(formNewPlace, validationConfig);
  }
  closeModal(evt.target.closest(".popup_is-opened"));
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

// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//         // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true
//     return !inputElement.validity.valid;
//   })
// };
// const toggleButtonState = (inputList, buttonElement) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//         buttonElement.disabled = true;
//     buttonElement.classList.add('popup__button_inactive');
//   } else {
//         // иначе сделай кнопку активной
//         buttonElement.disabled = false;
//     buttonElement.classList.remove('popup__button_inactive');
//   }
// };
// const isValid = (formElement, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//     // встроенный метод setCustomValidity принимает на вход строку
//     // и заменяет ею стандартное сообщение об ошибке
// inputElement.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы.");
// } else {
//     // если передать пустую строку, то будут доступны
//     // стандартные браузерные сообщения
// inputElement.setCustomValidity("");
// }

//   if (!inputElement.validity.valid) {
//     // showInputError теперь получает параметром форму, в которой
//     // находится проверяемое поле, и само это поле
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     // hideInputError теперь получает параметром форму, в которой
//     // находится проверяемое поле, и само это поле
//     hideInputError(formElement, inputElement);
//   }
// };

// const showInputError = (formElement, inputElement, errorMessage) => {
//   // Находим элемент ошибки внутри самой функции
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   // Остальной код такой же
//   // inputElement.classList.add('form__input-error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('form__input-error');
// };

// const hideInputError = (formElement, inputElement) => {
//   // Находим элемент ошибки
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   // Остальной код такой же
//   // inputElement.classList.remove('form__input-error');
//   errorElement.classList.remove('form__input-error');
//   errorElement.textContent = '';
// };

// const setEventListeners = (formElement) => {
//   // Находим все поля внутри формы,
//   // сделаем из них массив методом Array.from
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');
//       // toggleButtonState(inputList, buttonElement);

//     // Обойдём все элементы полученной коллекции
//     inputList.forEach((inputElement) => {
//       // каждому полю добавим обработчик события input
//       inputElement.addEventListener('input', () => {
//         // Внутри колбэка вызовем isValid,
//         // передав ей форму и проверяемый элемент
//         isValid(formElement, inputElement)
//         toggleButtonState(inputList, buttonElement);
//       });
//       isValid(formElement, inputElement)
//       toggleButtonState(inputList, buttonElement);
//     });
//   };

//   const enableValidation = () => {
//     // Найдём все формы с указанным классом в DOM,
//     // сделаем из них массив методом Array.from
//     const formList = Array.from(document.querySelectorAll('.popup__form'));

//     // Переберём полученную коллекцию
//     formList.forEach((formElement) => {
//       // Для каждой формы вызовем функцию setEventListeners,
//       // передав ей элемент формы
//       setEventListeners(formElement);
//     });
//   };

//   enableValidation();
