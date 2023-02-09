function PopupWithForm(props) {
    return (<section className={`${props.isOpen ? 'popup popup_opened' : 'popup'}`} id={`${props.name}-popup`}>
        <div className="popup__content">
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" onSubmit={props.onSubmit} id={`${props.name}-form`} name={`${props.name}-form`} noValidate>

                {props.children}

                <button className="popup__save-button" id={`save-button-${props.name}`} type="submit"
                    >{props.buttonText}</button>
            </form>
            <button onClick={props.onClose} className="popup__close-button" type="button"></button>
        </div>
    </section>);
}
export default PopupWithForm;