import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/eventpage.module.css';
import axios from 'axios';
import { API_URL } from '../confing';
import Header from './Header';
import Blackbtn from './Blackbtn';

function Eventpage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/event/${eventId}`, {
          withCredentials: true
        });
        setEventData(response.data.event);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные мероприятия');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [eventId]);

  if (loading) {
    return <div className={styles.eventPage}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.eventPage}>{error}</div>;
  }

  if (!eventData) {
    return <div className={styles.eventPage}>Мероприятие не найдено</div>;
  }

  return (
    <div className={styles.eventPage}>
      <Header>StudentFlow</Header>
      <div 
        className={styles.container}
        style={{
          backgroundImage: eventData.img_url 
            ? `url(${API_URL}${eventData.img_url})` 
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: '0% 25%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: !eventData.img_url ? '#f0f0f0' : undefined
        }}
      >
        <div className={styles.notify}>
          <div>
            <strong>Не упусти свой шанс!</strong>
            <p>
              Будь там, где рождаются идеи, заводятся полезные знакомства и происходят прорывы.
              Всего один день — а может изменить твой год.
            </p>
          </div>
          <div className={styles.bottom}>
            <Blackbtn>Записаться</Blackbtn>
            <span className={styles.badge}>
              Участников: 0
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles.mainContainer}`}>
        <h2>Что тебя ждёт?</h2>
        <p>{eventData.description}</p>

        <div className={styles.commentsBlock}>
          <span>1 комментарий (тут будут комментарии)</span>
          
            <select 
              // onChange={(e) => onChange(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
              <option value="name_asc">По имени (А-Я)</option>
              <option value="name_desc">По имени (Я-А)</option>
            </select>
        </div>
      </div>
      
    </div>
  );
}

export default Eventpage;