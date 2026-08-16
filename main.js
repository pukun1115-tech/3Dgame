const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keys = {};//キーの状態
document.addEventListener("keydown", e => keys[e.key] = true);//キーが押された時
document.addEventListener("keyup", e => keys[e.key] = false);//キーが押されてない時

const camera = {
    pos: { x: 0, y: 0, z: 0 },
    rot: { x: 0, y: 0, z: 0 },
    FOV: 60,
    speed: 0.01
};

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize();

    move();
    draw();

    requestAnimationFrame(mainLoop);
}
resize();
mainLoop();