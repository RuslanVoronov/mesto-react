function ImagePopup() {
    return (<section className="popup image-popup" id="image-popup">
        <div className="image-popup__content">

            <img src="#" alt="" className="image-popup__image" />
            <p className="image-popup__name"></p>

            <button className="popup__close-button" type="button"></button>
        </div>
    </section>);
}

export default ImagePopup