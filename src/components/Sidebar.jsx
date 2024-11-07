import React from "react";
import { Link } from "react-router-dom";
import '../stylesheets/Sidebar.css'

const Sidebar = () => {
    return (
        <nav className="sidebar">
          {/* SECCIÓN DEL LOGO DE LA SIDEBAR */}
          <div className="arrow">
            <img src="/resources/images/sidebar/logo.png" className="arrow-icon"/>
            <span className="arrow-text">Grupo 06</span>
          </div>
          {/* FIN DE LA SECCIÓN DEL LOGO DE LA SIDEBAR */}
          {/* LISTA DE ITEMS DE LA SIDEBAR */}
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/" className="sidebar-link">
                <img src="/resources/images/sidebar/icon1.png" className="item-icon"/>
                <span className="item-text">Inicio</span>
              </Link>
            </li>
            {/* LISTA DE SUBITEMS DE LA SIDEBAR */}
            <li className="sidebar-item">
              <ul className="sidebar-subitem">
                <li className="sidebar-item">
                  <Link to="/imc" className="sidebar-link">
                    <img src="/resources/images/sidebar/icon3.png" className="item-icon"/>
                    <span className="item-text">Proyecto 01: Índice de Masa Corporal</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/transacciones" className="sidebar-link">
                    <img src="/resources/images/sidebar/icon4.png" className="item-icon"/>
                    <span className="item-text">Proyecto 02: Gestor de Transacciones</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/games" className="sidebar-link">
                    <img src="/resources/images/sidebar/icon5.png" className="item-icon"/>
                    <span className="item-text">Proyecto 03: Esquivando Meteoritos</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/games/matematico" className="sidebar-link">
                    <img src="/resources/images/sidebar/icon6.png" className="item-icon"/>
                    <span className="item-text">Proyecto 04: Desafío Matemático</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* FIN DE LA LISTA DE SUBITEMS DE LA SIDEBAR */}
            <li className="sidebar-item">
              <Link to="/aboutus" className="sidebar-link">
                <img src="/resources/images/sidebar/icon7.png" className="item-icon"/>
                <span className="item-text">Sobre Nosotros</span>
              </Link>
            </li>
          </ul>
          {/* FIN DE LA LISTA DE ITEMS DE LA SIDEBAR */}
        </nav>
      );
    };
    
    export default Sidebar;    