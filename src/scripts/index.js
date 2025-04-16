import '../pages/index.css'
import { addCard } from '../components/card.js'
import { openModal, closeModalByClick, closeModal } from '../components/modal.js'
import { enableValidation, clearValidation } from '../components/validation.js'
import { validationConfig } from '../components/validationConfig.js'
import { userData, cardsData, editProfile, addNewCard, addAvatar, deleteCard, addLike, removeLike } from '../components/api.js'

// @todo: DOM узлы
const pageContent = document.querySelector('.page__content');
const content = pageContent.querySelector('.content');
const placesList = content.querySelector('.places__list');
const modalList = pageContent.querySelectorAll('.popup');
const modalImg = pageContent.querySelector('.popup_type_image');
const modalEditProfile = pageContent.querySelector('.popup_type_edit');
const modalCardAdd = pageContent.querySelector('.popup_type_new-card');
const modalNewAvatar = pageContent.querySelector('.popup_type_new-avatar');
const allForms = document.forms;
const profileName = pageContent.querySelector('.profile__title');
const profileJob = pageContent.querySelector('.profile__description');
const profileImg = pageContent.querySelector('.profile__image');
const imageModal = pageContent.querySelector('.popup__image');
const captionModal = pageContent.querySelector('.popup__caption');
const modalConfirm = pageContent.querySelector('.popup_type_confirm');
let cardForDel = {}

loadProfileData();
enableValidation(validationConfig);

// Обработчик клика для открытия модалок
content.querySelector('.profile__edit-button').addEventListener('click', () => {
    addTextProfileInForm();
    openModal(modalEditProfile);
    clearValidation(allForms.editProfile, validationConfig);
})
content.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(modalCardAdd);
    clearValidation(allForms.newPlace, validationConfig);
})

content.querySelector('.add_new_avatar').addEventListener('click', () => {
    openModal(modalNewAvatar);
    clearValidation(allForms.newAvatar, validationConfig);
})

allForms.formConfirm.addEventListener('submit', (evt) => {
    delCard(evt, cardForDel)
})

allForms.editProfile.addEventListener('submit', (evt) => {
    modalEditProfile.querySelector('.popup__button').textContent = 'Сохранение...';
    handleProfileFormSubmit(evt, modalEditProfile);
})

allForms.newPlace.addEventListener('submit', (evt) => {
    modalCardAdd.querySelector('.popup__button').textContent = 'Создание...';
    addCardModal(evt, modalCardAdd);
})

allForms.newAvatar.addEventListener('submit', (evt) => {
    modalNewAvatar.querySelector('.popup__button').textContent = 'Сохранение...';
    addNewAvatar(evt, modalNewAvatar);
})

modalList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        closeModalByClick(evt, item);
    })
})

//Функция открытия картинки карточки
function openImg(evt) {
    imageModal.src = evt.target.src;
    imageModal.alt = evt.target.alt;
    captionModal.textContent = evt.target.alt;
    openModal(modalImg);
}

// @todo: Функция удаления карточки
function delCard(evt, cardForDel) {
    evt.preventDefault();
    deleteCard(cardForDel.id)
        .then(()=> {
            cardForDel.itemCard.remove();
            closeModal(modalConfirm);
            cardForDel = {}
        })
        .catch((err) => console.log(err));
}

// Функция обработки данных формы профиля и добавления в DOM
function handleProfileFormSubmit(evt, popup) {
    evt.preventDefault();
    editProfile(allForms.editProfile.name.value, allForms.editProfile.description.value)
        .then(res => {
            renderProfileData(res.name, res.about);
            allForms.editProfile.reset();
            closeModal(popup);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            modalEditProfile.querySelector('.popup__button').textContent = 'Сохранить'; 
        })
}

function addTextProfileInForm() {
    allForms.editProfile.name.value = profileName.textContent;
    allForms.editProfile.description.value = profileJob.textContent;
}

// Функция получения новой карточки и добавления в DOM
function addCardModal(evt, popup) {
    evt.preventDefault();
    const titleCard = allForms.newPlace.placeName.value;
    const imgCardUrl = allForms.newPlace.link.value;
    addNewCard(titleCard, imgCardUrl)
        .then(res => { 
            const cardItemData = {
                titleCard: res.name,
                imgCardUrl: res.link,
                idCard: res._id,
                likes: res.likes,
                resultValid: true,
                userId: res.owner._id
            }
            placesList.prepend(addCard(cardItemData, openImg, openModalConfirm, likeCard));
            allForms.newPlace.reset();
            closeModal(popup);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            modalCardAdd.querySelector('.popup__button').textContent = 'Создать';
        })
}

function loadProfileData() {
    Promise.all([userData(), cardsData()])
        .then(([userDataResult, cardsDataResult]) => {
            renderProfileData(userDataResult.name, userDataResult.about);
            renderProfileAvatar(userDataResult.avatar, userDataResult.name);
            renderCard(userDataResult, cardsDataResult)
        })
        .catch((err) => console.log(err));
}

function renderProfileData(nameValue, aboutValue){
    profileName.textContent = nameValue;
    profileJob.textContent = aboutValue;
}

function renderProfileAvatar(photoUrl, alt){
    profileImg.src = photoUrl;
    profileImg.alt = `Фото профиля ${alt}`;
}

function addNewAvatar(evt, modal){
    evt.preventDefault();
    addAvatar(allForms.newAvatar.linkAvatar.value)
        .then(res => {
            profileImg.src = res.avatar;
            allForms.newAvatar.reset();
            closeModal(modal);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            modalNewAvatar.querySelector('.popup__button').textContent = 'Сохранить';
        })
}

function openModalConfirm(idCard, itemCard){
    cardForDel = {
        id: idCard,
        itemCard
    }
    openModal(modalConfirm);
}

function renderCard(userDataResult, cardsDataResult) {
    cardsDataResult.forEach((item) => {
        const cardItemData = {
            titleCard: item.name,
            imgCardUrl: item.link,
            idCard: item._id,
            likes: item.likes,
            resultValid: userDataResult._id === item.owner._id,
            userId: userDataResult._id
        }
        placesList.append(addCard(cardItemData, openImg, openModalConfirm, likeCard));
    });
}

// Функция лайка карточки
function likeCard(evt, idCard, likeCardItem ) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        addLike(idCard)
            .then((res) => {
                evt.target.classList.add('card__like-button_is-active');
                likeCardItem.textContent = res.likes.length;
            })
            .catch((err) => console.log(err))
    } else {
        removeLike(idCard)
            .then((res) => {
                evt.target.classList.remove('card__like-button_is-active');
                likeCardItem.textContent = res.likes.length;
            })
            .catch((err) => console.log(err))
    }
}
