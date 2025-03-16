import '../pages/index.css'
import { initialCards } from './cards.js'
import { addCard, likeCard, openImg } from '../components/card.js'
import { formElementAddCard, openModal, closeModal, addCardModal, formElementProfile, handleFormSubmit } from '../components/modal.js'

// @todo: DOM узлы
const contentPage = document.querySelector('.content');
const placesList = contentPage.querySelector('.places__list');

// @todo: Вывести новую карточку на страницу
formElementAddCard.addEventListener('submit', addCardModal)

// @todo: Вывести все карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(addCard(item.name, item.link, likeCard, openImg));
});

// Обработчик клика для открытия\закрытия модалок
contentPage.addEventListener('click', (evt) => {
    const resultClick = evt.target.classList
    openModal(resultClick, 'profile__edit-button', '.popup_type_edit');
    openModal(resultClick, 'profile__add-button', '.popup_type_new-card');
    openModal(resultClick, 'card__image', '.popup_type_image');
    closeModal('.popup_type_edit');
    closeModal('.popup_type_new-card');
    closeModal('.popup_type_image');
})

// Изменяем данные аккаунта в DOM
formElementProfile.addEventListener('submit', handleFormSubmit)

export { placesList, formElementAddCard }