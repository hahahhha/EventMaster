import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/eventpage.module.css';

function Eventpage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  return (
    <>
      <div className={styles.header}>
        <span className={styles.prowebLogo}>
          ProWeb
        </span>
        <div className={styles.notify}>
          <h2> Не упусти свой шанс!</h2>
          <p>
            Будь там, где рождаются идеи, заводятся полезные знакомства и происходят прорывы. Всего один день — а может изменить твой год.
          </p>
          <div className={styles.notifyBottom}>
            <button className={styles.subscribeBtn}>Записаться</button>
            <span className={styles.guestsAmountBadge}>Кол-во участников: 9</span>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <h2>Что тебя ждёт?</h2>
        <p>
          Хочешь узнать, как создают роботов и нейросети? Приходи на фестиваль 8БИТ. 
          Узнать, как ИИ используют в играх и робототехнике, познакомиться с IT-профессиями будущего,
          увидеть, как обучают роботов и нейросети
        </p>
        <div className={styles.commentsBlock}>
          <span>0 комментариев</span>
          <select>
          <option value="">Упорядочить</option>
            <option value="option1">Сначала новые</option>
            <option value="option2">Сначала старые</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default Eventpage