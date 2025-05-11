import React from 'react';
import styles from '../styles/blackbtn.module.css';

function Blackbtn({ children }) {
  return (
    <button className={styles.blackButton}>{children}</button>
  )
}

export default Blackbtn