
export default class Card {
  constructor({ data, templateSelector, userId, handleOpenPopup, handleTrashButtonDelete, handleSetLike, handleRemoveLike }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._handleTrashButtonDelete = handleTrashButtonDelete;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => this._handleTrashButtonDelete());
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__button_active')) {
        this._handleRemoveLike();
      } else {
        this._handleSetLike();
      }
    });
    this._elementImage.addEventListener('click', () => this._handleOpenPopup(this._name, this._link));
  }

  //удаление карточки
  deleteCard() {
    this._element.remove();
  }
  //снять/поставить лайк
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__button_active');
  }
  //проверка стойит ли лайк на карточке
  _checkLikeCard() {
    if (this._likes.find((user) =>
      this._userId === user._id
    )) {
      this._likeButton.classList.add('element__button_active');
    }
  }
  //проверка владельца карточки
  _checkOwner() {
    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__button');
    this._trashButton = this._element.querySelector('.element__button_action_del');
    this._likesCounter = this._element.querySelector('.element__counter');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._likesCounter.textContent = this._likes.length;
    this._checkLikeCard();
    this._checkOwner();

    return this._element;
  }
}
