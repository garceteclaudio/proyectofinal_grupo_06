export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
  constructor() {
    this.jugador = null;
    this.grupoBalas = null;
    this.grupoEnemigosNave = null;
  }
}
