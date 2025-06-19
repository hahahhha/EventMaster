import React from 'react'
import styles from '../../styles/admineventcard.module.css';
import { useNavigate } from 'react-router-dom';

function QrEventCard({ title, dateString, isBorder, onQrCreateClick, isButtonActive }) {
  const navigate = useNavigate();

  return (
    <div className={`${styles.eventCard} ${isBorder ? styles.border : ''}`} >
        <div className={styles.eventData}>
            <h2>{title}</h2>
            <span>{dateString}</span>
        </div>
        <div className={styles.buttonsBlock}>
            <button className={styles.goButton} 
              onClick={() => {onQrCreateClick()}}
              disabled={!isButtonActive}
            >
              Создать QR-код
            </button>
            
        </div>
    </div>
  )
}

export default QrEventCard