import Nave from "../models/Nave";
import Meteoro from "../models/Meteoro";

export default class Escena2 extends Phaser.Scene {
  constructor() {
    super({ key: "Escena 2" });
    this.direccionBoss = 1; // 1 para mover hacia abajo, -1 para mover hacia arriba
    this.jugador = null;
    this.grupoBalas = null;
    this.grupoBalasBoss = null;
    this.vidasJugador = 3;
    this.textoVidasJugador = null;
    this.grupoMeteoros = null;
    this.grupoEnemigosNave = null;
    this.boss = null;
    this.cursors = null;
    this.teclas = null;
    this.grupoVidas = null;
    this.textoDePuntaje = null;
    this.juegoTerminado = false;
    this.musicaFondo2 = null;
    this.siguienteDisparo = 0;
    this.sonidoBala = null;
    this.sonidoExplosion = null;
    this.fondoEspacio = null;
    this.bossAparecido = false;
    this.bossVelocidad = 100;
    this.generarEnemigosEvento = null;
    this.bossVidas = 10;
    this.textoVidasBoss = null;
    this.sonidoPierdeVida = null;
  }

  incrementarPuntajePorColision() {
    this.puntaje += 15;
    this.textoDePuntaje.setText(`Puntaje: ${this.puntaje}`);

    const textoBonus = this.add.text(
      this.jugador.x,
      this.jugador.y - 30,
      "+15",
      {
        fontSize: "20px",
        fill: "#ffd700",
      }
    );

    this.time.delayedCall(500, () => {
      textoBonus.destroy();
    });
  }

  init(data) {
    this.puntaje = data.puntaje || 0;
  }

  colisionNave() {
    this.sonidoPierdeVida.play();
    this.jugador.setTint(0xff0000);
    this.time.delayedCall(1500, () => {
      this.jugador.clearTint();
    });
  }

  generarMeteoros() {
    if (this.juegoTerminado) return;

    const y = Phaser.Math.Between(0, 600);
    const meteoro = this.grupoMeteoros.create(800, y, "meteoro");
    meteoro.setVelocityX(-200);
  }

  generarEnemigosNave() {
    if (this.juegoTerminado) return;

    const y = Phaser.Math.Between(50, 550);
    const enemigoNave = this.grupoEnemigosNave.create(800, y, "enemigoNave");
    enemigoNave.setVelocityX(-150);
    enemigoNave.vidas = 3;
  }

  dispararBala() {
    const tiempoActual = this.time.now;

    if (tiempoActual > this.siguienteDisparo) {
      const bala = this.grupoBalas.get(this.jugador.x + 50, this.jugador.y);

      if (bala) {
        bala.setActive(true);
        bala.setVisible(true);
        bala.setVelocityX(500);
        this.siguienteDisparo = tiempoActual + 300;

        this.sonidoBala.play();
      }
    }
  }

  destruirMeteoro(bala, meteoro) {
    meteoro.destroy();
    bala.destroy();
    this.incrementarPuntajePorColision();
    this.sonidoExplosion.play();
  }

  incrementarPuntaje() {
    if (!this.juegoTerminado) {
      this.puntaje += 1;
      this.textoDePuntaje.setText(`Puntaje: ${this.puntaje}`);
    }
  }

  destruirEnemigoConBala(bala, enemigoNave) {
    enemigoNave.destroy();
    bala.destroy();
    this.incrementarPuntajePorColision();
    this.sonidoExplosion.play();
  }

  colisionJugadorEnemigo(jugador, enemigoNave) {
    enemigoNave.destroy();
    this.vidasJugador -= 1;
    this.textoVidasJugador.setText(`Vidas: ${this.vidasJugador}`);

    this.colisionNave();

    if (this.vidasJugador <= 0) {
      this.scene.start("GameOver", { puntaje: this.puntaje });
      this.musicaFondo2.stop();
      this.juegoTerminado = true;
      this.puntaje = 0;
    }
  }

