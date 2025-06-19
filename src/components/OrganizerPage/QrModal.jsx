import React, { useEffect, useState } from 'react';
import styles from '../../styles/OrganizerPage/qrmodal.module.css';
import btnStyles from '../../styles/General/buttons.module.css';
import Eventcard from './QrEventcard';
import axios from 'axios';
import formatDate from '../../functions/formatDate';

import { ToastContainer, toast } from 'react-toastify';


function QrModal({ isActive, setIsActive, createNotify }) {
    const [events, setEvents] = useState([]);
    const [origEvents, setOrigEvents] = useState([]);
    const [searchKeys, setSearchKeys] = useState('');
    const fetchAllEvents = async () => {
        try {
            const response = await axios.get('/api/event/my', {withCredentials:true});
            setEvents(response.data.events);
            setOrigEvents(response.data.events);
        } catch (error) {
            console.log(error);
        }
    }

    const onSearchClick = () => {
        const prop = searchKeys.toLowerCase();
        setEvents(origEvents.filter(item => item.title.toLowerCase().includes(prop)));
    }

    const onCreateQrClick = async (eventId) => {
        try {
            const response = await axios.post('/api/event/create-qr', {
                eventId
            }, {withCredentials: true})
            createNotify('QR-код успешно создан!\nЕго можно посмотреть в разделе "Мои QR-коды"');
        } catch (error) {
            if (error.response.status === 409) {
                createNotify('QR-код для данного мероприятия уже создан. Его можно посмотреть в разделе "Мои QR-коды"', 'error');
            } else {
                createNotify(`Не удалось создать QR-код`, 'error');
            }
        }
    }

    useEffect(() => {
        fetchAllEvents();
    }, [])
    return (
    <div className={`${styles.qrModal} ${isActive ? styles.active : ``}`}>
        <button onClick={() => setIsActive(false)} className={styles.closeButton}>✖</button>
        <div className={`${styles.row} ${styles.top}`}>
            <h2 className={styles.title}>Создание QR-кода</h2>
            <div className={styles.searchBlock}>
                <div className={styles.inputGroup}>
                    <label htmlFor='input'>Поиск мероприятия</label>
                    <input id='input' type='text' placeholder='Введите название...'
                        onChange={(e) => setSearchKeys(e.target.value)}
                        value={searchKeys}
                    />
                </div>
                <button className={btnStyles.blackButton} onClick={onSearchClick}>Искать</button>
            </div>
        </div>  
        <div className={styles.eventsCol}>
            {events.map((item, index) => (
                <Eventcard 
                    key={`${item.id}_${index}`}
                    title={item.title}
                    dateString={formatDate(item.date)}
                    isBorder={true}
                    onQrCreateClick={() => onCreateQrClick(item.id)}
                    isButtonActive={!item.is_qr_created}
                />
            ))}
            {/* <Eventcard
                title="Альфа-Будущее Фест в Екатеринбурге ❤️"
                dateString="10 июня, 14:00-16:00"
                isBorder={true}
            /> */}
            
        </div>
    </div>
  )
}

export default QrModal