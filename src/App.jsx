import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
