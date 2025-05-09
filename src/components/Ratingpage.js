import React from 'react';
import styles from '../styles/ratingpage.module.css';

function Ratingpage() {
  return (
    <>
      <div className={styles.header}>
        <span>StudentFlow</span>
      </div>
      <div className={styles.main}>
        <h1>Рейтинг участников</h1>
        <table>
          <thead>
              <tr>
                  <th>Место</th>
                  <th>Имя</th>
                  <th>Кол-во очков</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>1</td>
                  <td>Ноунейм</td>
                  <td>100</td>
              </tr>
              <tr>
                  <td>2</td>
                  <td>Хаххих</td>
                  <td>99</td>
              </tr>
          </tbody>
        </table>

      </div>
    </>
  )
}

export default Ratingpage