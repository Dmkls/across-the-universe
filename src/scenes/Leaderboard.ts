import Phaser from 'phaser'
import * as events from "events";

export default class Leaderboard extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private buttons: Phaser.GameObjects.Image[] = []
    private leaders: Phaser.GameObjects.Text[] = []
    private selectedButtonIndex = 0

    private buttonSelector!: Phaser.GameObjects.Image

    private playButton!: Phaser.GameObjects.Image
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
    private yourNum!: Phaser.GameObjects.Image
    private yourLVL!: Phaser.GameObjects.Image

    private shopButton!: Phaser.GameObjects.Image
    private leaderButton!: Phaser.GameObjects.Image
    private engineUpgrade!: Phaser.GameObjects.Image
    private wheelUpgrade!: Phaser.GameObjects.Image
    private suspensionUpgrade!: Phaser.GameObjects.Image
    private progressBarEngine!: Phaser.GameObjects.Image
    private progressBarWheel!: Phaser.GameObjects.Image
    private progressBarSuspension!: Phaser.GameObjects.Image
    private logoutButton!: Phaser.GameObjects.Image

    constructor() {
        super('leaderboard-scene')
    }

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
    }

    preload() {

    }

    create() {
        const { width, height } = this.scale
        const alpha: number = 0.5

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


        for (let i = 0; i <= 5; i++) {
            if (i < 3) {
                this.add.image(this.top1.x+25, this.top1.y+(60*i)+25, (i+1).toString())
            }
            this.add.text(this.top1.x+25, this.top1.y+(60*i)+25, (i+1).toString(), { fontFamily: "Arial", fontSize: 32, color: "#ffffff" }).setOrigin(0.5)
            this.leaders[i] = this.add.text(this.top1.x+125, this.top1.y+(60*i)+25, ('-').toString(), { fontFamily: "Arial", fontSize: 32, color: "#ffffff" }).setOrigin(0, 0.5)
        }


        //
        // // Play button
        // this.playButton = this.add.image(this.car.x, 30, 'play')
        //     .setDisplaySize(150, 60).setAlpha(1)
        //
        // // this.add.text(this.playButton.x, this.playButton.y, 'ИГРАТЬ').setFontSize(20)
        // //     .setOrigin(0.5)
        //
        // // Shop button
        // this.shopButton = this.add.image(this.playButton.x-this.playButton.displayWidth, this.playButton.y, 'gray')
        //     .setDisplaySize(150, 60).setAlpha(alpha)
        //
        // this.add.text(this.shopButton.x, this.shopButton.y, 'МАГАЗИН')
        //     .setOrigin(0.5)
        //
        // // Leader button
        // this.leaderButton = this.add.image(this.playButton.x + this.playButton.displayWidth, this.playButton.y, 'gray')
        //     .setDisplaySize(150, 60).setAlpha(alpha)
        //
        // this.add.text(this.leaderButton.x, this.leaderButton.y, 'ЛИДЕРЫ')
        //     .setOrigin(0.5)
        //
        // // Logout-icon
        // this.logoutButton = this.add.image(28, 30, 'logout')
        //     .setDisplaySize(55, 55)
        //
        //
        //
        // // Upgrade icons
        // // Engine
        // this.engineUpgrade = this.add.image(this.car.x-200, this.car.y + this.car.displayHeight, 'engine')
        //     .setDisplaySize(90, 90)
        // this.progressBarEngine = this.add.image(this.engineUpgrade.x, this.engineUpgrade.y + this.engineUpgrade.displayHeight-10, 'progress-bar', 0)
        //     .setScale(0.7)
        //
        // // Wheel
        // this.wheelUpgrade = this.add.image(this.car.x, this.car.y + this.car.displayHeight, 'wheel-i')
        //     .setDisplaySize(90, 90)
        // this.progressBarWheel = this.add.image(this.wheelUpgrade.x, this.wheelUpgrade.y + this.wheelUpgrade.displayHeight-10, 'progress-bar', 0)
        //     .setScale(0.7)
        //
        // // Suspension
        // this.suspensionUpgrade = this.add.image(this.car.x + 200, this.car.y + this.car.displayHeight, 'suspension')
        //     .setDisplaySize(90, 90)
        // this.progressBarSuspension = this.add.image(this.suspensionUpgrade.x, this.suspensionUpgrade.y + this.suspensionUpgrade.displayHeight-10, 'progress-bar', 0)
        //     .setScale(0.7)
        //
        // this.buttons.push(this.logoutButton)
        // this.buttons.push(this.shopButton)
        // this.buttons.push(this.playButton)
        // this.buttons.push(this.leaderButton)
        // this.buttons.push(this.progressBarEngine)
        // this.buttons.push(this.progressBarWheel)
        // this.buttons.push(this.progressBarSuspension)
        //
        //
        // this.buttonSelector = this.add.image(0, 0, 'wheel').setScale(0.4)
        //
        // this.selectButton(this.buttons.length-5)
        //
        // this.playButton.on('selected', () => {
        //     this.buttons = []
        //     this.scene.start('game')
        // })
        //
        // this.shopButton.on('selected', () => {
        //     console.log('settings')
        // })
        //
        // this.leaderButton.on('selected', () => {
        //     console.log('credits')
        // })
        //
        // this.logoutButton.on('selected', () => {
        //     this.buttons = []
        //     this.scene.start('start-page')
        // })
        //
        // this.progressBarEngine.on('selected', () => {
        //     // @ts-ignore
        //     if (this.progressBarEngine.frame.name < 4) {
        //         this.progressBarEngine.setFrame(this.progressBarEngine.frame.name+1)
        //     }
        // })
        //
        // this.progressBarWheel.on('selected', () => {
        //     // @ts-ignore
        //     if (this.progressBarWheel.frame.name < 4) {
        //         this.progressBarWheel.setFrame(this.progressBarWheel.frame.name + 1)
        //     }
        // })
        //
        // this.progressBarSuspension.on('selected', () => {
        //     // @ts-ignore
        //     if (this.progressBarSuspension.frame.name < 4) {
        //         this.progressBarSuspension.setFrame(this.progressBarSuspension.frame.name + 1)
        //     }
        // })
        //
        // this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        //     this.playButton.off('selected')
        // })
        //
        // this.playButton.setInteractive()
        // this.shopButton.setInteractive()
        // this.leaderButton.setInteractive()
        // this.progressBarEngine.setInteractive()
        // this.progressBarWheel.setInteractive()
        // this.progressBarSuspension.setInteractive()
        // this.logoutButton.setInteractive()
        //
        //
        // this.logoutButton.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-7)
        // })
        // this.shopButton.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-6)
        // })
        // this.playButton.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-5)
        // })
        // this.leaderButton.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-4)
        // })
        // this.progressBarEngine.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-3)
        // })
        // this.progressBarWheel.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-2)
        // })
        // this.progressBarSuspension.on("pointerover", () => {
        //     this.selectButton(this.buttons.length-1)
        // })
        //
        // // pointerdown
        // this.shopButton.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
        // this.playButton.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
        // this.leaderButton.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
        // this.progressBarEngine.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
        // this.progressBarWheel.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
        // this.progressBarSuspension.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
        // this.logoutButton.on("pointerdown", () => {
        //     this.confirmSelection()
        // })
    }

    selectButton(index: number) {
        const currentButton = this.buttons[this.selectedButtonIndex]

        // set the current selected button to a white tint
        currentButton.setTint(0xffffff)
        // currentButton.displayHeight /= 1.1
        // currentButton.displayWidth /= 1.1

        const button = this.buttons[index]

        // set the newly selected button to a green tint
        if (index < 4) {
            button.setTint(0x66ff7f)
        }
        // button.displayHeight *= 1.1
        // button.displayWidth *= 1.1

        // move the hand cursor to the right edge
        this.buttonSelector.x = (button.x + button.displayWidth * 0.5)
        this.buttonSelector.y = button.y + 10

        // store the new selected index
        this.selectedButtonIndex = index
    }

    selectNextButton(change = 1) {
        let index = this.selectedButtonIndex + change

        // wrap the index to the front or end of array
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
        // get the currently selected button
        const button = this.buttons[this.selectedButtonIndex]

        // emit the 'selected' event
        button.emit('selected')
    }

    update() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
        const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right!)
        const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left!)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)


        if (rightJustPressed) {
            this.selectNextButton(1)
        } else if (leftJustPressed) {
            this.selectNextButton(-1)
        } else if (spaceJustPressed) {
            this.confirmSelection()
        } else if (upJustPressed) {
            if (this.selectedButtonIndex > this.buttons.length-4) {
                this.selectNextButton(-3)
            }
        } else if (downJustPressed) {
            if (this.selectedButtonIndex < this.buttons.length-3 && this.selectedButtonIndex != this.buttons.length-7) {
                this.selectNextButton(3)
            }
        }
    }
}