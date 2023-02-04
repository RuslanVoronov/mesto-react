import api from '../utils/Api';
import Card from './Card';
import { useEffect, useState } from "react";
function Main(props) {
    const [userName, setUserName] = useState('Загрузка');
    const [userDescription, setUserDescription] = useState('Загрузка');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
    }, []);

    return (
        <main>
            {/*  profile */}
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img src={userAvatar} alt="Аватар" className="profile__avatar-image" />
                        <div onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-info__title">{userName}</h1>
                        <p className="profile-info__subtitle">{userDescription}</p>
                        <button onClick={props.onEditProfile} className="profile-info__edit-button" type="button"></button>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
            </section>

            {/*  elements */}
            <section className="elements">
                {
                    cards.map((card) => {
                        return <Card cardInfo={card} onCardClick={props.onCardClick} key={card._id} />
                    })
                }
            </section>

        </main >
    );
}
export default Main;