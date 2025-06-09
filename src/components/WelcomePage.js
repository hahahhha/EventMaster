import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/welcomepage.module.css';
import { API_URL } from '../confing';
import axios from 'axios';

function Loginpagenob() {
    const navigate = useNavigate();

    const btnHandler = (e) => {
        navigate("/main");
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`/api/auth/checkAuth`, { 
                    withCredentials: true 
                });
                navigate("/main");
            } catch (error) {
                console.log("Пользователь не авторизован");
            }
        };

        checkAuth();
    }, [navigate])

    return (
        <div className={styles.fullHeightContainer}>
            <div className={styles.sloganContainer}>
                <span className={styles.logo}>StudentFlow</span>
                <h1>Учись,<br></br> общайся, <br></br>развивайся!</h1>
                <button onClick={btnHandler}>Начать</button>
            </div>
            <div className={styles.imgContainer}></div>
        </div>
    )
}
export default Loginpagenob