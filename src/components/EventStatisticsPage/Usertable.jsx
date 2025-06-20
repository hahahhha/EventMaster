import React, { useEffect, useState } from 'react';
import styles from '../../styles/EventStatPage/usertable.module.css';
import axios from 'axios';


const testData = [
  { id: 1, name: 'Алексей Иванов', institute: 'ИРИТ-РтФ' },
  { id: 2, name: 'Мария Петрова', institute: 'ИРИТ-РтФ' },
  { id: 3, name: 'Иван Сидоров', institute: 'ИРИТ-РтФ' },
  { id: 4, name: 'Елена Смирнова', institute: 'ИРИТ-РтФ' },
  { id: 5, name: 'Дмитрий Кузнецов', institute: 'ИРИТ-РтФ' },
];

function Usertable({ eventId, createNotify }) {
  const [attendees, setAttendees] = useState([]);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get(`/api/event/attendees?eventId=${eventId}`, {withCredentials: true, });
      setAttendees(response.data.users);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onRemoveBtnClick = async (userId) => {
    try {
      await axios.delete('/api/event/attendee', { params: {attendeeId: userId, eventId: eventId}, withCredentials: true});
      createNotify('Пользователь успешно удален');
      await fetchAttendees();
    } catch (error) {
      console.log(error);
      createNotify('Не удалось удалить пользователя', 'error');
    }
  }

  useEffect(() => {
    fetchAttendees();
  }, [])

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
            {attendees.map((item, index) => (
              <tr key={item.user_id} className={styles.tr}>
                <td className={styles.td}>{index + 1}</td>
                <td className={`${styles.td}`}>
                  {item.surname} {item.name} {item.patronymic}
                  <button className={styles.removeUserBtn} onClick={() => onRemoveBtnClick(item.user_id)}>Удалить</button>
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