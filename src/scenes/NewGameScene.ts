import { NONE, Scene, GameObjects } from 'phaser'
import { Car } from '../Car'
import { Ground } from '../Ground'
// import { NewDOM } from '../NewDOM'


export class NewGameScene extends Scene {
  private _car: Car

  private _ground: Ground

  private _spriteBorder: GameObjects.Graphics

  // private _dom : NewDOM

  async create() {

    this._ground = new Ground(this)

    this._car = new Car(this, { x: 300, y: 300 })

    // Создание графического объекта для рамки
    this._spriteBorder = this.add.graphics()
    this.drawSpriteBorder(this._car)
    this.drawSpriteBorder(this._car.wheel1)
    this.drawSpriteBorder(this._car.wheel2)
    this.drawSpriteBorder(this._ground)

    this.drawGreenCircle(this._car.x, this._car.y)
    this.drawGreenCircle(this._car.wheel1.x, this._car.wheel1.y)
    this.drawGreenCircle(this._car.wheel2.x, this._car.wheel2.y)
    this.drawGreenCircle(this._ground.x, this._ground.y)

    // Перерисовка рамки при изменении размеров спрайта
    this._car.on('changedisplay', () => {
      this.drawSpriteBorder(this._car)
      this.drawSpriteBorder(this._car.wheel1)
      this.drawSpriteBorder(this._car.wheel2)
      this.drawSpriteBorder(this._ground)

      this.drawGreenCircle(this._car.x, this._car.y)
      this.drawGreenCircle(this._car.wheel1.x, this._car.wheel1.y)
      this.drawGreenCircle(this._car.wheel2.x, this._car.wheel2.y)
      this.drawGreenCircle(this._ground.x, this._ground.y)
    })
  }

  constructor() {
    super('NewGameScene')
  }

  drawSpriteBorder(sprite: GameObjects.Sprite) {
    const bounds = sprite.getBounds() // Get the sprite's bounds

    this._spriteBorder.lineStyle(2, 0xff0000)
    this._spriteBorder.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
  }

  drawGreenCircle(x: number, y: number) {
    const circle = this.add.graphics()
    circle.fillStyle(0x00ff00, 1)
    circle.fillCircle(x, y, 5)
  }

}