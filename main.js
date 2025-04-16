(()=>{"use strict";var t=document.querySelector("#card-template").content;function e(e,n,r,o){var i=e.titleCard,a=e.imgCardUrl,c=e.idCard,u=e.likes,l=e.resultValid,s=e.userId,d=t.querySelector(".places__item").cloneNode(!0),f=d.querySelector(".card__image"),p=d.querySelector(".card__like-item");return f.setAttribute("src",a),f.setAttribute("alt",i),d.querySelector(".card__title").textContent=i,p.textContent=u.length,d.querySelector(".card__like-button").addEventListener("click",(function(t){o(t,c,p)})),d.querySelector(".card__image").addEventListener("click",n),l?d.querySelector(".card__delete-button").addEventListener("click",(function(){return r(c,d)})):d.querySelector(".card__delete-button").classList.add("card__delete-button_hide"),function(t,e,n){e.forEach((function(e){e._id===n?t.querySelector(".card__like-button").classList.add("card__like-button_is-active"):t.querySelector(".card__like-button").classList.remove("card__like-button_is-active")}))}(d,u,s),d}function n(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(t){"Escape"===t.key&&r(document.querySelector(".popup_is-opened"))}function i(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector));n.forEach((function(n){var r=t.querySelector(".".concat(n.id,"_error_message"));c(n,e,r)})),a(t,n,e)}function a(t,e,n){var r=t.querySelector(n.submitButtonSelector);!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(r.disabled=!1,r.classList.remove(n.inactiveButtonClass)):(r.disabled=!0,r.classList.add(n.inactiveButtonClass))}function c(t,e,n){t.classList.remove(e.inputErrorClass),n.classList.remove(e.errorClass),n.textContent=""}var u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},l="https://nomoreparties.co/v1/wff-cohort-36",s="c4e8465c-47ec-436d-be1a-e5e1faad7127",d="application/json",f=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))};function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var _=document.querySelector(".page__content"),y=_.querySelector(".content"),v=y.querySelector(".places__list"),m=_.querySelectorAll(".popup"),h=_.querySelector(".popup_type_image"),S=_.querySelector(".popup_type_edit"),C=_.querySelector(".popup_type_new-card"),b=_.querySelector(".popup_type_new-avatar"),q=document.forms,g=_.querySelector(".profile__title"),k=_.querySelector(".profile__description"),L=_.querySelector(".profile__image"),E=_.querySelector(".popup__image"),A=_.querySelector(".popup__caption"),w=_.querySelector(".popup_type_confirm"),x={};function P(t){E.src=t.target.src,E.alt=t.target.alt,A.textContent=t.target.alt,n(h)}function T(t,e){g.textContent=t,k.textContent=e}function z(t,e){x={id:t,itemCard:e},n(w)}function j(t,e,n){var r;t.target.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(l,"/cards/likes/").concat(t),{method:"DELETE",headers:{authorization:s,"Content-Type":d}}).then((function(t){return f(t)}))}(e).then((function(e){t.target.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(t){return console.log(t)})):(r=e,fetch("".concat(l,"/cards/likes/").concat(r,"/"),{method:"PUT",headers:{authorization:s,"Content-Type":d}}).then((function(t){return f(t)}))).then((function(e){t.target.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(t){return console.log(t)}))}Promise.all([fetch("".concat(l,"/users/me"),{headers:{authorization:s,"Content-Type":d}}).then((function(t){return f(t)})),fetch("".concat(l,"/cards"),{headers:{authorization:s,"Content-Type":d}}).then((function(t){return f(t)}))]).then((function(t){var n,r,o,i,a=(i=2,function(t){if(Array.isArray(t))return t}(o=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,c=[],u=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=i.call(n)).done)&&(c.push(r.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(o,i)||function(t,e){if(t){if("string"==typeof t)return p(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(t,e):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=a[0],u=a[1];T(c.name,c.about),n=c.avatar,r=c.name,L.src=n,L.alt="Фото профиля ".concat(r),function(t,n){n.forEach((function(n){var r={titleCard:n.name,imgCardUrl:n.link,idCard:n._id,likes:n.likes,resultValid:t._id===n.owner._id,userId:t._id};v.append(e(r,P,z,j))}))}(c,u)})).catch((function(t){return console.log(t)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector));a(t,n,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){var r=t.querySelector(".".concat(e.id,"_error_message"));e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?c(e,n,r):function(t,e,n,r){t.classList.add(n.inputErrorClass),r.textContent=e,r.classList.add(n.errorClass)}(e,e.validationMessage,n,r)}(t,r,e),a(t,n,e)}))}))}(e,t)}))}(u),y.querySelector(".profile__edit-button").addEventListener("click",(function(){q.editProfile.name.value=g.textContent,q.editProfile.description.value=k.textContent,n(S),i(q.editProfile,u)})),y.querySelector(".profile__add-button").addEventListener("click",(function(){n(C),i(q.newPlace,u)})),y.querySelector(".add_new_avatar").addEventListener("click",(function(){n(b),i(q.newAvatar,u)})),q.formConfirm.addEventListener("submit",(function(t){!function(t,e){var n;t.preventDefault(),(n=e.id,fetch("".concat(l,"/cards/").concat(n),{method:"DELETE",headers:{authorization:s,"Content-Type":d}}).then((function(t){return f(t)}))).then((function(){e.itemCard.remove(),r(w),e={}})).catch((function(t){return console.log(t)}))}(t,x)})),q.editProfile.addEventListener("submit",(function(t){S.querySelector(".popup__button").textContent="Сохранение...",function(t,e){var n,o;t.preventDefault(),(n=q.editProfile.name.value,o=q.editProfile.description.value,fetch("".concat(l,"/users/me"),{method:"PATCH",headers:{authorization:s,"Content-Type":d},body:JSON.stringify({name:n,about:o})}).then((function(t){return f(t)}))).then((function(t){T(t.name,t.about),q.editProfile.reset(),r(e)})).catch((function(t){return console.log(t)})).finally((function(){S.querySelector(".popup__button").textContent="Сохранить"}))}(t,S)})),q.newPlace.addEventListener("submit",(function(t){C.querySelector(".popup__button").textContent="Создание...",function(t,n){var o,i;t.preventDefault(),(o=q.newPlace.placeName.value,i=q.newPlace.link.value,fetch("".concat(l,"/cards"),{method:"POST",headers:{authorization:s,"Content-Type":d},body:JSON.stringify({name:o,link:i})}).then((function(t){return f(t)}))).then((function(t){var o={titleCard:t.name,imgCardUrl:t.link,idCard:t._id,likes:t.likes,resultValid:!0,userId:t.owner._id};v.prepend(e(o,P,z,j)),q.newPlace.reset(),r(n)})).catch((function(t){return console.log(t)})).finally((function(){C.querySelector(".popup__button").textContent="Создать"}))}(t,C)})),q.newAvatar.addEventListener("submit",(function(t){b.querySelector(".popup__button").textContent="Сохранение...",function(t,e){var n;t.preventDefault(),(n=q.newAvatar.linkAvatar.value,fetch("".concat(l,"/users/me/avatar"),{method:"PATCH",headers:{authorization:s,"Content-Type":d},body:JSON.stringify({avatar:n})}).then((function(t){return f(t)}))).then((function(t){L.src=t.avatar,q.newAvatar.reset(),r(e)})).catch((function(t){return console.log(t)})).finally((function(){b.querySelector(".popup__button").textContent="Сохранить"}))}(t,b)})),m.forEach((function(t){t.addEventListener("click",(function(e){!function(t,e){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&r(e)}(e,t)}))}))})();