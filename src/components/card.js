const templateCard = document.querySelector('#card-template').content;

// @todo: Функция создания карточки 
function addCard({ titleCard, imgCardUrl, idCard, likes, resultValid,
    userId }, openImg, openModalConfirm, addLike, removeLike) {
    const itemCard = templateCard.querySelector('.places__item').cloneNode(true);
    const cardImg = itemCard.querySelector('.card__image');
    const likeCardItem = itemCard.querySelector('.card__like-item');
    cardImg.setAttribute('src', imgCardUrl);
    cardImg.setAttribute('alt', titleCard);
    itemCard.querySelector('.card__title').textContent = titleCard;
    likeCardItem.textContent = likes.length;
    itemCard.querySelector('.card__like-button').addEventListener('click', (evt) => {
        likeCard(evt, idCard, likeCardItem, addLike, removeLike)});
    itemCard.querySelector('.card__image').addEventListener('click', openImg);
    if (resultValid) {
        itemCard.querySelector('.card__delete-button').addEventListener('click', () => openModalConfirm(idCard, itemCard));
    } else {
        itemCard.querySelector('.card__delete-button').classList.add('card__delete-button_hide');
    }
    renderLike(itemCard, likes, userId);  
    return itemCard;
}

function renderLike(itemCard, likes, userId) {
    likes.forEach((profile) => {
        if (profile._id === userId) {
            itemCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
        } else {
            itemCard.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
        }
    })
}

// Функция лайка карточки
function likeCard(evt, idCard, likeCardItem, addLike, removeLike) {
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

export { addCard }