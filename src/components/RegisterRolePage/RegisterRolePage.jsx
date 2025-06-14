import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/RegisterRolePage/registerrolepage.module.css';
import axios from 'axios';
import VerfiyBlock from './VerifyBlock';
import checkIsAdmin from '../../functions/checkIsAdmin';

function RegisterRolePage({ role, regUrl }) {
  const navigate = useNavigate();
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const [goAwayClass, setGoAwayClass] = useState(``);
  const [emailBlockActiveClass, setEmailBlockActiveClass] = useState('');

  const [isCodeSubmitBtnActive, setIsCodeSubmitBtnActive] = useState(false);
  const [codeStr, setCodeStr] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(true);

  // Состояния для полей ввода
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    group: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  });

  const [errorClasses, setErrorClasses] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    group: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  })

  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);

  useEffect(() => {
    checkIsAdmin('/admin/reg-admin', navigate);
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formCorrectChecker = () => {
    let currentErrors = {
      firstName: '',
      lastName: '',
      middleName: '',
      group: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthdate: ''
    }
    let isAnyErrors = false;
    if (!formData.firstName) {
      currentErrors.firstName = styles.error;
      isAnyErrors = true;
    } else {
      currentErrors.firstName = '';
    }

    if (!formData.lastName) {
      currentErrors.lastName = styles.error;
      isAnyErrors = true;
    } else {
      currentErrors.lastName = '';
    }
    
    if (!formData.password) {
      currentErrors.password = styles.error;
      isAnyErrors = true;
    } else {
      currentErrors.password = '';
    }

    if (!formData.confirmPassword) {
      currentErrors.confirmPassword = styles.error;
      isAnyErrors = true;
    } else {
      currentErrors.confirmPassword = '';
    }

    if (formData.password !== formData.confirmPassword) {
      currentErrors.password = styles.error;
      currentErrors.confirmPassword = styles.error;
      setIsPasswordsEqual(false)
    } else if (formData.password && formData.confirmPassword) {
      currentErrors.confirmPassword = '';
      currentErrors.password = '';
      setIsPasswordsEqual(true);
    }

    if (!formData.birthdate) {
      currentErrors.birthdate = styles.error;
      isAnyErrors = true;
    } else {
      currentErrors.birthdate = ``;
    }

    if (!formData.email) {
      currentErrors.email = styles.error;
      isAnyErrors = true;
    } else {
      currentErrors.email = ``;
    }

    setErrorClasses(currentErrors);
    if (isAnyErrors) {
      return false;
    }
    return true;
  }

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    if (!formCorrectChecker()) {
      return;
    }
    if (formData.confirmPassword !== formData.password) {
      setIsPasswordsEqual(false);
      return;
    } else {
      setIsPasswordsEqual(true);
    }
    try {
      await axios.post(regUrl, {
        name: formData.firstName,
        surname: formData.lastName,
        partonymic: formData.middleName,
        password: formData.password,
        birth_date: formData.birthdate,
        email: formData.email

      }, {withCredentials: true});

      // await axios.post('/api/auth/login', {
      //   email: formData.email,
      //   password: formData.password
      // }, {withCredentials: true});

      setGoAwayClass(styles.unactive);
      setErrorClasses({firstName: '',
        lastName: '',
        middleName: '',
        group: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthdate: ''
      });
      console.log(formData.birthdate);
      setGoAwayClass(styles.unactive);
      setEmailBlockActiveClass(styles.active);
      setIsEmailTaken(false);
    } catch (error) {
      setIsEmailTaken(true);
      console.error('Ошибка регистрации:', error);
    }
  };
  
  const sendCode = async () => {
    console.log(codeStr);
    try {
      await axios.post('/api/auth/verify-admin', {
          email: formData.email,
          code: codeStr
        }, {withCredentials: true});
      console.log('success')
      setIsCodeCorrect(true);
      navigate(`/main?notify=Новый пользователью с ролью ${role} успешно зарегистрирован`);
    } catch (error) {
      console.log(error);
      setIsCodeCorrect(false);
    }
  }

  return (
    <div className={`${styles.registerRolePage}`}>
      <div className={`${styles.formContainer} ${goAwayClass}`}>
        <form onSubmit={onFormSubmit}>
          <div className={styles.topRow}>
            <h1>Регистрация {role}</h1>
            <a href="/admin" className={styles.closeButton}>✕</a>
          </div>
          <div className={styles.row}>
            <div className={`${styles.col} ${styles.leftCol}`}>
              <div className={styles.inputGroup}>
                <label htmlFor='firstName'>Имя</label>
                {errorClasses.firstName ? 
                  <span className={styles.errorExplain}>Поле является обязательным</span> : ``
                }
                <input 
                  id='firstName' 
                  name='firstName'
                  type='text' 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder='Введите имя'
                  className={errorClasses.firstName}
                />
                
              </div>
              <div className={styles.inputGroup}>
                
                <label htmlFor='lastName'>Фамилия</label>
                {errorClasses.lastName ? 
                  <span className={styles.errorExplain}>Поле является обязательным</span> : ``
                }
                <input 
                  id='lastName' 
                  name='lastName'
                  type='text' 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder='Введите фамилию'
                  className={errorClasses.lastName}
                />
                
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='middleName'>Отчество (при наличии)</label>
                <input 
                  id='middleName' 
                  name='middleName'
                  type='text' 
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder='Введите отчество'
                  className={errorClasses.middleName}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='group'>Академ. группа (при наличии)</label>
                <input 
                  id='group' 
                  name='group'
                  type='text' 
                  value={formData.group}
                  onChange={handleInputChange}
                  placeholder='Введите группу'
                  className={errorClasses.group}
                />
              </div>
            </div>

            <div className={`${styles.col} ${styles.rightCol}`}>
              <div className={styles.inputGroup}>
                
                <label htmlFor='email'>Email</label>
                {errorClasses.email ? 
                  <span className={styles.errorExplain}>Поле является обязательным</span> : ``
                }
                {isEmailTaken ?
                  <span className={styles.errorExplain}>Email занят</span> : ``
                }
                <input 
                  id='email' 
                  name='email'
                  type='email' 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='example@mail.ru'
                  className={`${errorClasses.email} ${isEmailTaken ? styles.error : ``}`}
                />
                
              </div>
              <div className={styles.inputGroup}>
                
                <label htmlFor='password'>Пароль</label>
                {errorClasses.password ? 
                  <span className={styles.errorExplain}>
                    {isPasswordsEqual ? 
                      `Поле является обязательным` :
                      `Пароли различаются`}</span> : ``
                }
                <input 
                  id='password' 
                  name='password'
                  type='password' 
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Придумайте пароль'
                  className={errorClasses.password}
                />
                
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='confirmPassword'>Подтверждение пароля</label>
                {errorClasses.confirmPassword ? 
                  <span className={styles.errorExplain}>
                  {isPasswordsEqual ? 
                    `Поле является обязательным`
                    :
                    ``
                  }
                  </span> : ``
                }
                <input 
                  id='confirmPassword' 
                  name='confirmPassword'
                  type='password' 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='Повторите пароль'
                  className={errorClasses.confirmPassword}
                />
                
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='birthdate'>Дата рождения</label>
                {errorClasses.birthdate ? 
                  <span className={styles.errorExplain}>Поле является обязательным</span> : ``
                }
                <input 
                  id='birthdate' 
                  name='birthdate'
                  type='date' 
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  placeholder='Дата рождения'
                  className={errorClasses.birthdate}
                />
                
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Зарегистрировать
          </button>
        </form>
      </div>
      
      <div className={`${styles.emailCodeBlock} ${emailBlockActiveClass}`}>
          <h2>Введите код подтверждения</h2>
          <p>Мы отправили его на Вашу почту {formData.email}</p>
          <VerfiyBlock 
            amount={6}
            onAmountRiched={() => setIsCodeSubmitBtnActive(true)}
            onAmountLess={() => setIsCodeSubmitBtnActive(false)}
            setCode={setCodeStr}
            isCorrect={isCodeCorrect}
          />
          {isCodeCorrect ? `` :
          <span className={styles.wrongCode}>Неверный код</span>}
          <button 
            className={styles.submitButton} 
            disabled={!isCodeSubmitBtnActive}
            onClick={sendCode}
          >
            Отправить
          </button>
      </div>
    </div>
  );
}

export default RegisterRolePage;