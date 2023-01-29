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
const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');
const placeInput = formCard.querySelector('.popup__field_type_place');
const linkInput = formCard.querySelector('.popup__field_type_link');
const popupPic = document.querySelector('.popup__image');
const popupPicName = document.querySelector('.popup__image-caption');
const popupButton = document.querySelector('popup__button');

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('mousedown', closePopupOverlay);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function openedPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('mousedown', closePopupOverlay);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilePost.textContent = postInput.value;
  closePopup(popupInfo);
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function addDeleteCardEventListeners(card) {
  const deleteButton = card.querySelector('.element__button_action_del');
  deleteButton.addEventListener('click', deleteCard);
}

function createCard({ name, link }) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardName = card.querySelector('.element__title');
  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  addDeleteCardEventListeners(card);

  card.querySelector('.element__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
  });

  cardImage.addEventListener('click', () => {
    popupPic.src = link;
    popupPic.alt = name;
    popupPicName.textContent = name;
    openedPopup(popupImage);
  })

  return card
}

function renderCards() {
  initialCards.forEach(item => {
    const cardHTML = createCard(item);
    cardContainer.append(cardHTML);
  })
}

renderCards();

function addNewCard() {
  const newCard = createCard({
    name: placeInput.value,
    link: linkInput.value
  });
  cardContainer.prepend(newCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard();
  evt.target.reset();
  closePopup(popupCard);
}

addButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  postInput.value = profilePost.textContent;
  openedPopup(popupInfo);
});

addCardButton.addEventListener('click', () => {
  openedPopup(popupCard);
});

closeInfoButton.addEventListener('click', () => {
  closePopup(popupInfo);
});

closeAddButton.addEventListener('click', () => {
  closePopup(popupCard);
  });

closeImageButton.addEventListener('click', () => {
  closePopup(popupImage);
});

formInfo.addEventListener('submit', handleProfileFormSubmit);

formCard.addEventListener('submit', handleCardFormSubmit);
