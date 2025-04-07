import '../pages/index.css'
import { addCard } from '../components/card.js'
import { openModal, closeModalByClick, closeModal } from '../components/modal.js'
import { enableValidation } from '../components/validation.js'
import { validationConfig } from '../components/validationConfig.js'
import { userData, cardsData, editProfile, addNewCard } from '../components/api.js'

// @todo: DOM узлы
const pageContent = document.querySelector('.page__content');
const content = pageContent.querySelector('.content');
const placesList = content.querySelector('.places__list');
const modalList = pageContent.querySelectorAll('.popup');
const modalImg = pageContent.querySelector('.popup_type_image');
const modalEditProfile = pageContent.querySelector('.popup_type_edit');
const modalCardAdd = pageContent.querySelector('.popup_type_new-card')
const allForms = document.forms;
let profileName = pageContent.querySelector('.profile__title');
let profileJob = pageContent.querySelector('.profile__description');
let profileImg = pageContent.querySelector('.profile__image')
const imageModal = pageContent.querySelector('.popup__image');
const captionModal = pageContent.querySelector('.popup__caption');

loadProfileData()

// Обработчик клика для открытия модалок
content.querySelector('.profile__edit-button').addEventListener('click', () => {
    enableValidation(validationConfig);
    addTextProfileInForm();
    openModal(modalEditProfile);
    allForms.editProfile.addEventListener('submit', (evt) => {
        handleProfileFormSubmit(evt, modalEditProfile);
    })
})
content.querySelector('.profile__add-button').addEventListener('click', () => {
    enableValidation(validationConfig);
    openModal(modalCardAdd);
    allForms.newPlace.addEventListener('submit', (evt) => {
        addCardModal(evt, modalCardAdd);
    })
})

modalList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        closeModalByClick(evt, item);
    })
})

//Функция открытия картинки карточки
function openImg(evt) {
    imageModal.src = evt.target.src;
    captionModal.textContent = evt.target.alt;
    openModal(modalImg);
}

// Функция обработки данных формы профиля и добавления в DOM
function handleProfileFormSubmit(evt, popup) {
    evt.preventDefault();
    editProfile(allForms.editProfile.name.value, allForms.editProfile.description.value)
    .then(loadProfileData())
    allForms.editProfile.reset();
    addTextProfileInForm()
    closeModal(popup);
}

function addTextProfileInForm() {
    allForms.editProfile.name.value = profileName.textContent;
    allForms.editProfile.description.value = profileJob.textContent;
}

// Функция получения новой карточки и добавления в DOM
function addCardModal(evt, popup) {
    evt.preventDefault();
    const titleCard = allForms.newPlace.placeName.value;
    const imgCardUrl = allForms.newPlace.link.value;
    addNewCard(titleCard, imgCardUrl).then(() => {
        Promise.all([userData(), cardsData()])
            .then(([userDataResult, cardsDataResult]) =>{
                placesList.innerHTML = '';
                const resultValid = userDataResult._id === cardsDataResult[0].owner._id
                placesList.append(addCard(titleCard, imgCardUrl, openImg, resultValid, cardsDataResult[0]._id))
                loadProfileData();
            })
    })
    allForms.newPlace.reset();
    closeModal(popup);
}

function loadProfileData() {
    Promise.all([userData(), cardsData()])
        .then(([userDataResult, cardsDataResult]) => {
            profileName.textContent = userDataResult.name;
            profileJob.textContent = userDataResult.about;
            profileImg.src = userDataResult.avatar;
            profileImg.alt = `Фото профиля ${userDataResult.name}`;
            placesList.innerHTML = '';
            cardsDataResult.forEach(function (item) {
                const resultValid = userDataResult._id === item.owner._id;
                placesList.append(addCard(item.name, item.link, openImg, resultValid, item._id));
            });
        })
        .catch(error => { console.error(error) })
}
