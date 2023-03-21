import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = this._popupElement.querySelector('.popup__image');
    this._popupPicName = this._popupElement.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._popupPic.src = link;
    this._popupPic.alt = name;
    this._popupPicName.textContent = name;
    super.open();
  }
}
