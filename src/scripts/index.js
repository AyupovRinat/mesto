import '../pages/index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import { initialCards, validateConfig, addButton, addCardButton, formInfo, formCard, nameInput, postInput } from './utils.js'

//создание попапа с большой картинкой
const popupBigImage = new PopupWithImage('.popup_big-image');
popupBigImage.setEventListeners();

//создание новой карточки
const createCard = ({ name, link }) => {
  const card = new Card({
    name,
    link,
    templateSelector: '.card-template',
    handleOpenPopup: (name, link) => { popupBigImage.open(name, link) }
  });

  const cardElement = card.generateCard();
  return cardElement;
}

//добавление секции
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
},
  '.elements'
);

cardList.rendererItems();
//создание формы редактирования попапкард
const addPopup = new PopupWithForm({
  popupSelector: '.popup_card-add',
  handleFormSubmit: (data) => {
    cardList.addItem(createCard(data))
  }
});

addPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
  addPopup.open();
})

//создание профиля пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  postSelector: '.profile__post'
});

//создание формы редактирования профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_info',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

profilePopup.setEventListeners();

addButton.addEventListener('click', () => {
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  postInput.value = dataUser.post;
  profilePopup.open();
});

//валидация попапинфо
const infoAddFormValidator = new FormValidator(validateConfig, formInfo)
infoAddFormValidator.enableValidation()
//валидация попапкард
const cardAddFormValidator = new FormValidator(validateConfig, formCard)
cardAddFormValidator.enableValidation()

