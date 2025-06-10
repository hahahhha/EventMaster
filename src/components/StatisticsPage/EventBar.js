import React from 'react';
import styles from './eventbar.module.css';

function EventBar({ title, dateStr, statLink }) {
  return (
    <div className={styles.eventBar}>
        <h2>{title}</h2>
        <span>{dateStr}</span>
        <button>Статистика</button>
    </div>
  )
}

export default EventBar