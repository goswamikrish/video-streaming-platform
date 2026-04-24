import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
  const noteinitial = []
  const [notes, setNotes] = useState(noteinitial);
  const host = "";
  //getnotes  
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auto-token": localStorage.getItem('token')

      },


    });
    const json = await response.json();

    setNotes(json);

  }


  //add notes
  const addnote = async (title, channeltitle, videoUrl, imageUrl) => {
    const response = await fetch(`${host}/api/note/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auto-token": localStorage.getItem('token')


      },
      body: JSON.stringify({ title, channeltitle, videoUrl, imageUrl }),
      // …
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //delete note
  const Deletenote = async (id) => {
    const response = await fetch(`${host}/api/note/delete/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auto-token": localStorage.getItem('token')


      },

      // …
    });
    const json = await response.json();

    const newnote = notes.filter((note) => { return note._id !== id })
    setNotes(newnote)
  }
  return (
    <NoteContext.Provider value={{ notes, addnote, getNotes, Deletenote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState

