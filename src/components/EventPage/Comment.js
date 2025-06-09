import React from 'react';
import styles from '../../styles/comment.module.css';

function Comment({ text, author, likes, dislikes, createdAt, onAnsBtnClick}) {

  return (
    <div className={styles.comment}>
        <div className={styles.row}>
            <div className={styles.circle}></div>
            <div className={styles.data}>
                <p className={styles.author}>{author}</p>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
        <div className={`${styles.row} ${styles.bottomRow}`}>
            <button className={styles.likeButton}></button>
            <button className={styles.dislikeButton}></button>
            <button className={styles.answerButton} onClick={onAnsBtnClick}>Ответить</button>
        </div>
    </div>
  )
}

export default Comment