import { useNavigate } from 'react-router-dom'
import { categories } from '../utils/constant'

const Sidebar = ({ selectCategory, setSelectCategory }) => {
  const navigate = useNavigate()
  const onclick = () => {
    navigate("/save")
  }

  return (
    <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto h-auto md:h-[95%] py-4 w-full md:w-auto scrollbar-hide">
      <button
        onClick={onclick}
        className="rounded-full text-white bg-zinc-800 transition-all duration-300 hover:bg-[#00FFFF] hover:text-black mx-4 py-2 font-bold mb-4 border border-zinc-700 hover:border-[#00FFFF] whitespace-nowrap"
      >
        Watch Later
      </button>

      {categories.map((category) => (
        <button
          className={`flex items-center justify-start cursor-pointer bg-transparent outline-none border-none py-2 px-4 my-1 rounded-full text-white transition-all font-bold hover:bg-[#FC1503] min-w-max ${category.name === selectCategory ? "bg-[#FC1503]" : ""
            }`}
          onClick={() => {
            setSelectCategory(category.name)
          }}
          key={category.name}
        >
          <span
            className={`mr-4 ${category.name === selectCategory ? "text-white" : "text-[#FC1503]"
              }`}
          >
            {category.icon}
          </span>
          <span className="opacity-80">{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
