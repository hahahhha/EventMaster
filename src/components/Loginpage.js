import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/loginpage.module.css';
import axios from 'axios';
import Header from './Header';

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        email, password
      }, {withCredentials: true});
      setIsError(false);
      navigate('/main');
    } catch (error) {
      setIsError(true);
      console.log(222);
    }
  }

  return (
    <div className={styles.fullHeightContainer}>
      <Header>
        StudentFlow
      </Header>
      
      <div className={styles.mainContainer}>
        <form onSubmit={handler}>
          <div>
            <span>Авторизация</span>
            <input className={`${styles.formInput} ${isError ? styles.error : ''}`}
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder='email'/>
            <div>
              <input className={`${styles.formInput} ${isError ? styles.error : ''}`}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }} 
              placeholder='пароль'/>
            </div>
            <p className={styles.errorLine}>
              {isError ? `Неверный логин или пароль` : ``}
            </p>
            <button type="submit">Войти</button>
            <a href="/forgotpassword">Забыли пароль?</a>
            <a href="/register">Зарегистрироваться</a>
          </div>
        </form>
      </div>

      <div className={styles.footer}>
        ProWeb
      </div>
  </div>
  )
}