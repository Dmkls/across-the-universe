import Phaser from "phaser";
import {Composite, Composites, Constraint} from "matter";

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


        const car = this.matter.add.image(200,200, 'car')
        // // car.setScale(0.5, 0.5)
        //
        const wheel = this.matter.add.image(100, 350, 'wheel')
        const wheel2 = this.matter.add.image(400, 350, 'wheel2')

        //
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
        // this.matter.constraint.create(options)
        this.matter.add.constraint(
            carBody,
            wheelBody,
            150,
            0.2,
            {
                pointA: {
                    x: -150,
                    y: 70
                }
            })

        this.matter.add.constraint(carBody,
            wheel2Body,
            150,
            0.2,
            {
                pointA: {
                    x: 150,
                    y: 70
                }
            })


        //
        // const constraint = MatterJS.Constraint.create(options)

        // car.setVelocity(10, 0)
        // car.rotation = 60


        // this.matter.body.setInertia(body, Infinity)

        // body.inertia = Infinity
        // car.setFrictionAir(0)
        // car.setBounce(1)
    }
}