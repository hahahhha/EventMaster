import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../confing';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../styles/EditEvent/editevent.module.css';

import adminOrOrganizerCheck from '../../functions/adminOrOrganizerCheck';
import Header from '../Header';

function EditEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  

  // Состояния для каждого поля
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');

  // Проверка авторизации
  useEffect(() => {
    const authCheck = async () => {
      await adminOrOrganizerCheck(`/edit-event?id=${eventId}`, navigate);
    };
    authCheck();
  }, [eventId, navigate]);

  // Загрузка данных события
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await axios.get(`/api/event/${eventId}`);
        const event = response.data.event;
        
        // Устанавливаем данные в состояния
        setTitle(event.title || '');
        setDescription(event.description || '');
        setPlace(event.place || '');
        setHashtag(event.hashtag || '');
        setImgPreview(`${API_URL}${event.img_url}` || '');

        // Разделяем дату и время
        if (event.date) {
          const utcDate = new Date(event.date); // Парсим строку в объект Date (UTC)
          
          // Получаем локальные дату и время в формате YYYY-MM-DD и HH:mm
          const localDate = utcDate.toLocaleDateString('en-CA'); // 'en-CA' дает формат YYYY-MM-DD
          const localTime = utcDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); // 'HH:mm'

          setDate(localDate);
          setTime(localTime);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    getEventData();
  }, [eventId]);

  // Обработчик изменения изображения
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawDate = `${date}T${time}:00`;
    const localDate = new Date(rawDate);
    localDate.setHours(localDate.getHours() + 5);
    const utcString = localDate.toISOString()
    try {
      const formData = new FormData();
      formData.append('id', eventId);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('place', place);
      formData.append('hashtag', hashtag);
      formData.append('date', utcString);
      
      if (imgFile) {
        formData.append('image', imgFile);
      }

      await axios.post(`/api/event/change`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Мероприятие успешно обновлено');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Ошибка обновления');
      console.error('Ошибка:', error.response?.data || error);
    }
  };

  return (
    <div className={styles.editEventPage}>
      <Header>
        <a href='/main' style={{ textDecoration: 'none', color: 'white' }}>
          StudentFlow
        </a>
      </Header>
      <h1>{title}</h1>
      <div className={styles.mainBlock}>
        <h2>Редактирование мероприятия</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.mainBlockWrap}>
            <div className={styles.left}>
              <div className={styles.wrapImgBlock}>
                <p className={styles.photoSign}>Обложка мероприятия</p>
                <img src={imgPreview} className={styles.wrapImg} alt="Обложка" />
                <div className={styles.inputGroup}>
                  <label htmlFor='changeImg'>Изменить</label>
                  <input
                    id='changeImg'
                    type='file'
                    onChange={handleImageChange}
                    accept='image/*'
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='date'>Дата проведения</label>
                <input
                  id='date'
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Место проведения</label>
                <input
                  type='text'
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder='Место проведения'
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Хэштег</label>
                <input
                  type='text'
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  placeholder='Хэштег'
                />
              </div>
              
            </div>
            <div className={styles.right}>
              <div className={styles.inputGroup}>
                <label>Название</label>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Название'
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Описание</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Описание'
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor='time'>Время проведения</label>
                <input
                  id='time'
                  type='time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <button type='submit' className={styles.saveButton}>
                Сохранить изменения
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditEvent;