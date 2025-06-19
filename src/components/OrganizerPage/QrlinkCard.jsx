import React, { useState } from 'react'
import styles from '../../styles/admineventcard.module.css';
import btnStyles from '../../styles/General/buttons.module.css';
import { useNavigate } from 'react-router-dom';
import ownStyles from '../../styles/OrganizerPage/qrlinksmodal.module.css'

function QrEventCard({ title, dateString, isBorder, qrLink, createNotify, hrefLink}) {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  return (
    <div className={`${styles.eventCard} ${isBorder ? styles.border : ''}`} >
        <div className={styles.eventData}>
            <h2>{title}</h2>
            <span>{dateString}</span>
        </div>
        <div className={styles.buttonsBlock}>
          <div className={ownStyles.copyButtonBlock}>
            <button 
              className={btnStyles.transparentBlackBorderButton}
              onClick={() => copyTextToClipboard(qrLink)}
            >
              Скопировать ссылку
            </button>
            {isCopied ?
              <span className={ownStyles.copiedText}>Ссылка скопирована!</span> : ``
            }
          </div>
          
          <button 
            className={styles.goButton}
            onClick={() => navigate(hrefLink)}
          >
            Открыть QR-код
          </button>
          
        </div>
    </div>
  )
}

export default QrEventCard