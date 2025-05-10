import React from 'react';
import styles from '../styles/createevt.module.css';
import Header from './Header';

function Createevt() {
  return (
    <>
      <Header>StudentFlow</Header>
      <div className={styles.createEvt}>
        <div className={styles.evtBlock}>
          <p className={styles.slogan}>Создавай, управляй, развлекай</p>
          
          <form>
            <p>Создай свое мероприятие</p>
            <div className={styles.formRow}>
              <div className={styles.leftPart}>
                <label>Название</label>
                <input type="text" placeholder=""/>
                <label>Место</label>
                <input type="text" placeholder=""/>
                <label>Хэштег</label>
                <input type="text" placeholder=""/>
                <label>Дата</label>
                <input type="date"/>
                <label>Загрузите изображение</label>
                <input type="file"/>
              </div>
              <div className={styles.rightPart}>
                <label>Описание</label>
                <textarea placeholder='Описание'></textarea>
              </div>
            </div>
            <div className={styles.bottomArea}>
              <button type='submit'>Создать</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Createevt