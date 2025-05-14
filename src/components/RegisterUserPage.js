import {React, useState} from 'react';
import axios from 'axios';
import styles from '../styles/registerpage.module.css';
import Header from './Header';

function RegisterUserPage() {
    const [status, setStatus] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState(""); // Добавлено для отчества
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [academicGroup, setAcademicGroup] = useState("");

    const fields = [lastName, firstName, email, birthDate, password, confirmPassword, academicGroup];

    const handler = async (evt) => {
        evt.preventDefault();

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

        try {
            const response = await axios.post('/api/auth/reg', {
                name: firstName,
                surname: lastName,
                patronymic: middleName,
                email,
                password,
                role: "user",
                birth_date: birthDate,
                academic_group: academicGroup
            }, { withCredentials:true });
            
            
            // Очистка полей после успешной отправки
            setLastName("");
            setFirstName("");
            setMiddleName("");
            setEmail("");
            setBirthDate("");
            setPassword("");
            setConfirmPassword("");
            setAcademicGroup("");

            setStatus("Вы зарегистрировались")
        } catch (error) {
            if (error.response.status === 409) {
                setStatus("Пользователь с таким Email уже существует")
            } else {
                setStatus("Ошибка при регистрации пользователя")
            }
            console.log(error);
        }
    };
        
    return (
        <div className={styles.fullheightblock}>
            <Header>
                <a href="/main" style={{textDecoration: "none", color: "white"}}>StudentFlow</a>
            </Header>

            <div className={styles.maincontainer}>
                <form className={styles.registerForm} onSubmit={handler}>
                    <h2>Регистрация пользователя</h2>
                    <p className={styles.formStatus}>{status}</p>

                    <div className={styles.formInputGroup}>
                        <div className={styles.leftFormPart}>
                            <input 
                                type="text" 
                                placeholder="Фамилия"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Отчество"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                            
                        </div>
                        <div className={styles.rightFormPart}>
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Придумайте пароль" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Повторите пароль" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.formBottom}>
                        <div>
                            <label>Группа (для студентов)</label>
                            <input
                                type="text"
                                placeholder='Группа'
                                value={academicGroup}
                                onChange={(e) => setAcademicGroup(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Дата рождения</label>
                            <input 
                                type="date" 
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
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

export default RegisterUserPage;