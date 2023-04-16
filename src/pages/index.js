
import React from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import styles from '../styles/home.module.css'

function Index() {
  return (
    <Layout>
      <Head><title>Home</title></Head>
      <div className={styles.home}>
        <h1 className={styles.h1}>FolderSystem</h1>
      </div>
    </Layout>
  )
}

export default Index