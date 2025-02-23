// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы
const contentPage = document.querySelector('.content');
const placesList = contentPage.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(titleCard, imgCard) {
    const itemCard = templateCard.querySelector('.places__item').cloneNode(true);
    itemCard.querySelector('.card__image').setAttribute('src', imgCard);
    itemCard.querySelector('.card__title').textContent = titleCard;
    itemCard.querySelector('.card__delete-button').addEventListener('click', function(){
        delCard();
    });
    placesList.append(itemCard);
}

// @todo: Функция удаления карточки
function delCard() {
    placesList.querySelector('.card__delete-button').closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});
