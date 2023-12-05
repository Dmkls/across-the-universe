import Phaser from 'phaser'
import * as events from "events"

export default class RegistrationScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private buttons: Phaser.GameObjects.Image[] = []
    private selectedButtonIndex = 0

    private buttonSelector!: Phaser.GameObjects.Image

    private loginButton!: Phaser.GameObjects.Image
    private registerButton!: Phaser.GameObjects.Image
    private logoutButton!: Phaser.GameObjects.Image

    constructor() {
        super('registration-page')
    }

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    preload() {
        this.load.html('regform', 'assets/registration.html');
        // this.load.image('start-background', 'assets/images/start/background.png')
        // this.load.image('button', 'assets/images/start/gray.png')
        // this.load.image('cursor-hand', 'assets/images/car/wheel.png')
        // this.load.image('logout', 'assets/images/menu/logout.png')
    }

    create() {
        const { width, height } = this.scale

        const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        const element = this.add.dom(400, 600).createFromCache('nameform');
        //
        // element.setPerspective(800);

        // element.addListener('click');
        //
        // element.on('click', (event: { target: { name: string; }; }) =>
        // {
        //
        //     if (event.target.name === 'loginButton')
        //     {
        //         // @ts-ignore
        //         const inputUsername = this.getChildByName('username');
        //         // @ts-ignore
        //         const inputPassword = this.getChildByName('password');
        //
        //         //  Have they entered anything?
        //         if (inputUsername.value !== '' && inputPassword.value !== '')
        //         {
        //             //  Turn off the click events
        //             // @ts-ignore
        //             this.removeListener('click');
        //
        //             //  Tween the login form out
        //             // @ts-ignore
        //             this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
        //
        //             // @ts-ignore
        //             this.scene.tweens.add({
        //                 targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
        //                 onComplete: function ()
        //                 {
        //                     element.setVisible(false);
        //                 }
        //             });
        //
        //             //  Populate the text with whatever they typed in as the username!
        //             text.setText(`Welcome ${inputUsername.value}`);
        //         }
        //         else
        //         {
        //             //  Flash the prompt
        //             // @ts-ignore
        //             this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
        //         }
        //     }
        //
        // });
        //
        // this.tweens.add({
        //     targets: element,
        //     y: 300,
        //     duration: 3000,
        //     ease: 'Power3'
        // });
    }



    selectButton(index: number) {

    }

    selectNextButton(change = 1) {

    }

    confirmSelection() {

    }

    update() {

    }
}