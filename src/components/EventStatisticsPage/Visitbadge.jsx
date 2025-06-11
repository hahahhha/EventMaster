import React from 'react';
import styles from '../../styles/visitbadge.module.css';

function Visitbadge({ children }) {
  return (
    <div className={styles.visitBadge}>{children}</div>
  )
}

export default Visitbadge