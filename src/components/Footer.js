import React from 'react';
import styles from '../styles/footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footerBlock}>
          <div className={styles.sign}>
            <a href="/main">StudentFlow</a>
            <a href="/admin">By Proweb</a>
          </div>
          <ul>
            <li><a href="/main">Главная</a></li>
            <li><a href="/profile">Профиль</a></li>
            <li><a href="/create-evt">Создать мероприятие</a></li>
            <li><a href="/rating">Рейтинг</a></li>
          </ul>
        </div>
    </div>
  )
}

export default Footer