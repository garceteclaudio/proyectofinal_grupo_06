export default class Meteoro extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Agregar el sprite a la escena y configurar la física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configurar propiedades iniciales
    //this.setCollideWorldBounds(false);
    this.setActive(true);
    this.setVisible(true);
  }

  generarMeteoros(scene, grupoMeteoros) {
    const y = Phaser.Math.Between(0, 600);
    const meteoro = new Meteoro(scene, 800, y, "meteoro");

    // Configurar la velocidad para que se mueva de derecha a izquierda
    meteoro.setVelocityX(-200); // Asegúrate de que la velocidad sea negativa
    grupoMeteoros.add(meteoro);
  }
}
