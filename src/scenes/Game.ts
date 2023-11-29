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

        this.car = this.matter.add.sprite(300, 200, 'car', undefined, { shape: shapes.car })
        this.wheel1 = this.matter.add.sprite(40, 245, 'wheel', undefined, { shape: shapes.wheel })
        this.wheel2 = this.matter.add.sprite(360, 245, 'wheel2', undefined, { shape: shapes.wheel })
        // const ground = this.matter.add.image(0, 500, 'ground')

        const wheelBounce = 1

        this.wheel1.setBounce(wheelBounce)
        this.wheel2.setBounce(wheelBounce)

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
                    x: -163,
                    y: 85 // 70
                }
            })

        this.matter.add.constraint(
            carBody,
            wheel2Body,
            2,
            0.1,
            {
                pointA: {
                    x: 160,
                    y: 85 //70
                }
            })

        this.car.setBounce(0.5)

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

        // Отрисовка карты
        const mapGraphics = this.add.graphics();
        mapGraphics.lineStyle(2, 0xffffff, 1);

        for (let i = 0; i < this.mapHitboxPoints.length - 1; i++) {
            const p1 = this.mapHitboxPoints[i];
            const p2 = this.mapHitboxPoints[i + 1];
            mapGraphics.lineBetween(p1.x, p1.y, p2.x, p2.y);
        }

        // Создание физического тела для карты
        const mapBody = this.matter.add.fromVertices(-100, 0, this.mapHitboxPoints, { isStatic: true });
        mapBody.gameObject = mapGraphics; // Привязка графического объекта к физическому телу

        // Перемещение карты вниз
        const mapHeight = Math.max(...this.mapHitboxPoints.map(p => p.y));
        mapGraphics.y = mapHeight;


        // камера 
        this.cameras.main.startFollow(this.car);
        this.cameras.main.setFollowOffset(-175, 0); // Фиксация горизонтального положения, смещение по вертикали
        this.cameras.main.setDeadzone(0, 0); // Зона смягчения, в которой объект может перемещаться без активации камеры
        this.cameras.main.setLerp(1, 1); // Настройка скорости следования камеры (значения от 0 до 1)

        this.wheel1.setCollisionCategory(1)
        this.wheel2.setCollisionCategory(1)
        this.wheel1.setCollisionGroup(1)
        this.wheel2.setCollisionGroup(1)

        this.wheel1.setFriction(0.7)
        this.wheel2.setFriction(0.7)
    }

    update(t: number, dt: number) {

        const car = this.car

        if (this.cursors.left.isDown) {
            this.wheel1.applyForceFrom({ x: this.wheel1.width / 2, y: this.wheel1.height / 2 } as Phaser.Math.Vector2, { x: -0.01, y: 0 } as Phaser.Math.Vector2)
            this.wheel2.applyForceFrom({ x: this.wheel2.width / 2, y: this.wheel2.height / 2 } as Phaser.Math.Vector2, { x: -0.01, y: 0 } as Phaser.Math.Vector2)
        } else if (this.cursors.right.isDown) {
            this.wheel1.applyForceFrom({ x: this.wheel1.width / 2, y: this.wheel1.height / 2 } as Phaser.Math.Vector2, { x: 0.01, y: 0 } as Phaser.Math.Vector2)
            this.wheel2.applyForceFrom({ x: this.wheel2.width / 2, y: this.wheel2.height / 2 } as Phaser.Math.Vector2, { x: 0.01, y: 0 } as Phaser.Math.Vector2)
        }

    }
}