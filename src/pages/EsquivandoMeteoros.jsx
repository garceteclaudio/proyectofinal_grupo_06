import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

import Escena1 from "../scenes/Escena1.js";
import Escena2 from "../scenes/Escena2.js";
import GameOver from "../scenes/GameOver.js";
import AdminEscenas from "../models/adminEscenas.js";
import YouWin from "../scenes/YouWin.js";
import Bonustrack from "../scenes/BonusTrack.js";
import Ranking from "../scenes/Ranking.js";

import '../stylesheets/EsquivandoMeteoros.css';

function EsquivandoMeteoros() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current === null) { // Crear el juego solo si no existe
      let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [Escena2, Bonustrack, YouWin,Ranking, GameOver],
        parent: "game-container",
      };
      
      gameRef.current = new Phaser.Game(config);
      //const adminEscenas = new AdminEscenas(gameRef.current);
    }

    return () => { // Función de limpieza
      if (gameRef.current) {
        gameRef.current.destroy(true); // Desmonta el juego al salir de la sección
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <main className='game-page'>
      <div className='game-title'>
      <h1>Esquivando Meteoros</h1>
      </div>
      <div id="game-container"></div> { }
    </main>
  );
}

export default EsquivandoMeteoros;
