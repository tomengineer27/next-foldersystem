import React, { useContext } from 'react';
import { SideBarContext } from '@/components/SideBarContext';
import { useRouter } from 'next/router';
import styles from '../../styles/Page.module.css'
import Layout from '@/components/Layout';
import Head from 'next/head';

function Page() {
  const { folders } = useContext(SideBarContext);
  const router = useRouter();

  const link = router.query
  const folderCont = folders.flatMap(folder => folder.content);

  return (
  <Layout>
    <Head><title>{note.title}</title></Head>
  {
    folderCont.map(note => {
      if (note.id === link.id) {
        return(
          <div className={styles.page}
          key={note.id}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
          </div>
      )
    } else {
      return <></>
    }
  })}
  </Layout>)
}

export default Page;