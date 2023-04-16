import React, {useState, useContext} from 'react'
import styles from '../styles/folder.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTrash, faPenToSquare, faChevronRight, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import { SideBarContext } from './SideBarContext'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link';

function Folder({folder}) {
  const [folderTitle, setFolderTitle ] = useState(folder.title || "untitled folder")
  const [folderCont, setFolderCont] = useState(folder.cont || []);
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {folders, addFolder, removeFolder, notes, addNote, removeNote} = useContext(SideBarContext);

  const toggleFolder = ()=>{
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }
  
  const addNoteToFolder = () => {
    if (!isOpen) toggleFolder()
    setFolderCont([...folderCont, {
      title: `untitled note ${folderCont.length +1}`,
      content: "",
      id: uuidv4()
    }])
  }

  const saveFolder = () => {
    setIsEditing(false);
    folder.title = folderTitle;
  }

  const handleDrop = (ev) => {
    ev.preventDefault()
    const title = ev.dataTransfer.getData("noteTitle")
    const cont = ev.dataTransfer.getData("noteCont")
    const id = ev.dataTransfer.getData("noteId")
    setFolderCont([...folderCont, {title: title, content: cont, id: id}])
    removeNote(id)
  }

  const handleDragOver = (ev) => {
    ev.preventDefault();
  }

    return (
      <div 
      key={folder.id} 
      className={styles.folder}
      onDrop={ev=>handleDrop(ev)}
      onDragOver={ev=>handleDragOver(ev)}
      >
        <div className={styles.folderInfo}>
          <div>
            <span onClick={toggleFolder}>
              <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
            </span>
            {isEditing ? 
              <input 
                onChange={e=>setFolderTitle(e.target.value)}
                value={folderTitle} 
              /> 
              : 
              <p>{folderTitle}</p>
            }
          </div>

          <div className={styles.folderBtns}>
            <button 
              className={styles.newFoldNote} 
              onClick={addNoteToFolder}
            >
              +
            </button>
            {isEditing ? 
              <button 
                className={styles.edit}
                onClick={saveFolder}
              >
                <FontAwesomeIcon icon={faFloppyDisk} /> 
              </button>
              : 
              <button 
                className={styles.edit}
                onClick={e=>setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            }
            <button 
              className={styles.remove}
              onClick={e=>removeFolder(folder.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>

        <div className={styles.folderContent}>
          {isOpen ? (
            folderCont.map(infolder => {
              const removeInfolderNote = (id) => {
                setFolderCont(prevFolds => prevFolds.filter(fold => fold.id !== id));
              }

              const handleInFolderDragStart = (ev, noteTitle, noteCont, noteId) => {
                ev.dataTransfer.setData("noteTitle", noteTitle)
                ev.dataTransfer.setData("noteCont", noteCont)
                ev.dataTransfer.setData("noteId", noteId)
                setTimeout(e=>removeInfolderNote(noteId), 2000)
              }

              return (
                <div key={infolder.id} 
                className={styles.infoldernote}
                draggable
                onDragStart={ev=>handleInFolderDragStart(ev, infolder.title, infolder.cont, infolder.id)}>
                  <Link className={styles.infolderTitle} href={`/${folder.title}/${infolder.id}`}>
                    <p>{infolder.title}</p>
                  </Link>
                  <div className={styles.itemBtns}>
                  <button 
                    onClick={e=>{
                      e.stopPropagation();
                      removeInfolderNote(infolder.id);
                    }}
                    className={styles.remove}
                  > 
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    )}

export default Folder