import React, { useEffect, useState } from 'react';
import styles from '../../styles/adminpage.module.css';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Eventcard';
import pic from '../../assets/event1.jpg';
import Footer from '../Footer';
import Modal from '../Modal/Modal';

import checkIsAdmin from '../../functions/checkIsAdmin';

function Adminpage() {
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [overlayClass, setOverlayClass] = useState();

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

  return (
    <div className={`${styles.adminpage} ${overlayClass}`}>
      <AdminHeader />
      <Modal isOpen={isOrganizerModalOpen} title={`Добавить организатора`} 
        setIsOpen={setIsOrganizerModalOpen}
        description={`Вы можете добавить нового пользователя, наделенного правами организатора, или выдать права существующему пользователю`}
        submitText={`Выдать права`}
        cancelText={`Создать пользователя`}
        onCancel={() => {navigate('/admin/reg-admin')}}
      />
      <Modal isOpen={isAdminModalOpen} title={`Добавить администратора`}
        setIsOpen={setIsAdminModalOpen}
        description={`Вы можете добавить нового пользователя, наделенного правами админа, или выдать права существующему пользователю`}
        submitText={`Выдать права`}
        cancelText={`Создать пользователя`}
        onCancel={() => {}}
        onSubmit={() => {}}
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