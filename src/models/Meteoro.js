export default class Meteoro extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Agregar el sprite a la escena y configurar la física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configurar propiedades iniciales
    this.setVelocityX(-200); // Configura la velocidad para que se mueva de derecha a izquierda
    this.setActive(true);
    this.setVisible(true);
  }

  // Método para generar un nuevo meteoro y agregarlo al grupo
  static generarMeteoros(scene, grupoMeteoros) {
    if (scene.juegoTerminado) return; // Verifica si el juego ha terminado
    const y = Phaser.Math.Between(0, scene.game.config.height); // Obtener una posición Y aleatoria dentro de los límites de la pantalla
    const meteoro = new Meteoro(scene, 800, y, "meteoro"); // Crear un nuevo meteoro

    grupoMeteoros.add(meteoro); // Agregar el meteoro al grupo
    return meteoro; // Opcional: puedes devolver el meteoro creado si lo necesitas
  }
}
