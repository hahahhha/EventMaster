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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [events, setEvents] = useState([]);
    const [isOnlyOneDay, setIsOnlyOneDay] = useState(true);
    const [toDate, setToDate] = useState('');

    // получение сегодняшней даты
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFromDate(formattedDate); // Обновляем состояние
    }, []);
    
    useEffect(() => {
        const getEvents = async () => {
            try {
                const result = await axios.get('/api/event/all');
                setEvents(result.data.events);
                console.log(result.data.events);
            } catch (error) {
                console.error("Ошибка при получении событий:", error);
            }
        };
        getEvents(); 
    }, []);


    // для выпадающего списка, чтобы он закрывался при нажатии мимо него
    useEffect(() => {
        const handleClick = (e) => {
          if (!e.target.closest(`.${styles.dropdown}`) && 
              !e.target.closest(`.${styles.islandSearchBtn}`)) {
                setIsDropdownOpen(false);
          }
        };
        
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
      }, []);

    return (
        <div className={styles.mainContainer}>
            <section className={styles.topSection}>
                <div className={styles.island}>
                    <span className={styles.logo}>StudentFlow</span>
                    <a href="/login">Вход</a>
                    <a href="/register">Регистрация</a>
                    <input placeholder='Поиск' />
                    <button className={styles.searchBtn}>Искать</button>
                    
                    <img 
                        className={styles.islandSearchBtn} 
                        src={accLogo}
                        onClick={() => {setIsDropdownOpen(!isDropdownOpen); console.log(isDropdownOpen)}} // Важно: стрелочная функция
                        alt="Dropdown trigger"
                    />
                    
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            <ul>
                                <li><a href="/profile">Профиль</a></li>
                                <li><a href="/create-evt">Создать мероприятие</a></li>
                                <li><a href="/rating">Рейтинг</a></li>
                            </ul>
                        </div>
                    )}
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
                {/* <h2>Предстоящие события</h2>
                <div className={styles.eventsBlock}>
                    
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
                </div> */}
                <h2>События по дате</h2>
                <div className={styles.dateEventsBlock}>
                    <div className={styles.chooseDateBlock}>
                        <div className={styles.chooseDateInputGroup}>
                            <div className={styles.leftPart}>
                                <label>С какого дня</label>
                                <input 
                                    type="date" 
                                    value={fromDate} 
                                    onChange={e => {setFromDate(e.target.value)}}/>
                            </div>
                            <div className={styles.rightPart}>
                                <label>До какого дня</label>
                                <input 
                                    type="date" 
                                    value={isOnlyOneDay ? '' : toDate} 
                                    disabled={isOnlyOneDay} 
                                    onChange={e => {setToDate(e.target.value)}}/>
                                <div className={styles.oneDaySearch}>
                                    <label>Поиск по одной дате</label>
                                    <input type="checkbox" checked={isOnlyOneDay} onChange={(e) => {setIsOnlyOneDay(!isOnlyOneDay)}}/>
                                </div>
                            </div>
                        </div>
                        <button>Искать</button>
                    </div>
                </div>
                <div className={styles.searchedEventsBlock}>
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