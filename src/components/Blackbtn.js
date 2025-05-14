import React from 'react';
import styles from '../styles/blackbtn.module.css';

function Blackbtn({ children, onClick, isButtonActive }) {
  console.log(isButtonActive);

  const buttonClasses = `${styles.blackButton} ${!isButtonActive ? styles.unactive : ''}`;
  console.log(buttonClasses);
  return (
    <button 
      onClick={isButtonActive ? onClick : undefined} 
      className={buttonClasses.trim()}
    >
      {children}
    </button>
  );
}

export default Blackbtn;