import React, { useEffect, useState } from 'react';
import AdminHeader from '../AdminHeader';
import Footer from '../Footer';
import styles from '../../styles/statisticspage.module.css';
import axios from 'axios';

import EventBar from './EventBar';
import checkIsAdmin from '../../functions/checkIsAdmin';
import { useNavigate } from 'react-router-dom';
import adminOrOrganizerCheck from '../../functions/adminOrOrganizerCheck';
import formatDate from '../../functions/formatDate';

function Statisticspage() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [originalEvents, setOriginalEvents] = useState([]);

    const onSearchButtonClick = function () {
        const res = originalEvents.filter((event) => 
            event.title.toLowerCase().includes(title.toLowerCase()));
        setEvents(res);
    }

    const shortString = function(line) {
        if (line.length <= 50) {
            return line
        }
        return line.substring(0, 47) + '...';
    }

    const setAllEvents = async function () {
        try {
            const response = await axios.get('/api/event/all');
            setEvents(response.data.events);
            setOriginalEvents(response.data.events);
            console.log(response.data.events);
        } catch (error) {
            setEvents([]);
        }
    }
    
    useEffect(() => {
        const check = async () => {
            await adminOrOrganizerCheck('/admin/event-statistics?id=39', navigate);
        }
        check();
        setAllEvents();
    }, [navigate]);

    return (
    <div className={styles.statPage}>
        <AdminHeader />
        <div className={styles.mainContainer}>
            <div className={styles.left}>
                <h1>Статистика мероприятий</h1>
                <div className={styles.searchBlock}>
                    <div className={styles.inputGroup}>
                        <h3>Поиск мероприятия</h3>
                        <label>Поиск по названию</label>
                        <input 
                            placeholder='Введите название...'
                            onChange={(e) => {setTitle(e.target.value)}}
                            value={title}
                        />

                    </div>
                    <button onClick={onSearchButtonClick}>Найти</button>
                </div>
            </div>

            <div className={styles.right}>
                <h2 className={styles.rightTitle}>Найденные мероприятия</h2>
                <div className={styles.events}>
                    {
                        events.map((item, index) => (
                            <EventBar
                                key={`${item.id}_${index}`}
                                title={shortString(item.title)}
                                dateStr={formatDate(item.date)}
                                statLink={`/admin/event-statistics?id=${item.id}`}
                            />
                        ))
                    }
                    {/* <EventBar
                        title="Альфа-Будущее Фест в Екатеринбурге ❤️"
                        statLink=""
                        dateStr="10 июня, 14:00-16:00"
                    /> */}
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Statisticspage