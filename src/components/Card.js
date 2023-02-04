function Card(props) {
    function handleClick() {
        props.onCardClick(props.cardInfo);
    }

    {/*  elements template */ }
    return (<div className="element">
        <img onClick={handleClick} src={props.cardInfo.link} alt="" className="element__image" />
        <button className="element__trash-button" type="button"></button>
        <div className="element__description">
            <h2 className="element__title">{props.cardInfo.name}</h2>
            <div className="like">
                <button className="like__button" type="button"></button>
                <h3 className="like__counter">{props.cardInfo.likes.length}</h3>
            </div>
        </div>
    </div>
    )
}
export default Card;