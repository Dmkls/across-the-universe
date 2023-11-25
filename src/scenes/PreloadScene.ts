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
  }

  create()
  {
    this.add.image(400, 300, 'car')
  }

}