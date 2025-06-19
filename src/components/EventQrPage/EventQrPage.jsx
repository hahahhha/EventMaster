import React, { useEffect, useState } from 'react';
import authChecker from '../../functions/checkIsAuthorized';
import { useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

import styles from '../../styles/EventQrPage/eventqrpage.module.css';
import axios from 'axios';

function generateUrl(token, id) {
  const url = new URL(
    `/mark-atendee?eventid=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`,
    window.location.origin).toString();
  return url;
}

function EventQrPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventData, setEventData] = useState(null);
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const [qrUrl, setQrUrl] = useState(generateUrl(token, id));

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/api/event/${id}`, {withCredentials:true});
      setEventData(response.data.event);
      console.log(response.data.event);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchEventData();
  }, [id, token])

  return (
    <div className={styles.fullHeightContainer}>
      {eventData ?
      <div className={styles.qrContainer}>
        <p className={styles.logo}>By Proweb</p>
        <QRCode value={qrUrl} size={'100%'}/>
        <h1 className={styles.title}>Отметка на мероприятии "{eventData.title}"</h1>
      </div>
      : <span className={styles.loading}>Загрузка...</span>
      }
    </div>
  )
}

export default EventQrPage