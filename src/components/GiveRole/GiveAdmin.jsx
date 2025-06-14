import React, { useState } from 'react';
import GiveRole from './GiveRole';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GiveAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false)
  const handler = async () => {
    console.log('h')
    if (email.length === 0) {
      setIsError(true);
      console.log('len 0');
      return;
    }
    try {
      console.log('try')
      await axios.post('/api/user/make-admin', {
        email: email
      }, {withCredentials:true});
      console.log('axi')
      navigate('/main?notify=Права успешно выданы')
      console.log('123')
    } catch (error) {
      console.log(error)
      setIsError(true);
    }
  }
  return (
    <GiveRole 
      role="администратора" 
      onSubmitButtonClick={handler}
      email={email}
      setEmail={setEmail}
      isError={isError}
    />
  )
}

export default GiveAdmin