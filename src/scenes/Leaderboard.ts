import Phaser from 'phaser'
import * as events from "events";

export default class Leaderboard extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private buttons: Phaser.GameObjects.Image[] = []
    private leaders: Phaser.GameObjects.Text[] = []
    private selectedButtonIndex = 0

    private lbBack!: Phaser.GameObjects.Image
    private car!: Phaser.GameObjects.Image

    private top1!: Phaser.GameObjects.Image
    private top2!: Phaser.GameObjects.Image
    private top3!: Phaser.GameObjects.Image
    private top4!: Phaser.GameObjects.Image
    private top5!: Phaser.GameObjects.Image
    private top6!: Phaser.GameObjects.Image

    private top1Name!: Phaser.GameObjects.Text
    private top2Name!: Phaser.GameObjects.Text
    private top3Name!: Phaser.GameObjects.Text
    private top4Name!: Phaser.GameObjects.Text
    private top5Name!: Phaser.GameObjects.Text
    private top6Name!: Phaser.GameObjects.Text

    private yourName!: Phaser.GameObjects.Text
    private yourNum!: Phaser.GameObjects.Text
    private yourTop!: Phaser.GameObjects.Image
    private yourLVL!: Phaser.GameObjects.Image

    private logoutButton!: Phaser.GameObjects.Image

    private esc!: any

    constructor() {
        super('leaderboard-scene')
    }

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    create() {
        this.esc = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        const { width, height } = this.scale

        // Background
        this.add.image(0, -250, 'background').setOrigin(0, 0).setDisplaySize(1300, 970)

        // Leader board background
        this.car = this.add.image(width * 0.5, height * 0.5, 'car-full')
            .setScale(0.6)
        this.lbBack = this.add.image(0,0, 'l-b-background').setOrigin(0, 0).setAlpha(0.7)

        // Leaders
        // back
        this.top1 = this.add.image(this.lbBack.x+50, this.lbBack.y+100, 'leader2').setOrigin(0, 0)
        this.top2 = this.add.image(this.top1.x, this.top1.y+60, 'leader1').setOrigin(0, 0)
        this.top3 = this.add.image(this.top1.x, this.top2.y+60, 'leader2').setOrigin(0, 0)
        this.top4 = this.add.image(this.top1.x, this.top3.y+60, 'leader1').setOrigin(0, 0)
        this.top5 = this.add.image(this.top1.x, this.top4.y+60, 'leader2').setOrigin(0, 0)
        this.top6 = this.add.image(this.top1.x, this.top5.y+60, 'leader1').setOrigin(0, 0)

        this.leaders.push(this.top1Name, this.top2Name, this.top3Name, this.top4Name, this.top5Name, this.top6Name)

        // Logout icon
        this.logoutButton = this.add.image(28, 30, 'back')
            .setDisplaySize(40, 40)

        // Position and name
        for (let i = 0; i <= 5; i++) {
            if (i < 3) {
                this.add.image(this.top1.x+25, this.top1.y+(60*i)+25, (i+1).toString())
            }
            // Position
            this.add.text(this.top1.x+25, this.top1.y+(60*i)+25, (i+1).toString(), { fontFamily: "Arial", fontSize: 32, color: "#ffffff" }).setOrigin(0.5)
            // Name
            this.leaders[i] = this.add.text(this.top1.x+125, this.top1.y+(60*i)+25, ('-').toString(), { fontFamily: "Arial", fontSize: 32, color: "#ffffff" }).setOrigin(0, 0.5)
        }

        // You in top
        this.yourTop = this.add.image(this.top1.x, this.top1.y+480, 'leader1').setOrigin(0, 0)
        this.yourNum = this.add.text(this.top1.x+25, this.top1.y+505, '-', { fontFamily: "Arial", fontSize: 32, color: "#ffffff" }).setOrigin(0.5)
        this.yourName = this.add.text(this.top1.x+125, this.top1.y+505, '-', { fontFamily: "Arial", fontSize: 32, color: "#ffffff" }).setOrigin(0.5)


        this.buttons.push(this.logoutButton)

        this.logoutButton.on('selected', () => {
            this.buttons = []
            this.leaders = []
            this.scene.start('main-menu')
        })

        this.logoutButton.setInteractive()

        this.logoutButton.on("pointerover", () => {
            this.selectButton(0)
        })
        this.logoutButton.on("pointerout", () => {
            this.logoutButton.displayHeight /= 1.1
            this.logoutButton.displayWidth /= 1.1
        })

        // pointerdown
        this.logoutButton.on("pointerdown", () => {
            this.confirmSelection()
        })
    }

    selectButton(index: number) {
        const currentButton = this.buttons[this.selectedButtonIndex]

        // set the current selected button to a white tint
        // currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        button.displayHeight *= 1.1
        button.displayWidth *= 1.1

        // store the new selected index
        this.selectedButtonIndex = index
    }

    confirmSelection() {
        // get the currently selected button
        const button = this.buttons[this.selectedButtonIndex]

        // emit the 'selected' event
        button.emit('selected')
    }

    update() {
        if (this.esc?.isDown) {
            this.buttons = []
            this.leaders = []
            this.scene.start('main-menu')
        }
    }
}