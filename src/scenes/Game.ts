import Phaser, { NONE } from "phaser";
import { Collision, Composite, Composites } from "matter";

export class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private car!: Phaser.Physics.Matter.Sprite
    private wheel1!: Phaser.Physics.Matter.Sprite
    private wheel2!: Phaser.Physics.Matter.Sprite

    private width!: number
    private height!: number

    private maxFuel: number = 1
    private fuelDecreaseRate: number = this.maxFuel / 30

    private fuel: number = this.maxFuel
    private distance!: number

    private startPosX!: number
    private startPosY!: number

    private distanceIndicator!: Phaser.GameObjects.Text
    private moneyIndicator!: Phaser.GameObjects.Text
    private fuelIndicator!: Phaser.GameObjects.Sprite

    private backWall!: Phaser.GameObjects.Sprite

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    constructor() {
        super('game')
    }

    create() {
        this.width = this.scale.width
        this.height = this.scale.height

        let shapes = this.cache.json.get('shapes');

        const backWallWidth = 20
        this.backWall = this.matter.add.sprite(0, 0, 'backWall');
        this.backWall.setDisplaySize(backWallWidth, this.width)
        this.matter.body.setStatic(this.backWall.body as MatterJS.BodyType, true);
        this.matter.body.setInertia(this.backWall.body as MatterJS.BodyType, Infinity);

        this.startPosX = 300
        this.startPosY = 200

        this.car = this.matter.add.sprite(this.startPosX, this.startPosY, 'car', undefined, { shape: shapes.carBody })
        this.wheel1 = this.matter.add.sprite(this.startPosX, this.startPosY, 'wheel', undefined, { shape: shapes.carWheel })
        this.wheel2 = this.matter.add.sprite(this.startPosX, this.startPosY, 'wheel', undefined, { shape: shapes.carWheel })

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

        const wheelBounce = 0.5
        const carBounce = 0
        const wheelFriction = 0.7

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

        // камера 
        this.cameras.main.startFollow(this.car);
        this.cameras.main.setFollowOffset(-175, 100); // Фиксация горизонтального положения, смещение по вертикали
        this.cameras.main.setDeadzone(0, 0); // Зона смягчения, в которой объект может перемещаться без активации камеры
        this.cameras.main.setLerp(1, 1); // Настройка скорости следования камеры (значения от 0 до 1)

        // коллизиции
        this.wheel1.setCollisionCategory(1)
        this.wheel2.setCollisionCategory(1)
        this.wheel1.setCollisionGroup(1)
        this.wheel2.setCollisionGroup(1)

        // карта

        // индикаторы
        this.distance = 0
        this.distanceIndicator = this.add.text(10, 10, "", { fontFamily: "Arial", fontSize: 28, color: "#ffffff" })

        this.fuel = 1
        this.fuelIndicator = this.add.sprite(10, 40, "fuelBar")
        this.fuelIndicator.setOrigin(0, 0)

        
    }

    update(t: number, dt: number) {
        const speed = 0.5;

        if (this.cursors.left?.isDown) {
            this.wheel1.setAngularVelocity(-speed)
            this.wheel2.setAngularVelocity(-speed)
        } else if (this.cursors.right?.isDown) {
            this.wheel1.setAngularVelocity(speed)
            this.wheel2.setAngularVelocity(speed)
        } 

        this.updateDistance()

        this.updateIndicatorsPositions()

        this.updateBackWallPosition()

        this.fuelIndicator.setDisplaySize(this.fuel * this.fuelIndicator.width, this.fuelIndicator.height)

        // Уменьшаем уровень топлива с учетом времени прошедшего с последнего обновления
        this.fuel -= this.fuelDecreaseRate * (dt / 1000); // dt - разница времени в миллисекундах, делим на 1000, чтобы получить секунды

        // Проверяем, чтобы уровень топлива не стал отрицательным
        if (this.fuel < 0) {
            this.fuel = 0;
        }
    }

    updateDistance() {
        const oneMetre = 125

        let currentDistance = Math.floor((this.car.x - this.startPosX) / oneMetre)

        if (currentDistance > this.distance) {
            this.distance = currentDistance
        }

        this.distanceIndicator.setText(this.distance.toString() + "m")
    }

    updateIndicatorsPositions() {
        this.distanceIndicator.setScrollFactor(0, 0)
        this.fuelIndicator.setScrollFactor(0, 0)
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
    
}