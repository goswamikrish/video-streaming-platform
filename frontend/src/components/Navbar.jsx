import { Link } from "react-router-dom";
import { logo } from "../utils/constant";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 bg-black sticky top-0 z-50 gap-2 sm:gap-0">
      {/* Logo + Auth Buttons */}
      <div className="flex flex-row items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" height={45} className="h-[45px]" />
        </Link>

        {!localStorage.getItem("token") ? (
          <div className="flex flex-row gap-4 mt-1 sm:mt-0">
            <Link to="/login" className="no-underline">
              <p className="text-white font-bold hover:text-red-500 transition-colors">
                Login
              </p>
            </Link>
            <Link to="/signup" className="no-underline">
              <p className="text-white font-bold hover:text-red-500 transition-colors">
                Signup
              </p>
            </Link>
          </div>
        ) : (
          <button
            onClick={logout}
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl px-4 py-1 mt-1 sm:mt-0 transition-all font-semibold"
          >
            Logout
          </button>
        )}
      </div>

      {/* Searchbar */}
      {!localStorage.getItem("token") ? null : (
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <Searchbar />
        </div>
      )}
    </div>
  );
};

export default Navbar;

