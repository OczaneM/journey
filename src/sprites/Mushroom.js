import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, health, asset }) {
    super(game, x, y, health, asset)
    this.anchor.setTo(0.5)
  }

  update () {
    this.angle += 1
  }
}
