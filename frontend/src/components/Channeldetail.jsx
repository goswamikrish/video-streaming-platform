import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Videos from './Videos'
import Channelcard from './Channelcard'
import { fetchAPI } from '../utils/FetchAPI'

const Channeldetail = () => {
  const [channelDetail, setChannelDetail] = useState()
  const [videos, setVideos] = useState([])
  const { id } = useParams()

  useEffect(() => {
    setVideos([]);
    fetchAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]))
    fetchAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items))
  }, [id])

  return (
    <div className="min-h-[95vh] bg-black">
      <div>
        <div
          className="h-[300px] z-10"
          style={{
            background: 'radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(140, 84, 192, 1) 41%, rgba(181, 79, 161, 1) 62%, rgba(252, 70, 107, 1) 100%)'
          }}
        />
        <Channelcard channelDetail={channelDetail} marginTop='-95px' />
      </div>
      <div className="flex p-4">
        {/* Responsive spacer matching original sx={{mx:{sm:'100px'}}} logic but using container/margin */}
        <div className="mr-0 sm:mr-24" />
        <Videos videos={videos} />
      </div>
    </div>
  )
}

export default Channeldetail
