import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 470,
    height: 590,
    scene: Game,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: {
                y: 1000
            },
            debug: true
        }
    }
})