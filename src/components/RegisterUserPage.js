import {React, useState} from 'react';
import axios from 'axios';
import styles from '../styles/RegisterPage/registerpage.module.css';

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
            <div className={styles.maincontainer}>
            <h1>Регистрация пользователя</h1>
            <form onSubmit={handler}>
                <div className={styles.formcontainer}>
                    <div className={styles.leftpart}>
                        <input 
                            type='text' 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder="Фамилия"/>
                        <input 
                            type='text' 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="Имя"/>
                        <input 
                            type='text' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="e-mail"/>
                        <input 
                            type="date" 
                            value={birthDate} 
                            onChange={(e) => setBirthDate(e.target.value)} 
                            placeholder="Дата рождения"/>
                    </div>
                    <div className={styles.rightpart}>
                        <input 
                            type='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Придумайте пароль"/>
                        <input 
                            type='password' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Повторите пароль"/>
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.regBtn} type='submit'>
                        Зарегистрироваться
                    </button>
                </div>
                <p>{status}</p>
            </form>
            </div>
        </div>
      );
}

export default RegisterUserPage