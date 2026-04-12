import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchAPI } from "../utils/FetchAPI";
import Videos from "./Videos";

const Searchfeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <div className="p-4 min-h-[95vh] bg-black">
      <h4 className="text-4xl font-black text-white mb-6 ml-0 sm:ml-[100px]">
        Search Results for <span className="text-[#FC1503]">{searchTerm}</span> videos
      </h4>
      <div className="flex">
        <div className="mr-0 sm:mr-[100px]" />
        <Videos videos={videos} />
      </div>
    </div>
  );
};

export default Searchfeed;
