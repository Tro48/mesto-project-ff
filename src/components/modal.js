
// Функции открытия и закрытия модальных окон
function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalKeydown);
}

function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalKeydown);
}

function closeModalKeydown(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeModalByClick(evt, modalElement, clearInputValue){
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')){
        closeModal(modalElement);
    }
}

export { openModal, closeModalByClick, closeModal }

