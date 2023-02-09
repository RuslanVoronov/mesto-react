import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import React from 'react';
import { useState, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Загрузка' });
  const [isProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setIsCardPopupOpened] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  // Запрс карточек
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  // Запрос информации профиля
  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  // ЛАЙК
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Обновление информации пользователя
  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((res) => {
        console.log(res)
        setCurrentUser(res)

        console.log()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    closeAllPopups()
  }

  // Переключение Попапов
  function handleEditAvatarClick() {
    setIsAvatarPopupOpened(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(!isProfilePopupOpened)
  }

  function handleAddPlaceClick() {
    setIsCardPopupOpened(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsCardPopupOpened(false);
    setIsAvatarPopupOpened(false);
    setSelectedCard(null);
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            isOpen={isProfilePopupOpened}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup isOpen={isProfilePopupOpened} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />

          {/*  popup update Avatar */}
          <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} buttonText="Сохранить">
            <input className="popup__input popup__input_type_avatar" id="avatar" name="avatar"
              placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="avatar-error"></span>
          </PopupWithForm>

          {/*  popup Card */}
          <PopupWithForm name="card" title="Новое место" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} buttonText="Сохранить">
            <input className="popup__input popup__input_type_place" id="place" name="place" minLength="2"
              maxLength="30" placeholder="Название" required />
            <span className="popup__error" id="place-error"></span>

            <input className="popup__input popup__input_type_link" id="link" name="link"
              placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="link-error"></span>
          </PopupWithForm>

          {/*  popup question */}
          <PopupWithForm name="question" title="Вы уверены?" onClose={closeAllPopups} buttonText="Да" />
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;
