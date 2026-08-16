function move() {
    const sinY = Math.sin(camera.rot.y);
    const cosY = Math.cos(camera.rot.y);

    if (keys["w"]) {
        camera.pos.x += sinY * camera.speed;
        camera.pos.z += cosY * camera.speed;
    }
    if (keys["s"]) {
        camera.pos.x -= sinY * camera.speed;
        camera.pos.z -= cosY * camera.speed;
    }
    if (keys["a"]) {
        camera.pos.x -= cosY * camera.speed;
        camera.pos.z += sinY * camera.speed;
    }
    if (keys["d"]) {
        camera.pos.x += cosY * camera.speed;
        camera.pos.z -= sinY * camera.speed;
    }
}