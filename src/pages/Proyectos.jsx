import React from "react";
import { Link } from 'react-router-dom';
import "../stylesheets/Proyectos.css"
import TypingAnimation from "../models/home/TypingAnimation";

function Proyectos() {

  const messageText = "[AQUI VA OTRO MENSAJE SINO TAMBIÉN QUEDABA VACIO ASAJSJ 🤙]";
  const typingSpeed = 100;

  const displayedMessage = TypingAnimation(messageText, typingSpeed);

  return (
    <div className="presentation-container">
      <div className="home-bg">
        {/* VIDEO DE FONDO */}
        <video autoPlay muted loop id="home-video">
          <source src="../resources/videos/proyecto.mp4" type="video/mp4" />
        </video>
        <div className="text-container">
          <div className="message">
            {displayedMessage}
          </div>
        </div>
      </div>
      <div className="description-container">
        {/* CONTENEDOR DEL PRIMER PROYECTO */}
        <div className="first-container">
          <h2>Proyecto 1: Índice de Masa Corporal</h2>
          <p>El primer proyecto consistía en imaginar un programa que permita a los usuarios ingresar una serie de datos personales —nombre, apellido, peso y altura— para calcular su 
            Índice de Masa Corporal (IMC) de una forma rápida y sencilla. Entonces nosotros, los integrantes del grupo seis, utilizando una ávida combinación de código HTML, CSS y 
            JavaScript para darle forma a la siguiente herramienta que le permitirá a cada persona evaluar su estado físico acorde a las clasificaciones oficiales del sistema que 
            protagoniza el primer bloque de nuestra plataforma. Además, hemos implemetado una función extra que les permitirá a los usuarios mantener un registro de su progreso mensual,
            algo que estamos cien por ciento seguros de que potenciará los beneficios que esta herramienta es capaz de ofrecerles.</p>
          <div className="preview-container">
            <img src="/resources/images/pages/preview-indice-de-masa-corporal.png"></img>
          </div>
          <Link to="/indice-de-masa-corporal">
            <button className="btn-estadisticas">IR AL PROYECTO</button>
          </Link>
        </div>
        {/* CONTENEDOR DEL SEGUNDO PROYECTO */}
        <div className="second-container">
          <h2>Proyecto 2: Gestor de Transacciones</h2>
          <p> El segundo proyecto, quizás uno de los más exigentes a los que nos enfrentamos, puso a prueba todos nuestros conocimientos sobre los lenguajes utilizados hasta ahora en 
          la cursada. Nuestro Gestor de Billeteras es una herramienta bastante completa e intuitiva, la cuál le permitirá a cualquiera que desee usarla, como nos lo indica su nombre,
          almacenar un sinfín de transacciones junto a sus datos —nombre y apellido, cantidad de movimientos, método de pago— con tan solo escribirlos en los campos correspondientesm,
          aunque eso no es todo. ¡También podrás acceder a resúmenes personalizados que abarcan todas las transacciones ingresadas previamente desde el formulario!  
          </p>
          <div className="preview-container">
            <img src="/resources/images/ta-bien.jpg"></img>
          </div>
          <Link to="/gestor-de-transacciones">
            <button className="form-button">IR AL PROYECTO</button>
          </Link>
        </div>
        <div className="third-container">
          {/* CONTENEDOR DEL TERCER PROYECTO */}
          <h2>Proyecto 3: Esquivando Meteoros</h2>
          <p>La creatividad es el motor que impulsa la capacidad humana para imaginar algo nuevo; o al menos eso es lo que hemos aprendido durante la etapa de desarrollo de nuestro tercer 
            proyecto. Esquivando meteoros es un juego desarrollado en Phaser el cual que desafía al jugador a sobrevivir en el vasto espacio exterior, esquivando meteoritos y poniéndose a 
            pruba contra naves enemigas. En una de las escenas más intensas, el jugador deberá desafiar al jefe enemigo, quien representa una amenaza constante gracias a las últimas 
            mejoras que le hemos implementado. ¿Qué estás esperando para probarlas?</p>
          <div className="preview-container">
            <img src="/resources/images/pages/preview-esquivando-meteoros.png"></img>
          </div>
          <Link to="/esquivando-meteoros">
            <button className="game-button">IR AL PROYECTO</button>
          </Link>
        </div>
        <div className="fourth-container">
          {/* CONTENEDOR DEL CUARTO PROYECTO */}
          <div className="fourth-description">
            <h2>Proyecto 4: Desafío Matemático</h2>
            <p>Y aquí estamos, la última parada del recorrido, aunque esperemos que hayan más lugares por descubrir en un futuro... En esta ocasión los más pequeños son los que tendrán
              que juzgar nuestra capacidad como programadores, ya que el cuarto proyecto esta dirigido especialmente a ellos. El Desafío Matemático se presenta como una forma divertida
              abordar el aprendizaje, y se lo debemos todo a una biblioteca en particular; ¡React!. Creemos que hemos hecho un buen uso de sus funcionalidades a la hora de crear estos 
              desafíos matemáticos, la cual hemos complementado con una interfaz que estamos seguros que encantará a aquellos que se animen a sobrepasar los límites de sus mentes. </p>
          </div>
          <div className="preview-container">
            <img src="/resources/images/pages/preview-desafio-matematico.png"></img>
          </div>
          <Link to="/desafio-matematico">
            <button>IR AL PROYECTO</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;