function PopupWithForm(props) {
    return (<section className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`${props.name}-popup`}>
        <div className="popup__content">
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" id={`${props.name}-form`} name={`${props.name}-form`} noValidate>

                {props.children}

                <button className="popup__save-button" id={`save-button-${props.name}`} type="submit"
                    disabled={true}>Сохранить</button>
            </form>
            <button onClick={props.onClose} className="popup__close-button" type="button"></button>
        </div>
    </section>);
}
export default PopupWithForm;