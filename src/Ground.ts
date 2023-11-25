import { GameObjects, Scene, Tilemaps } from 'phaser'


export class Ground extends GameObjects.Sprite {

    constructor(scene: Scene) {

        super(scene, 512, 600, 'ground');

        this.displayWidth = 1024;
        this.displayHeight = 240;
        
        this.scene.add.existing(this)

        this.setInteractive()
    }
}

