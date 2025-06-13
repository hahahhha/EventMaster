import React, {useEffect} from 'react';
import styles from '../../styles/modal.module.css';

function Modal({ isOpen, setIsOpen, title, description, onSubmit, submitText, onCancel, cancelText }) {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.active : styles.dnone}`}>
        <div className={styles.topRow}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={() => {setIsOpen(false)}}>✕</button>
        </div>
        <p>{description}</p>
        <div className={styles.buttons}>
            <button className={styles.submitButton} onClick={() => onSubmit()}>{submitText}</button>
            <button className={styles.cancelButton} onClick={() => onCancel()}>{cancelText}</button>
        </div>
    </div>
  )
}

export default Modal