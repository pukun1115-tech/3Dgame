function draw() {
    //焦点距離を求める
    const f = 1 / Math.tan(((camera.FOV * (Math.PI / 180)) / 2));//カメラとスクリーンの距離
}

//ワールド座標をカメラの座標に変換
function worldToCamera(v) {
    //ラジアン?
    const rotX = camera.rot.x * Math.PI / 180;
    const rotY = camera.rot.y * Math.PI / 180;
    const rotZ = camera.rot.z * Math.PI / 180;

    //カメラと反対向きに回すからマイナス
    const cosY = Math.cos(-rotY);
    const sinY = Math.sin(-rotY);
    const cosX = Math.cos(-rotX);
    const sinX = Math.sin(-rotX);
    const cosZ = Math.cos(-rotZ);
    const sinZ = Math.sin(-rotZ);

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
        z: v1.x * sinY + v1.z * cosY
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