import React, { useEffect, useState } from 'react';
import styles from '../../styles/OrganizerPage/qrmodal.module.css';
import axios from 'axios';
import adminOrOrganizerCheck from '../../functions/adminOrOrganizerCheck';

import Linkcard from './QrlinkCard';
import formatDate from '../../functions/formatDate';

function generateUrl(token, id) {
  const url = new URL(
    `/event-qr?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`,
    window.location.origin).toString();
  return url;
}

function MyQrcodesModal({ isActive, setIsActive, createNotify }) {
  const [events, setEvents] = useState([]);
  const fetchAllEvents = async () => {
    try {
      const response = await axios.get('/api/user/my-events-with-qr', {withCredentials: true});
      setEvents(response.data.events);
    } catch (error) {
      createNotify('Что-то пошло не так. Попробуйте перезагрузить страницу', 'error')
    }
  }
  useEffect(() => {
    adminOrOrganizerCheck();
    fetchAllEvents();
  }, []);
  return (
    <div className={`${styles.qrModal} ${isActive ? styles.active : ``}`}>
      <button onClick={() => setIsActive(false)} className={styles.closeButton}>✖</button>
      <h2 style={{textAlign: 'center'}}>Мои QR-коды</h2>
      <div className={styles.eventsCol}>
      {events.map((item, index) => (
        <Linkcard
          key={index}
          title={item.title}
          dateString={formatDate(item.date)}
          isBorder={true}
          qrLink={generateUrl(item.qr_token, item.id)}
          hrefLink={`/event-qr?id=${encodeURIComponent(item.id)}&token=${encodeURIComponent(item.qr_token)}`}
        />))
      }
      </div>
    </div>
  )
}

export default MyQrcodesModal