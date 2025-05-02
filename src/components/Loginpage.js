import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginPage/loginpage.module.css';
import axios from 'axios';
import { API_URL } from '../confing';

export default function Loginpage() {
  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handler = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`/api/login`, {
        login: login,
        password: pwd
      }, { withCredentials: true });
      navigate('/main');
    } catch (error) {
      console.log('not entered')
    }
  }

  return (
    <div className={styles.fullheightblock}>
      <div className={styles.maincontainer}>
          <div className={styles.formContainer}>
              <h1>ProWeb</h1>
              <form>
                  <input type="text" 
                    placeholder="Email" 
                    value={login} 
                    onChange={(e) => {setLogin(e.target.value); console.log(login)}}/>

                  <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={pwd}
                    onChange={(e) => {setPwd(e.target.value)}}/>
                  <div>
                      <button onClick={handler}>Войти</button>
                      <a href="/register">Зарегистрироваться</a>
                      <a href="/forgotpassword">Забыли пароль?</a>                      
                  </div>
              </form>
          </div>
      </div>
  </div>
  )
}