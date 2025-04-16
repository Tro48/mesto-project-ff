
function enableValidation(validationConfig){
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formList.forEach((formItem) =>{
        setEventListeners(formItem, validationConfig)
    })
}

function setEventListeners(form, validationConfig){
    const allInput = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    disabledButtonStatus(form, allInput, validationConfig);
    allInput.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            isValid(form, inputItem, validationConfig);
            disabledButtonStatus(form, allInput, validationConfig);
        })
    })
}

function clearValidation(profileForm, validationConfig) {
    const allInput = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    allInput.forEach((input) => {
        const errorElement = profileForm.querySelector(`.${input.id}_error_message`);
        hideInputError(input, validationConfig, errorElement);
    })
    disabledButtonStatus(profileForm, allInput, validationConfig);
}

function disabledButtonStatus(profileForm, allInput, validationConfig){
    const formButton = profileForm.querySelector(validationConfig.submitButtonSelector);
    if (hasInvalidInput(allInput)) {
        formButton.disabled = true;
        formButton.classList.add(validationConfig.inactiveButtonClass);
    } else {
        formButton.disabled = false;
        formButton.classList.remove(validationConfig.inactiveButtonClass);
    }
}

function hasInvalidInput(allInput) {
    return allInput.some((item) => {
        return !item.validity.valid;
    })
}

function isValid(elementForm, elementInput, validationConfig) {
    const errorElement = elementForm.querySelector(`.${elementInput.id}_error_message`);
    if (elementInput.validity.patternMismatch){
        elementInput.setCustomValidity(elementInput.dataset.errorMessage);
    } else {
        elementInput.setCustomValidity('');
    }
    if (!elementInput.validity.valid) {
        showInputError(elementInput, elementInput.validationMessage, validationConfig, errorElement);
    } else {
        hideInputError(elementInput, validationConfig, errorElement);
    }
}

function showInputError(elementInput, errorMessage, validationConfig, errorElement) {
    elementInput.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}
function hideInputError(elementInput, validationConfig, errorElement) {
    elementInput.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

export { enableValidation, clearValidation }