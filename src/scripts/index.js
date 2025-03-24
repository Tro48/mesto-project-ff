import '../pages/index.css'
import { initialCards } from './cards.js'
import { addCard } from '../components/card.js'
import { openModal, closeModalByClick, closeModal } from '../components/modal.js'

// @todo: DOM узлы
const pageContent = document.querySelector('.page__content');
const content = pageContent.querySelector('.content');
const placesList = content.querySelector('.places__list');
const modalList = pageContent.querySelectorAll('.popup');
const modalImg = pageContent.querySelector('.popup_type_image');
const modalEditProfile = pageContent.querySelector('.popup_type_edit');
const modalCardAdd = pageContent.querySelector('.popup_type_new-card')
const allForms = document.forms;
let profileName = pageContent.querySelector('.profile__title');
let profileJob = pageContent.querySelector('.profile__description');
const imageModal = pageContent.querySelector('.popup__image');
const captionModal = pageContent.querySelector('.popup__caption');

// @todo: Вывести все карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(addCard(item.name, item.link, openImg));
});

// Обработчик клика для открытия модалок
content.querySelector('.profile__edit-button').addEventListener('click', () => {
    addTextProfileInForm()
    openModal(modalEditProfile);
    allForms.editProfile.addEventListener('submit', (evt) => {
        handleProfileFormSubmit(evt, modalEditProfile);
    })
})
content.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(modalCardAdd);
    allForms.newPlace.addEventListener('submit', (evt) => {
        addCardModal(evt, modalCardAdd);
    })
})

modalList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        closeModalByClick(evt, item);
    })
})

//Функция добавления новой карточки
function addNewCard(titleCard, imgCardUrl) {
    placesList.prepend(addCard(titleCard, imgCardUrl, openImg));
}

//Функция открытия картинки карточки
function openImg(evt) {
    imageModal.src = evt.target.src;
    captionModal.textContent = evt.target.alt;
    openModal(modalImg);
}

// Функция обработки данных формы профиля и добавления в DOM
function handleProfileFormSubmit(evt, popup) {
    evt.preventDefault();
    profileName.textContent = allForms.editProfile.name.value;
    profileJob.textContent = allForms.editProfile.description.value;
    allForms.editProfile.reset();
    addTextProfileInForm()
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
    addNewCard(titleCard, imgCardUrl);
    allForms.newPlace.reset();
    closeModal(popup);
}