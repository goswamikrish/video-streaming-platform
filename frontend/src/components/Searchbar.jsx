import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <form
      onSubmit={onhandleSubmit}
      className="flex items-center w-full sm:w-4/5 md:w-1/2 max-w-[700px] mx-auto rounded-[20px] border border-zinc-800 px-4 py-2 bg-[#121212] transition-all hover:border-red-600 focus-within:border-red-600 hover:shadow-[0_0_15px_rgba(255,0,0,0.1)]"
    >
      <input
        className="bg-transparent outline-none text-white flex-1 ml-2 text-sm sm:text-base placeholder-[#aaa]"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="search videos"
      />

      <button
        type="submit"
        className="p-[10px] text-[#F31503] rounded-full hover:bg-[rgba(243,21,3,0.1)] transition-all duration-300"
        aria-label="search"
      >
        <SearchIcon className="text-xl sm:text-2xl" />
      </button>
    </form>
  );
};

export default Searchbar;
