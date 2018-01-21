/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'

export default class Game extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    let starfield = this.game.add.tileSprite(0, 0, 800, 600, 'stars')
    starfield.fixedToCamera = true

    this.asteroids = this.game.add.group()
    this.asteroids.enableBody = true

      //generating the space asteroids
      let asteroidPositions = []
      for (let i = 0; i < 25; i++)
      {

          let x = this.game.world.randomX
          let y = this.game.world.randomY
          let pos = {x, y}

          while (x === 650 || y === this.game.height - 350 || asteroidPositions.find(pos => pos === {x, y}))
          {
            x = this.game.world.randomX
            y = this.game.world.randomY
          }

          asteroidPositions.push(pos)
          let hugeAsteroid = this.asteroids.create(x, y, 'hugeAsteroid')
          hugeAsteroid.scale.set(1.5)
          hugeAsteroid.body.immovable = true
          hugeAsteroid.body.setCircle(25)
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

    // player collides
    this.hitAsteroid = this.game.physics.arcade.collide(this.player, this.asteroids)

    this.hitBlackHole = this.game.physics.arcade.collide(this.player, this.blackHole)

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

  restart () {
    this.player.kill()
    this.stateText.text = 'SUCCESS! \n Click to restart'
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
