import TextButton from '../../assets/extensions/textbutton'
import Phaser from 'phaser'

export default class Manual extends Phaser.State {

    create() {
        this.manualMusic = this.game.add.audio('manualMusic')
        this.manualMusic.play()
        let starfield = this.game.add.tileSprite(0, 0, 800, 600, 'stars')
        this.title = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY - 200, '', {
            font: '36px Tahoma',
            fill: 'white',
            align: 'center'
        })
        this.title.anchor.setTo(0.5)

        this.start = new TextButton({
            game: this.game,
            x: this.game.world.centerX,
            y: this.game.world.centerY,
            asset: '',
            overFrame: 0,
            outFrame: 0,
            downFrame: 0,
            upFrame: 0,
            label: 'Help Stella reach the Space Vortex\n by moving the asteroids out of the way.\n But be careful - don\'t let Stella crash into an asteroid!',
            style: {
                font: '26px arial',
                fill: 'white',
                align: 'center'

            }
        })

        // this.btnOverSound = this.add.sound('menuOver');
        // this.btnOutSound = this.add.sound('menuOut');
        // this.btnDownSound = this.add.sound('menuDown');

        // this.start.setOverSound(this.btnOverSound);
        // this.start.setOutSound(this.btnOutSound);
        // this.start.setDownSound(this.btnDownSound);

        this.start.onInputUp.add(()=>{
            this.manualMusic.stop()
            this.state.start('Game')

        });

        this.menuPanel = this.add.group()
        this.menuPanel.add(this.title)
        this.menuPanel.add(this.start)

    }
}
