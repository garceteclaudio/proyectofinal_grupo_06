export default class YouWin extends Phaser.Scene {
  constructor() {
    super({ key: "YouWin" });
    this.musicaVictoria = null;
  }

  preload() {
    this.load.image("espacio", "/resources/images/games/espacio.png");
    this.load.image("gato", "/resources/images/games/gatoplaneta.png");
    this.load.audio("musicaVictoria", "/resources/sounds/musicaVictoria.mp3");
  }

  init(data) {
    this.puntaje = data.puntaje || 0;
  }

  create() {
    this.add.image(400, 300, "espacio").setOrigin(0.5);
    this.add.image(400, 350, "gato").setOrigin(0.5);

    this.add
      .text(400, 80, "¡GANASTE EL JUEGO!", {
        fontSize: "30px",
        fill: "#fff",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 130, `Puntaje: ${this.puntaje}`, {
        fontSize: "30px",
        fill: "#fff",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 540, "Presiona R para volver a jugar.", {
        fontSize: "20px",
        fill: "#fff",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.musicaVictoria = this.sound.add("musicaVictoria", { loop: false });
    this.musicaVictoria.play();

    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("Escena 1");
    });

    //this.setupButtons();
  }
  /**
  setupButtons() {
    const boton1 = document.getElementById("boton-1");
    const boton2 = document.getElementById("boton-2");

    boton1.addEventListener("click", () => {
      this.scene.start("Escena1");
    });

    boton2.addEventListener("click", () => {
      this.scene.start("Escena2");
    });
  }
    */
}
