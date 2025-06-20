import React, { useEffect, useState } from 'react';
import styles from '../../styles/OrganizerPage/organizerpage.module.css';
import OrganizerHeader from './OrganizerHeader';
import Footer from '../Footer';

import btnStyles from '../../styles/General/buttons.module.css';
import mngStyles from '../../styles/General/managepage.module.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Eventcard from '../AdminPage/Eventcard';
import adminOrOrganizerCheck from '../../functions/adminOrOrganizerCheck';
import formatDate from '../../functions/formatDate';
import axios from 'axios';
import QrModal from './QrModal';
import MyQrcodesModal from './MyQrcodesModal';

function OrganizerPage() {
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);
  const [isQrModalActive, setIsQrModalActive] = useState(false);
  const [isMyQrModalActive, setIsMyQrModalActive] = useState(false);

  const createNotify = (msg, type='success') => {
    if (type === 'success') {
      toast.success(msg)
    } else if (type === 'error') {
      toast.error(msg);
    }
  }

  // auth check
  useEffect(() => {
    adminOrOrganizerCheck('/organizer', navigate);
  }, []);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get('/api/event/my', {withCredentials: true});
        setMyEvents(response.data.events);
      } catch (error) {
        setMyEvents([]);
      }
    }
    fetchMyEvents();
  }, [])

  return (
    <div className={`${styles.organizerPage} ${isQrModalActive || isMyQrModalActive ? styles.modalActive : ''}`}>
        <OrganizerHeader />
        {isQrModalActive ?
          <QrModal 
            isActive={isQrModalActive} 
            setIsActive={setIsQrModalActive}
            createNotify={createNotify}
            /> : '' 
        }
        {isMyQrModalActive ?
          <MyQrcodesModal 
            isActive={isMyQrModalActive}
            setIsActive={setIsMyQrModalActive}
            createNotify={createNotify}
          /> : ``
        }
        <div className={mngStyles.mainContainer}>
            <div className={`${mngStyles.infoBlock} ${mngStyles.statisticsBlock}`}>
                <h2>Статистика всех мероприятий</h2>
                <p>Здесь вы можете посмотреть данные о каждом мероприятии - 
                    от даты проведения до средней оценки и количества человек из каждого института, а также удалить участника
                </p>
                <button onClick={() => {navigate('/organizer/statistics')}}>Открыть статистику</button>
            </div>

            <div className={`${mngStyles.infoBlock} ${mngStyles.statisticsBlock} ${mngStyles.eventsBlock}`}>
              <h2>Управление мероприятиями</h2>
              <p>
                Вы можете создать мероприятие или удалить, изменить дату проведения, отметить участника вручную
              </p>
              <button onClick={() => navigate('/organizer/event-manager')}>Начать</button>
            </div>

            <div className={mngStyles.row}>
              <div className={`${mngStyles.infoBlock} ${mngStyles.profileBlock}`}>
                <h2>Мой профиль</h2>
                <p>
                  Можно посмотреть или отредактировать свой профиль
                </p>
                <button onClick={() => navigate('/profile')}>Открыть</button>
              </div>

              <div className={`${mngStyles.infoBlock} ${mngStyles.usersBlock}`}>
                <h2>Создать QR-код для мероприятия</h2>
                <p>
                  QR-код для учета присутствия гостей <br/>на мероприятии
                </p>
                <div className={styles.buttonLinkBlock}>
                  <button onClick={() => setIsQrModalActive(true)}>Перейти</button>
                  <a href="/my-qrcodes" onClick={(e) => {
                    e.preventDefault();
                    setIsMyQrModalActive(true);
                  }}>Мои QR-коды</a>
                </div>
              </div>
          </div>
          <div className={mngStyles.myEventsBlock}>
            <h2 className={mngStyles.title}>Мои мероприятия</h2>
            {myEvents.map((item, index) => (
              <Eventcard
                key={index}
                title={item.title}
                dateString={formatDate(item.date)}
                link={`/event?id=${item.id}`}
              />
            ))}
            {myEvents.length === 0 ? 
            <span style={{color: 'grey', fontFamily: 'Raleway, Segoe UI'}}>Вы не создавали мероприятий</span> : ``}
            {/* <Eventcard
              title="Альфа-Будущее Фест в Екатеринбурге ❤️"
              dateString="10 июня, 14:00-16:00"
              link="/event?id=20"
            />  */}
          </div>
        </div>


        <Footer />
        <ToastContainer />
    </div>
  )
}

export default OrganizerPage