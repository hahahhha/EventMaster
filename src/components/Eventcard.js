import React from 'react';
import styles from '../styles/eventcard.module.css';

function Eventcard({description, date, img, evtId}) {
  return (
    <div className={styles.evtcard}>
      <img src={img} alt={`Фотография события`}/>
      <time dateTime={date}>{date}</time>
      <p>{description}</p>
      <a href={`/event?id=${evtId}`}>Подробнее...</a>
    </div>
  )
}

export default Eventcard