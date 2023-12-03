import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene
{
  constructor()
  {
    super('preloader')
  }

  preload()
  {
    this.load.image('car', 'assets/images/car.png')
    this.load.image('wheel', 'assets/images/wheel.png')
    this.load.image('wheel2', 'assets/images/wheel.png')
    this.load.image('ground', 'assets/images/ground.png')


    this.load.json('shapes', 'assets/JSONs/shapes.json')
    this.load.json('wheelShapes', 'assets/JSONs/wheelShapes.json')


  }

  create()
  {
    this.scene.start('main-menu')
  }

}