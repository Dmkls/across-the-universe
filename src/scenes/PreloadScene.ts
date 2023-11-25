import { Scene } from 'phaser'

import car from '../assets/images/car.png'
import wheel from '../assets/images/wheel.png'
import ground from '../assets/images/ground.png'


export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('car', car)
    this.load.image('wheel', wheel)
    this.load.image('ground', ground)
  }

  create() {
    this.scene.start('NewGameScene')
  }
}