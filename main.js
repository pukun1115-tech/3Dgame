const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keys = {};//キーの状態
document.addEventListener("keydown", e => keys[e.key] = true);//キーが押された時
document.addEventListener("keyup", e => keys[e.key] = false);//キーが押されてない時

const triangles = [{ verts: [{ x: 0, y: 0, z: 4 }, { x: 4, y: 0, z: 8 }, { x: 4, y: 0, z: 4 }], color: "#00ff00" }];
let chunks = [];

const chunkX = 16, chunkZ = 16, chunkY = 32;

//プレイヤーの目
const camera = {
    pos: { x: 0, y: 5, z: 0 },
    //y:90で右を向く
    //x:90で下を向く
    //z:90でカメラが反時計回り
    rot: { x: 0, y: 0, z: 0 },
    FOV: 120,
    near: 0.05,
};

chunks.push(new chunk(0, 0));
//chunks.push(new chunk(1, 0));
//chunks.push(new chunk(0, 1));
//chunks.push(new chunk(1, 1));

//キャンバスの大きさ変更
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//度数法からラジアンに変換
function degToRad(d) {
    return d * Math.PI / 180;
}

//メインループ
function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize();

    //いまはループの中にないと困る
    for (const c of chunks) {
        c.generateTriangles();
    };

    playerMove();
    chunkDraw();

    requestAnimationFrame(mainLoop);
}

mainLoop();