import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Games from './pages/Games.jsx';
import IMC from './pages/IMC.jsx';

import '../src/stylesheets/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/games" element={<Games />} />
            <Route path="/imc" element={<IMC />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

