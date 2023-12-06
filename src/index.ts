import Phaser from "phaser";
import {PreloadScene} from "./scenes/PreloadScene";
import {Game} from "./scenes/Game"
import MainMenuScene from "./scenes/Main-menu";
import StartMenuScene from "./scenes/start";
import RegistrationScene from "./scenes/registration"


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
  dom: {
    createContainer: true
  },
  scene: [PreloadScene, Game, MainMenuScene, StartMenuScene, RegistrationScene]
}

new Phaser.Game(config)