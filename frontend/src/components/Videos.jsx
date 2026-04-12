import React from 'react';
import Videocard from './Videocard';
import Channelcard from './Channelcard';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <div className="text-white text-center w-full">Loading...</div>;

  return (
    <div
      className={`flex flex-wrap justify-center sm:justify-start gap-4 w-full ${direction === "column" ? "flex-col" : "flex-col sm:flex-row"
        }`}
    >
      {videos.map((item, idx) => (
        <div
          key={idx}
          className="w-full sm:w-auto flex justify-center animate-fade-in"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          {item?.id?.videoId && <Videocard video={item} />}
          {item?.id?.channelId && <Channelcard channelDetail={item} />}
        </div>
      ))}
    </div>
  );
};

export default Videos;
