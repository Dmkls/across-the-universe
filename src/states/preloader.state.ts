'use strict';
/** Imports */
import State from './state';

// Webpack заменит подобные require'ы на URL до этих изображений, а сами
// изображения положит в папку `dist/asserts/images`.
// А код ниже, он заменит примерно на это:
//    `const skyImage = '/assets/images/sky.png';`
// (Подробнее про подобные "подмены" Webpack'а, смотрите в документации).
const carImage = require('assets/images/car.png');
const wheelImage = require('assets/images/wheel.png');


export default class PreloaderState extends State {
    preload(): void {
        console.debug('Assets loading started');

        this.game.load.image('car', carImage);          
        this.game.load.image('wheel', wheelImage); 
    }

    create(): void {
        console.debug('Assets loading completed');

        this.game.state.start('main'); // Переход на `main` стейте после загрузки всех изображений
    }
}