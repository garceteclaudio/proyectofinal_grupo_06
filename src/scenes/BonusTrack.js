export default class BonusTrack extends Phaser.Scene {
  constructor() {
    super({ key: "BonusTrack" });
    this.jugador = null;
    this.grupoMonedas = null;
    this.textoDePuntaje = null;
    this.tiempoLimite = 10000;
    this.intervaloMonedas = 2000;
    this.cantidadMonedasPorIntervalo = 5;
    this.tiempoMonedas = 0;
    this.musicaFondoBonustrack = null;
  }

  preload() {
    this.load.audio(
      "musicaFondoBonustrack",
      "/resources/sounds/bonustrack.mp3"
    );
    this.load.image("moneda", "/resources/images/games/moneda.png");
    this.load.image("fondo", "/resources/images/games/espacio.png");
  }

  create(data) {
    this.puntaje = data.puntaje || 0;

    this.add.image(400, 300, "fondo");

    this.textoDePuntaje = this.add.text(16, 16, `Puntaje: ${this.puntaje}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.add.text(250, 75, "¡BONUSTRACK!", {
      fontSize: "38px",
      fill: "#fff",
    });

    this.grupoMonedas = this.physics.add.group();

    this.jugador = this.physics.add.sprite(400, 550, "nave", 0);
    this.jugador.setCollideWorldBounds(true);

    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.cursors = this.input.keyboard.createCursorKeys(); // Flechas de dirección

    this.physics.add.collider(
      this.jugador,
      this.grupoMonedas,
      this.recolectarMoneda,
      null,
      this
    );

    // Iniciar el temporizador para pasar a Escena2 después de 10 segundos
    this.time.delayedCall(this.tiempoLimite, this.finDelJuego, [], this);

    // Crear las monedas cada 2 segundos
    this.time.addEvent({
      delay: this.intervaloMonedas,
      callback: this.crearMonedas,
      callbackScope: this,
      loop: true,
    });

    this.musicaFondoBonustrack = this.sound.add("musicaFondoBonustrack", {
      loop: true,
    });
    this.musicaFondoBonustrack.play();
  }

  crearMonedas() {
    for (let i = 0; i < this.cantidadMonedasPorIntervalo; i++) {
      const x = Phaser.Math.Between(50, 750);
      const moneda = this.grupoMonedas.create(x, 0, "moneda");
      moneda.setVelocityY(Phaser.Math.Between(100, 900));
      moneda.setGravityY(100);
    }
  }

  recolectarMoneda(jugador, moneda) {
    moneda.destroy();
    this.puntaje += 200;
    this.textoDePuntaje.setText(`Puntaje: ${this.puntaje}`);

    const textoBonus = this.add.text(jugador.x, jugador.y - 30, "+200", {
      fontSize: "20px",
      fill: "#ffd700",
    });

    this.time.delayedCall(500, () => {
      textoBonus.destroy();
    });
  }

  finDelJuego() {
    this.musicaFondoBonustrack.stop();
    this.scene.start("Escena 2", { puntaje: this.puntaje });
  }

  update() {
    this.jugador.setVelocity(0);

    // Movimiento con teclas WASD y flechas
    if (this.teclas.left.isDown || this.cursors.left.isDown) {
      this.jugador.setVelocityX(-300);
    } else if (this.teclas.right.isDown || this.cursors.right.isDown) {
      this.jugador.setVelocityX(300);
    }

    if (this.teclas.up.isDown || this.cursors.up.isDown) {
      this.jugador.setVelocityY(-300);
    } else if (this.teclas.down.isDown || this.cursors.down.isDown) {
      this.jugador.setVelocityY(300);
    }
  }
}
