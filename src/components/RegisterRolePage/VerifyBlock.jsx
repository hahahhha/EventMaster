import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/RegisterRolePage/verifyblock.module.css';

function VerifyBlock({ amount, onAmountRiched, onAmountLess, setCode, isCorrect }) {
  const [inputValues, setInputValues] = useState(Array(amount).fill(''));
  const inputRefs = useRef([]);

  // Инициализация refs.current как массива нужной длины
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, inputValues.length);
  }, [inputValues.length]);

  // Автофокус на первое поле после монтирования

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Разрешаем только цифры
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
    
    if (value && index < inputValues.length - 1) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
    const newCodeStr = inputValues.filter((el) => el).join('')
    setCode(newCodeStr);
    if (newCodeStr.length === amount) {
      onAmountRiched();
    } else {
      onAmountLess();
    }
  }, [inputValues])

  // Обработчик Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className={styles.otpContainer}>
      {inputValues.map((item, index) => (
        <input 
          key={index}
          type="text"
          maxLength={1}
          value={item}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          className={`${styles.otpInput} ${isCorrect ? `` : styles.error}`}
        />
      ))}
    </div>
  );
}

export default VerifyBlock;