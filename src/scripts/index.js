import '../pages/index.css'
import { addCard } from '../components/card.js'
import { openModal, closeModalByClick, closeModal } from '../components/modal.js'
import { enableValidation } from '../components/validation.js'
import { validationConfig } from '../components/validationConfig.js'
import { userData, cardsData, editProfile, addNewCard, addAvatar } from '../components/api.js'

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

loadProfileData()

// Обработчик клика для открытия модалок
content.querySelector('.profile__edit-button').addEventListener('click', () => {
    enableValidation(validationConfig);
    addTextProfileInForm();
    openModal(modalEditProfile);
})
content.querySelector('.profile__add-button').addEventListener('click', () => {
    enableValidation(validationConfig);
    openModal(modalCardAdd);
})

content.querySelector('.add_new_avatar').addEventListener('click', () => {
    enableValidation(validationConfig);
    openModal(modalNewAvatar)
})

allForms.editProfile.addEventListener('submit', (evt) => {
    handleProfileFormSubmit(evt, modalEditProfile);
})

allForms.newPlace.addEventListener('submit', (evt) => {
    addCardModal(evt, modalCardAdd);
})

allForms.newAvatar.addEventListener('submit', (evt) => {
    addNewAvatar(evt, modalNewAvatar)
})


modalList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        closeModalByClick(evt, item);
    })
})

//Функция открытия картинки карточки
function openImg(evt) {
    imageModal.src = evt.target.src;
    captionModal.textContent = evt.target.alt;
    openModal(modalImg);
}

// Функция обработки данных формы профиля и добавления в DOM
function handleProfileFormSubmit(evt, popup) {
    evt.preventDefault();
    editProfile(allForms.editProfile.name.value, allForms.editProfile.description.value)
        .then(res => {renderProfileData(res.name, res.about)})
        .then(allForms.editProfile.reset())
    closeModal(popup);
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
            placesList.prepend(addCard(res.name, res.link, openImg, true, res._id, 0, false))
        })
    allForms.newPlace.reset();
    closeModal(popup);
}

function loadProfileData() {
    Promise.all([userData(), cardsData()])
        .then(([userDataResult, cardsDataResult]) => {
            renderProfileData(userDataResult.name, userDataResult.about);
            renderProfileAvatar(userDataResult.avatar, userDataResult.name);
            cardsDataResult.forEach((item) => {
                let likedIt
                item.likes.forEach((profile) => {
                    likedIt = profile._id === userDataResult._id
                })
                // console.log(likedIt)
                const resultValidId = userDataResult._id === item.owner._id;
                placesList.append(addCard(item.name, item.link, openImg, resultValidId, item._id, item.likes.length, likedIt));
            });
        })
        .catch(error => { console.error(error) })
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
            profileImg.src = res.avatar
        })
        .then(allForms.newAvatar.reset())
    closeModal(modal)
}