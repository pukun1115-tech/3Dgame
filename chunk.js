class chunk {
    constructor(x, z) {
        this.x = x;
        this.z = z;

        this.map = this.createMap(chunkX, chunkY, chunkZ);

        this.triangles = [];
    }

    createMap(sizeX, sizeY, sizeZ) {
        const map = new Array(sizeX);
        for (let x = 0; x < sizeX; x++) {
            map[x] = new Array(sizeY);
            for (let y = 0; y < sizeY; y++) {
                map[x][y] = new Array(sizeZ).fill(0);
            }
        }

        for (let x = 0; x < sizeX; x++) {
            for (let z = 0; z < sizeZ; z++) {
                const dirtHeight = Math.floor(Math.random() * 2) + 5;
                for (let y = 0; y < dirtHeight; y++) {
                    map[x][y][z] = 1; //土
                }
            }
        }

        return map;
    }

    generateTriangles() {
        this.triangles = [];

        for (let x = 0; x < chunkX; x++) {
            for (let y = 0; y < chunkY; y++) {
                for (let z = 0; z < chunkZ; z++) {
                    const block = this.map[x][y][z];
                    if (block === 0) continue;

                    const bx = this.x * chunkX + x;//blockX
                    const by = y;
                    const bz = this.z * chunkZ + z;

                    //8頂点
                    const v = [
                        { x: bx + 0, y: by + 0, z: bz + 0 },
                        { x: bx + 1, y: by + 0, z: bz + 0 },
                        { x: bx + 0, y: by + 1, z: bz + 0 },
                        { x: bx + 1, y: by + 1, z: bz + 0 },
                        { x: bx + 0, y: by + 0, z: bz + 1 },
                        { x: bx + 1, y: by + 0, z: bz + 1 },
                        { x: bx + 0, y: by + 1, z: bz + 1 },
                        { x: bx + 1, y: by + 1, z: bz + 1 },
                    ];

                    const color = "#ffffff";

                    // 前面
                    if (this.isAir(x, y, z - 1)/* && camera.pos.z < bz*/) {
                        this.triangles.push({ verts: [v[0], v[1], v[2]], color });
                        this.triangles.push({ verts: [v[1], v[3], v[2]], color });
                    }

                    // 背面
                    if (this.isAir(x, y, z + 1)/* && camera.pos.z > bz + 1*/) {
                        this.triangles.push({ verts: [v[4], v[6], v[5]], color });
                        this.triangles.push({ verts: [v[5], v[6], v[7]], color });
                    }

                    // 左
                    if (this.isAir(x - 1, y, z)/* && camera.pos.x < bx*/) {
                        this.triangles.push({ verts: [v[0], v[2], v[4]], color });
                        this.triangles.push({ verts: [v[2], v[6], v[4]], color });
                    }

                    // 右
                    if (this.isAir(x + 1, y, z)/* && camera.pos.x > bx + 1*/) {
                        this.triangles.push({ verts: [v[1], v[5], v[3]], color });
                        this.triangles.push({ verts: [v[3], v[5], v[7]], color });
                    }

                    //上
                    if (this.isAir(x, y + 1, z)/* && camera.pos.y > by + 1*/) {
                        this.triangles.push({ verts: [v[2], v[3], v[6]], color });
                        this.triangles.push({ verts: [v[3], v[7], v[6]], color });
                    }

                    //下
                    if (this.isAir(x, y - 1, z)/* && camera.pos.y < by*/) {
                        this.triangles.push({ verts: [v[0], v[4], v[1]], color });
                        this.triangles.push({ verts: [v[1], v[4], v[5]], color });
                    }
                }
            }
        }
    }

    isAir(x, y, z) {
        if (x < 0 || y < 0 || z < 0 || x >= chunkX || y >= chunkY || z >= chunkZ) {
            return true; // チャンク外は空気扱い
        }
        return (this.map[x][y][z] === 0);
    }
}