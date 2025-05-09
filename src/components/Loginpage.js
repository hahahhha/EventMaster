import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/loginpage.module.css';
import axios from 'axios';
import { API_URL } from '../confing';

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handler = async (e) => {
    e.preventDefault();
    
  }

  return (
    <div className={styles.fullHeightContainer}>
      <div className={styles.header}>
        <h1 className={styles.logo}>StudentFlow</h1>
      </div>
      
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
            <a href="">Забыли пароль?</a>
            <a href="">Зарегистрироваться</a>
          </div>
        </form>
      </div>

      <div clsasName={styles.footer}>
        <p>ProWeb</p>
      </div>
  </div>
  )
}