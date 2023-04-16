import React, {useContext, useState} from 'react'
import styles from '../styles/note.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTrash, faPenToSquare, faChevronRight, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { SideBarContext } from './SideBarContext';

function Note({note}) {
  const {folders, addFolder, removeFolder, notes, addNote, removeNote} = useContext(SideBarContext);
  const [noteTitle, setNoteTitle] = useState(note.title || "untitled folder")
  const [isEditing, setIsEditing] = useState(false)

  const saveNote = () =>{
    setIsEditing(false)
    note.title = noteTitle
    console.log(note.title)
  }

  const handleDragStart = (e, noteTitle, noteCont, noteId) => {
    e.dataTransfer.setData("noteTitle", noteTitle)
    e.dataTransfer.setData("noteCont", noteCont)
    e.dataTransfer.setData("noteId", noteId)
  }

  console.log(note.id)

  return (
    <div
    key={note.id} 
    className={styles.note}
    draggable
    onDragStart={e=>handleDragStart(e, note.title, note.content, note.id)}
    >
      { isEditing ? 
        <input 
        onChange={e=>setNoteTitle(e.target.value)}
        value={noteTitle}>

        </input>
      : 
      <Link draggable="false" href={`/${note.id}`} className={styles.link}><p>{noteTitle}</p></Link>
      }

      <div className={styles.noteBtns}>
      
      { isEditing ? 
        <button 
        className={styles.edit}
        onClick={saveNote}>
          <FontAwesomeIcon icon={faFloppyDisk}/>
        </button>
      
      :
        <button
        className={styles.edit}
        onClick={e=>setIsEditing(true)}>
          <FontAwesomeIcon icon={faPenToSquare}/>
        </button>
      }
      <button 
          className={styles.remove}
          onClick={()=>removeNote(note.id)}>
            <FontAwesomeIcon icon={faTrash}/>
        </button>
      </div>
    </div>
  )
}

export default Note