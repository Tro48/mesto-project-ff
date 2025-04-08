const templateCard = document.querySelector('#card-template').content;
const modalConfirm = document.querySelector('.popup_type_confirm');
const confirmButton = modalConfirm.querySelector('.popup__button_confirm')
import { deleteCard, addLike, removeLike } from '../components/api.js'
import { openModal, closeModal } from '../components/modal.js'

// @todo: Функция создания карточки 
function addCard(titleCard, imgCardUrl, openImg, resultValid, idCard, likes, likedIt) {
    const itemCard = templateCard.querySelector('.places__item').cloneNode(true);
    const cardImg = itemCard.querySelector('.card__image');
    cardImg.setAttribute('src', imgCardUrl);
    cardImg.setAttribute('alt', titleCard);
    itemCard.querySelector('.card__title').textContent = titleCard;
    itemCard.querySelector('.card__like-item').textContent = likes;
    itemCard.querySelector('.card__like-button').addEventListener('click', (evt) => {
        likeCard(evt, idCard)});
    itemCard.querySelector('.card__image').addEventListener('click', openImg);
    itemCard.id = idCard
    if (likedIt){
        itemCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    } else {
        itemCard.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
    }
    if (resultValid) {
        itemCard.querySelector('.card__delete-button').addEventListener('click', () => {
            delCard(itemCard, idCard)
        });
    } else {
        itemCard.querySelector('.card__delete-button').classList.add('card__delete-button_hide');
    }

    return itemCard;
}

// @todo: Функция удаления карточки
function delCard(card, idCard) {
    openModal(modalConfirm)
    confirmButton.addEventListener('click', () => {
        deleteCard(idCard)
        card.remove();
        closeModal(modalConfirm)
    })
}

// Функция лайка карточки
function likeCard(evt, idCard) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.add('card__like-button_is-active');
        addLike(idCard).then((res) => {
            renderLike(res.likes.length, idCard)
        })
    } else {
        evt.target.classList.remove('card__like-button_is-active');
        removeLike(idCard).then((res) => {
            renderLike(res.likes.length, idCard)
        })
    } 
}

function renderLike(result,idCard) {
    const cardItem = document.getElementById(idCard);
    cardItem.querySelector('.card__like-item').textContent = result;
}

export { addCard }
