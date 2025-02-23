// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы
const contentPage = document.querySelector('.content');
const placesList = contentPage.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(titleCard, imgCardUrl) {
    const itemCard = templateCard.querySelector('.places__item').cloneNode(true);
    const cardImg = itemCard.querySelector('.card__image');
    cardImg.setAttribute('src', imgCardUrl);
    cardImg.setAttribute('alt', titleCard);
    itemCard.querySelector('.card__title').textContent = titleCard;
    itemCard.querySelector('.card__delete-button').addEventListener('click', function(){
        delCard(itemCard);
    });
    return itemCard;
}

// @todo: Функция удаления карточки
function delCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(addCard(item.name, item.link));
});
