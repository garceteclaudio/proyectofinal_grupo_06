import React from "react";
import "../stylesheets/Home.css";
import TypingAnimation from "../models/home/TypingAnimation";

const Home = () => {
  const messageText = "───▐▀▄──────▄▀▌───▄▄▄▄▄▄▄ ───▌▒▒▀▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄ ──▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄ ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄ ▀█▒▒█▌▒▒█▒▒▐█▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌ ▀▌▒▒▒▒▒▀▒▀▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐_▄▄ ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄█▒█ ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀ ──▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌  [CAMBIAR POR TEXTO DESPUÉS 🤙]";
  const typingSpeed = 100;

  const displayedMessage = TypingAnimation(messageText, typingSpeed);

  return (
    <div className="home-bg">
      <video autoPlay muted loop id="home-video">
        <source src="../resources/videos/fondo.mp4" type="video/mp4" />
      </video>
      <div className="text-container">
        <div className="message">
          {displayedMessage}
        </div>
      </div>
    </div>
  );
};

export default Home;