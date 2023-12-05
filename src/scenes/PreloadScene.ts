import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene
{
  constructor()
  {
    super('preloader')
  }

  preload()
  {
    this.load.image('car', 'assets/images/car/body.png')
    this.load.image('wheel', 'assets/images/car/wheel.png')
    this.load.image('coin500', 'assets/images/items/coin500.png')
    this.load.image('coin100', 'assets/images/items/coin100.png')
    this.load.image('fuel', 'assets/images/items/fuel.png')
    this.load.image('driverBody', 'assets/images/driver/body.png')
    this.load.image('driverHead', 'assets/images/driver/head.png')

    this.load.json('shapes', 'assets/JSONs/shapes.json')
  }

  create()
  {
    this.scene.start('start-page')
  }

}