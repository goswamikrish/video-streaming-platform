import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'
import { demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constant'
import NoteContext from '../context/NoteContext'

const Savedcards = (props) => {
  const context = useContext(NoteContext);
  const { Deletenote } = context;
  return (
    <div className="w-full md:w-[320px] rounded-none bg-[#1e1e1e] overflow-hidden group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(252,21,3,0.6)]">
      <Link to={`/video/${props.videoUrl}`}>
        <img
          src={props.imageUrl}
          alt={props.title}
          className="w-[358px] h-[180px] object-cover group-hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="bg-[#1e1e1e] h-auto p-6 flex flex-col gap-2">
        <Link to={`/video/${props.videoUrl}`}>
          <h6 className="text-white font-bold text-base leading-snug line-clamp-2 hover:text-red-500 transition-colors">
            {props.title || demoVideoTitle.slice(0, 60)}
          </h6>
        </Link>
        <Link to={demoChannelUrl}>
          <p className="text-gray-400 font-bold text-sm flex items-center hover:text-white transition-colors">
            {props.channeltitle || demoChannelTitle.slice(0, 60)}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
          </p>
        </Link>
        <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors font-bold text-sm bg-transparent border border-red-500 hover:border-red-400 rounded px-3 py-1 mt-2 w-fit" onClick={() => Deletenote(props._id)}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default Savedcards