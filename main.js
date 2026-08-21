const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keys = {};//キーの状態
document.addEventListener("keydown", e => keys[e.code] = true);//キーが押された時
document.addEventListener("keyup", e => keys[e.code] = false);//キーが押されてない時

let chunks = [];

const data = {
    chunk: { x: 16, y: 32, z: 16 },
    gravity: -0.005,
};

//プレイヤー
//幅0.6,高さ1.8,厚さ0.6
//目の高さは1.6
//player.pos.xは真ん中yは下端zは真ん中
const player = {
    pos: { x: 5, y: 10, z: 5, chunkX: null, chunkZ: null },
    moveSpeed: 0.1,
    jumpSpeed: 0.1,
    velocityY: 0,
};

const camera = {
    pos: { x: player.pos.x, y: player.pos.y + 1.6, z: player.pos.z + 0.3 },
    //y:90で右を向く
    //x:90で下を向く
    //z:90でカメラが反時計回り
    rot: { x: 45, y: 45, z: 0 },
    FOV: 90,
    near: 0.05,
};

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        chunks.push(new chunk(i, j));
    }
}

//キャンバスの大きさ変更
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//度数法からラジアンに変換
function degToRad(d) {
    return d * Math.PI / 180;
}

function sortChunks() {
    chunks.sort((a, b) => {
        //カメラからの距離(**は2乗)(三平方の定理)(a or b distance)
        const ad = (
            Math.abs((a.x * data.chunk.x + (data.chunk.x) / 2) - camera.pos.x) +
            Math.abs((a.z * data.chunk.z + (data.chunk.z) / 2) - camera.pos.z)
        );

        const bd = (
            Math.abs((b.x * data.chunk.x + (data.chunk.x) / 2) - camera.pos.x) +
            Math.abs((b.z * data.chunk.z + (data.chunk.z) / 2) - camera.pos.z)
        );

        return bd - ad;//bd > adの時正の値を返す => bdが前に来る
    });
}

//メインループ
function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize();

    //いまはループの中にないと困る
    for (const c of chunks) {
        c.generateTriangles();
    };

    sortChunks();

    playerMove();
    chunkDraw();

    requestAnimationFrame(mainLoop);
}

mainLoop();