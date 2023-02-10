import { useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const [place, setPlace] = useState()
    const [link, setLink] = useState()

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ place, link });
    }

    function handleChangePlace(e) {
        setPlace(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    return (
        <PopupWithForm
            name="card" title="Новое место"
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>

            <input value={place || ''} onChange={handleChangePlace} className="popup__input popup__input_type_place" id="place" name="place" minLength="2"
                maxLength="30" placeholder="Название" required />
            <span className="popup__error" id="place-error"></span>

            <input value={link || ''} onChange={handleChangeLink} className="popup__input popup__input_type_link" id="link" name="link"
                placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup