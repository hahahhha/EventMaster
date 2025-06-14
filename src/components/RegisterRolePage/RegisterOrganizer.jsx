import React from 'react';
import RegisterRolePage from './RegisterRolePage';

function RegisterOrganizer() {
  return (
    <RegisterRolePage role="организатора" regUrl='/api/auth/reg-organizer'/>
  )
}

export default RegisterOrganizer