import React from 'react'
import styles from '../../styles/admineventcard.module.css';
import { useNavigate } from 'react-router-dom';

function Eventcard({ title, dateString, imgSrc, link }) {
  const navigate = useNavigate();


  return (
    <div className={styles.eventCard}>
        <div className={styles.eventData}>
            <h2>{title}</h2>
            <span>{dateString}</span>
        </div>
        <div className={styles.buttonsBlock}>
            <button className={styles.editButton}>
              Редактировать
            </button>
            <button className={styles.goButton} 
              onClick={() => {navigate(link)}}
            >
              Перейти
            </button>
            
        </div>
    </div>
  )
}

export default Eventcard