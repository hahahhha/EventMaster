import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/eventpage.module.css';
import axios from 'axios';
import { API_URL } from '../../confing';
import Header from '../Header';
import Blackbtn from '../Blackbtn'
import Comment from './Comment';
import CommentInput from './CommentInput';
import { ToastContainer,  toast } from 'react-toastify';

import checkIsAuthorized from '../../functions/checkIsAuthorized';

import filledStar from '../../assets/fill_star.svg';
import emptyStar from '../../assets/empty_star.svg';

import buttonStyles from '../../styles/General/buttons.module.css';

function pluralizeComments(count) {
  // Получаем последнюю цифру числа
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  // Исключения для чисел 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} комментариев`;
  }

  // Основные правила склонения
  if (lastDigit === 1) {
    return `${count} комментарий`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} комментария`;
  } else {
    return `${count} комментариев`;
  }
}

function Eventpage() {
  const [starsAmount, setStarsAmount] = useState();
  const [stars, setStars] = useState(Array(5).fill(emptyStar));
  const [isSaveRateButtonActive, setIsSaveRateButtonActive] = useState(false);
  const changeStars = (rate) => {
    setIsSaveRateButtonActive(true);
    let newStars = Array(5).fill(emptyStar);

    for (let i = 0; i < stars.length; i++) {
      if (i < rate) {
        newStars[i] = filledStar
      }
    }
    setStarsAmount(rate);
    setStars(newStars);
  }

  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);

  const [replyTo, setReplyTo] = useState('');
  const [replyId, setReplyId] = useState();

  const navigate = useNavigate();
  const redirectUrl = `/event?id=${eventId}`;

  // проверка, зарегистрирован ли пользователь на мероприятие
  const getIsUserRegistered = async () => {
      try {
        const response = await axios.get('/api/user/events', {withCredentials: true});
        const registeredEvents = response.data.events;
        if (registeredEvents.some(evt => evt.id == eventId)) {
          setIsUserRegistered(true);
        }
      } catch (error) {
        console.log('ошибка при получении событий, на которые зарегистрирован пользователь');
        console.log(error);
      }
    }

  // получение комментов
  const getEventComments = async () => {
    const response = await axios.get(`/api/event/comments?id=${eventId}`);
    setComments(response.data.comments);
    setCommentsLength(response.data.comments.length)
    // console.log(response.data.comments);
  }

  const onSaveRatingButtonClick = async () => {
    try {
      const response = await axios.post('/api/event/add-rate', {
        id: eventId,
        rate: starsAmount
      }, {withCredentials: true});
      toast.success('Оценка поставлена')
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  const getRate = async function() {
    const isAuthed = await checkIsAuthorized();
    if (!isAuthed) {
      navigate(`/login?redir=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    try {
      const response = await axios.get(`/api/user/my-event-rate?eventId=${eventId}`, {
        withCredentials: true
      });
      setStarsAmount(response.data.rate);
      changeStars(response.data.rate)
      setIsSaveRateButtonActive(false);
      // setIsSaveRateButtonActive(false);
    } catch (error) {

    }
  }

  useEffect(() => {
    getRate();
    getEventComments();
    getIsUserRegistered();
  }, []);

  const subscribeBtnHandler = async () => {
    if (isUserRegistered)
      return;
    const isAuthed = await checkIsAuthorized();
    if (!isAuthed) {
      navigate(`/login?redir=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    try {
      const response = await axios.post('/api/user/regUserOnEvent', {
        event_id: eventId
      }, {withCredentials: true});
      setIsUserRegistered(true);
      eventData.attendees++;
      toast.success('Вы зарегистрировались на мероприятие')
    } catch (error) {
      console.log('не удалось зарегистрировать пользователя на мероприятие');
      console.log(error);
    }
  }

  // получение данных о мероприятии
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/event/${eventId}`, {
          withCredentials: true
        });
        setEventData(response.data.event);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные мероприятия');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [eventId]);


  if (loading) {
    return <div className={styles.eventPage}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.eventPage}>{error}</div>;
  }

  if (!eventData) {
    return <div className={styles.eventPage}>Мероприятие не найдено</div>;
  }

  return (
    <div className={styles.eventPage}>
      <Header><a href="/main" style={{textDecoration: "none", color: "white"}}>StudentFlow</a></Header>
      <div 
        className={styles.container}
        style={{
          backgroundImage: eventData.img_url 
            ? `url(${API_URL}${eventData.img_url})` 
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: '0% 25%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: !eventData.img_url ? '#f0f0f0' : undefined
        }}
      >
        <div className={styles.notify}>
          <div>
            <strong>Не упусти свой шанс!</strong>
            <p>
              Будь там, где рождаются идеи, заводятся полезные знакомства и происходят прорывы.
              Всего один день — а может изменить твой год.
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.row}>
              <Blackbtn onClick={subscribeBtnHandler} isButtonActive={!isUserRegistered}>Записаться</Blackbtn>
              <span className={styles.badge}>
                Участников: {eventData.attendees}
              </span>
            </div>
            <div className={styles.row}>
              <span>{isUserRegistered ? 'Вы зарегистрированы на это мероприятие' : ""}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.mainContainer}`}>
        <h1>{eventData.title}</h1>
        <h2>Что тебя ждёт?</h2>
        <p>{eventData.description}</p>
        <div className={styles.ratingBlock}>
          <div className={styles.stars}>
          {[...Array(5)].map((item, index) => (
            <img key={index} width="30" height="30" src={stars[index]} onClick={() => changeStars(index + 1)}/>
            
          ))}
          </div>
          { isSaveRateButtonActive ?
          <div>
            <button className={buttonStyles.blackButton} onClick={onSaveRatingButtonClick}>Оценить</button>
          </div> : ``
          }
        </div>
        <div className={styles.commentsBlock}>
          <div className={styles.commentsBlockRow}>
            <span>{pluralizeComments(commentsLength)}</span>
            {/* <select className={styles.sortSelect}>
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала популярные</option>
            </select> */}
          </div>
          <CommentInput 
            loginRedirUrl={redirectUrl} 
            eventId={eventId} 
            updateComments={getEventComments}
            replyToName={replyTo}
            replyToId={replyId}
            onCommentAdded={() => {
              setReplyId(null);
              setReplyTo(null);
            }}
            onCancelButtonClick={() => {
              setReplyId(null);
              setReplyTo(null);
            }}
          />
          <div className={styles.commentsBlockRow}>
          {
            comments.map((item, index) => (
              <Comment 
                key={`${item.user_id}_${index}`}
                text={item.text} 
                author={`${item.name} ${item.surname}`}
                onAnsBtnClick={() => {
                  setReplyTo(`${item.name} ${item.surname}`);
                  setReplyId(item.comment_id);
                  console.log(`${item.name} ${item.surname}`, item.user_id)
                }}
              />
            )
          )
          }
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Eventpage;