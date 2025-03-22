import '../pages/index.css'
import { initialCards } from './cards.js'
import { addCard } from '../components/card.js'
import { openModal, closeModalByClick, closeModal } from '../components/modal.js'

// @todo: DOM узлы
const pageContent = document.querySelector('.page__content');
const content = pageContent.querySelector('.content');
const placesList = content.querySelector('.places__list');
const modalList = pageContent.querySelectorAll('.popup');
const allForms = document.forms;
let profileName = pageContent.querySelector('.profile__title');
let profileJob = pageContent.querySelector('.profile__description');
const imageModal = pageContent.querySelector('.popup__image');
const captionModal = pageContent.querySelector('.popup__caption');

// @todo: Вывести все карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(addCard(item.name, item.link, openImg));
});

// Обработчик клика для открытия и закрытия модалок
content.addEventListener('click', (evt) => {
    modalList.forEach((modalItem) => {
        if (evt.target.classList.contains('profile__edit-button') && modalItem.classList.contains('popup_type_edit')){
            addTextProfileInForm();
            openModal(modalItem);
            allForms.editProfile.addEventListener('submit', (evt) => {
                handleFormSubmit(evt, modalItem);
            })
        } else if (evt.target.classList.contains('profile__add-button') && modalItem.classList.contains('popup_type_new-card')) {
            openModal(modalItem);
            allForms.newPlace.addEventListener('submit', (evt) => {
                addCardModal(evt, modalItem);
            })
        } else if (evt.target.classList.contains('card__image') && modalItem.classList.contains('popup_type_image')) {
            openImg(evt, modalItem);
        }
        modalItem.addEventListener('click', (evt) => {
            closeModalByClick(evt, modalItem);
        })
    })
})

//Функция добавления новой карточки
function addNewCard(placesList, titleCard, imgCardUrl) {
    placesList.prepend(addCard(titleCard, imgCardUrl));
}

//Функция открытия картинки карточки
function openImg(evt, modalItem) {
    imageModal.src = evt.target.src;
    captionModal.textContent = evt.target.alt;
    openModal(modalItem);
}

// Функция обработки данных формы профиля и добавления в DOM
function handleFormSubmit(evt, popup) {
    evt.preventDefault();
    profileName.textContent = allForms.editProfile.name.value;
    profileJob.textContent = allForms.editProfile.description.value;
    allForms.editProfile.reset();
    addTextProfileInForm()
    closeModal(popup);
}

function addTextProfileInForm () {
    allForms.editProfile.name.value = profileName.textContent;
    allForms.editProfile.description.value = profileJob.textContent;
}

// Функция получения новой карточки и добавления в DOM
function addCardModal(evt, popup) {
    evt.preventDefault();
    const titleCard = allForms.newPlace.placeName.value;
    const imgCardUrl = allForms.newPlace.link.value;
    addNewCard(placesList, titleCard, imgCardUrl, openImg);
    allForms.newPlace.reset();
    closeModal(popup);
}