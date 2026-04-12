import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constant';

const Channelcard = ({ channelDetail, marginTop }) => (
  <div
    className="flex justify-center items-center w-full sm:w-[360px] md:w-[320px] h-[326px] mx-auto rounded-[20px] shadow-none"
    style={{ marginTop }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
      <div className="flex flex-col justify-center text-center text-white p-4 items-center group cursor-pointer">
        <img
          src={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
          alt={channelDetail?.snippet?.title}
          className="rounded-full w-[180px] h-[180px] mb-4 border border-[#e3e3e3] group-hover:scale-105 transition-transform duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        />
        <h6 className="text-xl font-bold flex items-center justify-center">
          {channelDetail?.snippet?.title}{' '}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </h6>
        {channelDetail?.statistics?.subscriberCount && (
          <p className="text-[15px] font-medium text-gray-400 mt-2">
            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
          </p>
        )}
      </div>
    </Link>
  </div>
);

export default Channelcard;