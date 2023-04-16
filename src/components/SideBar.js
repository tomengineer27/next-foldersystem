import React, {useContext, useState} from 'react'
import styles from '@/styles/SideBar.module.css'
import { SideBarContext } from './SideBarContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faBars, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import Folder from './Folder'
import Note from './Note'

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const {folders, addFolder, removeFolder, notes, addNote, removeNote} = useContext(SideBarContext);

  if (isOpen) {
  return (
    <div className={styles.sideBar}>
      <h2>FolderSystem</h2>
      <div className={styles.options}>
        <button className={styles.newFolder} 
        onClick={addFolder}>
          <FontAwesomeIcon icon={faFolderPlus} /> New Folder
        </button>
        <button className={styles.newFile} 
        onClick={addNote}>
          <FontAwesomeIcon icon={faPenToSquare} /> New Note
        </button>
      </div>
      <div className={styles.mySpace}>
        <h4>My Space</h4>
          {folders.map(folder => {
            return (
              <Folder folder={{title: folder.title, cont: folder.content, id: folder.id}}/>
            )
          })}
        <div className={styles.notes}>
          {notes.map(note => {
            return (
              <Note note={{title: note.title, cont: note.cont, id: note.id}}></Note>
            )
          })}
        </div>
      </div>
      <button 
      className={styles.toggleSideBar}
      onClick={()=>setIsOpen(false)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  )}
  else {
    return (
      <div className={styles.hiddenSideBar}
      onClick={()=>setIsOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    )
  }
}

export default SideBar