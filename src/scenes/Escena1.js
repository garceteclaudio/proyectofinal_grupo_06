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
    this.musicaFondo1 = null;
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
    meteoro.destroy();
    bala.destroy();
    this.incrementarPuntajePorColision();
    this.sonidoExplosion.play();
  }

  incrementarPuntajePorColision() {
    /*
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
    */
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

      if (this.puntaje === 220) {
        this.activarDestello();
      }

      if (this.puntaje > 300) {
        // Pass the score to BonusTrack when starting the scen e
        this.musicaFondo1.stop();
        this.scene.start("BonusTrack", { puntaje: this.puntaje });
      }
    }
  }

  preload() {
    this.load.image("espacio", "/resources/images/games/espacio.png");
    this.load.spritesheet("nave", "/resources/images/games/nave.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.image("meteoro", "/resources/images/games/meteoro.png", {
      frameWidth: 56,
      frameHeight: 60,
    });
    this.load.image("bala", "/resources/images/games/bala.png");
    this.load.image("destello", "/resources/images/games/destello.png");
    this.load.audio("musicaFondo1", "/resources/sounds/musicaFondo1.mp3");
    this.load.audio("sonidoBala", "/resources/sounds/sonidoBala.mp3");
    this.load.audio("sonidoExplosion", "/resources/sounds/sonidoExplosion.mp3");
    this.load.audio("alerta", "/resources/sounds/alerta.mp3");
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
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.physics.add.collider(
      this.jugador,
      this.grupoMeteoros,
      (jugador, meteoro) => {
        meteoro.destroy();
        this.scene.start("GameOver", { puntaje: this.puntaje }); // Inicia la escena GameOver y pasa el puntaje
        this.musicaFondo1.stop();
        this.puntaje = 0;
      },
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

    this.textoDePuntaje = this.add.text(16, 16, "Puntaje: 0", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.musicaFondo1 = this.sound.add("musicaFondo1", {
      volume: 0.3,
      loop: true,
    });
    this.musicaFondo1.play();
    this.sonidoBala = this.sound.add("sonidoBala");
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

    if (this.teclas.space.isDown) {
      this.dispararBala();
    }
  }
}
