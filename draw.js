function draw() {
    const f = 1 / Math.tan(((camera.FOV * (Math.PI / 180)) / 2));//カメラとスクリーンの距離
}

function worldToCamera(v)//ワールド座標をカメラの座標に変換
{
    const cosY = Math.cos(-camera.rot.y);
    const sinY = Math.sin(-camera.rot.y);
    const cosX = Math.cos(-camera.rot.x);
    const sinX = Math.sin(-camera.rot.x);
    const cosZ = Math.cos(-camera.rot.z);
    const sinZ = Math.sin(-camera.rot.z);

    //カメラが原点
    const v1 = {
        x: v.x - camera.pos.x,
        y: v.y - camera.pos.y,
        z: v.z - camera.pos.z
    };

    //y
    let x1 = v1.x * cosY + v1.z * sinY;
    let z1 = -v1.x * sinY + v1.z * cosY;

    //x
    let y2 = v1.y * cosX - z1 * sinX;
    let z2 = v1.y * sinX + z1 * cosX;

    //z
    let x3 = x1 * cosZ - y2 * sinZ;
    let y3 = x1 * sinZ + y2 * cosZ;

    return { x: x3, y: y3, z: z2 };
}