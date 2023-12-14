import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // Game scene
    this.load.image('car', 'assets/images/car/body.png')
    this.load.image('wheel', 'assets/images/car/wheel.png')
    this.load.image('coin500', 'assets/images/items/coin500.png')
    this.load.image('coin100', 'assets/images/items/coin100.png')
    this.load.image('fuel', 'assets/images/items/fuel.png')
    this.load.image('driverBody', 'assets/images/driver/body.png')
    this.load.image('driverHead', 'assets/images/driver/head.png')

    this.load.json('shapes', 'assets/JSONs/shapes.json')

    // Main-menu scene
    this.load.image('gray', 'assets/images/menu/gray.png')
    this.load.image('car-full', 'assets/images/menu/car.png')
    this.load.image('background', 'assets/images/menu/bg.jpg')
    this.load.image('none', 'assets/images/menu/1x1.png')
    this.load.image('top-bar-background', 'assets/images/menu/top-bar.png')
    this.load.image('play', 'assets/images/menu/play.png')

    this.load.image('engine', 'assets/images/menu/engine-icon.png')
    this.load.image('wheel-i', 'assets/images/menu/wheel-icon.png')
    this.load.image('suspension', 'assets/images/menu/suspension-icon.png')

    this.load.spritesheet('progress-bar', 'assets/images/menu/progress-bar.png', { frameWidth: 256, frameHeight: 256 })

    this.load.image('logout', 'assets/images/menu/logout.png')

    // start scene
    this.load.image('start-background', 'assets/images/start/background.png')
    this.load.image('button', 'assets/images/start/gray.png')
    this.load.image('cursor-hand', 'assets/images/car/wheel.png')

    // Registration
    this.load.image('back', 'assets/images/start/back.png')
    this.load.image('input', 'assets/images/start/input-text.png')

    // Leader Board
    this.load.image('l-b-background', 'assets/images/leaders/background.png')
    this.load.image('leader1', 'assets/images/leaders/person_holder.png')
    this.load.image('leader2', 'assets/images/leaders/person_holder_d.png')
    this.load.image('1', 'assets/images/leaders/1.png')
    this.load.image('2', 'assets/images/leaders/2.png')
    this.load.image('3', 'assets/images/leaders/3.png')
    this.load.image('level-1', 'assets/images/leaders/level_1.png')




  }

  create() {
    this.scene.start('start-page')
  }
}