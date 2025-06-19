import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authChecker from '../../functions/authChecker';
import styles from '../../styles/MarkAtendee/markatendee.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import btnStyles from '../../styles/General/buttons.module.css'

function generateHref(token, id) {
  return `/mark-atendee?eventid=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`
}

function MarkAtendee() {
  const [searchParams, _] = useSearchParams();
  const eventId = searchParams.get('eventid');
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [eventData, setEventData] = useState();

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/api/event/${eventId}`, {withCredentials:true});
      setEventData(response.data.event);
      console.log(response.data.event);
    } catch (error) {
      
    }
  }

  const onButtonClick = async () => {
    try {
      const response = await axios.post('/api/auth/me/verify-attendee', {
        eventId, token
      }, {withCredentials: true});
      toast.success('Вы успешно подтвердили свое присутствие');
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg)
    }
  }

  useEffect(() => {
    authChecker(navigate, generateHref(token, eventId));
  }, [])

  useEffect(() => {
    fetchEventData();
  }, [eventId, token])

  return (
    <div className={styles.markatendee}>
      {eventData ?
      <div className={styles.container}>
        <h1 className={styles.title}>Мероприятие "{eventData.title}"</h1>
        <button className={btnStyles.blackButton} onClick={onButtonClick}>Отметиться</button>
      </div>
      : `Загрузка`}
      <ToastContainer />
      
    </div>
  )
}

export default MarkAtendee