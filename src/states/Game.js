/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'

export default class Game extends Phaser.State {
  init () {}
  preload () {}

  create () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    let starfield = this.game.add.tileSprite(0, 0, 800, 600, 'stars')
    starfield.fixedToCamera = true

    this.asteroids = this.game.add.group()
    this.asteroids.enableBody = true

      //generating the space asteroids
      for (let i = 0; i < 25; i++)
      {

        let hugeAsteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'hugeAsteroid')
          hugeAsteroid.scale.set(1.5)
          hugeAsteroid.body.immovable = true
          hugeAsteroid.body.setCircle(23)
          hugeAsteroid.inputEnabled = true
          hugeAsteroid.body.checkCollision.right = true
          hugeAsteroid.input.enableDrag()

         hugeAsteroid.events.onDragStart.add(this.startDrag, this)
         //hugeAsteroid.events.onDragStop.add(stopDrag, this)
      }

      this.blackHole = this.game.add.sprite(50, this.game.height - 100, 'blackhole')
      this.blackHole.scale.set(1.5)


    // this.player = new Player({
    //   game: this.game,
    //   x: 650,
    //   y: this.game.height - 350,
    //   asset: 'stella'
    // })

    this.player = this.game.add.sprite(650, this.game.height - 450, 'stella')
    this.player.scale.set(2)
    this.player.smoothed = false
    this.player.animations.add('idle', [0, 1, 2, 3], 10, true)
    this.player.animations.add('left', [4, 5, 6, 7, 8, 9, 10, 11], 10, true)
    this.player.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 10, true)
    this.player.play('idle')

    //  Create our physics body - a 28px radius circle. Set the 'false' parameter below to 'true' to enable debugging
    this.game.physics.arcade.enable(this.player)
    this.game.physics.arcade.enable(this.blackHole)
    this.game.physics.arcade.enable(this.asteroids)
    //this.player.body.setCircle(28)

    //  Player physics properties.
    this.player.body.allowGravity = false
    this.player.body.collideWorldBounds = true

    this.game.camera.follow(this.player)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.stateText = this.game.add.text(16, 16, 'Move around', { fill: '#ffffff' })
    this.stateText.visible = false


    this.game.add.existing(this.player)

  }

  update () {

    // collisions
    this.hitAsteroid = this.game.physics.arcade.collide(this.player, this.asteroids)

    this.hitBlackHole = this.game.physics.arcade.collide(this.player, this.blackHole)




    if (this.hitAsteroid)
    {
      this.gameOver()
    }

    if (this.hitBlackHole)
    {
      this.restart()
    }

    // if (this.checkOverlap(this.player, this.blackHole))
    // {
    //   this.state.start('Over')
    // }

    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -150
            this.player.animations.play('left')
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 150
            this.player.animations.play('right')
        }
        else
        {
          this.player.play('idle')

        }

        if (this.cursors.up.isDown)
        {
          this.player.body.velocity.y = -150
        }
        else if (this.cursors.down.isDown)
        {
          this.player.body.velocity.y = 150
        }
        else
        {
          this.player.play('idle')
        }


  }

  startDrag (asteroid) {
    this.asteroidsCollide = this.game.physics.arcade.collide(asteroid, this.asteroids)
  }

  restart () {
    this.player.kill()
    this.stateText.text = 'SUCCESS! \n Click to restart'
    this.stateText.visible = true
    this.game.input.onTap.addOnce(() => this.game.state.start('Game'))
  }

  gameOver () {
    this.player.kill()
    this.stateText.text = 'Game Over! \n Click to restart'
    this.stateText.visible = true
    this.game.input.onTap.addOnce(() => this.game.state.start('Game'))
  }

  checkOverlap (spriteA, spriteB) {

        let boundsA = spriteA.getBounds()
        let boundsB = spriteB.getBounds()

        return Phaser.Rectangle.intersects(boundsA, boundsB)

    }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.player, 23, 25)
    }
  }
}
