let popup = document.querySelector('.popup');
let addButton = document.querySelector('.profile__info-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let postInput = formElement.querySelector('.popup__post');
let profileName = document.querySelector('.profile__name');
let profilePost = document.querySelector('.profile__post');

function openedPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilePost.textContent = postInput.value;
  closePopup();
}

addButton.addEventListener('click', openedPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

