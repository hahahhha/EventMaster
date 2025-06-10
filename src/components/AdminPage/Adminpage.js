import React, { useEffect } from 'react';
import styles from '../../styles/adminpage.module.css';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Eventcard';
import pic from '../../assets/event1.jpg';
import Footer from '../Footer';

function Adminpage() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        const response = await axios.get('/api/auth/me/check-admin-role', { withCredentials:true });
        if (!response.data.isAdminRole) {
          navigate(`/login?redir=${encodeURIComponent('/admin')}`);
        }
      } catch (error) {
        navigate(`/login?redir=${encodeURIComponent('/admin')}`);
      }
    }

    checkIsAdmin();
  }, [])

  return (
    <div className={styles.adminpage}>
      <AdminHeader />
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
            <button>Перейти</button>
          </div>
          <div className={`${styles.infoBlock} ${styles.addAdminBlock}`}>
            <h2>Добавить<br/>администратора</h2>
            <p>
              Можно зарегистрировать или наделить зарегистрированного пользователя правами администратора
            </p>
            <button>Перейти</button>
          </div>
        </div>

        <div className={`${styles.infoBlock} ${styles.statisticsBlock} ${styles.eventsBlock}`}>
          <h2>Управление мероприятиями</h2>
          <p>
            Вы можете создать мероприятие или удалить, изменить дату проведения, отметить участника вручную
          </p>
          <button>Начать</button>
        </div>

        <div className={styles.row}>
          <div className={`${styles.infoBlock} ${styles.profileBlock}`}>
            <h2>Мой профиль</h2>
            <p>
              Можно посмотреть или отредактировать свой профиль
            </p>
            <button>Открыть</button>
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
            <Card
              title="Альфа-Будущее Фест в Екатеринбурге ❤️"
              dateString="10 июня, 14:00-16:00"
              imgSrc={pic}
              link="/event?id=20"
            />
            <Card
              title="Альфа-Будущее Фест в Екатеринбурге ❤️"
              dateString="10 июня, 14:00-16:00"
              imgSrc={pic}
            />
            <Card
              title="Альфа-Будущее Фест в Екатеринбурге ❤️"
              dateString="10 июня, 14:00-16:00"
              imgSrc={pic}
            />
            <Card
              title="Альфа-Будущее Фест в Екатеринбурге ❤️"
              dateString="10 июня, 14:00-16:00"
              imgSrc={pic}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Adminpage