export function openModal(modalSelector) {
  modalSelector.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByClk);
  modalSelector.querySelector(".popup__form").setAttribute('novalidate', '');
}

export function closeModal(modalSelector) {
  modalSelector.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByClk);
}

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const closePopupByClk = (evt) => {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};
