import React, { useEffect, useState } from 'react';
import styles from '../../styles/adminpage.module.css';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Eventcard';
import pic from '../../assets/event1.jpg';
import Footer from '../Footer';
import checkIsAdmin from '../../functions/checkIsAdmin';
import Modal from '../Modal/Modal';

import formatDate from '../../functions/formatDate';

function getCurrentWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (воскресенье) до 6 (суббота)
  
  // Вычисляем понедельник (делаем понедельник первым днём недели)
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
  // Вычисляем воскресенье
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek));
  
  // Приводим время к началу/концу дня
  monday.setHours(0, 0, 0, 0);
  sunday.setHours(23, 59, 59, 999);
  
  return {
    monday,
    sunday
  };
}

function Adminpage() {
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [overlayClass, setOverlayClass] = useState();

  const [weekEvents, setWeekEvents] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    checkIsAdmin('/admin', navigate);
  }, [])

  useEffect(() => {
    if (isOrganizerModalOpen || isAdminModalOpen) {
      setOverlayClass(styles.darkBack)
    } else {
      setOverlayClass(``);
    }
  }, [isOrganizerModalOpen, isAdminModalOpen])

  useEffect(() => {
    const fetchEvents = async () => {
      try {        
        const { monday, sunday } = getCurrentWeekDates();
        
        const response = await axios.get('/api/event/between', {
          params: {
            year1: monday.getFullYear(),
            month1: monday.getMonth() + 1, // месяцы 0-11 → 1-12
            day1: monday.getDate(),
            year2: sunday.getFullYear(),
            month2: sunday.getMonth() + 1,
            day2: sunday.getDate()
          }
        });
        
        setWeekEvents(response.data.events);
      } catch (err) {
        setWeekEvents([]);
      } 
    };
    
    fetchEvents();
  }, []);

  return (
    <div className={`${styles.adminpage} ${overlayClass}`}>
      <AdminHeader />
      <Modal isOpen={isOrganizerModalOpen} title={`Добавить организатора`} 
        setIsOpen={setIsOrganizerModalOpen}
        description={`Вы можете добавить нового пользователя, наделенного правами организатора, или выдать права существующему пользователю`}
        submitText={`Выдать права`}
        cancelText={`Создать пользователя`}
        onCancel={() => {navigate('/admin/reg-organizer')}}
        onSubmit={() => {navigate('/admin/give-organizer')}}
      />
      <Modal isOpen={isAdminModalOpen} title={`Добавить администратора`}
        setIsOpen={setIsAdminModalOpen}
        description={`Вы можете добавить нового пользователя, наделенного правами админа, или выдать права существующему пользователю`}
        submitText={`Выдать права`}
        cancelText={`Создать пользователя`}
        onCancel={() => {navigate('/admin/reg-admin')}}
        onSubmit={() => {navigate('/admin/give-admin')}}
      />
      
      <div className={styles.mainContainer}>

        <div className={`${styles.infoBlock} ${styles.statisticsBlock}`}>
          <h2>Статистика всех мероприятий</h2>
          <p>Здесь вы можете посмотреть данные о каждом мероприятии - 
            от даты проведения до средней оценки и количества человек из каждого института
          </p>
          <button onClick={() => {navigate('/admin/statistics')}}>Открыть статистику</button>
        </div>

        <div className={styles.row}>
          <div className={`${styles.infoBlock} ${styles.addOrgBlock}`}>
            <h2>Добавить<br/>организатора</h2>
            <p>
              Регистрация организатора на сайте или наделение существующего пользователя правами организатора
            </p>
            <button onClick={() => {setIsOrganizerModalOpen(true)}}>Перейти</button>
          </div>
          <div className={`${styles.infoBlock} ${styles.addAdminBlock}`}>
            <h2>Добавить<br/>администратора</h2>
            <p>
              Можно зарегистрировать или наделить зарегистрированного пользователя правами администратора
            </p>
            <button onClick={() => {setIsAdminModalOpen(true)}}>Перейти</button>
          </div>
        </div>

        <div className={`${styles.infoBlock} ${styles.statisticsBlock} ${styles.eventsBlock}`}>
          <h2>Управление мероприятиями</h2>
          <p>
            Вы можете создать мероприятие или удалить, изменить дату проведения, отметить участника вручную
          </p>
          <button onClick={() => navigate('/admin/event-manager')}>Начать</button>
        </div>

        <div className={styles.row}>
          <div className={`${styles.infoBlock} ${styles.profileBlock}`}>
            <h2>Мой профиль</h2>
            <p>
              Можно посмотреть или отредактировать свой профиль
            </p>
            <button onClick={() => navigate('/profile')}>Открыть</button>
          </div>

          <div className={`${styles.infoBlock} ${styles.usersBlock}`}>
            <h2>Все пользователи сайта</h2>
            <p>
              Вся информация о пользователях сайта, можно кого-нибудь заблокировать :)
            </p>
            <button>Перейти</button>
          </div>
        </div>

        <div className={styles.weekEvents}>
          <span className={styles.weekEventsTitle}>Мероприятия этой недели</span>
          <div className={styles.weekEventsBlock}>
            {weekEvents.map((evt, index) => 
              <Card 
                title={evt.title}
                dateString={formatDate(evt.date)}
                link={`/event?id=${evt.id}`}
              />
            )}
            {weekEvents.length === 0 ?
            <span style={{color: 'white', fontFamily: 'Raleway'}}>Мероприятий на этой неделе нет</span> : ``
            }
            {/* <Card
              title="Альфа-Будущее Фест в Екатеринбурге ❤️"
              dateString="10 июня, 14:00-16:00"
              imgSrc={pic}
              link="/event?id=20"
            /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Adminpage