import Phaser, { NONE } from "phaser"
import { Collision, Composite, Composites } from "matter"
import Spline from 'typescript-cubic-spline'

export class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private shapes!: any

    private car!: Phaser.Physics.Matter.Sprite
    private wheel1!: Phaser.Physics.Matter.Sprite
    private wheel2!: Phaser.Physics.Matter.Sprite
    // private items: Phaser.Physics.Matter.Sprite[] = []

    private characterBody!: Phaser.Physics.Matter.Sprite
    private characterHead!: Phaser.Physics.Matter.Sprite
    private characterDead: boolean = false

    private surfacePoints: Phaser.Math.Vector2[] = []

    private width!: number
    private height!: number

    private maxFuel: number = 1
    private fuelDecreaseRate: number = this.maxFuel / 30

    private fuel: number = this.maxFuel
    private distance: number = 0
    private moneyCounter: number = 0

    private startPosX!: number
    private startPosY!: number

    private distanceIndicator!: Phaser.GameObjects.Text
    private moneyIndicator!: Phaser.GameObjects.Text
    private fuelIndicator!: Phaser.GameObjects.Sprite

    private moneyIcon!: Phaser.GameObjects.Image

    private backWall!: Phaser.GameObjects.Sprite

    private generatedDistance: number = 0// px

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    constructor() {
        super('game')
    }

    create() {
        this.width = this.scale.width
        this.height = this.scale.height

        this.shapes = this.cache.json.get('shapes')

        const backWallWidth = 20
        this.backWall = this.matter.add.sprite(0, 0, 'backWall')
        this.backWall.setDisplaySize(backWallWidth, this.width)
        this.matter.body.setStatic(this.backWall.body as MatterJS.BodyType, true)
        this.matter.body.setInertia(this.backWall.body as MatterJS.BodyType, Infinity)

        this.startPosX = 300
        this.startPosY = 300

        this.characterHead = this.matter.add.sprite(0, 0, 'driverHead', undefined, { shape: this.shapes.driverHead })
        this.characterBody = this.matter.add.sprite(0, 100, 'driverBody', undefined, { shape: this.shapes.driverBody })

        this.matter.world.on(Phaser.Physics.Matter.Events.COLLISION_START, (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
            const { pairs } = event

            pairs.forEach(pair => {
                const { bodyA, bodyB } = pair

                if (bodyA.gameObject === this.characterHead && (bodyB.gameObject != this.car && bodyB.gameObject != this.characterBody)) {
                    this.characterDead = true
                    console.log("player dead")
                }
            })
        })

        this.car = this.matter.add.sprite(this.startPosX, this.startPosY, 'car', undefined, { shape: this.shapes.carBody })
        this.wheel1 = this.matter.add.sprite(this.startPosX, this.startPosY, 'wheel', undefined, { shape: this.shapes.carWheel })
        this.wheel2 = this.matter.add.sprite(this.startPosX, this.startPosY, 'wheel', undefined, { shape: this.shapes.carWheel })

        this.characterHead.setDisplaySize(50 * 1.079646, 50)
        this.characterBody.setDisplaySize(40 * 1.71428, 40)

        const characterBodyShape = this.characterBody.body as MatterJS.BodyType
        const characterHeadShape = this.characterHead.body as MatterJS.BodyType

        this.characterHead.setDisplayOrigin(this.characterHead.width, this.characterHead.height / 2)

        // const neckJoint = this.matter.add.joint(characterBodyShape, characterHeadShape, 100, 1);

        // Установка ограничений соединения 
        // neckJoint.stiffness = 1; // Жесткость сустава (от 0 до 1, где 1 - максимальная жесткость)
        // neckJoint.length = 0;

        // this.surfacePoints = this.generateSurfacePoints(0, 200, 10, -30, 200, 10)
        // console.log(this.surfacePoints)

        // for (let i = 0; i < this.surfacePoints.length - 1; i++) {
        //     this.addLine(this.surfacePoints[i], this.surfacePoints[i + 1])
        // }

        // this.surfacePoints = this.generateSurfacePoints(1800, 200, 10, -30, 200, 10)
        // console.log(this.surfacePoints)

        // for (let i = 0; i < this.surfacePoints.length - 1; i++) {
        //     this.addLine(this.surfacePoints[i], this.surfacePoints[i + 1])
        // }

        this.addCoin(1000, 600, 500)
        this.addCoin(1080, 600, 100)
        this.addCoin(1150, 600, 100)

        this.addFuel(1300, 600)

        const carWidth = 250
        this.car.setDisplaySize(carWidth, 1)

        function updateCarHeight(car: Phaser.Physics.Matter.Sprite) {
            car.setDisplaySize(car.displayWidth, car.displayWidth / 1.93)
        }

        function updateWheelSizes(car: Phaser.Physics.Matter.Sprite, wheel: Phaser.Physics.Matter.Sprite) {
            wheel.setDisplaySize(car.displayWidth * 0.22, car.displayWidth * 0.22)
        }

        updateCarHeight(this.car)
        updateWheelSizes(this.car, this.wheel1)
        updateWheelSizes(this.car, this.wheel2)

        const wheelBounce = 0.1
        const carBounce = 0
        const wheelFriction = 0.5

        this.wheel1.setBounce(wheelBounce)
        this.wheel2.setBounce(wheelBounce)
        this.car.setBounce(carBounce)
        this.wheel1.setFriction(wheelFriction)
        this.wheel2.setFriction(wheelFriction)

        const carBody = this.car.body as MatterJS.BodyType
        const wheel1Body = this.wheel1.body as MatterJS.BodyType
        const wheel2Body = this.wheel2.body as MatterJS.BodyType

        this.matter.add.constraint(
            carBody,
            wheel1Body,
            2,
            0.1,
            {
                pointA: {
                    x: this.car.displayWidth * 0.18 - 0.5 * this.car.displayWidth, //-163
                    y: this.car.displayHeight * 0.9 - 0.5 * this.car.displayHeight // 70
                }
            }
        )

        this.matter.add.constraint(
            carBody,
            wheel2Body,
            2,
            0.1,
            {
                pointA: {
                    x: this.car.displayWidth * 0.816 - 0.5 * this.car.displayWidth,
                    y: this.car.displayHeight * 0.9 - 0.5 * this.car.displayHeight
                }
            }
        )

        this.matter.add.constraint(
            carBody,
            characterBodyShape,
            0,
            0,
            {
                pointA: {
                    x: 0,
                    y: 0
                }
            }
        )

        this.matter.add.constraint(
            carBody,
            characterHeadShape,
            0,
            0,
            {
                pointA: {
                    x: -15,
                    y: -60
                }
            }
        )

        // камера 
        this.cameras.main.startFollow(this.car)
        this.cameras.main.setFollowOffset(-175, 100) // Фиксация горизонтального положения, смещение по вертикали
        this.cameras.main.setDeadzone(0, 0) // Зона смягчения, в которой объект может перемещаться без активации камеры
        this.cameras.main.setLerp(1, 1) // Настройка скорости следования камеры (значения от 0 до 1)

        // коллизиции
        this.wheel1.setCollisionCategory(1)
        this.wheel2.setCollisionCategory(1)
        this.wheel1.setCollisionGroup(1)
        this.wheel2.setCollisionGroup(1)

        // индикаторы
        this.distance = 0
        this.distanceIndicator = this.add.text(10, 10, "", { fontFamily: "Arial", fontSize: 28, color: "#ffffff" })

        this.fuel = 1
        this.fuelIndicator = this.add.sprite(10, 45, "fuelBar")
        this.fuelIndicator.setOrigin(0, 0)

        this.moneyCounter = 0 // надо потом сюда записать начальное значение
        this.moneyIndicator = this.add.text(10, 90, "", { fontFamily: "Arial", fontSize: 28, color: "#ffffff" })
        this.moneyIcon = this.matter.add.sprite(60, 100, 'coin500', undefined, { isStatic: true })
        this.moneyIcon.setDisplaySize(40, 40)
        this.moneyIcon.setOrigin(0, 0)
    }

    update(t: number, dt: number) {
        const speed = 0.4

        if (this.cursors.left?.isDown) {

            this.wheel1.setAngularVelocity(-speed)
            this.wheel2.setAngularVelocity(-speed)
        } else if (this.cursors.right?.isDown) {
            this.wheel1.setAngularVelocity(speed)
            this.wheel2.setAngularVelocity(speed)
        } 

        this.updateDistance()

        this.generateSurface()

        this.updateIndicatorsPositions()

        this.updateBackWallPosition()

        this.fuelIndicator.setDisplaySize(this.fuel * this.fuelIndicator.width, this.fuelIndicator.height)

        // Уменьшаем уровень топлива с учетом времени прошедшего с последнего обновления
        this.fuel -= this.fuelDecreaseRate * (dt / 1000) // dt - разница времени в миллисекундах, делим на 1000, чтобы получить секунды

        if (this.fuel < 0) {
            this.fuel = 0
        }

        if (!this.characterDead) {
            this.characterHead.setRotation(Math.PI / 2 + this.car.rotation - Math.PI / 12)
        }
        
        this.characterBody.setRotation(Math.PI / 2 + this.car.rotation)
    }

    updateDistance() {
        const oneMetre = 125

        let currentDistance = Math.floor((this.car.x - this.startPosX) / oneMetre)

        if (currentDistance > this.distance) {
            this.distance = currentDistance
        }

        this.distanceIndicator.setText(this.distance.toString() + "m")
        this.moneyIndicator.setText(this.moneyCounter.toString())
    }

    updateIndicatorsPositions() {
        this.distanceIndicator.setScrollFactor(0, 0)
        this.fuelIndicator.setScrollFactor(0, 0)
        this.moneyIndicator.setScrollFactor(0, 0)

        this.moneyIcon.setScrollFactor(0, 0)
    }

    updateBackWallPosition() {
        const backWallOffset = 400
        const newX = this.car.x - this.startPosX - backWallOffset
        const newY = this.car.y

        if (this.backWall.x < newX) {
            this.backWall.x = newX
        }

        this.backWall.y = newY
    }

    generateSurfacePoints(xStart: number, xStep: number, pointNumber: number, yMin: number, yMax: number, splineStep: number = 5) {
        function randomInt(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }

        let xArr: number[] = []
        let yArr: number[] = []

        for (let i = 0; i < pointNumber; i++) {
            xArr.push(xStart + xStep * i)
            yArr.push(randomInt(yMin, yMax))
        }

        let spline = new Spline(xArr, yArr)

        let pointsTmp: number[][] = []
        for (let x = xStart; x <= xStep * (pointNumber - 1); x += splineStep) {
            pointsTmp.push([x, spline.at(x)])
        }

        console.log(pointsTmp)

        let points: Phaser.Math.Vector2[] = pointsTmp.flatMap(([x, y]) => new Phaser.Math.Vector2(x, y));

        let result: Phaser.Math.Vector2[] = []
        for (let i = 0; i < points.length; i++) {
            result.push(new Phaser.Math.Vector2(points[i].x, this.height - points[i].y))
        }

        return result
    }

    generateSurface() {
        if (this.generatedDistance < this.car.x + this.width) {
            console.log(this.generatedDistance)
            const xStart: number = this.generatedDistance
            const xStep: number = 200
            const pointNumber: number = 10
            const yMin = -30
            const yMax = 200
            const splineStep = 10

            this.surfacePoints = this.generateSurfacePoints(xStart, xStep, pointNumber, yMin, yMax, splineStep)
            console.log(this.surfacePoints)

            for (let i = 0; i < this.surfacePoints.length - 1; i++) {
                this.addLine(this.surfacePoints[i], this.surfacePoints[i + 1])
            }

            this.generatedDistance = xStart + xStep * (pointNumber - 1)
        }
    }

    addLine(startPoint: Phaser.Math.Vector2, endPoint: Phaser.Math.Vector2) {
        // Вычисляем центр массы линии
        // Вычисляем центр массы линии
        const massCenterX = startPoint.x;
        const massCenterY = startPoint.y;

        // Создаем отрезок с помощью Phaser.GameObjects.Line
        // const line = new Phaser.GameObjects.Line(this, startPoint.x, startPoint.y, endPoint.x, endPoint.y, 0xff0000);

        // Создаем хитбокс отрезка с помощью Matter.js
        const lineVertices = [
            { x: startPoint.x - massCenterX, y: startPoint.y - massCenterY },
            { x: endPoint.x - massCenterX, y: endPoint.y - massCenterY },
            { x: (startPoint.x + endPoint.x) / 2 - massCenterX, y: (startPoint.y + endPoint.y) / 2 - massCenterY + 20}
        ]

        const lineBody = this.matter.add.fromVertices(massCenterX, massCenterY, lineVertices, { isStatic: true });

        // Связываем отрезок и хитбокс
        // line.setData('body', lineBody);

        // Добавляем отрезок на сцену
        // this.add.existing(line);

        // return line;
    }

    addItem(x: number = 0, y: number = 0, type: string, size: number) {
        let itemShape

        const baseType = type.includes("coin") ? "coin" : type
        switch (baseType) {
            case "coin":
                itemShape = this.shapes.coin
                break
            case "fuel":
                itemShape = this.shapes.fuel
                break
            default:
                itemShape = undefined
                break
        }

        const newItem = this.matter.add.sprite(x, y, type, undefined, {
            shape: itemShape,
            isStatic: true,
            isSensor: true
        })

        newItem.setDisplaySize(size, size)

        this.matter.world.on(Phaser.Physics.Matter.Events.COLLISION_START, (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
            const { pairs } = event

            pairs.forEach(pair => {
                const { bodyA, bodyB } = pair

                if ((bodyA.gameObject === newItem) || (bodyB.gameObject === newItem)) {
                    newItem.setCollidesWith(0)
                    newItem.setSensor(false)

                    switch (baseType) {
                        case "fuel":
                            this.fuel = 1
                            break
                        case "coin":
                            const coinValue = Number(type.slice(4, type.length))
                            console.log(coinValue)
                            this.moneyCounter += coinValue
                            break
                        default:
                            break
                    }

                    this.tweens.add({
                        targets: newItem,
                        y: newItem.y - 100,
                        alpha: 0,
                        duration: 300,
                        onComplete: () => {
                            if (newItem.body) {
                                if (newItem && !newItem.scene) {
                                    newItem.destroy()
                                }
                            }
                        }
                    })
                }
            })
        })
    }

    addCoin(x: number, y: number, value: number) {
        const coinSize = 70
        this.addItem(x, y, "coin" + value.toString(), coinSize)
    }

    addFuel(x: number, y: number) {
        const fuelSize = 70
        this.addItem(x, y, "fuel", fuelSize)
    }

}