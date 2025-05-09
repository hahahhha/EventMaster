import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../confing'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/mainpage.module.css'

import Eventcard from './Eventcard'

import pic1 from '../assets/event1.jpg';
import accLogo from '../assets/account_img.svg'

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
                    <span className={styles.logo}>StudentFlow</span>
                    <a href="/login">Вход</a>
                    <a href="/register">Регистрация</a>
                    <div className={styles.topSectionSearch}>
                        <input placeholder='Поиск' />
                        <button className={styles.searchBtn}>
                            Искать
                        </button>
                        <a href='/profile'>
                            <img className={styles.islandSearchBtn} 
                            src={accLogo}/>
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.eventsSection}>
                <div className={styles.topSectionTextblock}>
                    <p className={styles.slogan}>Будь в курсе последних новостей!</p>
                    <p className={styles.underSlogan}>
                        Здесь ты можешь посмотреть ленту прошлых и будущих событий УРФУ. 
                        Следить за важными мероприятиями, не пропускать интересные мастер-классы и студенческие активности
                    </p>
                </div>
                <h2>Предстоящие события</h2>
                <div className={styles.eventsBlock}>
                    {/* {
                        events.map((item, index) => (
                            <Eventcard key={index} 
                            description={item.description}
                            date={item.date}
                            img={pic1}
                            evtId={item.event_id}
                            />
                        ))
                    } */}
                    <Eventcard 
                        description="Хочешь узнать, как создают роботов и нейросети? Приходи на фестиваль 8БИТ"
                        date="04.03"
                        img={pic1}
                        evtId="1"/>
                    <Eventcard 
                        description="Хочешь узнать, как создают роботов и нейросети? Приходи на фестиваль 8БИТ"
                        date="04.03"
                        img={pic1}
                        evtId="1"/>
                </div>
                <h2>События по дате</h2>
                <div className={styles.dateEventsBlock}>
                    <div className={styles.chooseDateBlock}>
                        <div className={styles.chooseDateInputGroup}>
                            <div>
                                <label>С какого дня</label>
                                <input type="date" />
                            </div>
                            <div>
                                <label>До какого дня</label>
                                <input type="date" />
                            </div>
                        </div>
                        <button>Искать</button>
                    </div>
                </div>
                <div className={styles.searchedEventsBlock}>
                    <Eventcard 
                        description="Хочешь узнать, как создают роботов и нейросети? Приходи на фестиваль 8БИТ"
                        date="04.03"
                        img={pic1}
                        evtId="1"/>
                    <Eventcard 
                        description="Хочешь узнать, как создают роботов и нейросети? Приходи на фестиваль 8БИТ"
                        date="04.03"
                        img={pic1}
                        evtId="1"/>
                </div>
            </section>
            <section className={styles.eventsSearch}>
                <div className={styles.searchBlock}>
                    <h2>Поиск новостей</h2>
                    <p className={styles.searchSlogan}>Найди себя быстрее</p>
                    <p className={styles.searchSubSlogan}>Здесь ты найдёшь самые интересные для тебя новости быстрее</p>
                    <div className={styles.search}>
                        <div className={styles.a}>
                            <input type='text' />
                            <button className={styles.searchBtn}>Искать</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Mainpage