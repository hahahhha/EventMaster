import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../styles/eventpage.module.css';
import axios from 'axios';
import { API_URL } from '../confing';
import Header from './Header';
import Blackbtn from './Blackbtn';

import checkIsAuthorized from '../functions/checkIsAuthorized';

function Eventpage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const navigate = useNavigate();

  // проверка, зарегистрирован ли пользователь на мероприятие
  useEffect(() => {
    const getIsUserRegistered = async () => {
      try {
        const response = await axios.get('/api/user/events', {withCredentials: true});
        const registeredEvents = response.data.events;
        console.log(registeredEvents);
        if (registeredEvents.some(evt => evt.id == eventId)) {
          setIsUserRegistered(true);
        }
      } catch (error) {
        console.log('ошибка при получении событий, на которые зарегистрирован пользователь');
        console.log(error);
      }
    }

    getIsUserRegistered();
  }, []);

  const subscribeBtnHandler = async () => {
    if (isUserRegistered)
      return;
    const isAuthed = await checkIsAuthorized();
    console.log(isAuthed)
    if (!isAuthed) {
      const redirectUrl = `/event?id=${eventId}`;
      navigate(`/login?redir=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    try {
      const response = await axios.post('/api/user/regUserOnEvent', {
        event_id: eventId
      }, {withCredentials: true});
      setIsUserRegistered(true);
      eventData.attendees++;
    } catch (error) {
      console.log('не удалось зарегистрировать пользователя на мероприятие');
      console.log(error);
    }
  }

  // получение данных о мероприятии
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/event/${eventId}`, {
          withCredentials: true
        });
        setEventData(response.data.event);
        console.log(response.data.event);
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
      <Header><a href="/main" style={{textDecoration: "none", color: "white"}}>StudentFlow</a></Header>
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
            <div className={styles.row}>
              <Blackbtn onClick={subscribeBtnHandler} isButtonActive={!isUserRegistered}>Записаться</Blackbtn>
              <span className={styles.badge}>
                Участников: {eventData.attendees}
              </span>
            </div>
            <div className={styles.row}>
              <span>{isUserRegistered ? 'Вы зарегистрированы на это мероприятие' : ""}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.mainContainer}`}>
        <h1>{eventData.title}</h1>
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