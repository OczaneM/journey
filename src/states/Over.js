import Phaser from 'phaser'

export default class gameOverstate extends Phaser.State  {
  init () {}
  preload () {}

  create () {

      this.gameoverLabel = this.stateText = this.game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#F2F2F2'})
      this.stateText.anchor.setTo(1.1, 0.2)
      console.log("thi context, ", this)

  }

  update () {
    console.log("this context 2 , ", this)
          this.stateText.text = 'GAME OVER \n Click to restart'
          this.stateText.visible = true

          //the "click to restart" handler
          this.game.input.onTap.addOnce(function () {
          this.state.start('Game')})
  }
};
