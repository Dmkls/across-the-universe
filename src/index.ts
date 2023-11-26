import Phaser from "phaser";
import {PreloadScene} from "./scenes/PreloadScene";
import {Game} from "./scenes/Game"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 720,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: 5 },
      setBounds: {
        left: true,
        right: true,
        top:  true,
        bottom: true
      }
    }
  },
  scene: [PreloadScene, Game]
}

new Phaser.Game(config)