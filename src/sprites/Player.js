import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor ({ game, x, y, health, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)

  }

  update () {
    let cursors = this.game.input.keyboard.createCursorKeys()
    this.body.setZeroVelocity()

        if (cursors.left.isDown)
        {
            this.body.moveLeft(200)
        }
        else if (cursors.right.isDown)
        {
            this.body.moveRight(200)
        }

        if (cursors.up.isDown)
        {
            this.body.moveUp(200)
        }
        else if (cursors.down.isDown)
        {
            this.body.moveDown(200)
        }
  }
}
