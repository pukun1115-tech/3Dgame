function move() {
    const sinY = Math.sin(degToRad(camera.rot.y));
    const cosY = Math.cos(degToRad(camera.rot.y));

    //カメラの座標
    const moveSpeed = 0.1;
    if (keys["w"]) {
        camera.pos.x += sinY * moveSpeed;
        camera.pos.z += cosY * moveSpeed;
    }
    if (keys["s"]) {
        camera.pos.x -= sinY * moveSpeed;
        camera.pos.z -= cosY * moveSpeed;
    }
    if (keys["a"]) {
        camera.pos.x -= cosY * moveSpeed;
        camera.pos.z += sinY * moveSpeed;
    }
    if (keys["d"]) {
        camera.pos.x += cosY * moveSpeed;
        camera.pos.z -= sinY * moveSpeed;
    }
    if (keys["q"]) {
        camera.pos.y += moveSpeed;
    }
    if (keys["e"]) {
        camera.pos.y -= moveSpeed;
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
}