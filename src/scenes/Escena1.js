export default class Escena1 extends Phaser.Scene {
  constructor() {
    super({ key: "Escena 1" });
    this.jugador = null;
    this.grupoMeteoros = null;
    this.grupoBalas = null;
    this.cursors = null;
    this.teclas = null;
    this.puntaje = 0;
    this.textoDePuntaje = null;
    this.juegoTerminado = false;
    this.musicaFondo = null;
    this.sonidoGrito = null;
    this.siguienteDisparo = 0;
    this.sonidoBala = null;
    this.sonidoExplosion = null;
  }

  generarMeteoros() {
    if (this.juegoTerminado) return;

    const x = Phaser.Math.Between(0, 800);
    const meteoro = this.grupoMeteoros.create(x, 0, "meteoro");
    meteoro.setVelocityY(200);
  }

  dispararBala() {
    const tiempoActual = this.time.now;

    if (tiempoActual > this.siguienteDisparo) {
      const bala = this.grupoBalas.get(this.jugador.x, this.jugador.y - 50);

      if (bala) {
        bala.setActive(true);
        bala.setVisible(true);
        bala.setVelocityY(-500);
        this.siguienteDisparo = tiempoActual + 300;

        this.sonidoBala.play();
      }
    }
  }

  destruirMeteoro(bala, meteoro) {
    // Destruir meteoro y bala
    meteoro.destroy();
    bala.destroy();

    // Reproducir el sonido de la bala
    this.sonidoExplosion.play();
  }

  activarDestello() {
    const destello = this.add.image(400, 300, "destello");
    const alerta = this.sound.add("alerta");
    destello.setScale(0.65);
    let visible = false;
    alerta.stop();

    //Crear un intervalo para generar el efecto antes del cambio de escenas
    const intervalo = setInterval(() => {
      visible = !visible;
      destello.setVisible(visible);
      alerta.play();
    }, 350);
    //El intervalo se termina luego de 8000ms
    setTimeout(() => {
      clearInterval(intervalo);
      destello.destroy();
      alerta.stop();
    }, 8000);
  }

  incrementarPuntaje() {
    if (!this.juegoTerminado) {
      this.puntaje += 1;
      this.textoDePuntaje.setText(`Puntaje: ${this.puntaje}`);

      if (this.puntaje === 230) {
        this.activarDestello();
      }

      if (this.puntaje > 300) {
        // Pass the score to BonusTrack when starting the scene
        this.musicaFondo.stop();
        this.scene.start("BonusTrack", { puntaje: this.puntaje });
      }

      /**

      //Efecto de destello al alcanzar los puntos establecidos
      if (this.puntaje === 150) {
        this.activarDestello();
      }

      //Cambiar a Escena2 cuando se alcancen los puntos establecidos
      if (this.puntaje >= 180) {
        this.musicaFondo.stop();
        this.scene.stop("Escena 1");
        this.scene.start("Escena 2", { puntaje: this.puntaje });
      }*/
    }
  }

  preload() {
    this.load.image("espacio", "/public/resources/images/game/espacio.png");
    this.load.spritesheet("nave", "/public/resources/images/game/nave.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.image("meteoro", "/public/resources/images/game/meteoro.png", {
      frameWidth: 56,
      frameHeight: 60,
    });
    this.load.image("bala", "/public/resources/images/game/bala.png");
    this.load.audio("musicaFondo", "/public/resources/sounds/9.mp3");
    this.load.audio("grito", "/public/resources/sounds/grito.mp3");
    this.load.audio("balaSonido", "/public/resources/sounds/balaSonido.mp3");
    this.load.audio(
      "sonidoExplosion",
      "/public/resources/sounds/sonidoExplosion.mp3"
    );
    this.load.image("destello", "/public/resources/images/game/destello.png");
    this.load.audio("alerta", "/public/resources/sounds/alerta.mp3");
  }

  create() {
    //Resetear eñ puntaje al crear la escena
    this.puntaje = 0;

    this.add.image(400, 300, "espacio");
    this.jugador = this.physics.add.sprite(400, 550, "nave", 0);
    this.jugador.setCollideWorldBounds(true);

    this.grupoBalas = this.physics.add.group({
      defaultKey: "bala",
      maxSize: 20,
    });

    this.grupoMeteoros = this.physics.add.group();

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

    this.time.addEvent({
      delay: 1000,
      callback: this.generarMeteoros,
      callbackScope: this,
      loop: true,
    });

    this.incrementoPuntajeEvento = this.time.addEvent({
      delay: 100,
      callback: this.incrementarPuntaje,
      callbackScope: this,
      loop: true,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE, // Barra espaciadora para disparar
    });

    // aca tengo q poner esto: this.musicaFondo.stop();
    this.physics.add.collider(
      this.jugador,
      this.grupoMeteoros,
      (jugador, meteoro) => {
        meteoro.destroy(); // Destruye el meteoro
        this.scene.start("GameOver", { puntaje: this.puntaje }); // Inicia la escena GameOver y pasa el puntaje
        this.musicaFondo.stop();
        this.puntaje = 0;
      },
      null,
      this
    );

    // Colisión entre balas y meteoros
    this.physics.add.collider(
      this.grupoBalas,
      this.grupoMeteoros,
      this.destruirMeteoro,
      null,
      this
    );

    this.textoDePuntaje = this.add.text(16, 16, "Puntaje: 0", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.musicaFondo = this.sound.add("musicaFondo", { loop: true });
    this.musicaFondo.play();
    this.sonidoGrito = this.sound.add("grito");
    this.sonidoBala = this.sound.add("balaSonido");
    this.sonidoExplosion = this.sound.add("sonidoExplosion");
  }

  update() {
    if (this.juegoTerminado) return;

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

    // Disparar balas cuando se presiona la barra espaciadora
    if (this.teclas.space.isDown) {
      this.dispararBala();
    }
  }
}
