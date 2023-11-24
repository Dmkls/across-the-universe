'use strict';
import { Sprite } from 'phaser';
/** Imports */
import State from './state';

// Основной стейт игры
export default class MainState extends State {
    create(): void {
        const carSprite = this.game.add.sprite(0, 0, 'car');

        carSprite.width = 200;
        carSprite.height = carSprite.width / 1.93;

        const wheelSprite1 = this.game.add.sprite(0, 0, 'wheel'); // left wheel
        const wheelSprite2 = this.game.add.sprite(0, 0, 'wheel'); // right wheel

        function updateWheelSizes(wheel: Sprite) {
            wheel.width = carSprite.width * 0.22;// 0.235294117;
            wheel.height = wheel.width;
        };

        updateWheelSizes(wheelSprite1);
        updateWheelSizes(wheelSprite2);
        
        wheelSprite1.update = () => {
            wheelSprite1.x = carSprite.x + carSprite.width * 0.18039215 - 0.5 * wheelSprite1.width;
            wheelSprite1.y = carSprite.y + carSprite.height * 0.9469696969 - 0.5 * wheelSprite1.height;
        };
        
        wheelSprite2.update = () => {
            wheelSprite2.x = carSprite.x + carSprite.width * 0.81568627 - 0.5 * wheelSprite2.width;
            wheelSprite2.y = carSprite.y + carSprite.height * 0.9469696969 - 0.5 * wheelSprite2.height;
        };
        
        wheelSprite1.update();
        wheelSprite2.update();

        carSprite.bringToTop();
        
    }
}