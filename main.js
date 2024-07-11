(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}var n=function(n,r){return fetch("".concat(e.baseUrl,"/users/me/")+r,{method:"PATCH",headers:e.headers,body:JSON.stringify(n)}).then((function(e){return t(e)}))},r=function(n,r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:n,headers:e.headers}).then((function(e){return t(e)}))};function o(e,t,n,r,o,c){var a=c.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__image"),s=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-counter");return l.textContent=e.likes.length,e.likes.forEach((function(e){e._id===o&&s.classList.add("card__like-button_is-active")})),u.src=e.link,u.alt="Местность "+e.name,a.querySelector(".card__title").textContent=e.name,u.addEventListener("click",(function(){n(e)})),e.owner._id===o?i.addEventListener("click",(function(t){r(t,e._id)})):i.remove(),s.addEventListener("click",(function(n){t(n,e,l)})),a}function c(e,t,n){e.target.classList.contains("card__like-button_is-active")?r("DELETE",t._id).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка удаления лайка:",e)})):r("PUT",t._id).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка добавления лайка:",e)}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s),document.addEventListener("click",l)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s),document.removeEventListener("click",l)}var u,s=function(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))},l=function(e){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&i(document.querySelector(".popup_is-opened"))};function d(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.remove(n.inputErrorClass),r.textContent=""}function p(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t),n.setCustomValidity("")})),p(r,t)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),h=document.forms["edit-profile"],b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),L=document.querySelector(".profile__image"),g=document.querySelector(".popup_type_update-avatar"),k=document.forms["update-avatar"],q=document.querySelector(".places__list"),E=document.querySelector(".profile__add-button"),C=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_delete-card"),A=x.querySelector(".popup__button"),w=document.forms["new-place"],U=document.querySelector(".popup_type_image");U.classList.add("popup_is-animated"),v.classList.add("popup_is-animated"),C.classList.add("popup_is-animated"),x.classList.add("popup_is-animated"),g.classList.add("popup_is-animated"),h.addEventListener("submit",(function(e){e.preventDefault(),I(!0,h),n({name:h.elements.name.value,about:h.elements.description.value},"").then((function(e){b.textContent=e.name,S.textContent=e.about,i(v)})).catch((function(e){console.error("Ошибка изменения профиля:",e)})).finally((function(){I(!1,h)}))})),w.addEventListener("submit",(function(n){var r;n.preventDefault(),I(!0,w),(r={name:w.elements["place-name"].value,link:w.elements.link.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))).then((function(e){q.prepend(o(e,c,D,O,u,T)),i(C),w.reset(),f(w,_)})).catch((function(e){console.error("Ошибка добавления карточки:",e)})).finally((function(){I(!1,w)}))})),k.addEventListener("submit",(function(e){e.preventDefault(),I(!0,k),n({avatar:k.elements.link.value},"avatar").then((function(e){L.style.backgroundImage="url(".concat(e.avatar,")"),i(g),k.reset(),f(k,_)})).catch((function(e){console.error("Ошибка изменения аватара:",e)})).finally((function(){I(!1,k)}))})),A.addEventListener("click",(function(){j()}));var j,B=U.querySelector(".popup__image"),T=document.querySelector("#card-template").content;function O(n,r){j=function(){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(r).then((function(){!function(e){e.target.closest(".places__item").remove()}(n),i(x)})).catch((function(e){console.error("Ошибка удаления карточки:",e)}))},a(x)}function D(e){a(U),B.src=e.link,B.alt="Местность "+e.name,U.querySelector(".popup__caption").textContent=e.name}function I(e,t){t.querySelector(_.submitButtonSelector).textContent=e?"Сохранение...":"Сохранить"}L.addEventListener("click",(function(){k.reset(),f(g,_),a(g)})),y.addEventListener("click",(function(){h.reset(),h.elements.name.value=b.textContent,h.elements.description.value=S.textContent,f(v,_),a(v)})),E.addEventListener("click",(function(e){w.reset(),f(w,_),a(C)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?d(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),r.textContent=t.validationMessage,r.classList.add(n.inputErrorClass)}(e,t,n)}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):p(t,n)}(n,r,t)}))}))}(t,e)}))}(_),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=r[0],i=r[1];b.textContent=a.name,S.textContent=a.about,u=a._id,L.style.backgroundImage="url(".concat(a.avatar,")"),i.forEach((function(e){q.append(o(e,c,D,O,u,T))}))})).catch((function(e){console.error("Ошибка запроса профиля и карточек:",e)}))})();