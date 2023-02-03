import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from "react";

function App() {
  const [isProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setIsCardPopupOpened] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpened] = useState(false);

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
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <Footer />
        <ImagePopup />

        {/*  popup profile */}
        <PopupWithForm name="profile" title="Редактировать профиль" onClose={closeAllPopups} isOpen={isProfilePopupOpened}>
          <input className="popup__input popup__input_type_name" id="name" name="name" minLength="2"
            maxLength="40" placeholder="Имя" required />
          <span className="popup__error" id="name-error"></span>

          <input className="popup__input popup__input_type_job" id="job" name="about" minLength="2"
            maxLength="200" placeholder="Род деятельности" required />
          <span className="popup__error" id="job-error"></span>
        </PopupWithForm>

        {/*  popup update Avatar */}
        <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
          <input className="popup__input popup__input_type_avatar" id="avatar" name="avatar"
            placeholder="Ссылка на картинку" type="url" required />
          <span className="popup__error" id="avatar-error"></span>
        </PopupWithForm>

        {/*  popup Card */}
        <PopupWithForm name="card" title="Новое место" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
          <input className="popup__input popup__input_type_place" id="place" name="place" minLength="2"
            maxLength="30" placeholder="Название" required />
          <span className="popup__error" id="place-error"></span>

          <input className="popup__input popup__input_type_link" id="link" name="link"
            placeholder="Ссылка на картинку" type="url" required />
          <span className="popup__error" id="link-error"></span>
        </PopupWithForm>

        {/*  popup question */}
        <section className="popup" id="question-popup">
          <div className="popup__content">
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__save-button" id="question-btn" type="button">Да</button>
            <button className="popup__close-button" type="button"></button>
          </div>
        </section>

        {/*  elements template */}
        <template className="template">
          <div className="element">
            <img src="#" alt="" className="element__image" />
            <button className="element__trash-button" type="button"></button>
            <div className="element__description">
              <h2 className="element__title"></h2>
              <div className="like">
                <button className="like__button" type="button"></button>
                <h3 className="like__counter"></h3>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div >
  );
}

export default App;
