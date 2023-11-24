const canvas:any = document.querySelector('canvas')
const c:any = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

interface IPosition{
    x: number
    y: number
}

interface IDirection{
    x: number
    y: number
}

const gravity: number = 0.7
class Sprite {
    postion: IPosition
    velocity: IDirection
    height: number

    constructor(position: IPosition, velocity: IDirection, height: number) {
        this.postion = position
        this.velocity = velocity
        this.height = height
    }

    draw (): void {
        c.fillStyle = 'red'
        c.fillRect(this.postion.x, this.postion.y, 150, this.height)
    }

    update (): void {
        this.draw()

        this.postion.x += this.velocity.x
        this.postion.y += this.velocity.y

        if (this.postion.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

const player = new Sprite({x: 0, y: 0}, {x: 0, y: 10}, 50)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

let lastKey: string
function animate(): void {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    player.velocity.x = 0

    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            player.velocity.y = -20
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }

    console.log(event.key)
})