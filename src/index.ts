import Phaser from "phaser";
import {PreloadScene} from "./scenes/PreloadScene";
import {Game} from "./scenes/Game"
import MainMenuScene from "./scenes/Main-menu";
import StartMenuScene from "./scenes/hello";

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
        left: true,
        right: false,
        top:  false,
        bottom: true
      }
    }
  },
  scene: [PreloadScene, Game, MainMenuScene, StartMenuScene]
}

new Phaser.Game(config)