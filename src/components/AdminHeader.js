import React from 'react'
import Header from './Header'
import styles from '../styles/adminheader.module.css'

function AdminHeader() {
  return (
    <Header>
        <div className={styles.headerContent}>
          <a href="/main">StudentFlow.</a>
          <a href="/admin">admin</a>
        </div>
    </Header>
  )
}

export default AdminHeader