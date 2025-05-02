import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../confing'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/mainpage.module.css'

import Eventcard from './Eventcard'

import pic1 from '../assets/event1.jpg';
import pic2 from '../assets/event2.jpg';
import pic3 from '../assets/event3.jpg';

function Mainpage() {
    const navigate = useNavigate();
    // просматривать можно
    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             await axios.get(`${API_URL}/api/checkAuth`, { 
    //                 withCredentials: true 
    //             });
    //         } catch (error) {
    //             console.log('Пользователь не авторизован')
    //             navigate('/');
    //         }
            
    //     }

    //     checkAuth();
    // }, [])
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const getEvents = async () => {
            try {
                const result = await axios.get('/api/events/all');
                setEvents(result.data);
                console.log(result);
            } catch (error) {
                console.error("Ошибка при получении событий:", error);
            }
        };
        getEvents(); 
    }, []);

    return (
        <div className={styles.mainContainer}>
            <section className={styles.topSection}>
                <div className={styles.island}>
                    <span className={styles.logo}>ProWeb</span>
                    <a href="/login">Вход</a>
                    <a href="/register">Регистрация</a>
                    <div className={styles.topSectionSearch}>
                        <input placeholder='Поиск' />
                    </div>
                </div>
                <div className={styles.topSectionTextblock}>
                    <p className={styles.slogan}>Будь в курсе последних новостей!</p>
                    <p className={styles.underSlogan}>
                        Здесь ты можешь посмотреть ленту прошлых и будущих событий УРФУ. 
                        Следить за важными мероприятиями, не пропускать интересные мастер-классы и студенческие активности
                    </p>
                </div>
            </section>

            <section className={styles.eventsSection}>
                <h2>Предстоящие события</h2>
                <div className={styles.eventsBlock}>
                    {
                        events.map((item, index) => (
                            <Eventcard key={index} 
                            description={item.description}
                            date={item.date}
                            img={pic1}
                            evtId={item.event_id}
                            />
                        ))
                    }
                    {/* <Eventcard 
                        description="Хочешь узнать, как создают роботов и нейросети? Приходи на фестиваль 8БИТ"
                        date="04.03"
                        img={pic1}
                        evtId="1"/> */}
                    {/* <Eventcard 
                        description="Как построить карьеру в крупнейшей ИТ-компании России? Начало в 9:30"
                        date="12.03"
                        img={pic2}
                        evtId="2"/>
                    <Eventcard 
                        description="Бесплатные онлайн-курсы по информационной безопасности и QA Mobile от экспертов Т-Банка"
                        date="25.03"
                        img={pic3}
                        evtId="evt"/> */}
                </div>
            </section>
            <section className={styles.eventsSearch}>
                <div className={styles.searchBlock}>
                    <h2>Поиск новостей</h2>
                    <p className={styles.searchSlogan}>Найди себя быстрее</p>
                    <p className={styles.searchSubSlogan}>Здесь ты найдёшь самые интересные для тебя новости быстрее</p>
                    <div className={styles.search}>
                        <input type='text' />
                        <button className={styles.searchBtn}>Искать</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Mainpage