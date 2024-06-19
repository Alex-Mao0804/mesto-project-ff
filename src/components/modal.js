import { closePopupByEsc, closePopupByClk } from "./index.js";

export function openModal(modalSelector) {
  modalSelector.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByClk);
}

export function closeModal(modalSelector) {
  modalSelector.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByClk);
}
