import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/GiveRole/giverole.module.css'
import checkIsAdmin from '../../functions/checkIsAdmin';


function GiveRole({ role, onSubmitButtonClick, email, setEmail, isError }) {
  const navigate = useNavigate();
  useEffect(() => {
    checkIsAdmin('/admin/give-admin', navigate);
  }, []);

  return (
    <div className={styles.giveRolePage}>
        <div className={styles.mainBlock}>
          <h2>Выдача пользователю прав {role}</h2>
          <p>Для этого необходим email пользователя, которому выдаются права</p>
          <div style={{position: "relative", width: "100%"}}>
            <input 
              type='email' 
              placeholder='Введите email пользователя' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={isError ? styles.error : ``}
            />
          
          
            {isError ?
            <span className={styles.errorExplain}>Пользователя с таким email не существует</span> : ``}
          </div>
          <button 
            className={styles.submitButton} 
            onClick={() => onSubmitButtonClick()}
            disabled={email.length === 0}
          >
            Выдать права
          </button>
          <a href="/admin">На главную</a>
        </div>
    </div>
  )
}

export default GiveRole