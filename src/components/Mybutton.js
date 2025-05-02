import React from 'react';
import styles from '../styles/mybutton.module.css';

function Mybutton( { children }) {
  return (
    <button className={styles.mybutton}>
        {children}
    </button>
  )
}

export default Mybutton