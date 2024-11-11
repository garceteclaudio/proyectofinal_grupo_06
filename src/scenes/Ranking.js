export default class Ranking extends Phaser.Scene {
  constructor() {
    super({ key: "Ranking" });
  }

  preload() {
    this.load.image("espacio", "/resources/images/games/espacio.png");
  }

  create() {
    this.add.image(400, 300, "espacio").setOrigin(0.5);

    // Obtener las partidas previas del localStorage
    let juegosPrevios = JSON.parse(localStorage.getItem("juegos")) || [];

    // Ordenar las partidas por puntaje de mayor a menor
    juegosPrevios.sort((a, b) => b.puntaje - a.puntaje);

    let yPosition = 100;

    juegosPrevios.forEach((juego, index) => {
      this.add
        .text(
          400,
          yPosition,
          `#${index + 1} Puntaje: ${juego.puntaje} | Fecha: ${
            juego.fecha
          } | Hora: ${juego.hora} | ID: ${juego.id}`,
          {
            fontSize: "20px",
            fill: "#fff",
            fontStyle: "bold",
            align: "center",
          }
        )
        .setOrigin(0.5);

      yPosition += 30;
    });

    this.add
      .text(400, 540, "Presiona R para volver a jugar.", {
        fontSize: "20px",
        fill: "#fff",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("Escena 1");
    });
  }
}
