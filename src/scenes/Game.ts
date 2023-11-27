import Phaser from "phaser";
import { Collision, Composite, Composites } from "matter";

export class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private car!: Phaser.Physics.Matter.Sprite
    private mapHitboxPoints: Phaser.Math.Vector2[] = []
    private wheel1!: Phaser.Physics.Matter.Sprite
    private wheel2!: Phaser.Physics.Matter.Sprite
    private maxSpeed!: number
    private fuelLevel!: number
    private friction!: number
    private score!: number
    private depreciation!: number
    private rotationSpeed!: number

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }
    constructor() {
        super('game')
    }

    create() {

        const width = this.scale.width
        const height = this.scale.height

        let shapes = this.cache.json.get('shapes');
        let wheelShapes = this.cache.json.get('wheelShapes')

        this.friction = Infinity


        this.car = this.matter.add.sprite(300, 200, 'car', undefined, { shape: shapes.car })
        this.wheel1 = this.matter.add.sprite(40, 245, 'wheel', undefined, { shape: wheelShapes.wheel })
        this.wheel2 = this.matter.add.sprite(360, 245, 'wheel2', undefined, { shape: wheelShapes.wheel })
        // const ground = this.matter.add.image(0, 500, 'ground')

        this.wheel1.setFriction(this.friction)
        this.wheel2.setFriction(this.friction)

        const wheelBounce = 0.5

        this.wheel1.setBounce(wheelBounce)
        this.wheel2.setBounce(wheelBounce)

        const carBody = this.car.body as MatterJS.BodyType
        const wheel1Body = this.wheel1.body as MatterJS.BodyType
        const wheel2Body = this.wheel2.body as MatterJS.BodyType

        this.matter.add.constraint(
            carBody,
            wheel1Body,
            5,
            0.2,
            {
                pointA: {
                    x: -163,
                    y: 85 // 70
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
                    y: 85 //70
                }
            })

        this.car.setBounce(1)
        // this.car.setFrictionAir(0.01)

        // Генерация карты
        const startX = 0; // Начальная координата X карты
        const startY = 700; // Начальная координата Y карты
        const numPoints = 50; // Количество точек карты
        const mapWidth = 8000; // Ширина карты

        const hillHeight = 200; // Высота холмов
        const hillWidth = mapWidth / numPoints; // Ширина каждого холма

        for (let i = 0; i < numPoints; i++) {
            const x = startX + i * hillWidth;
            const y = startY - hillHeight * Math.sin((i / numPoints) * Math.PI * 2);
            this.mapHitboxPoints.push(new Phaser.Math.Vector2(x, y));
        }

        // // Отрисовка карты
        // const mapGraphics = this.add.graphics();
        // mapGraphics.lineStyle(2, 0xffffff, 1);

        // for (let i = 0; i < this.mapHitboxPoints.length - 1; i++) {
        //     const p1 = this.mapHitboxPoints[i];
        //     const p2 = this.mapHitboxPoints[i + 1];
        //     mapGraphics.lineBetween(p1.x, p1.y, p2.x, p2.y);
        // }

        // // Создание физического тела для карты
        // const mapBody = this.matter.add.fromVertices(-100, 0, this.mapHitboxPoints, { isStatic: true });
        // mapBody.gameObject = mapGraphics; // Привязка графического объекта к физическому телу

        // // Перемещение карты вниз
        // const mapHeight = Math.max(...this.mapHitboxPoints.map(p => p.y));
        // mapGraphics.y = mapHeight;


        // камера 
        this.cameras.main.startFollow(this.car);
        this.cameras.main.setFollowOffset(-175, 0); // Фиксация горизонтального положения, смещение по вертикали
        this.cameras.main.setDeadzone(0, 0); // Зона смягчения, в которой объект может перемещаться без активации камеры
        this.cameras.main.setLerp(1, 1); // Настройка скорости следования камеры (значения от 0 до 1)
        // this.cameras.main.setBounds(0, 0, mapWidth, this.scale.height); 

        // вращение колес
        this.rotationSpeed = 0.2


    }   

    // this.car.setVelocity(-5, 0)
    update(t: number, dt: number) {

        const wheel1Body = this.wheel1.body as MatterJS.BodyType
        const wheel2Body = this.wheel2.body as MatterJS.BodyType

        if (this.cursors.left.isDown) {
            this.wheel1.rotation -= this.rotationSpeed
            this.wheel2.rotation -= this.rotationSpeed
        } else if (this.cursors.right.isDown) {
            this.wheel1.rotation += this.rotationSpeed
            this.wheel2.rotation += this.rotationSpeed
        }

        // this.matter.body.setAngle(wheel1Body, this.wheel1.rotation, true)
        // this.matter.body.setAngle(wheel2Body, this.wheel2.rotation, true)

        // const carBody = car.body as MatterJS.BodyType
        // const mapWidth = this.mapHitboxPoints[this.mapHitboxPoints.length - 1].x
        // this.cameras.main.setBounds(carBody.position.x - car.width / 2, 0, mapWidth, this.scale.height);
    }
}