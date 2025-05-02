import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/WelcomePage/welcomepage.module.css';
import { API_URL } from '../confing';
import axios from 'axios';

function Loginpagenob() {
    const navigate = useNavigate();

    const btnHandler = (e) => {
        navigate("/login");
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`${API_URL}/api/checkAuth`, { 
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
        <div className={styles.fullheightcontainer}>
            <div className={styles.maincontainer}>
                <div className={styles.logo}>
                    ProWeb
                </div>
                <div className={styles.slogancontainer}>
                    <h1>Учись,<br></br> общайся, <br></br>развивайся!</h1>
                    <button onClick={btnHandler}>Начать</button>
                </div>
            </div>
        </div>
    )
}
export default Loginpagenob