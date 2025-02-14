import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FcPlus } from "react-icons/fc";

const Navbar = ({ colorMode, toggleColorMode }) => {
  return (
    <div className="p-5 max-w-screen mx-auto dark:bg-gray-900 bg-gray-100">
      <div className="mx-auto flex justify-between items-center h-16 flex-col gap-4 sm:flex-row transition-colors">
        {/* Logo */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold uppercase ">
          <Link target="_blank" rel="noopener noreferrer" to={"https://github.com/Farhan2001M/Prodiverse"} className="flex items-center gap-2"> 
            <p className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Prodiverse
            </p>
            <img
              src="/icons/appicon.png"
              alt="App Icon"
              className="w-9 h-9 animate-spin"
              style={{ animation: "spin 5s linear infinite" }} 
            />
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 168"><path fill="#ff2638" d="m85.327 83.997l85.327 83.996H0z"/><path fill="#ffc600" d="m0 0l85.327 83.997L170.654 0z"/><path fill="#0079f2" d="m85.341 83.997l85.327 83.996l85.327-83.996L170.668 0z"/></svg>  */}
          </Link>
        </h1>

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          <Link to="/create">
            <button className="p-2 rounded-lg border  border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-700">
              <FcPlus size={30}  />
            </button>
          </Link>
          <button
            onClick={toggleColorMode}
            className="p-2 rounded-lg border  border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {colorMode === "light" ? (
              <IoMoon size={30} className="text-black" />
            ) : (
              <LuSun size={30}  className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
