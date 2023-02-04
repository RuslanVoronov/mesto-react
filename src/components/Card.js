function Card({ cardInfo, onCardClick }) {
    function handleClick() {
        onCardClick(cardInfo);
    }

    {/*  elements template */ }
    return (<div className="element">
        <img onClick={handleClick} src={cardInfo.link} alt={cardInfo.name} className="element__image" />
        <button className="element__trash-button" type="button"></button>
        <div className="element__description">
            <h2 className="element__title">{cardInfo.name}</h2>
            <div className="like">
                <button className="like__button" type="button"></button>
                <h3 className="like__counter">{cardInfo.likes.length}</h3>
            </div>
        </div>
    </div>
    )
}
export default Card;