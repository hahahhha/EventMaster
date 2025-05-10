import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/loginpage.module.css';
import axios from 'axios';
import { API_URL } from '../confing';
import Header from './Header';

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handler = async (e) => {
    e.preventDefault();
    
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
            <input className={styles.formInput}
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder='email'/>
            <div>
              <input className={styles.formInput}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }} 
              placeholder='пароль'/>
            </div>
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