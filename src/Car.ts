import { Game, GameObjects, Scene, Tilemaps } from 'phaser'

export type CarPositon = { x: number, y: number }
type CarProps = CarPositon

export class Wheel extends GameObjects.Sprite {
    constructor(scene: Scene, parent: GameObjects.Sprite) {
        super(scene, 0, 0, 'wheel')

        this.scene.add.existing(this)

        this.setInteractive()
    }
}

export class Car extends GameObjects.Sprite {
    wheel1: Wheel
    wheel2: Wheel

    constructor(scene: Scene, props: CarProps) {
        const {x, y} = props

        super(scene, x, y, 'car')

        this.displayWidth = 200
        this.displayHeight = this.displayWidth / 1.93

        this.wheel1 = new Wheel(scene, this) // left wheel
        this.wheel2 = new Wheel(scene, this) // right wheel

        this.updateWheelSizes(this.wheel1)
        this.updateWheelSizes(this.wheel2)

        this.updateWheelPositions()

        this.scene.add.existing(this)

        this.setInteractive(true)
        this.setActive(true)
    }

    updateWheelSizes(wheel: Wheel): void {
        wheel.displayWidth = this.displayWidth * 0.22
        wheel.displayHeight = wheel.displayWidth
    }

    updateWheelPositions(): void {
        // var wheel1X: number = this.x + this.displayWidth * 0.18039215 - 0.5 * this.wheel1.displayWidth;
        // var wheel1Y: number = this.y + this.displayHeight * 0.9469696969 - 0.5 * this.wheel1.displayHeight;

        // var wheel2X: number = this.x + this.displayWidth * 0.81568627 - 0.5 * this.wheel2.displayWidth;
        // var wheel2Y: number = this.y + this.displayHeight * 0.9469696969 - 0.5 * this.wheel2.displayHeight;

        var wheel1X: number = this.x + this.displayWidth * 0.18039215 - 0.5 * this.displayWidth;
        var wheel1Y: number = this.y + this.displayHeight * 0.9469696969 - 0.5 * this.displayHeight;

        var wheel2X: number = this.x + this.displayWidth * 0.81568627 - 0.5 * this.displayWidth;
        var wheel2Y: number = this.y + this.displayHeight * 0.9469696969 - 0.5 * this.displayHeight;

        this.wheel1.setPosition(wheel1X, wheel1Y)
        this.wheel2.setPosition(wheel2X, wheel2Y)
    }

    update(time: number, delta: number) {
        super.update(time, delta)

        this.updateWheelPositions()
    }
}