import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }

  initializeSettings () {
    //  left, right, and idle animations
    this.animations.add('idle', [0, 1, 2, 3], 10, true)
    this.animations.add('left', [4, 5, 6, 7, 8, 9, 10, 11], 10, true)
    this.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 10, true)
  }

  update () {
    let cursors = this.game.input.keyboard.createCursorKeys()
     //  Reset the players velocity (movement)
     this.body.velocity.x = 0

         if (cursors.left.isDown)
         {
             //  Move to the left
             this.body.velocity.x = -150

             this.animations.play('left')
         }
         else if (cursors.right.isDown)
         {
             //  Move to the right
             this.body.velocity.x = 150

             this.animations.play('right')
         }
         else
         {
             //  Stand still
             this.animations.stop()

             this.animations.play('idle')
         }

         //  Allow the player to jump if they are touching the ground.
         if (cursors.up.isDown && this.body.touching.down)
         {
             this.body.velocity.y = -350
         }
  }
}
