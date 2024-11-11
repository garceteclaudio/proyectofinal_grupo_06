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
      .text(
        400,
        540,
        "Presiona R para volver a jugar. \nPresiona Enter para ver el ranking.",
        {
          fontSize: "20px",
          fill: "#fff",
          fontStyle: "bold",
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.musicaVictoria = this.sound.add("musicaVictoria", { loop: false });
    this.musicaVictoria.play();

    // Obtener la fecha y hora actuales
    const fecha = new Date();
    const fechaStr = fecha.toLocaleDateString();
    const horaStr = fecha.toLocaleTimeString();

    // Generar un ID aleatorio entre 1 y 10000
    const idRandom = Math.floor(Math.random() * 10000) + 1;

    // Crear objeto con la información
    const juegoInfo = {
      puntaje: this.puntaje,
      fecha: fechaStr,
      hora: horaStr,
      id: idRandom,
    };

    // Obtener las partidas previas del localStorage (si existen)
    let juegosPrevios = JSON.parse(localStorage.getItem("juegos")) || [];

    // Agregar la nueva partida al array
    juegosPrevios.push(juegoInfo);

    // Guardar el array actualizado en localStorage
    localStorage.setItem("juegos", JSON.stringify(juegosPrevios));

    // Mostrar la información de juego en consola (opcional)
    console.log(juegoInfo);

    // Accionar las teclas
    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("Escena 1");
    });

    // Accionar Enter para ver el ranking
    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.start("Ranking");
    });
  }
}
