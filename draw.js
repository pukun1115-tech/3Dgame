/*                                                                                                */
function draw() {
    projectPoint(worldToCamera({ x: 3, y: 0, z: 6 }));
}

//ワールド座標をカメラの座標に変換
function worldToCamera(v) {
    //ラジアン
    const rotX = degToRad(-camera.rot.x);
    const rotY = degToRad(-camera.rot.y);
    const rotZ = degToRad(-camera.rot.z);

    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

    //カメラが原点(カメラの座標を引く)
    const v1 = {
        x: v.x - camera.pos.x,
        y: v.y - camera.pos.y,
        z: v.z - camera.pos.z
    };

    //y軸回転
    const v2 = {
        x: v1.x * cosY + v1.z * sinY,
        y: v1.y,
        z: -v1.x * sinY + v1.z * cosY
    };

    //x軸回転
    const v3 = {
        x: v2.x,
        y: v2.y * cosX - v2.z * sinX,
        z: v2.y * sinX + v2.z * cosX
    };

    //z軸回転
    const v4 = {
        x: v3.x * cosZ - v3.y * sinZ,
        y: v3.x * sinZ + v3.y * cosZ,
        z: v3.z
    };

    //変換後
    return v4;
}

//投影処理(点)
function projectPoint(v) {
    //ラジアンFOV
    const FOV = degToRad(camera.FOV)
    //焦点距離を求める
    const f = 1 / Math.tan((FOV / 2));//カメラとスクリーンの距離

    if (v.z <= f) return;

    const x = (v.x * f) / v.z;
    const y = (v.y * f) / v.z;
    return { x: (canvas.width / 2) + (canvas.width * x), y: (canvas.height / 2) + (canvas.height * y) };
}
