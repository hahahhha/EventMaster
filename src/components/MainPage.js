import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../confing'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/mainpage.module.css'

import Eventcard from './Eventcard'

import pic1 from '../assets/event1.jpg';
import accLogo from '../assets/account_img.svg'

import Carousel from './Carousel'

function Mainpage() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [events, setEvents] = useState([]);
    const [isOnlyOneDay, setIsOnlyOneDay] = useState(true);
    const [toDate, setToDate] = useState('');
    const [searchKeys, setSearchKeys] = useState('');

    const setEventsBetweenDates = async (y1, m1, d1, y2, m2, d2) => {
        console.log(y1, m1, d1, y2, m2, d2);
        try {
            const result = await axios.get('/api/event/between', {
                params: { year1: y1, month1: m1, day1: d1,
                    year2: y2, month2: m2, day2: d2 }
            });
            setEvents(result.data.events);
            return result.data.events;
        } catch (error) {
            console.error("Ошибка при получении событий между датами:", error);
            setEvents([]);
        }
    }

    const setEventsByDate = async (year, month, day) => {
        try {
            const result = await axios.get('/api/event/bydate', {
                params: { year, month, day }
            });
            setEvents(result.data.events);
            return result.data.events;
        } catch (error) {
            console.error("Ошибка при получении событий:", error);
            setEvents([]);
        }
    };

    const searchClickHandler = async () => {
        const splittedFrom = fromDate.split('-').map((item) => parseInt(item));
        const splittedTo = toDate.split('-').map((item) => parseInt(item));
        const evts = await setEventsBetweenDates(...splittedFrom, ...splittedTo);
        
        if (searchKeys.trim().length > 0) {
            const searchTerms = searchKeys.toLowerCase().split(/\s+/).filter(term => term);
            setEvents(evts.filter(evt => {
                const title = String(evt.title || '').toLowerCase();
                const description = String(evt.description || '').toLowerCase();
                
                return searchTerms.some(term => 
                    title.includes(term) || description.includes(term)
                );
            }));
        }
    }

    // получение сегодняшней даты и событий на сегодняшнюю дату
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 1–12
        const day = today.getDate();
        
        const formattedMonth = String(month).padStart(2, '0'); // Добавляем ведущий ноль
        const formattedDay = String(day).padStart(2, '0'); // Добавляем ведущий ноль
        const formattedFromDate = `${year}-${formattedMonth}-${formattedDay}`; // Форматируем дату
        setFromDate(formattedFromDate);

        setEventsByDate(year, month, day);
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
                    {/* <input placeholder='Поиск' /> */}
                    {/* <button className={styles.searchBtn}>Искать</button> */}
                    
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
                <h2>События по дате</h2>
                <div className={styles.dateEventsBlock}>
                    <div className={styles.chooseDateBlock}>
                        <div className={styles.chooseDateInputGroup}>
                            <div className={styles.leftPart}>
                                <label>{isOnlyOneDay ? 'В какой день' : 'С какого дня'}</label>
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
                        <label>Ключевые слова</label>
                        <input 
                            type='text' 
                            className={styles.searchInput}
                            onChange={(e) => setSearchKeys(e.target.value)}
                            value={searchKeys}/>
                        <button onClick={() => searchClickHandler()}>Искать</button>
                    </div>
                </div>
                <div className={styles.searchedEventsBlock}>
                    <Carousel visibleItems={3}>
                        {events.map((item) => (
                                <Eventcard 
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                img_url={item.img_url}
                                evtId={item.id}
                                />
                        ))}
                    </Carousel>

                    <i>
                    {events.length === 0 ? 'Мероприятия не найдены...' : ''}
                    </i>
                </div>
            </section>
            {/* <section className={styles.eventsSearch}>
                <div className={styles.searchBlock}>
                    <h2>Поиск новостей</h2>
                    <p className={styles.searchSlogan}>Найди себя быстрее</p>
                    <p className={styles.searchSubSlogan}>Здесь ты найдёшь самые интересные для тебя новости быстрее</p>
                    <div className={styles.search}>
                        <div>
                            <input type='text' />
                            <button className={styles.searchBtn}>Искать</button>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export default Mainpage