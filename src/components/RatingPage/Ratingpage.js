import React, { useEffect, useState } from 'react';
import styles from '../../styles/ratingpage.module.css';
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ratingpage() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const navigate = useNavigate();
  // get data
  useEffect(() => {
    const checkAuth = async () => { 
      try {
        const response = await axios.get('/api/auth/checkAuth', {withCredentials: true});
        if (!response.data.isAuthenticated) {
          navigate(`/login?redir=${encodeURIComponent("/rating")}`);
        }
      } catch (error) {
        navigate(`/login?redir=${encodeURIComponent("/rating")}`);
        console.log(error);
      }
    };

    const getUsers = async () => {
      try {
        const response = await axios.get('/api/user/by-points-desc', {withCredentials:true});
        console.log(response.data.users);
        setAllUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }

    const getUserID = async () => {
      try {
        console.log('aga')
        const response = await axios.get('/api/auth/me/id', {withCredentials: true});
        const userId = response.data.id;
        setCurrentUserId(parseInt(userId));
        console.log(parseInt(userId));
      } catch (error) {
        
        console.log(error);
      }
    }

    getUsers();
    checkAuth();
    getUserID();
  }, []);

  return (
    <div className={styles.ratingPage}>
      <Header>
        <a href="/main" style={{textDecoration: "none", color: "white"}}>StudentFlow</a>
      </Header>
      <div className={styles.main}>
        <h1>Рейтинг участников</h1>
        
        <div className={styles.tableContainer}>

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
                  <tr key={`${user.id}_${index}`} className={user.id === currentUserId ? styles.active : ``}>
                    <td>{index + 1}</td>
                    <td>{user.id === currentUserId ? `Вы` : `${user.name} ${user.surname}` }</td>
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
    </div>
  )
}

export default Ratingpage