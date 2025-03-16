
import { addNewCard, likeCard, openImg } from './card.js'
import { placesList } from '../scripts/index.js'

// DOM Узлы:
const page = document.querySelector('.page');
const formElementProfile = page.querySelector('.popup_type_edit').querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const formElementAddCard = page.querySelector('.popup_type_new-card').querySelector('.popup__form');
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__description');


// Функции открытия и закрытия модальных окон
function openModal(resultClick, buttonClass, modalClass) {
    if (resultClick.contains(buttonClass)) {
        page.querySelector(modalClass).classList.add('popup_is-opened');
        page.addEventListener('keydown', closeModalKeydown);
    }
}

function closeModal(modalClass) {
    page.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
            page.querySelector(modalClass).classList.remove('popup_is-opened');
            page.removeEventListener('keydown', closeModalKeydown);
        }
    })
}

function closeModalKeydown(evt) {
    if (evt.key === 'Escape') {
        page.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    }
}

// Функция обработки данных формы профиля и добавления в DOM
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    formElementProfile.reset();
    getTextPlaseholder(profileName, profileJob);
    page.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}

//Функция отображения данных профиля в placeholder
function getTextPlaseholder(profileName, profileJob) {
    document.getElementsByName('name')[0].placeholder = profileName.innerHTML;
    document.getElementsByName('description')[0].placeholder = profileJob.innerHTML;
}

// Функция получения новой карточки и добавления в DOM
function addCardModal(evt) {
    evt.preventDefault();
    const titleCard = document.querySelector('.popup__input_type_card-name').value;
    const imgCardUrl = document.querySelector('.popup__input_type_url').value;
    addNewCard(placesList, titleCard, imgCardUrl, likeCard, openImg);
    formElementAddCard.reset();
    page.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}

// Добавляем данные профиля в placeholder`ы формы
getTextPlaseholder(profileName, profileJob);

export { formElementAddCard, openModal, closeModal, addCardModal, formElementProfile, handleFormSubmit }

