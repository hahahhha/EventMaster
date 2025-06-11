import React from 'react';
import styles from './eventbar.module.css';
import { useNavigate } from 'react-router-dom';

function EventBar({ title, dateStr, statLink }) {
  const navigate = useNavigate();
  return (
    <div className={styles.eventBar}>
        <h2>{title}</h2>
        <span>{dateStr}</span>
        <button onClick={() => {navigate(statLink)}}>Статистика</button>
    </div>
  )
}

export default EventBar