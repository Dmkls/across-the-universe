'use strict';
/** Imports */
import App from '..';

abstract class State extends Phaser.State {
    // Перезапишем свойство `game` у наших стейтов.
    // Это нужно для того, чтобы если мы добавим в `App` какое-то поле, TypeScript
    // смог его подхватить, и не ругался на него, если мы бы вызывали его через
    // `this.game`.
    game: App;
}

export default State;