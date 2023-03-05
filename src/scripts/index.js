import '../pages/index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import { initialCards, validateConfig, popupInfo, popupCard, popupImage, addButton, addCardButton, formInfo, formCard, nameInput, postInput, profileName, profilePost, closeButtons, cardContainer } from './utils.js'

const popupBigImage = new PopupWithImage(popupImage);
popupBigImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.popup__field_type_name',
  postSelector: '.popup__field_type_post'
});

const profilePopup = new PopupWithForm( {
  popupInfo,
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    popupInfo.close();
  }
} );

profilePopup.setEventListeners();

addButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  postInput.value = profilePost.textContent;
  profilePopup.open();
});

const createCard = (name, link) => {
  const card = new Card({
    name,
    link,
    templateSelector: '.card-template',
    handleOpenPopup: (name, link) => { popupBigImage.open(name, link) }
  });

  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
cardContainer
);

console.log(cardContainer);

cardList.rendererItems();

const addPopup = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (dataForm) => {
    cardList.addItem(dataForm)
    popupCard.close();
  }
});

addPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
  addPopup.open();
})

/*

function renderCards(array) {
  array.forEach((item) => {
    const cardHTML = addNewCard(item.name, item.link);
    cardContainer.append(cardHTML);
  })
}
*/
const infoAddFormValidator = new FormValidator(validateConfig, formInfo)
infoAddFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(validateConfig, formCard)
cardAddFormValidator.enableValidation()

addButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  postInput.value = profilePost.textContent;
  openedPopup(popupInfo);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => close(popup));
});

