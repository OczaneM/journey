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
    this.load.spritesheet('stella', 'assets/spriteSheets/stella.png', 23, 25)
    this.load.spritesheet('happy-stella', 'assets/spriteSheets/happy-stella.png', 23, 25)
    // this.load.atlasJSONArray('idle', 'assets/spriteSheets/stella.png', 'assets/spriteSheets/stella.json')
    // this.load.atlasJSONArray('success', 'assets/spriteSheets/happy-stella.png', 'assets/spriteSheets/happy-stella.json')
    this.load.image('mediumAsteroid', 'assets/images/asteroid/asteroidMedium.png')
    this.load.image('bigAsteroid', 'assets/images/asteroid/asteroidBig.png')
    this.load.image('hugeAsteroid', 'assets/images/asteroid/asteroidHuge.png')
    this.load.image('smallAsteroid', 'assets/images/asteroid/asteroidSmall.png')
    this.load.image('stars', 'assets/images/spacebg_small.jpg')
    this.load.image('blackhole', 'assets/images/blackHole2.png')
    this.load.image('dizzy', 'assets/spriteSheets/dizzy.png')
    this.load.spritesheet('startButton', 'assets/images/stellar-journey-start-button.png', 500, 217)
    this.load.audio('menuMusic', ['assets/sound/Title.mp3'])
    this.load.audio('gameMusic', ['assets/sound/Grape-Garden-Map-Screen.mp3'])
    this.load.audio('hit', ['assets/sound/Hit.mp3'])
    this.load.audio('success', ['assets/sound/BonusPerfect.mp3'])
    this.load.audio('credits', ['assets/sound/Ending.mp3'])
    this.load.audio('gameOver', ['assets/sound/GameOver.mp3'])
    this.load.audio('manualMusic', ['assets/sound/manualMusic.mp3'])
  }

  create () {
    this.state.start('Menu')
  }
}
