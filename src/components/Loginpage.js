import React, { useState } from 'react';
import styles from '../styles/LoginPage/loginpage.module.css';
import axios from 'axios';

export default function Loginpage() {
  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  // пока так
  const handler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001', {
        login,
        password: pwd
      });
      console.log(response.status)
      if (response.status === 200) {
        setLogin("успех")
      } else {
        setLogin("неуспех")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
        <form onSubmit={handler}>
            <label>Введите логин</label>
            <input type='text' value={login} onChange={e => setLogin(e.target.value)}></input>
            <label>Введите пароль</label>
            <input type='text' value={pwd} onChange={e => setPwd(e.target.value)}></input>
            <button type='submit'>Войти</button>
        </form>
    </div>
    
  )
}
