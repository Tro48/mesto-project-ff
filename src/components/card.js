const templateCard = document.querySelector('#card-template').content;
import { deleteCard } from '../components/api.js'

// @todo: Функция создания карточки 
function addCard(titleCard, imgCardUrl, openImg, resultValid, idCard) {
    const itemCard = templateCard.querySelector('.places__item').cloneNode(true);
    const cardImg = itemCard.querySelector('.card__image');
    cardImg.setAttribute('src', imgCardUrl);
    cardImg.setAttribute('alt', titleCard);
    itemCard.querySelector('.card__title').textContent = titleCard;
    itemCard.querySelector('.card__like-button').addEventListener('click', likeCard);
    itemCard.querySelector('.card__image').addEventListener('click', openImg);
    itemCard.id = idCard
    if (resultValid) {
        itemCard.querySelector('.card__delete-button').addEventListener('click', () => {
            delCard(itemCard, idCard);
        });
    } else {
        itemCard.querySelector('.card__delete-button').classList.add('card__delete-button_hide');
    }

    return itemCard;
}

// @todo: Функция удаления карточки
function delCard(card, idCard) {
    deleteCard(idCard)
    card.remove();
}

// Функция лайка карточки
function likeCard (evt) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.add('card__like-button_is-active');
    } else {
        evt.target.classList.remove('card__like-button_is-active');
    } 
}

export { addCard }