  colisionJugadorMeteoro(jugador, meteoro) {
    meteoro.destroy();
    this.vidasJugador -= 1;
    this.textoVidasJugador.setText(`Vidas: ${this.vidasJugador}`);

    this.colisionNave();

    if (this.vidasJugador <= 0) {
      this.scene.start("GameOver", { puntaje: this.puntaje });
      this.musicaFondo2.stop();
      this.juegoTerminado = true;
      this.puntaje = 0;
    }
  }

  aparecerBoss() {
    this.boss = this.physics.add.sprite(1000, 300, "boss");
    this.boss.setDisplaySize(300, 400);
    this.boss.setVelocityX(0);
    this.bossAparecido = true;

    this.textoVidasBoss = this.add.text(
      16,
      64,
      `Vidas del Boss: ${this.bossVidas}`,
      {
        fontSize: "24px",
        fill: "#fff",
      }
    );

    // Manejo del evento para generar más enemigos cuando aparezca el boss
    if (this.generarEnemigosEvento) {
      this.generarEnemigosEvento.remove();
    }

    setTimeout(() => {
      this.physics.add.collider(
        this.grupoBalas,
        this.boss,
        this.destruirBoss,
        null,
        this
      );
    }, 5000);

    // Evento de disparo de balas del boss
    this.time.addEvent({
      delay: 2000,
      callback: this.dispararBalaBoss,
      callbackScope: this,
      loop: true,
    });

    this.generarEnemigosEvento = this.time.addEvent({
      delay: 500,
      callback: this.generarEnemigosNave,
      callbackScope: this,
      loop: true,
    });

    this.time.delayedCall(10000, () => {
      if (this.boss && this.boss.active) {
        this.iniciarMeteorosVerticales();
      }
    });
  } // fin aparecerBoss()

