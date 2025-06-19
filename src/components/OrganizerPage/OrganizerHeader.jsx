import React from 'react'
import styles from '../../styles/adminheader.module.css'
import Header from '../Header'

function OrganizerHeader() {
  return (
    <Header>
        <div className={styles.headerContent}>
          <a href="/main">StudentFlow.</a>
          <a href="/organizer">organizer</a>
        </div>
    </Header>
  )
}

export default OrganizerHeader