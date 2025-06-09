import React from 'react';
import styles from '../styles/blackbtn.module.css';

function Blackbtn({ children, onClick, isButtonActive }) {
  const buttonClasses = `${styles.blackButton} ${!isButtonActive ? styles.unactive : ''}`;
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