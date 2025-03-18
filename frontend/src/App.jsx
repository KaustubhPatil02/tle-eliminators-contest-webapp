import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestDetails from './components/ContestDetails';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/contest/:id" element={<ContestDetails />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;