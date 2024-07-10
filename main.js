(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{T:()=>w});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"50cc4bdf-fea2-4b75-a23a-f7aeee79c7ff","Content-Type":"application/json"}},n=function(){return fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},r=function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},o=function(e,n){return fetch("".concat(t.baseUrl,"/users/me/")+n,{method:"PATCH",headers:t.headers,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},c=function(e,n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(n),{method:e,headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function a(e,t,n,r,o){var c=w.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__image"),u=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-counter");return s.textContent=e.likes.length,e.likes.forEach((function(e){e._id===o&&u.classList.add("card__like-button_is-active")})),i.src=e.link,i.alt="Местность "+e.name,c.querySelector(".card__title").textContent=e.name,i.addEventListener("click",n),e.owner._id===o?a.addEventListener("click",(function(t){r(t,e._id)})):a.remove(),u.addEventListener("click",(function(n){t(n,e,s)})),c}function i(e,t,n){e.target.classList.contains("card__like-button_is-active")?c("DELETE",t._id).then((function(e){n.textContent=e.likes.length})).catch((function(e){console.error("Ошибка удаления лайка:",e)})):c("PUT",t._id).then((function(e){n.textContent=e.likes.length})).catch((function(e){console.error("Ошибка добавления лайка:",e)})),e.target.classList.toggle("card__like-button_is-active")}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d),document.addEventListener("click",p),e.querySelector(".popup__form").setAttribute("novalidate","")}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d),document.removeEventListener("click",p)}var l,d=function(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))},p=function(e){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&s(document.querySelector(".popup_is-opened"))};function f(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.remove(n.inputErrorClass),r.textContent=""}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),h=document.forms["edit-profile"],b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),k=document.querySelector(".popup_type_update-avatar"),L=document.forms["update-avatar"],q=document.querySelector(".places__list"),E=document.querySelector(".profile__add-button"),C=document.querySelector(".popup_type_new-card"),j=document.querySelector(".popup_type_delete-card"),A=j.querySelector(".popup__button"),x=document.forms["new-place"],P=document.querySelector(".popup_type_image");P.classList.add("popup_is-animated"),v.classList.add("popup_is-animated"),C.classList.add("popup_is-animated"),j.classList.add("popup_is-animated"),h.addEventListener("submit",B),x.addEventListener("submit",B),L.addEventListener("submit",B);var w=document.querySelector("#card-template").content;function O(e,t){u(j),A.addEventListener("click",(function n(){r(t).catch((function(e){console.error("Ошибка удаления карточки:",e)})).finally((function(){A.removeEventListener("click",n),function(e){e.target.closest(".places__item").remove()}(e),s(j)}))}))}function U(e){u(P),P.querySelector(".popup__image").src=e.target.src,P.querySelector(".popup__image").alt=e.target.alt,P.querySelector(".popup__caption").textContent=e.target.alt}function B(e){var n;e.preventDefault(),e.target===h?(I(!0,h),o({name:h.elements.name.value,about:h.elements.description.value},"").then((function(e){b.textContent=e.name,S.textContent=e.about})).catch((function(e){console.error("Ошибка изменения профиля:",e)})).finally((function(){I(!1,h),s(e.target.closest(".popup_is-opened"))}))):e.target===x?(I(!0,x),(n={name:x.elements["place-name"].value,link:x.elements.link.value},fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){q.prepend(a(e,i,U,O,l))})).catch((function(e){console.error("Ошибка добавления карточки:",e)})).finally((function(){I(!1,x),s(e.target.closest(".popup_is-opened")),x.reset(),T(x,_)}))):e.target===L&&(I(!0,L),o({avatar:L.elements.link.value},"avatar").then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")"),L.reset()})).catch((function(e){console.error("Ошибка изменения аватара:",e)})).finally((function(){I(!1,L),s(e.target.closest(".popup_is-opened")),L.reset(),T(L,_)})))}function T(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){f(e,n,t),n.setCustomValidity("")})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)}function I(e,t){t.querySelector(_.submitButtonSelector).textContent=e?"Сохранение...":"Сохранить"}g.addEventListener("click",(function(e){u(k)})),y.addEventListener("click",(function(e){n().then((function(e){h.elements.name.value=e.name,h.elements.description.value=e.about})).catch((function(e){console.error("Ошибка получения профиля:",e)})).finally((function(){u(v)})),T(v,_)})),E.addEventListener("click",(function(e){u(C),T(x,_)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?f(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),r.textContent=t.validationMessage,r.classList.add(n.inputErrorClass)}(e,t,n)}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}(n,r,t)}))}))}(t,e)}))}(_),Promise.all([n(),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];b.textContent=o.name,S.textContent=o.about,l=o._id,g.style.backgroundImage="url(".concat(o.avatar,")"),c.forEach((function(e){q.append(a(e,i,U,O,l))}))})).catch((function(e){console.error("Ошибка запроса профиля и карточек:",e)}))})();