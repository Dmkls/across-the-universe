import Phaser from 'phaser'
import * as events from "events"

export default class LoginScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private buttons: Phaser.GameObjects.Image[] = []
    private inputs: Phaser.GameObjects.Text[] = []
    private selectedButtonIndex = 0
    private confirmedButtonIndex = 0

    private buttonSelector!: Phaser.GameObjects.Image

    private loginInput!: Phaser.GameObjects.Image
    private passwordInput!: Phaser.GameObjects.Image
    private logoutButton!: Phaser.GameObjects.Image
    private loginButton!: Phaser.GameObjects.Image

    private login!: Phaser.GameObjects.Text
    private password!: Phaser.GameObjects.Text



    constructor() {
        super('login-page')
    }

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    preload() {
    }

    create() {
        const { width, height } = this.scale

        this.add.image(0, 0, 'start-background').setOrigin(0, 0).setScale(1.2)

        // Inputs
        // Login
        this.loginInput = this.add.image(width/2, height/2.5, 'input')
            .setDisplaySize(250, 50)

        this.login = this.add.text(this.loginInput.x, this.loginInput.y, '', {fontFamily: "Arial", fontSize: 18, color: "#000000" })
            .setOrigin(0.5)

        // Password
        this.passwordInput = this.add.image(width/2, this.loginInput.y + this.loginInput.displayHeight + 10, 'input')
            .setDisplaySize(250, 50)

        this.password = this.add.text(this.passwordInput.x, this.passwordInput.y, '', {fontFamily: "Arial", fontSize: 18, color: "#000000" })
            .setOrigin(0.5)

        // Buttons
        // Registration button
        this.loginButton = this.add.image(this.passwordInput.x,
            this.passwordInput.y + this.passwordInput.displayHeight + 10, 'button')
            .setDisplaySize(250, 50)

        this.add.text(this.loginButton.x, this.loginButton.y, 'вход'.toUpperCase(), { fontFamily: "Arial", fontSize: 18, color: "#ffffff" })
            .setOrigin(0.5)

        // Logout-icon
        this.logoutButton = this.add.image(28, 30, 'back')
            .setDisplaySize(40, 40)


        this.buttons.push(this.logoutButton)
        this.buttons.push(this.loginInput)
        this.buttons.push(this.passwordInput)
        this.buttons.push(this.loginButton)

        this.inputs.push(this.login)
        this.inputs.push(this.password)


        this.loginInput.on('selected', () => {
            window.addEventListener("keydown", this.readInput)
        })

        this.passwordInput.on('selected', () => {
            window.addEventListener("keydown", this.readInput)
        })

        this.logoutButton.on('selected', () => {
            this.buttons = []
            this.inputs = []
            window.removeEventListener("keydown", this.readInput)
            this.scene.start('start-page')
        })

        this.loginButton.on('selected', () => {
            this.buttons = []
            this.inputs = []
            window.removeEventListener("keydown", this.readInput)
            console.log(this.login.text, this.password.text)
            this.scene.start('main-menu')
        })

        this.loginInput.off('selected', () => {
            window.removeEventListener("keydown", this.readInput)
        })

        this.passwordInput.off('selected', () => {
            window.removeEventListener("keydown", this.readInput)
        })

        this.loginInput.setInteractive()
        this.passwordInput.setInteractive()
        this.logoutButton.setInteractive()
        this.loginButton.setInteractive()

        // pointerover
        this.loginInput.on("pointerover", () => {
            this.selectButton(1)
        })
        this.passwordInput.on("pointerover", () => {
            this.selectButton(2)
        })
        this.loginButton.on("pointerover", () => {
            this.selectButton(3)
        })
        this.logoutButton.on("pointerover", () => {
            this.selectButton(0)
        })

        // pointerdown
        this.loginInput.on("pointerdown", () => {
            this.confirmSelection()
        })
        this.passwordInput.on("pointerdown", () => {
            this.confirmSelection()
        })
        this.logoutButton.on("pointerdown", () => {
            this.confirmSelection()
        })
        this.loginButton.on("pointerdown", () => {
            this.confirmSelection()
        })
    }

    readInput = (event: KeyboardEvent) => {
        let input = this.inputs[this.confirmedButtonIndex-1]
        if ((event.keyCode > 64 && event.keyCode < 91)
            || (event.keyCode > 47 && event.keyCode < 58)
            || (event.keyCode > 95 && event.keyCode < 106)
            || (event.keyCode === 8)) {
            if (event.keyCode === 8) {
                input.text = input.text.substring(0, input.text.length - 1)
            } else {
                if (input.text.length < 16) {
                    input.text += event.key
                }
            }
        }
    }


    selectButton(index: number) {
        const currentButton = this.buttons[this.selectedButtonIndex]

        currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        if (index > 0) {
            button.setTint(0xd3d3d3)
        }

        this.selectedButtonIndex = index

    }

    selectNextButton(change = 1) {
        let index = this.selectedButtonIndex + change
        if (index >= this.buttons.length)
        {
            index = this.buttons.length - 6
        }
        else if (index < this.buttons.length - 6)
        {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

    confirmSelection() {
        const button = this.buttons[this.selectedButtonIndex]

        this.confirmedButtonIndex = this.selectedButtonIndex

        button.emit('selected')
    }

    update() {

    }
}