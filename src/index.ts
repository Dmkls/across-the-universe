
'use strict';
/** Imports */
// Подключение глобальных зависимостей. (Напомню, они будут собраны webpack'ом в отдельный файл).
require('pixi');    // Из-за структуры кода Phaser'а, PIXI и p2 должны быть глобальными объектами
require('p2');
require('phaser');  // Так-же, в моем случае, TypeScript ломается, если подключить эту библиотеку как `import 'phaser';`

import 'styles/style.styl'; // Регистрация стилей для страницы; добавятся автоматически
import BootState from './states/boot.state';
import PreloaderState from './states/preloader.state';
import MainState from './states/main.state';

// Основной класс нашего приложения
export default class App extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super(config);

        // Регистрируем стейты игры
        this.state.add('boot', BootState);
        this.state.add('preloader', PreloaderState);
        this.state.add('main', MainState);

        this.state.start('boot'); // Инициализируем и запускаем `boot` стейт
    }
}

// Аля python'овский `__name__ == "__main__"`, нужен для проверки является ли
// данный модуль частью другой программы или он исполняемый.
if (!module.parent) {
    window.onload = () => {
        const config: Phaser.IGameConfig = {
            width: 800, // Выста canvas'а
            height: 600, // Ширина canvas'а
            renderer: Phaser.AUTO, // Движок отрисовки, рекомендуется оставить AUTO
            parent: '',
            resolution: 1,
            forceSetTimeOut: false // насильственное использование setTimeout
        };

        new App(config); // инициализация приложения. Оно автоматически вставит Canvas в корень разметки
    };
}

