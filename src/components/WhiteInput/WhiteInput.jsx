import React from 'react';
import styles from '../../styles/WhiteInput/whiteinput.module.css';

function WhiteInput({inputValue, setValue}) {
  return (
    <input value={inputValue} className={styles.whiteInput} 
    onChange={(e) => {setValue(e.target.value)}}/>
  )
}

export default WhiteInput