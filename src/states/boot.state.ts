'use strict';
/** Imports */
import State from './state';

// Этот стейт нужен для загрузки критических ресурсов перед `preloader`;
// для вывода информации в консоль;
// для прочих стартовых манипуляций;
export default class BootState extends State {
    create(): void {
        // `this.game` - это ссылка на инстанс нашего `App`, в который мы добавили
        // данный стейт.
        this.game.state.start('preloader'); // Переход на `preloader` стейт
    }
}