import React from 'react';
import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

export const SideBarContext = createContext({});

export function Context({ children }) {
  const [folders, setFolders] = useState([
    {
      title: "testfolder", 
      content:[
        {
          title: "testnote",
          content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          id: "000"
        }, {
          title: "testnote2",
          content: "222222222222222222222 222222222222222222222222222222 222222222222222222222222222222222222 222222222222222222222222",
          id: "001"
        }
      ], 
      id:uuidv4()}
  ])

  const [notes, setNotes] = useState([])

  const addFolder = () => {
    setFolders([...folders, {
      title: "untitled folder",
      content: [],
      id: uuidv4()
    }])
  }

  const removeFolder = (id)=>{
    setFolders(prevFolds => prevFolds.filter(fold => fold.id !== id));
  }

  const addNote = () => {
    setNotes([...notes, {
        title: "untitled note",
        content: "",
        id: uuidv4()
      }
    ])
    console.log(notes)
  }

  const removeNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  return (
  <SideBarContext.Provider value={{ notes, folders, addFolder, removeFolder, addNote, removeNote}}>
    {children}
  </SideBarContext.Provider>
  )
}