import Phaser from "phaser";
import {Collision, Composite, Composites} from "matter";

export class Game extends Phaser.Scene
{

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private car!: Phaser.Physics.Matter.Sprite

    init()
    {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }
    constructor()
    {
        super('game')
    }

    create()
    {

        const width = this.scale.width
        const height = this.scale.height

        let shapes = this.cache.json.get('shapes');


        const car = this.matter.add.sprite(200, 200, 'car', undefined, {shape: shapes.car})
        const wheel = this.matter.add.sprite(40, 245, 'wheel', undefined, {shape: shapes.wheel})
        const wheel2 = this.matter.add.sprite(360, 245, 'wheel2', undefined, {shape: shapes.wheel})
        const ground =  this.matter.add.image(0, 500, 'ground')

        this.car = car



        const carBody = car.body as MatterJS.BodyType
        const wheelBody = wheel.body as MatterJS.BodyType
        const wheel2Body = wheel2.body as MatterJS.BodyType


        this.matter.add.constraint(
            carBody,
            wheelBody,
            5,
            0.2,
            {
                pointA: {
                    x: -163,
                    y: 70
                }
            })

        this.matter.add.constraint(
            carBody,
            wheel2Body,
            5,
            0.2,
            {
                pointA: {
                    x: 160,
                    y: 70
                }
            })


        // this.matter.body.setInertia(carBody, Infinity)
        // car.setFrictionAir(0)
        car.setBounce(1)
    }

    update(t: number, dt: number) {

        const car = this.car

        if (this.cursors.left.isDown)
        {
            car.setVelocity(-5, 0)
        } else if (this.cursors.right.isDown)
        {
            car.setVelocity(5, 0)
        }
    }
}