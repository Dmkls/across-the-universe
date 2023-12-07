import Phaser from "phaser";
import { PreloadScene } from "./scenes/PreloadScene";
import { Game } from "./scenes/Game"
import MainMenuScene from "./scenes/Main-menu";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 720,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: 3 },
      setBounds: {
        left: false,
        right: false,
        top: false,
        bottom: false
      }
    }
  },
  scene: [PreloadScene, Game, MainMenuScene]
}

new Phaser.Game(config)