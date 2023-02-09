import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    closeAllPopups()
  }
  // Обновление аватара
  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    closeAllPopups()
  }

  // Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
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
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup isOpen={isProfilePopupOpened} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />

          {/*  popup question */}
          <PopupWithForm name="question" title="Вы уверены?" onClose={closeAllPopups} buttonText="Да" />
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;
