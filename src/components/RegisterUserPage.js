import {React, useState} from 'react';
import axios from 'axios';
import styles from '../styles/registerpage.module.css';

function RegisterUserPage() {
    const [status, setStatus] = useState("форму не отправляли");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fields = [status, lastName, firstName, email, birthDate, password, confirmPassword];

    const handler = async (evt) => {
        evt.preventDefault();

        //Валидация (добавьте более комплексную при необходимости)
        if (password !== confirmPassword) {
            setStatus("Пароли не совпадают");
            return;
        }
        let isEmptyField = false;
        fields.forEach((el) => {if (!el) isEmptyField=true});
        if (isEmptyField) {
            setStatus('Есть незаполненные поля');
            return;
        }

        // console.log("Отправка данных:", {
        //     lastName,
        //     firstName,
        //     email,
        //     birthDate,
        //     password
        // });

        try {
            await axios.post('/api/regUser', {
                lastName,
                firstName,
                email,
                birthDate,
                password
            }, { withCredentials:true });
        } catch (error) {
            
        }

        setLastName("");
        setFirstName("");
        setEmail("");
        setBirthDate("");
        setPassword("");
        setConfirmPassword("");

        setStatus("Форма отправлена!");
    };
        
    
    return (
        <div className={styles.fullheightblock}>
            <div className={styles.headerContainer}>
                <h1>StudentFlow</h1>
            </div>

            <div className={styles.maincontainer}>
                <form className={styles.registerForm}>
                    <h2>Регистрация пользователя</h2>
                    <div className={styles.formInputGroup}>
                        <div className={styles.leftFormPart}>
                            <input type="text" placeholder="ФИО"/>
                            <input type="email" placeholder="E-mail" />
                        </div>
                        <div className={styles.rightFormPart}>
                            <input type="password" placeholder="Придумайте пароль" />
                            <input type="password" placeholder="Повторите пароль" />
                        </div>
                    </div>
                    <div className={styles.formBottom}>
                        <div>
                            <label>Дата рождения</label>
                            <input type="date" />
                        </div>
                    </div>
                    <div className={styles.btnContainer}>
                        <button type="submit">Зарегистрироваться</button>
                        
                    </div>
                    <a className={styles.linkToAcc} href="/login">Уже есть аккаунт?</a>
                </form>
            </div>

            <div className={styles.footerContainer}>
                <span>ProWeb</span>
                
            </div>
        </div>
      );
}

export default RegisterUserPage