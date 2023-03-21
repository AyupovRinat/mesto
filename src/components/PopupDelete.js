import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButton = this._popupElement.querySelector('.popup__button');
    this._popupButtonTextContent = this._popupButton.textContent
  }

  setSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', () => {
      this._handleSubmit();
    })
  }

  renderLoadingDelete(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Удаление...'
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }
}

