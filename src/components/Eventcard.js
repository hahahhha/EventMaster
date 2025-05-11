import React from 'react';
import styles from '../styles/eventcard.module.css';
import { API_URL } from '../confing';

function shortString(text) {
    if (text.length <= 100) {
        return text;
    }
    const res = text.substring(0, 100) + "...";
    console.log(res);
    return res;
}

function Eventcard({ title, description, date, img_url, evtId }) {
  // Функция для форматирования даты в формате MM.DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Получаем месяц (добавляем 1, так как месяцы начинаются с 0)
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // Получаем день
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${month}.${day}`;
  };

  return (
    <div className={styles.evtcard}>
      <img src={`${API_URL}${img_url}`} alt={`Фотография события`} />
      <p>{title}</p>
      <time dateTime={date}>{formatDate(date)}</time>
      <p>{shortString(description)}</p>
      <a href={`/event?id=${evtId}`}>Подробнее...</a>
    </div>
  );
}

export default Eventcard;