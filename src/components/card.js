const templateCard = document.querySelector('#card-template').content;

// @todo: Функция создания карточки 
function addCard(titleCard, imgCardUrl, likeCard, openImg) {
    const itemCard = templateCard.querySelector('.places__item').cloneNode(true);
    const cardImg = itemCard.querySelector('.card__image');
    cardImg.setAttribute('src', imgCardUrl);
    cardImg.setAttribute('alt', titleCard);
    itemCard.querySelector('.card__title').textContent = titleCard;
    itemCard.querySelector('.card__like-button').addEventListener('click', likeCard);
    itemCard.querySelector('.card__image').addEventListener('click', openImg);
    itemCard.querySelector('.card__delete-button').addEventListener('click', function () {
        delCard(itemCard);
    });
    return itemCard;
}

// @todo: Функция удаления карточки
function delCard(card) {
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

//Функция открытия картинки карточки
function openImg (evt) {
    document.querySelector('.popup__image').src = evt.target.src;
    document.querySelector('.popup__caption').innerHTML = evt.target.alt;
}

//Функция добавления новой карточки
function addNewCard(placesList, titleCard, imgCardUrl, likeCard, openImg) {
    placesList.prepend(addCard(titleCard, imgCardUrl, likeCard, openImg));
}

export { addCard, delCard, likeCard, openImg, addNewCard }
