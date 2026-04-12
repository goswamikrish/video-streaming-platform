import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { fetchAPI } from "../utils/FetchAPI";

const Feed = () => {
  const navigate = useNavigate();
  const [selectCategory, setSelectCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchAPI(`search?part=snippet&q=${selectCategory}`).then((data) =>
        setVideos(data.items)
      );
    }
  }, [selectCategory, navigate]);

  // Reusable Sidebar content
  const SidebarContent = () => (
    <div className="h-auto md:h-full bg-[#0f0f0f] text-white flex flex-row md:flex-col w-full md:w-auto">
      <Sidebar
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      <p className="hidden md:block mt-2 px-3 text-white text-center text-sm copyright">
        © 2022
      </p>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">

      {/* 🔵 Responsive Sidebar: Horizontal on mobile, Vertical on desktop */}
      <div className="h-auto md:h-full border-b md:border-b-0 md:border-r border-[#3d3d3d] w-full md:w-60 shrink-0 bg-[#0f0f0f]">
        <SidebarContent />
      </div>

      {/* 🟠 Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#181818]">
        <h4 className="font-bold text-2xl md:text-4xl text-white mb-4 mx-2 text-center md:text-left">
          {selectCategory}
          <span className="text-[#F31503] pl-2">videos</span>
        </h4>

        <Videos videos={videos} direction="row" />
      </div>
    </div>
  );
};

export default Feed;

