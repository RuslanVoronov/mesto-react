import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const linkRef = useRef()
    const placeRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        const place = placeRef.current.value
        const link = linkRef.current.value
        props.onAddPlace({ place, link });
    }

    return (
        <PopupWithForm name="card" title="Новое место" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} buttonText="Сохранить">
            <input ref={placeRef} className="popup__input popup__input_type_place" id="place" name="place" minLength="2"
                maxLength="30" placeholder="Название" required />
            <span className="popup__error" id="place-error"></span>

            <input ref={linkRef} className="popup__input popup__input_type_link" id="link" name="link"
                placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup