function playerMove() {
    const sinY = Math.sin(degToRad(camera.rot.y));
    const cosY = Math.cos(degToRad(camera.rot.y));

    let nextX = null;
    let nextZ = null;
    let nextY = null;

    //プレイヤーのチャンク座標
    player.pos.chunkX = Math.floor(player.pos.x / data.chunk.x);
    player.pos.chunkZ = Math.floor(player.pos.z / data.chunk.z);


    //プレイヤーが空中にいるか
    function atari(px, py, pz) {
        const p_maxX = px + 0.3;
        const p_minX = px - 0.3;
        const p_maxZ = pz + 0.3;
        const p_minZ = pz - 0.3;
        const p_maxY = py + 1.8;
        const p_minY = py;
        for (const c of chunks) {
            const chunkX = Math.floor(px / data.chunk.x);
            const chunkZ = Math.floor(pz / data.chunk.x);

            if (c.x != chunkX || c.z != chunkZ) continue;

            for (let x = 0; x < data.chunk.x; x++) {
                for (let z = 0; z < data.chunk.z; z++) {
                    for (let y = 0; y < data.chunk.y; y++) {
                        if (c.map[x][y][z] === 0) continue;

                        const b_maxX = c.x * data.chunk.x + x + 1;
                        const b_minX = c.x * data.chunk.x + x;
                        const b_maxZ = c.z * data.chunk.z + z + 1;
                        const b_minZ = c.z * data.chunk.z + z;
                        const b_maxY = y + 1;
                        const b_minY = y;

                        const hitX = p_maxX > b_minX && p_minX < b_maxX;//x方向で重なっているか
                        const hitY = p_maxY > b_minY && p_minY < b_maxY;//y
                        const hitZ = p_maxZ > b_minZ && p_minZ < b_maxZ;//z

                        if (hitX && hitY && hitZ) {
                            //3Dで重なっている
                            return true;
                        }
                    }
                }
            }
        }
        return false;//全チャンクを調べる
    }

    //位置が動く
    const moveSpeed = player.moveSpeed;
    if (keys["KeyW"]) {
        //x移動
        nextX = player.pos.x + sinY * moveSpeed;
        nextZ = player.pos.z;
        nextY = player.pos.y;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.x = nextX;
        }
        //z移動
        nextX = player.pos.x;
        nextZ = player.pos.z + cosY * moveSpeed;
        nextY = player.pos.y;
        if (!atari(nextX, nextY, nextZ)) {
            player.pos.z = nextZ;
        }
    }
    if (keys["KeyS"]) {
        //x移動
        nextX = player.pos.x - sinY * moveSpeed;
        nextZ = player.pos.z;
        nextY = player.pos.y;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.x = nextX;
        }
        //z
        nextX = player.pos.x;
        nextZ = player.pos.z - cosY * moveSpeed;
        nextY = player.pos.y;
        if (!atari(nextX, nextY, nextZ)) {
            player.pos.z = nextZ;
        }
    }
    if (keys["KeyA"]) {
        //x
        nextX = player.pos.x - cosY * moveSpeed;
        nextZ = player.pos.z;
        nextY = player.pos.y;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.x = nextX;
        }
        //z
        nextX = player.pos.x;
        nextZ = player.pos.z + sinY * moveSpeed;
        nextY = player.pos.y;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.z = nextZ;
        }
    }
    if (keys["KeyD"]) {
        //x
        nextX = player.pos.x + cosY * moveSpeed;
        nextZ = player.pos.z;
        nextY = player.pos.y;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.x = nextX;
        }
        //z
        nextX = player.pos.x;
        nextZ = player.pos.z - sinY * moveSpeed;
        nextY = player.pos.y;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.z = nextZ;
        }
    }

    /*
    if (keys["keyQ"]) {
        player.pos.y += moveSpeed;
    }
    if (keys["keyE"]) {
        player.pos.y -= moveSpeed;
    }
    */

    //重力
    if (data.gravity < 0) {
        if (atari(player.pos.x, player.pos.y + player.velocityY, player.pos.z)) {
            //ジャンプ
            if (keys["Space"]) {
                player.velocityY = player.jumpSpeed;
            }
        }
        else {
            player.velocityY += data.gravity;
        }
        nextX = player.pos.x;
        nextZ = player.pos.z;
        nextY = player.pos.y + player.velocityY;

        if (!atari(nextX, nextY, nextZ)) {
            player.pos.y = nextY;
        }
    }
    //カメラの向き
    if (keys["ArrowLeft"]) {
        camera.rot.y -= 1;
    }
    if (keys["ArrowRight"]) {
        camera.rot.y += 1;
    }
    if (keys["ArrowUp"]) {
        camera.rot.x -= 1;
    }
    if (keys["ArrowDown"]) {
        camera.rot.x += 1;
    }

    //FOV
    if (keys["n"]) {
        camera.FOV++;
    }
    if (keys["m"]) {
        camera.FOV--;
    }

    //カメラの向き,FOV制限
    if (camera.rot.x > 90) {
        camera.rot.x = 90;
    }
    if (camera.rot.x < -90) {
        camera.rot.x = -90;
    }

    if (camera.FOV < 30) {
        camera.FOV = 30;
    }
    if (camera.FOV > 150) {
        camera.FOV = 150;
    }

    camera.pos = { x: player.pos.x, y: player.pos.y + 1.6, z: player.pos.z };
}