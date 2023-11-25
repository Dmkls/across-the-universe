import { Game, Types, AUTO } from 'phaser'
import { PreloadScene } from './scenes/PreloadScene'
import { NewGameScene } from './scenes/NewGameScene'
import gameConfig from './gameConfig'

const config: Types.Core.GameConfig = {
  type: AUTO,
  scale: gameConfig.scale,
  backgroundColor: gameConfig.backgroundColor,
  scene: [
    PreloadScene,
    NewGameScene
  ]
}

new Game(config)