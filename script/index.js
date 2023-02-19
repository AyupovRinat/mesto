import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validateConfig, popupInfo, popupCard, popupImage, addButton, addCardButton, closeInfoButton, closeAddButton, closeImageButton, formInfo, formCard, nameInput, postInput, profileName, profilePost, cardContainer, placeInput, linkInput, popupPic, popupPicName, closeButtons } from './utils.js'

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('mousedown', closePopupOverlay);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function openedPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('mousedown', closePopupOverlay);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilePost.textContent = postInput.value;
  closePopup(popupInfo);
}

function openedPopupImage(name, link) {
  popupPic.src = link;
  popupPic.alt = name;
  popupPicName.textContent = name;
  openedPopup(popupImage);
}

function createCard(name, link) {
  const card = new Card(name, link, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

function addNewCard(name, link) {
  const newCard = createCard(name, link);
  cardContainer.prepend(newCard);
}

function renderCards(array) {
  array.forEach((item) => {
    const cardHTML = addNewCard(item.name, item.link);
    cardContainer.append(cardHTML);
  })
}

renderCards(initialCards);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard(placeInput.value, linkInput.value);
  evt.target.reset();
  closePopup(popupCard);
}

function handleOpenPopup(name, link) {
  popupPic.src = link;
  popupPic.alt = name;
  popupPicName.textContent = name;
  openedPopup(popupImage);
}

const infoAddFormValidator = new FormValidator(validateConfig, formInfo)
infoAddFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(validateConfig, formCard)
cardAddFormValidator.enableValidation()

addButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  postInput.value = profilePost.textContent;
  openedPopup(popupInfo);
});

addCardButton.addEventListener('click', () => {
  openedPopup(popupCard);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

formInfo.addEventListener('submit', handleProfileFormSubmit);

formCard.addEventListener('submit', handleCardFormSubmit);

export { handleOpenPopup };
