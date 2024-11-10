import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import EsquivandoMeteoros from './pages/EsquivandoMeteoros.jsx';
import IMC from './pages/IMC.jsx';
import DesafioMatematico from './pages/DesafioMatematico.jsx';
import GestorDeTransacciones from './pages/GestorDeTransacciones.jsx';
import Proyectos from './pages/Proyectos.jsx';
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
            <Route path="/esquivando-meteoros" element={<EsquivandoMeteoros />} />
            <Route path="/imc" element={<IMC />} />
            <Route path="/transacciones" element={<GestorDeTransacciones />} />
            <Route path="/desafio-matematico" element={<DesafioMatematico />} />
            <Route path="/proyectos" element={<Proyectos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

