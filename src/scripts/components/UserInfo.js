export default class UserInfo {
  constructor({ nameSelector, postSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._postSelector = document.querySelector(postSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      post: this._postSelector.textContent
    };
  }

  setUserInfo({ name, post }) {
    this._nameSelector.textContent = name;
      this._postSelector.textContent = post;
  }
}


