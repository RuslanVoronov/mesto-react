import { useState } from "react"
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name)
    const [description, setDescription] = useState(currentUser.description)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }


    return (
        <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить"
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit} >

            <input className="popup__input popup__input_type_name" value={name} onChange={handleChangeName} id="name" name="name" minLength="2"
                maxLength="40" placeholder="Имя" required />
            <span className="popup__error" id="name-error"></span>

            <input className="popup__input popup__input_type_job" value={description} onChange={handleChangeDescription} id="job" name="about" minLength="2"
                maxLength="200" placeholder="Род деятельности" required />
            <span className="popup__error" id="job-error"></span>

        </PopupWithForm>
    )
}

export default EditProfilePopup;