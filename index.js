var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);
var gravity = 0.7;
var Sprite = /** @class */ (function () {
    function Sprite(position, velocity, height) {
        this.postion = position;
        this.velocity = velocity;
        this.height = height;
    }
    Sprite.prototype.draw = function () {
        c.fillStyle = 'red';
        c.fillRect(this.postion.x, this.postion.y, 150, this.height);
    };
    Sprite.prototype.update = function () {
        this.draw();
        this.postion.x += this.velocity.x;
        this.postion.y += this.velocity.y;
        if (this.postion.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else
            this.velocity.y += gravity;
    };
    return Sprite;
}());
var player = new Sprite({ x: 0, y: 0 }, { x: 0, y: 10 }, 50);
var keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
};
var lastKey;
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.velocity.x = 0;
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5;
    }
}
animate();
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'w':
            keys.w.pressed = true;
            player.velocity.y = -20;
            break;
    }
});
window.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
    }
    console.log(event.key);
});
