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

    this.load.json('shapes', 'assets/JSONs/shapes.json')
  }

  create()
  {
    this.scene.start('game')
  }

}