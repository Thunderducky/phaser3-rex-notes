import Clone from 'rexPlugins/utils/object/Clone.js';

var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    if (!this.input) {
        this.input = {
            enable: true,
            preTileX: undefined,
            preTileY: undefined
        };
        this.scene.input.on('pointerdown', onPointerDown, this);
        this.scene.input.on('pointerup', onPointerUp, this);
        this.scene.input.on('pointermove', onPointerMove, this);

        this.on('destroy', function () {
            this.scene.input.off('pointerdown', onPointerDown, this);
            this.scene.input.off('pointerup', onPointerUp, this);
            this.scene.input.off('pointermove', onPointerMove, this);
        }, this);
    }

    this.input.enable = enable;
    return this;
};

var onPointerDown = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    var tileX = this.worldXYToTileX(pointer.x, pointer.y),
        tileY = this.worldXYToTileY(pointer.x, pointer.y);
    if (!this.contains(tileX, tileY)) {
        return;
    }
    tmpTileXY.x = tileX;
    tmpTileXY.y = tileY;
    this.emit('tiledown', pointer, tmpTileXY);

    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    if (gameObjects.length === 0) {
        return;
    }
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        this.emit('gameobjectdown', pointer, gameObject);
        if (gameObject.emit) {
            gameObject.emit('board.pointerdown', pointer);
        }
    }

    var inputData = this.input;
    inputData.preTileX = tileX;
    inputData.preTileY = tileY;
};

var onPointerUp = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    var tileX = this.worldXYToTileX(pointer.x, pointer.y),
        tileY = this.worldXYToTileY(pointer.x, pointer.y);
    if (!this.contains(tileX, tileY)) {
        return;
    }
    tmpTileXY.x = tileX;
    tmpTileXY.y = tileY;
    this.emit('tileup', pointer, tmpTileXY);

    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    if (gameObjects.length === 0) {
        return;
    }
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        this.emit('gameobjectup', pointer, gameObject);
        if (gameObject.emit) {
            gameObject.emit('board.pointerup', pointer);
        }
    }
};

var onPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    var tileX = this.worldXYToTileX(pointer.x, pointer.y),
        tileY = this.worldXYToTileY(pointer.x, pointer.y);
    if (!this.contains(tileX, tileY)) {
        return;
    }

    var inputData = this.input;
    if ((inputData.preTileX === tileX) && (inputData.preTileY === tileY)) {
        return;
    }
    tmpTileXY.x = tileX;
    tmpTileXY.y = tileY;
    this.emit('tilemove', pointer, tmpTileXY);

    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    if (gameObjects.length === 0) {
        return;
    }
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        this.emit('gameobjectmove', pointer, gameObject);
        if (gameObject.emit) {
            gameObject.emit('board.pointermove', pointer);
        }
    }

    var inputData = this.input;
    inputData.preTileX = tileX;
    inputData.preTileY = tileY;
};

var tmpTileXY = {
    x: 0,
    y: 0
};
var tmpChessArray = [];

export default SetInteractive;