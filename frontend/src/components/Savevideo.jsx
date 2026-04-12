import { useState, useEffect, useContext } from 'react'
import Savedcards from './Savedcards'
import NoteContext from '../context/NoteContext'

const Savevideo = () => {
  const context = useContext(NoteContext);
  const { getNotes, notes } = context;
  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className="min-h-screen min-w-full m-0 p-0 text-white flex justify-start items-start text-2xl bg-gradient-to-br from-black from-75% to-[#8B0000]">
      <div className="p-4 min-h-[95vh] w-full">
        <h4 className="text-4xl font-black text-white mb-6 ml-0 sm:ml-[100px]">
          Yours <span className="text-[#FC1503]">Videos</span> videos
        </h4>
        <div className="flex">
          <div className="mr-0 sm:mr-[100px]" />
          <div className="flex flex-wrap flex-row justify-start gap-4">
            {notes.map((note) => {
              return <Savedcards key={note._id} _id={note._id} title={note.title} channeltitle={note.channeltitle} imageUrl={note.imageUrl} videoUrl={note.videoUrl} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Savevideo
