import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Index from './pages/Index.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Games from './pages/Games.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Index</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/games">Games</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
