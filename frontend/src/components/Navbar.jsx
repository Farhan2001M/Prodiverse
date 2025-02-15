import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FcPlus } from "react-icons/fc";

const Navbar = ({ colorMode, toggleColorMode }) => {
  return (
    <div className="p-5 max-w-screen mx-auto dark:bg-gray-900 bg-gray-100">
      <div className="mx-auto flex justify-between items-center h-16 flex-col gap-4 sm:flex-row transition-colors">
        {/* Logo */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold uppercase flex items-center gap-2">
          <Link to="/">
            <p className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent cursor-pointer">
              Prodiverse
            </p>
          </Link>
          <a href="https://github.com/Farhan2001M/Prodiverse"target="_blank" rel="noopener noreferrer" >
            <img src="/icons/appicon.png" alt="App Icon" className="w-9 h-9 animate-spin cursor-pointer" style={{ animation: "spin 5s linear infinite" }} />
          </a>
        </h1>

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          <Link to="/create">
            <button className="p-2 rounded-lg border  border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-700">
              <FcPlus size={30}  />
            </button>
          </Link>
          <button onClick={toggleColorMode} className="p-2 rounded-lg border  border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-700" >
            {colorMode === "light" ? ( <IoMoon size={30} className="text-black" /> ) : ( <LuSun size={30}  className="text-white" /> )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
