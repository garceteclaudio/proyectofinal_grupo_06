import React from "react";
import "../stylesheets/Proyectos.css"
import TypingAnimation from "../models/home/TypingAnimation";

function Proyectos() {

  const messageText = "[PROFESORES: HOY HAY PARO 🤙]";
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
        <div className="first-container">
          {/* CONTENEDOR DEL PRIMER PROYECTO */}
          <h2>Proyecto 1: Índice de Masa Corporal</h2>
          <p>La naturaleza tiene una forma maravillosa de recordarnos la simplicidad de lo esencial. Al ver un amanecer o escuchar el susurro del viento entre los árboles, uno puede sentir una conexión profunda con el mundo. Es un recordatorio de que, más allá de nuestras preocupaciones y complicaciones, el planeta sigue girando y la vida continúa en todas sus formas. Esta conexión nos invita a parar y respirar, a apreciar los detalles y a encontrar paz en la inmensidad del universo natural.</p>
          <p>iamgen</p>
          <br></br>
        </div>
        <div className="second-container">
          {/* CONTENEDOR DEL SEGUNDO PROYECTO */}
          <h2>Proyecto 2: Gestor de Transacciones</h2>
          <p>La literatura es otro de esos universos en los que uno puede perderse por completo. A través de las palabras de un autor, podemos experimentar vidas, épocas y emociones que quizá nunca conoceríamos de otra forma. Leer es una experiencia profundamente transformadora porque cada historia lleva consigo una perspectiva única. Los libros tienen el poder de expandir nuestra mente, llevarnos a otros mundos y, al mismo tiempo, hacernos reflexionar sobre nuestra propia realidad.</p>
          <br></br>
          <p>iamgen</p>
        </div>
        <div className="third-container">
          {/* CONTENEDOR DEL TERCER PROYECTO */}
          <h2>PROYECTO 3</h2>
          <p>La creatividad es el motor que impulsa el avance y el cambio en la humanidad. Desde las primeras pinturas rupestres hasta la tecnología más avanzada, cada innovación nace de la capacidad humana para imaginar algo nuevo. Esta habilidad para crear es, en muchos sentidos, lo que nos define y nos permite encontrar soluciones a los problemas que enfrentamos. Es en el proceso creativo donde realmente se encuentra el equilibrio entre la lógica y la intuición, entre lo aprendido y lo imaginado.</p>
          <br></br>
          <p>iamgen</p>
        </div>
        <div className="fourth-container">
          {/* CONTENEDOR DEL CUARTO PROYECTO */}
          <h2>PROYECTO 4</h2>
          <p>Finalmente, la empatía es el puente que conecta nuestras experiencias con las de los demás. En un mundo que parece estar cada vez más polarizado, la capacidad de entender y sentir el dolor o la alegría ajena se vuelve esencial para construir relaciones sólidas. La empatía nos permite superar las barreras de la comunicación y nos recuerda que, aunque cada individuo tiene una historia distinta, todos compartimos una humanidad común. Este sentimiento nos impulsa a ser más amables y a trabajar juntos para un mundo mejor.</p>
          <br></br>
          <p>iamgen</p>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;
