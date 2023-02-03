function Main(props) {

    return (
        <main>
            {/*  profile */}
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img src="#" alt="Аватар" className="profile__avatar-image" />
                        <div onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-info__title"></h1>
                        <p className="profile-info__subtitle"></p>
                        <button onClick={props.onEditProfile} className="profile-info__edit-button" type="button"></button>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
            </section>

            {/*  elements */}
            <section className="elements">
            </section>

        </main >
    );
}
export default Main;