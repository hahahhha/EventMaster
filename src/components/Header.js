import React from 'react';
import styles from '../styles/headerStyles.module.css';

function Header({ children }) {
  return (
    <header className={styles.header}>
        <span>{children}</span>
    </header>
  )
}

export default Header