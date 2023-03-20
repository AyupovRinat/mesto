export default class UserInfo {
  constructor({ nameSelector, postSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._postSelector = document.querySelector(postSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      post: this._postSelector.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._nameSelector.textContent = name;
    this._postSelector.textContent = about;
  }

getUserId() {
  return this._id;
}

setUserAvatar({ avatar }) {
  this._avatarSelector.src = avatar;
}
}
