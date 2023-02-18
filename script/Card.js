import { handleOpenPopup } from './index.js';

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _addEventListeners() {
    this._element.querySelector('.element__button_action_del').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.element__button').addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleOpenPopup(this._name, this._link));
  }

  _deleteCard() {

    this._element.remove();
  }

  _toggleLike() {
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._addEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._link;

    return this._element;
  }
}
