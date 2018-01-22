/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'

let pos = {x: 0, y: 0}

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
      for (let i = 0; i < 20; i++)
      {

        let hugeAsteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'hugeAsteroid')
          hugeAsteroid.scale.set(1.5)
          hugeAsteroid.inputEnabled = true
          hugeAsteroid.input.enableDrag()
          hugeAsteroid.events.onDragStart.add(this.startDrag, this)
          hugeAsteroid.events.onDragStop.add(this.stopDrag, this)
          hugeAsteroid.body.immovable = true
          hugeAsteroid.body.setCircle(28)

      }

      for (let i = 0; i < 20; i++)
      {

        let smallAsteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'smallAsteroid')
          smallAsteroid.scale.set(1.5)
          smallAsteroid.inputEnabled = true
          smallAsteroid.input.enableDrag()
          smallAsteroid.events.onDragStart.add(this.startDrag, this)
          smallAsteroid.events.onDragStop.add(this.stopDrag, this)
          smallAsteroid.body.immovable = true
          smallAsteroid.body.setCircle(10)

      }

    this.blackHole = this.game.add.sprite(50, this.game.height - 100, 'blackhole')
    this.blackHole.scale.set(1.5)

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

    this.asteroidCollision = this.game.physics.arcade.collide(this.asteroids, this.asteroids)

    this.game.physics.arcade.overlap(this.asteroids, this.asteroids, this.collisionHandler, null, this)


    if (this.hitAsteroid)
    {
      this.gameOver()
    }

    if (this.hitBlackHole)
    {
      this.restart()
    }

    // if (this.checkOverlap(this.asteroids, this.asteriods))
    // {
    //   console.log('yep!')
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
        // else
        // {
        //   this.player.play('idle')

        // }

        else if (this.cursors.up.isDown)
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



  collisionHandler () {
  //console.log("now in here")
  }

  startDrag (asteroid) {
    pos.x = asteroid.x
    pos.y = asteroid.y
  }

  stopDrag (asteroid) {
    let overlap = false
    overlap = this.game.physics.arcade.overlap(asteroid, this.asteroids, () => true)
    if (overlap)
    {
      asteroid.x = pos.x
      asteroid.y = pos.y
    }
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
