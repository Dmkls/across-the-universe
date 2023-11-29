import Phaser from "phaser";
import { Collision, Composite, Composites } from "matter";

export class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private car!: Phaser.Physics.Matter.Sprite
    private mapHitboxPoints: Phaser.Math.Vector2[] = []
    private wheel!: Phaser.Physics.Matter.Sprite
    private wheel2!: Phaser.Physics.Matter.Sprite
    private wheelAngle: number = 0.1


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


        const car = this.matter.add.sprite(200, 200, 'car', undefined, { shape: shapes.car })
        const wheel = this.matter.add.sprite(40, 245, 'wheel', undefined, { shape: shapes.wheel })
        const wheel2 = this.matter.add.sprite(360, 245, 'wheel2', undefined, { shape: shapes.wheel })
        // const ground = this.matter.add.image(0, 500, 'ground')

        this.car = car
        this.wheel = wheel
        this.wheel2 = wheel2

        const carBody = car.body as MatterJS.BodyType
        const wheelBody = wheel.body as MatterJS.BodyType
        const wheel2Body = wheel2.body as MatterJS.BodyType


        this.matter.add.constraint(
            carBody,
            wheelBody,
            5,
            0.4,
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
            0.4,
            {
                pointA: {
                    x: 160,
                    y: 85 //70
                }
            })


        // this.matter.body.setInertia(carBody, Infinity)
        // car.setFrictionAir(0)
        car.setBounce(1)

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
        const mapBody = this.matter.add.fromVertices(0, 0, this.mapHitboxPoints, { isStatic: true });
        mapBody.gameObject = mapGraphics; // Привязка графического объекта к физическому телу

        // Перемещение карты вниз
        const mapHeight = Math.max(...this.mapHitboxPoints.map(p => p.y));
        mapGraphics.y = mapHeight;


        // камера 
        this.cameras.main.startFollow(car);
        this.cameras.main.setFollowOffset(-175, 0); // Фиксация горизонтального положения, смещение по вертикали
        this.cameras.main.setDeadzone(0, 0); // Зона смягчения, в которой объект может перемещаться без активации камеры
        this.cameras.main.setLerp(1, 1); // Настройка скорости следования камеры (значения от 0 до 1)
        // this.cameras.main.setBounds(0, 0, mapWidth, this.scale.height);
//         wheel.setFriction(10)

    }

    update(t: number, dt: number) {

        if (this.cursors.left.isDown) {
            this.wheel.setVelocity(-10, 0)
            this.wheel2.setVelocity(-10, 0)
        } else if (this.cursors.right.isDown) {
            this.wheel.setVelocity(10, 0)
            this.wheel2.setVelocity(-10, 0)
        }

        // const carBody = car.body as MatterJS.BodyType
        // const mapWidth = this.mapHitboxPoints[this.mapHitboxPoints.length - 1].x
        // this.cameras.main.setBounds(carBody.position.x - car.width / 2, 0, mapWidth, this.scale.height);
    }
}