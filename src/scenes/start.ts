import Phaser from 'phaser'
import * as events from "events"

export default class StartMenuScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private buttons: Phaser.GameObjects.Image[] = []
    private selectedButtonIndex = 0

    private buttonSelector!: Phaser.GameObjects.Image

    private loginButton!: Phaser.GameObjects.Image
    private registerButton!: Phaser.GameObjects.Image
    private logoutButton!: Phaser.GameObjects.Image

    constructor() {
        super('start-page')
    }

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    preload() {
    }

    create() {
        const { width, height } = this.scale

        // Background
        this.add.image(0, 0, 'start-background').setOrigin(0, 0).setScale(1.2)

        // Play button
        this.loginButton = this.add.image(width-150, height/2, 'button')
            .setDisplaySize(150, 60)
        this.add.text(this.loginButton.x, this.loginButton.y, 'ВХОД', { fontFamily: "Arial", fontSize: 18, color: "#ffffff" })
            .setOrigin(0.5)

        // Registration button
        this.registerButton = this.add.image(this.loginButton.x, this.loginButton.y+this.loginButton.displayHeight+10, 'button')
            .setDisplaySize(150, 60)

        this.add.text(this.registerButton.x, this.registerButton.y, 'РЕГИСТРАЦИЯ', { fontFamily: "Arial", fontSize: 18, color: "#ffffff" })
            .setOrigin(0.5)

        // Logout-icon
        this.logoutButton = this.add.image(28, 30, 'logout')
            .setDisplaySize(55, 55)

        this.buttons.push(this.logoutButton)
        this.buttons.push(this.loginButton)
        this.buttons.push(this.registerButton)

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand').setScale(0.3)

        this.selectButton(1)

        this.loginButton.on('selected', () => {
            this.buttons = []
            this.scene.start('login-page')
        })

        this.registerButton.on('selected', () => {
            this.buttons = []
            this.scene.start('registration-page')
        })

        this.loginButton.on('selected', () => {
            console.log('login')
        })

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.registerButton.off('selected')
        })

        this.logoutButton.setInteractive()
        this.loginButton.setInteractive()
        this.registerButton.setInteractive()


        this.loginButton.on("pointerover", () => {
            this.selectButton(1)
        })
        this.registerButton.on("pointerover", () => {
            this.selectButton(2)
        })
        this.logoutButton.on("pointerover", () => {
            this.selectButton(0)
        })

        // pointerdown
        this.loginButton.on("pointerdown", () => {
            this.confirmSelection()
        })
        this.registerButton.on("pointerdown", () => {
            this.confirmSelection()
        })
        this.logoutButton.on("pointerdown", () => {
            this.confirmSelection()
        })
    }

    selectButton(index: number) {
        const currentButton = this.buttons[this.selectedButtonIndex]

        currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        button.setTint(0x66ff7f)

        this.buttonSelector.x = (button.x + button.displayWidth * 0.5)
        this.buttonSelector.y = button.y + 10

        this.selectedButtonIndex = index
    }

    selectNextButton(change = 1) {
        let index = this.selectedButtonIndex + change

        if (index >= this.buttons.length)
        {
            index = 1
        }
        else if (index < 1)
        {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

    confirmSelection() {
        const button = this.buttons[this.selectedButtonIndex]

        button.emit('selected')
    }

    update() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
        const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right!)
        const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left!)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

        if (spaceJustPressed) {
            this.confirmSelection()
        } else if (upJustPressed) {
            this.selectNextButton(-1)

        } else if (downJustPressed) {
            this.selectNextButton(1)
        }
    }
}