import React, { useEffect, useState } from 'react';
import styles from '../styles/createevt.module.css';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Createevt() {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [evtTime, setEvtTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/checkAuth', {withCredentials: true});
        if (!response.data.isAuthenticated) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
      
    }
    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const dateObj = date ? new Date(date) : new Date();
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // Месяцы начинаются с 0
      const day = dateObj.getDate();

      const [hours, minutes] = evtTime.split(':');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('status', 'active');
      formData.append('year', year);
      formData.append('month', month);
      formData.append('day', day);
      formData.append('hours', hours || '00');
      formData.append('minutes', minutes || '00');
      formData.append('short_description', description);
      formData.append('organizer_id', 1);
      formData.append('place', place);
      formData.append('hashtag', hashtag);
      
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/event/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, withCredentials: true
      });

      if (response.data.msg === "Мероприятие создано") {
        setSuccess('Мероприятие успешно создано!');
        // Сброс формы
        setTitle('');
        setPlace('');
        setHashtag('');
        setDate('');
        setImage(null);
        setDescription('');
        setEvtTime('');
      } else {
        setError('Ошибка при создании мероприятия');
      }
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.response?.data?.msg || 'Ошибка сервера при создании мероприятия');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Header>StudentFlow</Header>
      <div className={styles.createEvt}>
        <div className={styles.evtBlock}>
          <p className={styles.slogan}>Создавай, управляй, развлекай</p>
          
          <form onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
            
            <p>Создай свое мероприятие</p>
            <div className={styles.formRow}>
              <div className={styles.leftPart}>
                <label>Название</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label>Место</label>
                <input 
                  type="text" 
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                />
                <label>Хэштег</label>
                <input 
                  type="text" 
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                />
                <label>Дата</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <label>Загрузите изображение</label>
                <input 
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {image && (
                  <div className={styles.imagePreview}>
                    <p>Превью: {image.name}</p>
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt="Preview" 
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                )}
              </div>
              <div className={styles.rightPart}>
                <label>Описание</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <label>Время проведения</label>
                <input 
                  type="time" 
                  value={evtTime} 
                  onChange={(e) => setEvtTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.bottomArea}>
              <button type='submit'>Создать</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Createevt;