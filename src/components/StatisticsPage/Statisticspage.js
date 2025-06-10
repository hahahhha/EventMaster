import React from 'react';
import AdminHeader from '../AdminHeader';
import Footer from '../Footer';
import styles from '../../styles/statisticspage.module.css';

import EventBar from './EventBar';

function Statisticspage() {
  return (
    <div className={styles.statPage}>
        <AdminHeader />
        <div className={styles.mainContainer}>
            <div className={styles.left}>
                <h1>Статистика мероприятий</h1>
                <div className={styles.searchBlock}>
                    <div className={styles.inputGroup}>
                        <label>Поиск по названию</label>
                        <input placeholder='Введите название...'/>
                    </div>
                    <button>Найти</button>
                </div>
            </div>

            <div className={styles.right}>
                <h2>Найденные мероприятия</h2>
                <EventBar
                    title="Альфа-Будущее Фест в Екатеринбурге ❤️"
                    statLink=""
                    dateStr="10 июня, 14:00-16:00"
                />
            </div>
        </div>
        {/* <Footer /> подумать чтобы он нормально внизу был */}
    </div>
  )
}

export default Statisticspage