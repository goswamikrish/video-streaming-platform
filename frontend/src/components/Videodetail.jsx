import React, { useState, useEffect, useContext } from 'react'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Videos from './Videos'
import { fetchAPI } from '../utils/FetchAPI'
import NoteContext from '../context/NoteContext'

const Videodetail = () => {
  const context = useContext(NoteContext);
  const { addnote } = context;
  const [note, setNote] = useState({ title: "", channeltitle: "", videoUrl: "", imageUrl: "" })

  const [videoDetail, setVideoDetail] = useState([])
  const [videos, setVideos] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetchAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]))
    fetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items))
  }, [id])

  if (!videoDetail?.snippet) return <div className="text-white">Loading...</div>

  const { snippet: { title, channelId, channelTitle, thumbnails }, statistics: { viewCount, likeCount } } = videoDetail;

  const handleonclick = (e) => {
    e.preventDefault();
    const newNote = { title: title, channeltitle: channelTitle, videoUrl: id, imageUrl: thumbnails.high?.url }
    addnote(newNote.title, newNote.channeltitle, newNote.videoUrl, newNote.imageUrl)
    setNote({ title: "", channeltitle: "", videoUrl: "", imageUrl: "" })
  }

  return (
    <div className="min-h-[95vh] bg-black">
      <div className="flex flex-col md:flex-row">

        <div className="flex-1">
          <div className="w-full sticky top-[86px]">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <h5 className="text-white font-bold text-xl p-4">
              {title}
            </h5>
            <div className="flex flex-row justify-between text-white py-2 px-4">
              <Link to={`/channel/${channelId}`}>
                <h6 className="text-white text-base md:text-xl font-medium flex items-center">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </h6>
              </Link>

              <div className="flex flex-row gap-5 items-center">
                <p className="opacity-70 text-sm md:text-base">
                  {parseInt(viewCount).toLocaleString()} views
                </p>
                <p className="opacity-70 text-sm md:text-base">
                  {parseInt(likeCount).toLocaleString()} likes
                </p>
                <button
                  className="rounded-full text-white bg-transparent transition-all duration-300 hover:bg-[#00FFFF] hover:text-black px-4 py-1 border border-zinc-700 hover:border-[#00FFFF]"
                  onClick={handleonclick}
                >
                  add fav
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-10 md:py-2 flex justify-center items-center">
          <Videos videos={videos} direction="column" />
        </div>

      </div>
    </div>
  );
};

export default Videodetail
