import Phaser from "phaser";
import {PreloadScene} from "./scenes/PreloadScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 720,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 }
    }
  },
  scene: [PreloadScene]
}

new Phaser.Game(config)