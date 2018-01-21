import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class Splash extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.atlasJSONArray('stella', 'assets/spriteSheets/stella.png', 'assets/spriteSheets/stella.json')
    this.load.image('mediumAsteroid', 'assets/images/asteroid/asteroidMedium.png')
    this.load.image('bigAsteroid', 'assets/images/asteroid/asteroidBig.png')
    this.load.image('hugeAsteroid', 'assets/images/asteroid/asteroidHuge.png')
    this.load.image('smallAsteroid', 'assets/images/asteroid/asteroidSmall.png')
    this.load.image('stars', 'assets/images/starfield.jpg')
    this.load.image('blackhole', 'assets/images/blackHole2.png')
  }

  create () {
    this.state.start('Game')
  }
}
