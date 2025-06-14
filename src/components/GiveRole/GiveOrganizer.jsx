import React, { useState } from 'react';
import GiveRole from './GiveRole';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GiveOrganizer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false)
  const handler = async () => {
    if (email.length === 0) {
      setIsError(true);
      console.log('len 0');
      return;
    }
    try {
      await axios.post('/api/user/make-organizer', {
        email: email
      }, {withCredentials:true});
      navigate('/main?notify=Права успешно выданы')
    } catch (error) {
      setIsError(true);
    }
  }
  return (
    <GiveRole 
      role="организатора" 
      onSubmitButtonClick={handler}
      email={email}
      setEmail={setEmail}
      isError={isError}
    />
  )
}

export default GiveOrganizer