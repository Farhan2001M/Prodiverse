import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from 'react-toastify';

function App() {
  const [colorMode, setColorMode] = useState(() => {
    // Get the saved color mode from localStorage (or default to light mode)
    return localStorage.getItem("colorMode") || "light";
  });

  // Toggle color mode
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Apply color mode to localStorage and to the <body> tag
    localStorage.setItem("colorMode", colorMode);
    if (colorMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [colorMode]);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
      <ToastContainer 
        position="bottom-right"
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
