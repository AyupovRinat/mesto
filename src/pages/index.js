import './index.css';

import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDelete from '../components/PopupDelete.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import { validateConfig, addButton, addCardButton, addAvatarButton, nameInput, postInput, formCard, formInfo, formAvatar, avatarInput } from '../utils/utils.js';
import { data } from 'autoprefixer';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '37918c5a-1849-4968-ae4d-7bdddd76f52b',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardList.rendererItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

let userId;

//создание профиля пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  postSelector: '.profile__post',
  avatarSelector: '.profile__avatar'
});

//создание формы редактирования попапкард
const addPopup = new PopupWithForm({
  popupSelector: '.popup_card-add',
  handleFormSubmit: (dataForm) => {
    addPopup.renderLoading(true);
    api.addNewCard(dataForm)
      .then((data) => {
        cardList.addItem(createCard(data));
        addPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addPopup.renderLoading(false);
      })
  }
});

addPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
  addPopup.open();
})

//создание формы редактирования профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_info',
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.editUserInfo(data)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      })
  }
});

profilePopup.setEventListeners();

addButton.addEventListener('click', () => {
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  postInput.value = dataUser.post;
  profilePopup.open();
});

//создание формы редактирования аватара
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.editUserAvatar(data)
      .then((dataForm) => {
        userInfo.setUserAvatar(dataForm);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      })
  }
});

avatarPopup.setEventListeners();

addAvatarButton.addEventListener('click', () => {
  avatarPopup.open()
});

//создание попапа с удалением
const deletePopup = new PopupDelete('.popup_delete');
deletePopup.setEventListeners();

//создание попапа с большой картинкой
const popupBigImage = new PopupWithImage('.popup_big-image');
popupBigImage.setEventListeners();

//создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '.card-template',
    handleOpenPopup: (name, link) => {
      popupBigImage.open(name, link)
    },
    userId,
    handleTrashButtonDelete: () => {
      //Секунду подумаю
      deletePopup.open();
      deletePopup.setSubmit(() => {
        deletePopup.renderLoadingDelete(true);
        api.deleteCard(data._id)
          .then(() => {
            card.deleteCard(),
              deletePopup.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            deletePopup.renderLoadingDelete(false);
          })
      })
    },
    handleSetLike: () => {
      api.setlike(data._id)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    },
    handleRemoveLike: () => {
      api.deleteLike(data._id)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

//добавление секции
const cardList = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  }
},
  '.elements'
);

//валидация попапинфо
const infoAddFormValidator = new FormValidator(validateConfig, formInfo)
infoAddFormValidator.enableValidation()
//валидация попапкард
const cardAddFormValidator = new FormValidator(validateConfig, formCard)
cardAddFormValidator.enableValidation()
//валидаци попапаватар
const avatarAddFormValidator = new FormValidator(validateConfig, formAvatar)
avatarAddFormValidator.enableValidation()

