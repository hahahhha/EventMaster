import React, { useEffect, useState } from 'react';
import styles from '../../styles/ratingpage.module.css';
import Header from '../Header';
import axios from 'axios';

function Ratingpage() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/api/user/by-points-desc', {withCredentials:true});
        console.log(response.data.users);
        setAllUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  return (
    <div className={styles.ratingPage}>
      <Header>
        <a href="/main" style={{textDecoration: "none", color: "white"}}>StudentFlow</a>
      </Header>
      <div className={styles.main}>
        <h1>Рейтинг участников</h1>
        <table>
          <thead>
              <tr>
                  <th>Место</th>
                  <th>ФИО</th>
                  <th>Кол-во очков</th>
              </tr>
          </thead>
          <tbody>
              {allUsers.map((user, index) => (
                <tr key={user.id} className={index==0 ? styles.active : ``}>
                  <td>{index + 1}</td>
                  <td>{index === 0 ? `Вы` : `${user.name} ${user.surname}` }</td>
                  <td>{user.points}</td>
                </tr>
              ))}
              {/* <tr>
                  <td>1</td>
                  <td>Ноунейм</td>
                  <td>100</td>
              </tr> */}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Ratingpage