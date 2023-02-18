const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

const popupInfo = document.querySelector('.popup_info');
const popupCard = document.querySelector('.popup_card-add');
const popupImage = document.querySelector('.popup_big-image');
const addButton = document.querySelector('.profile__info-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeInfoButton = document.querySelector('.popup__close-button_type_info');
const closeAddButton = document.querySelector('.popup__close-button_type_add');
const closeImageButton = document.querySelector('.popup__close-button_type_image');
const formInfo = document.forms['form-profile'];
const formCard = document.forms['form-place'];
const nameInput = formInfo.querySelector('.popup__field_type_name');
const postInput = formInfo.querySelector('.popup__field_type_post');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');
const cardContainer = document.querySelector('.elements');
const placeInput = formCard.querySelector('.popup__field_type_place');
const linkInput = formCard.querySelector('.popup__field_type_link');
const popupPic = document.querySelector('.popup__image');
const popupPicName = document.querySelector('.popup__image-caption');

export { initialCards, validateConfig, popupInfo, popupCard, popupImage, addButton, addCardButton, closeInfoButton, closeAddButton, closeImageButton, formInfo, formCard, nameInput, postInput, profileName, profilePost, cardContainer, placeInput, linkInput, popupPic, popupPicName };
