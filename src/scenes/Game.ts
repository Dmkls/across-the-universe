import Phaser from "phaser";

export class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    create()
    {

        const width = this.scale.width
        const height = this.scale.height

        let shapes = this.cache.json.get('shapes');


        const car = this.matter.add.sprite(200, 200, 'car', 'car', {shape: shapes.car})
        const wheel = this.matter.add.sprite(40, 245, 'wheel', 'wheel', {shape: shapes.wheel})
        const wheel2 = this.matter.add.sprite(360, 245, 'wheel2', 'wheel', {shape: shapes.wheel})

        // car.setVelocity(0, 10)


        const carBody = car.body as MatterJS.BodyType
        const wheelBody = wheel.body as MatterJS.BodyType
        const wheel2Body = wheel2.body as MatterJS.BodyType


        //
        const options = {
            bodyA: wheel.body as MatterJS.BodyType,
            bodyB: wheel2.body as MatterJS.BodyType,
            length: 50,
            stiffness: 0.2
        }

        this.matter.add.constraint(
            carBody,
            wheelBody,
            0,
            0.2,
            {
                pointA: {
                    x: -163,
                    y: 70
                }
            })

        this.matter.add.constraint(carBody,
            wheel2Body,
            0,
            0.2,
            {
                pointA: {
                    x: 160,
                    y: 70
                }
            })


        this.matter.body.setInertia(carBody, Infinity)
        car.setFrictionAir(0)
        car.setBounce(1)
    }
}