import React, { useEffect, useState } from 'react';
import styles from '../../styles/commentinput.module.css';
import accLogo from '../../assets/comment-acc.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CommentInput({ loginRedirUrl, eventId, updateComments, replyToName, replyToId, onCommentAdded, onCancelButtonClick }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [commentText, setCommentText] = useState('');


  const navigate = useNavigate();

   useEffect(() => {
    if (replyToName) {
      setCommentText(`${replyToName}, ${commentText}`);
      setIsInputActive(true);
    }
  }, [replyToName, replyToId]);

  const clearForm = function () {
    setIsInputActive(false);
    setCommentText('');
  };

  const checkIsAuthorized = async () => {
    try {
      const response = await axios.get('/api/auth/checkAuth', {withCredentials: true});
      const isAuthed = response.data.isAuthenticated;
      if (!isAuthed) {
        navigate(`/login?redir=${encodeURIComponent(loginRedirUrl)}`)
      }
    } catch (error) {
      navigate(`/login?redir=${encodeURIComponent(loginRedirUrl)}`)
      console.log('heheheh', error);
    }
  }

  const onTextareaClick = async function () {
    await checkIsAuthorized();
    setIsInputActive(true);
  }

  const makeCommentClick = async function () {
    await checkIsAuthorized();
    try {
      if (!replyToId) {
        const response = await axios.post('/api/event/add-comment', 
        {
          event_id:eventId, 
          text: commentText
        }, 
        {
          withCredentials: true
        });
        console.log('нет reply')
      } else {
        
        const response = await axios.post('/api/event/add-comment', 
        {
          event_id:eventId, 
          text: commentText,
          reply_to_id: replyToId
        }, 
        {
          withCredentials: true
        });
      }
      
      console.log('отправлено', eventId)
      clearForm();
      updateComments();
      onCommentAdded();
    } catch (error) {
      console.log('assa', error);
    }
  }

  return (
    <div className={styles.commentInputBlock}>
      <div>
        <img src={accLogo} className={styles.accLogo}/>
        <textarea 
          placeholder='Оставить отзыв' 
          onClick={onTextareaClick}
          onInput={(e) => {setCommentText(e.target.value)}} 
          value={commentText}
        />
      </div>
        {
          isInputActive ? 
          <div className={styles.buttonsBlock}>
            <button onClick={makeCommentClick} className={styles.makeCommentButton}>Оставить отзыв</button>
            <button onClick={() => {
              clearForm();
              onCancelButtonClick();
            }} className={styles.cancelButton}>Отмена</button>
          </div>
          :
          ``
        }
    </div>
  )
}

export default CommentInput