export function openModal(modalSelector) {
  modalSelector.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModal);
  document.addEventListener("click", closeModal); 
}

export function closeModal(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__form") ||
    evt.target.classList.contains("popup__close") ||
    evt.key === "Escape"
  ) {
    document.removeEventListener("keydown", closeModal);
    document.removeEventListener("click", closeModal);
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
  }
}
