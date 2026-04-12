import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constant'

const Videocard = ({ video: { id: { videoId }, snippet } }) => {
  return (
    <div className="flex flex-col w-full sm:w-[360px] md:w-[320px] bg-[#1e1e1e] rounded-none sm:rounded-xl overflow-hidden shadow-lg transition-all duration-300 mx-auto group border border-transparent hover:scale-105 hover:shadow-[0_0_30px_rgba(252,21,3,0.6)]">
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <img
          src={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          className="w-full h-[180px] sm:h-[200px] object-cover group-hover:opacity-90 transition-all"
        />
      </Link>

      <div className="bg-[#1e1e1e] h-auto sm:h-[120px] p-5 sm:p-6 flex flex-col gap-2">
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <h6 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 hover:text-red-500 transition-colors">
            {snippet?.title?.slice(0, 60) || demoVideoTitle?.slice(0, 60)}
          </h6>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <p className="text-gray-400 font-bold text-xs sm:text-sm flex items-center hover:text-white transition-colors mt-1">
            {snippet?.channelTitle?.slice(0, 60) || demoChannelTitle?.slice(0, 60)}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Videocard
