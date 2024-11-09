import Nave from "../models/Nave";
import Meteoro from "../models/Meteoro";

export default class Escena2 extends Phaser.Scene {
  constructor() {
    super({ key: "Escena 2" });
    this.jugador = null;
    this.grupoBalas = null;
    this.grupoBalasBoss = null;
    this.vidasJugador = 3;
    this.textoVidasJugador = null;
    this.grupoMeteoros = null;
    this.grupoBalas = null;
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

  init(data) {
    // Asignar el puntaje recibido de Escena1
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
    this.sonidoExplosion.play();
  }

  incrementarPuntaje() {
    if (!this.juegoTerminado) {
      this.puntaje += 1;
      this.textoDePuntaje.setText(`Puntaje: ${this.puntaje}`);
    }
  }

  colisionBalaEnemigo(bala, enemigoNave) {
    enemigoNave.destroy();
    bala.destroy();

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

    this.generarEnemigosEvento = this.time.addEvent({
      delay: 500,
      callback: this.generarEnemigosNave,
      callbackScope: this,
      loop: true,
    });

    // Configura la colisión entre las balas del jugador y el boss
    setTimeout(() => {
      this.physics.add.collider(
        this.grupoBalas,
        this.boss,
        this.destruirBoss,
        null,
        this
      );
    }, 5000);

    // Iniciar generación de meteoros verticales si el jefe sigue vivo después de 10 segundos
    this.time.delayedCall(10000, () => {
      if (this.boss && this.boss.active) {
        this.iniciarMeteorosVerticales();
      }
    });
  }

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

  dispararBalaBoss() {
    if (this.boss && this.boss.active) {
      const bala = this.grupoBalasBoss.get(this.boss.x, this.boss.y);
      if (bala) {
        bala.setActive(true);
        bala.setVisible(true);
        bala.setVelocityX(-400);
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
    // Genera la vida en una posición aleatoria en el eje Y
    const y = Phaser.Math.Between(50, 550);
    const vida = this.grupoVidas.create(800, y, "vida");
    vida.setVelocityX(-100); // Movimiento de derecha a izquierda
  }

  recogerVida(jugador, vida) {
    vida.destroy(); // Elimina la imagen de vida al recogerla
    this.vidasJugador += 1; // Incrementa la vida del jugador
    this.textoVidasJugador.setText(`Vidas: ${this.vidasJugador}`); // Actualiza el texto de vidas en pantalla
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
      this.colisionBalaEnemigo,
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
    this.load.audio("sonidoPierdeVida", "/resources/sounds/sonidoPierdeVida.mp3");
    this.load.audio("sonidoExplosion", "/resources/sounds/sonidoExplosion.mp3");
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

    // Inicialización de grupos y jugador...
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

    /* 
    this.time.addEvent({
      delay: 1000, // Intervalo para generar meteoros
      callback: () => Meteoro.generarMeteoros(this, this.grupoMeteoros), // Llama al método de generación de meteoros
      callbackScope: this,
      loop: true,
    });*/

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
      delay: 2000,
      callback: this.dispararBalaBoss,
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

    this.musicaFondo2 = this.sound.add("musicaFondo2", { loop: true });
    this.musicaFondo2.play();
    this.sonidoBala = this.sound.add("sonidoBala");
    this.sonidoPierdeVida = this.sound.add("sonidoPierdeVida");
    this.sonidoExplosion = this.sound.add("sonidoExplosion");
  } // fin crete()

  update() {
    if (this.juegoTerminado) return;

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
