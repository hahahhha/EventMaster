import React from 'react'
import RegisterRolePage from './RegisterRolePage'

function RegisterAdmin() {
  return (
    <RegisterRolePage role="администратора" regUrl="/api/auth/reg-admin" />
  )
}

export default RegisterAdmin