import React, { useEffect } from 'react';
import styles from '../../styles/adminpage.module.css';
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <Header>
        <div className={styles.headerContent}>
          <a href="/main">StudentFlow.</a>
          <a href="/admin">admin</a>
        </div>
      </Header>
      <div className={styles.mainContainer}>

        <div className={`${styles.infoBlock} ${styles.statisticsBlock}`}>
          <h2>Статистика всех мероприятий</h2>
          <p>Здесь вы можете посмотреть данные о каждом мероприятии - 
            от даты проведения до средней оценки и количества человек из каждого института
          </p>
          <button>Открыть статистику</button>
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
      </div>
    </div>
  )
}

export default Adminpage