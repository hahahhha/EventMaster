import React, { useEffect, useState } from 'react';
import Eventcard from '../AdminPage/Eventcard';
import styles from '../../styles/EventManager/eventmanager.module.css';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import Header from '../../components/Header';

import formatDate from '../../functions/formatDate';
import OrganizerHeader from '../OrganizerPage/OrganizerHeader';

function EventManager({getEventsUrl}) {
  const [searchParams, setSearchParams] = useState('');
  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);

  const onSearchBtnClick = async () => {
    setEvents(originalEvents.filter((evt) => evt.title.toLowerCase().includes(searchParams.toLowerCase())));
  }

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get(getEventsUrl, {withCredentials: true});
        setOriginalEvents(response.data.events);
        setEvents(response.data.events);
      } catch (error) {
        setOriginalEvents([]);
        setEvents([]);
      }
    }

    getAllEvents();
  }, [])

  return (
    <div className={styles.eventMngPage}>
      <OrganizerHeader />
      <div className={styles.searchBlock}>
        <div className={styles.inputGroup}>
          <label htmlFor='search'>Поиск по названию</label>
          <input type="text" value={searchParams} onChange={(e) => setSearchParams(e.target.value)}/>
        </div>
        <button className={styles.searchButton} onClick={onSearchBtnClick}>Найти</button>
      </div>
      <div className={styles.eventsBlock}>
        <h1 className={styles.title}>Найденные мероприятия</h1>
        {events.map((item, index) => (
          <Eventcard 
            key={`${item.id}_${index}`}
            title={item.title}
            dateString={formatDate(item.date)}
            link={`/event?id=${item.id}`}
            editLink={`/edit-event?id=${item.id}`}
          />
        ))}
        {events.length === 0 ?
          <span style={{color: 'grey', fontFamily: 'Raleway, Segoe UI'}}>Вы не создавали мероприятий</span> : ``
        }
      </div>
    </div>
  )
}

export default EventManager