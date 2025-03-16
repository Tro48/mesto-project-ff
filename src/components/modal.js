
import { addNewCard, likeCard, openImg } from './card.js'
import { placesList } from '../scripts/index.js'

// DOM Узлы:
const page = document.querySelector('.page');
const formElement = page.querySelectorAll('.popup')
const formElementProfile = page.querySelector('.popup_type_edit').querySelector('.popup__form');
const formElementAddCard = page.querySelector('.popup_type_new-card').querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__description');


// Функции открытия и закрытия модальных окон
function openModal(resultClick, buttonClass, modalClass) {
    if (resultClick.contains(buttonClass)) {
        page.querySelector(modalClass).classList.add('popup_is-opened');
        page.addEventListener('keydown', closeModalKeydown);
        getTextInput(profileName, profileJob);
    }
}

function closeModal(modalClass) {
    page.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
            page.querySelector(modalClass).classList.remove('popup_is-opened');
            if (modalClass === '.popup_type_edit') {
                formElementProfile.reset();
            } else if (modalClass === '.popup_type_new-card') {
                formElementAddCard.reset();
            }
            page.removeEventListener('keydown', closeModalKeydown);
        }
    })
}

function closeModalKeydown(evt) {
    if (evt.key === 'Escape') {
        formElement.forEach((itemForm) => {
            let form = itemForm.querySelector('.popup__form');
            if (itemForm.classList.contains('popup_is-opened')){
                itemForm.classList.remove('popup_is-opened');
            }
            if (form && form.classList[0] === 'popup__form') {
                itemForm.querySelector('.popup__form').reset()
            }
        })
    }
}

// Функция обработки данных формы профиля и добавления в DOM
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    formElementProfile.reset();
    getTextInput(profileName, profileJob);
    page.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}

//Функция отображения данных профиля в placeholder
function getTextInput(profileName, profileJob) {
    document.getElementsByName('name')[0].value = profileName.innerHTML;
    document.getElementsByName('description')[0].value = profileJob.innerHTML;
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

export { formElementAddCard, openModal, closeModal, addCardModal, formElementProfile, handleFormSubmit }

