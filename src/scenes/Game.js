import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

    player
    platforms
    cursors

    constructor() {
        super('game')
    }

    preload() {
        this.load.image('background', 'assets/Background/bg_layer1.png')
        this.load.image('platform', 'assets/Environment/ground_grass.png')
        this.load.image('bunny-stand', 'assets/Player/bunny1_stand.png')
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        this.add.image(240, 320, 'background')
            .setScrollFactor(1, 0)

        this.platforms = this.physics.add.staticGroup()

        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(80, 400)
            const y = 150 * i

            const platform = this.platforms.create(x, y, 'platform')
            platform.scale = 0.5
            
            const body = platform.body
            body.updateFromGameObject()
        }

        this.player = this.physics.add.sprite(240, 320, 'bunny-stand')
            .setScale(0.5)

        this.physics.add.collider(this.platforms, this.player)

        this.player.body.checkCollision.up = false
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false

        this.cameras.main.startFollow(this.player)

        this.cameras.main.setDeadzone(this.scale.width * 1.5)
    }

    update() {
        this.platforms.children.iterate(child => {
            const platform = child

            const scrollY = this.cameras.main.scrollY
            if (platform.y >= scrollY + 700) {
                platform.y = scrollY - Phaser.Math.Between(50, 100)
                platform.body.updateFromGameObject()
            }
        })

        const isTouchingDown = this.player.body.touching.down

        if (isTouchingDown) {
            this.player.setVelocityY(-1000)
        }

        if (this.cursors.left.isDown && !isTouchingDown) {
            this.player.setVelocityX(-200)
        } else if (this.cursors.right.isDown && !isTouchingDown) {
            this.player.setVelocityX(200) 
        } else {
            this.player.setVelocityX(0)
        }

        this.horizontalWrap(this.player)
    }

    horizontalWrap(sprite) {
        const halfWidth = sprite.displayWidth * 0.5
        const gameWidth = this.scale.width
        if (sprite.x < -halfWidth) {
            sprite.x = gameWidth + halfWidth
        } else if (sprite.x > gameWidth + halfWidth) {
            sprite.x = -halfWidth
        }
    }
}