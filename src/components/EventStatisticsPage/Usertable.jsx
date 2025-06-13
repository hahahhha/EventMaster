import React from 'react';
import styles from '../../styles/EventStatPage/usertable.module.css';


const testData = [
  { id: 1, name: 'Алексей Иванов', institute: 'ИРИТ-РтФ' },
  { id: 2, name: 'Мария Петрова', institute: 'ИРИТ-РтФ' },
  { id: 3, name: 'Иван Сидоров', institute: 'ИРИТ-РтФ' },
  { id: 4, name: 'Елена Смирнова', institute: 'ИРИТ-РтФ' },
  { id: 5, name: 'Дмитрий Кузнецов', institute: 'ИРИТ-РтФ' },
];

function Usertable() {
  const onRemoveBtnClick = async (userId) => {
    // console.log()
  }

  return (
    <div className={styles.userTableContainer}>
      <h2 className={styles.title}>Посетители мероприятия</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>№</th>
              <th className={styles.th}>ФИО</th>
              <th className={styles.th}>Институт</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item) => (
              <tr key={item.id} className={styles.tr}>
                <td className={styles.td}>{item.id}</td>
                <td className={`${styles.td}`}>
                  {item.name}
                  <button className={styles.removeUserBtn}>Удалить</button>
                </td>
                <td className={styles.td}>{item.institute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usertable