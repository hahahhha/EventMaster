import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/profilepage.module.css';
import Header from './Header';
import Blackbtn from './Blackbtn';
import checkIsAuthorized from '../functions/checkIsAuthorized';
import axios from 'axios';

function Profilepage() {
    const navigate = useNavigate();
    const [isAuthChecked, setIsAuthChecked] = useState(false); // Добавляем флаг проверки
    const [userData, setUserData] = useState({});
    const [visitedEvents, setVisitedEvents] = useState([])

    const convertDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        // Берём UTC-компоненты, игнорируя локальный сдвиг
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");

        return `${year}-${month}-${day}`; // "2006-04-26"
    };

    const shortString = (str, len) => {
        if (str.length <= len) return str;
        return str.substring(0, len - 3) + '...';
    }

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthed = await checkIsAuthorized();
            setIsAuthChecked(true);
            
            if (!isAuthed) {
                const redirectUrl = `/profile`;
                navigate(`/login?redir=${encodeURIComponent(redirectUrl)}`);
            } else {
                try {
                    const response = await axios.get('/api/auth/me', { withCredentials: true });
                    const userInfo = response.data.user;
                    console.log(userInfo);
                    // Преобразуем birth_date, даже если её нет (чтобы не было ошибок)
                    const formattedBirthDate = convertDate(userInfo.birth_date);
                    
                    // Создаём новый объект с обновлённой датой
                    const updatedUserData = {
                        ...userInfo, // Копируем все поля
                        birth_date: formattedBirthDate, // Перезаписываем дату
                    };
                    
                    setUserData(updatedUserData);
                } catch (error) {
                    console.error('Не удалось получить информацию о пользователе', error);
                }

                try {
                    const response = await axios.get('/api/user/events', {withCredentials: true});
                    console.log(response.data.events);
                    setVisitedEvents(response.data.events);
                } catch (error) {
                    console.log('Не удалось получить события пользователя', error);
                }
            }
        };
        checkAuth();
    }, [navigate]);

    return (
    <div className={styles.profilePage}>
        <Header>
            <a href="/main" style={{textDecoration: "none", color: "white"}}>StudentFlow</a>
        </Header>
        <div className={styles.mainContainer}>
            <div className={styles.mainBlock}>
                <h1>Мой профиль</h1>
                <div className={styles.row1}>
                    <div className={styles.leftPart}>
                        <div className={styles.nameBlock}>
                            <div className={styles.circle}></div>
                            <div className={styles.shortInfo}>
                                <p className={styles.fullName}>{userData.surname} {userData.name} {userData.patronymic}</p>
                                <p className={styles.email}>{userData.email}</p>
                            </div>
                        </div>
                        <div className={styles.emailBlock}>
                            <p className={styles.email}>Мой email адрес</p>
                            <div className={styles.row1}>
                                <input 
                                    type="text" 
                                    value={userData.email}
                                    disabled={true}
                                />
                                <button className={styles.editEmailBtn} disabled={true}>Редактировать</button>
                            </div>
                        </div>
                        <div className={styles.visitedEventsBlock}>
                            <p className={styles.title}>Посещенные мероприятия</p>
                            <p>{visitedEvents.length === 0 ? "Вы не посещали мероприятий" : ""}</p>
                            {
                                visitedEvents.map((evt) => 
                                    <a key={evt.id} href={`/event?id=${evt.id}`}>{shortString(evt.title, 40)}</a>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.rightPart}>
                        <div className={styles.fullInfoBlock}>
                            <div className={styles.col1}>
                                <label>Фамилия</label>
                                <input type="text" value={userData.surname} disabled={true}/>
                                <label>Имя</label>
                                <input type="text" value={userData.name} disabled={true}/>
                                <label>Отчество</label>
                                <input type="text" value={userData.patronymic} disabled={true}/>
                                <label>Академическая группа</label>
                                <input type="text" value={userData.academic_group} disabled={true}/>
                                <label>Дата рождения</label>
                                <input type="date" value={userData.birth_date} disabled={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profilepage