  // Método para generar meteoros de manera vertical
  iniciarMeteorosVerticales() {
    this.time.addEvent({
      delay: 1000, // Intervalo de caída de los meteoros
      callback: () => {
        if (!this.juegoTerminado && this.boss && this.boss.active) {
          const x = Phaser.Math.Between(50, 750);
          const meteoro = this.grupoMeteoros.create(x, 0, "meteoro");
          meteoro.setVelocityY(200);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
  /* Metodo utilizado para la colision de la bala de la nave con el boss*/

  destruirBoss(bala, boss) {
    this.bossVidas--;

    this.crearExplosion(boss.x, boss.y);

    //Regenerar el boss si sus vidas no han llegado a cero
    if (this.bossVidas > 0) {
      bala.destroy();
      boss.destroy();
      this.sonidoExplosion.play();

      this.boss = this.physics.add.sprite(400, 300, "boss");
      this.bossAparecido = true;

      this.physics.add.collider(
        this.grupoBalas,
        this.boss,
        this.destruirBoss,
        null,
        this
      );

      this.textoVidasBoss.setText(`Vidas del Boss: ${this.bossVidas}`);
    } else {
      //Destruir el boss de forma definitiva y mostrar la escena de victoria
      boss.destroy();
      bala.destroy();
      this.sonidoExplosion.play();
      this.boss = null;

      this.textoVidasBoss.destroy();
      this.textoVidasBoss = null;

      this.musicaFondo2.stop();
      this.scene.start("YouWin", { puntaje: this.puntaje });
    }
  }
  //Mostrar una pequeña explosión cuanod una bala colisione con el boss
  crearExplosion(x, y) {
    const explosion = this.add.sprite(x, y, "contacto");
    explosion.setOrigin(0.5, 0.5);
    explosion.setScale(0.5);

    this.time.delayedCall(300, () => {
      explosion.destroy();
    });
  }

  colisionBalaBoss(jugador, bala) {
    bala.destroy();
    this.vidasJugador -= 1;
    this.textoVidasJugador.setText(`Vidas: ${this.vidasJugador}`);

    this.colisionNave();

    if (this.vidasJugador <= 0) {
      this.scene.start("GameOver", { puntaje: this.puntaje });
      this.musicaFondo2.stop();
      this.juegoTerminado = true;
    }
  }
  /*Metodo utilizado para que el boss dispare*/
  dispararBalaBoss() {
    if (this.boss && this.boss.active) {
      const bala = this.grupoBalasBoss.get(this.boss.x, this.boss.y);
      if (bala) {
        bala.setActive(true);
        bala.setVisible(true);
        bala.setVelocityX(-200);
        bala.setVelocityY(
          ((this.jugador.y - this.boss.y) / (this.jugador.x - this.boss.x)) *
            -200
        ); // Dirección hacia el jugador
      }
    }
  }

  animacionNave() {
    this.anims.create({
      key: "izquierda",
      frames: [{ key: "nave", frame: 1 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "normal",
      frames: [{ key: "nave", frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "derecha",
      frames: [{ key: "nave", frame: 2 }],
      frameRate: 20,
    });
  }
  generarVida() {
    const y = Phaser.Math.Between(50, 550);
    const vida = this.grupoVidas.create(800, y, "vida");
    vida.setVelocityX(-100);
  }

  recogerVida(jugador, vida) {
    // Destruye el objeto vida y aumenta las vidas del jugador
    vida.destroy();
    this.vidasJugador += 1;
    this.textoVidasJugador.setText(`Vidas: ${this.vidasJugador}`);

    this.sound.play("gana-vida");

    // Cambia el color de la nave a verde
    this.jugador.setTint(0x00ff00);

    // Muestra el texto "+1" cerca de la nave
    const textoBonus = this.add.text(
      this.jugador.x,
      this.jugador.y - 30,
      "+1",
      { fontSize: "20px", fill: "#00ff00" }
    );

    // Después de 500 ms, quita el tinte verde y elimina el texto "+1"
    this.time.delayedCall(500, () => {
      this.jugador.clearTint();
      textoBonus.destroy();
    });
  }

  manejadorColisiones() {
    //INICIO | Colisiones

    this.physics.add.overlap(
      this.jugador,
      this.grupoVidas,
      this.recogerVida,
      null,
      this
    );

    // Colisión entre balas del boss y el jugador
    this.physics.add.collider(
      this.jugador,
      this.grupoBalasBoss,
      this.colisionBalaBoss,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.grupoMeteoros,
      this.colisionJugadorMeteoro,
      null,
      this
    );

    this.physics.add.collider(
      this.grupoBalas,
      this.grupoMeteoros,
      this.destruirMeteoro,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.grupoEnemigosNave,
      this.colisionJugadorEnemigo,
      null,
      this
    );

    this.physics.add.collider(
      this.grupoBalas,
      this.grupoEnemigosNave,
      this.destruirEnemigoConBala,
      null,
      this
    );

    //FIN | Colisiones
  }

  preload() {
    this.load.image("espacio", "/resources/images/games/espacio.png");
    this.load.spritesheet("nave", "/resources/images/games/nave.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.image("vida", "/resources/images/games/vida.png");
    this.load.image("meteoro", "/resources/images/games/meteoro.png");
    this.load.image("bala2", "/resources/images/games/balaHorizontal.png");
    this.load.image("enemigoNave", "/resources/images/games/enemigoNave.png");
    this.load.image("boss", "/resources/images/games/boss.png");
    this.load.image("contacto", "/resources/images/games/contacto.png");
    this.load.audio("musicaFondo2", "/resources/sounds/musicaFondo2.mp3");
    this.load.audio("sonidoBala", "/resources/sounds/sonidoBala.mp3");
    this.load.audio(
      "sonidoPierdeVida",
      "/resources/sounds/sonidoPierdeVida.mp3"
    );
    this.load.audio("sonidoExplosion", "/resources/sounds/sonidoExplosion.mp3");
    this.load.audio("gana-vida", "/resources/sounds/gana-vida.mp3");
  }

  create() {
    this.vidasJugador = 3;
    this.juegoTerminado = false;
    this.bossAparecido = false;

    this.bossVidas = 10;

    this.fondoEspacio = this.add.tileSprite(400, 300, 800, 600, "espacio");
    this.jugador = this.physics.add.sprite(100, 300, "nave", 0);
    this.jugador.setCollideWorldBounds(true);
    this.jugador.setAngle(90);

    // Mostrar vidas del jugador en pantalla
    this.textoVidasJugador = this.add.text(
      600,
      16,
      `Vidas: ${this.vidasJugador}`,
      {
        fontSize: "32px",
        fill: "#fff",
      }
    );

    this.textoDePuntaje = this.add.text(16, 16, "Puntaje: 0", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.grupoBalasBoss = this.physics.add.group({
      defaultKey: "bala2",
      maxSize: 20,
    });

    this.grupoBalas = this.physics.add.group({
      defaultKey: "bala2",
      maxSize: 50,
    });

    this.grupoMeteoros = this.physics.add.group();
    this.grupoEnemigosNave = this.physics.add.group();
    this.grupoVidas = this.physics.add.group();

    this.animacionNave();
    this.manejadorColisiones();

    // Evento para generar la imagen de vida cada 3 segundos
    this.time.addEvent({
      delay: 3000,
      callback: this.generarVida,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.generarMeteoros,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 3000,
      callback: this.generarEnemigosNave,
      callbackScope: this,
      loop: true,
    });

    this.incrementoPuntajeEvento = this.time.addEvent({
      delay: 100,
      callback: this.incrementarPuntaje,
      callbackScope: this,
      loop: true,
    });

    this.time.delayedCall(
      15000,
      () => {
        if (!this.bossAparecido) {
          this.aparecerBoss();
        }
      },
      [],
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.musicaFondo2 = this.sound.add("musicaFondo2", {
      volume: 0.3,
      loop: true,
    });
    this.musicaFondo2.play();
    this.sonidoBala = this.sound.add("sonidoBala");
    this.sonidoPierdeVida = this.sound.add("sonidoPierdeVida");
    this.sonidoExplosion = this.sound.add("sonidoExplosion");
  } // fin create()

  update(time, delta) {
    if (this.juegoTerminado) return;

    if (this.boss && this.boss.active) {
      // Movimiento vertical del boss
      this.boss.y += (this.direccionBoss * this.bossVelocidad * delta) / 1000;

      // Cambiar dirección en límites superior e inferior
      if (this.boss.y >= 550) {
        this.direccionBoss = -1; // Mover hacia arriba
      } else if (this.boss.y <= 50) {
        this.direccionBoss = 1; // Mover hacia abajo
      }
    }

    this.fondoEspacio.tilePositionX -= 2;

    this.jugador.setVelocity(0);

    if (this.cursors.left.isDown || this.teclas.left.isDown) {
      this.jugador.setVelocityX(-300);
      this.jugador.anims.play("izquierda", true);
    } else if (this.cursors.right.isDown || this.teclas.right.isDown) {
      this.jugador.setVelocityX(300);
      this.jugador.anims.play("derecha", true);
    } else if (this.cursors.up.isDown || this.teclas.up.isDown) {
      this.jugador.setVelocityY(-300);
      this.jugador.anims.play("normal", true);
    } else if (this.cursors.down.isDown || this.teclas.down.isDown) {
      this.jugador.setVelocityY(300);
      this.jugador.anims.play("normal", true);
    } else {
      this.jugador.anims.play("normal", true);
    }

    if (this.teclas.space.isDown) {
      this.dispararBala();
    }

    //Manejo del movimiento de aparición del boss
    if (this.bossAparecido && this.boss) {
      if (this.boss.x > 600) {
        this.boss.x -= (this.bossVelocidad * this.game.loop.delta) / 1000; // Mueve el boss hacia la izquierda
      } else {
        this.boss.x = 600;
      }
    }
  } // fin update
}
