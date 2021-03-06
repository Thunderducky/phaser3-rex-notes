## Introduction

Quad grid object of Board system.

- Author: Rex
- Grid object of board

## Source code

Included in [board plugin](board.md#source-code).

## Usage

See [board examples](board.md#usage).

### Install scene plugin

Included in board plugin.

### Create instance

```javascript
var grid = scene.rexBoard.add.quadGrid({
    x: 0,
    y: 0,
    cellWidth: 0,
    cellHeight: 0,
    type: 0,
    // dir: 4
});
```

- `x`, `y` : World position of tile (0, 0)
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `type`
    - `0`, or `orthogonal`
    - `1`, or `isometric`
    - `2`, or `staggered`
- `dir` :
    - `4` or `'4dir'` : Up/left/down/right
    - `8` or `'8dir'` : Up/left/down/right/up-left/up-right/down-left/dowm-right

### Set world position of tile (0, 0)

```javascript
grid.setOriginPosition(worldX, worldY);
```

### Set cell size

```javascript
grid.setCellSize(cellWidth, cellHeight);
```

### Set grid type

```javascript
grid.setType(type);
```

- `type`
    - `0`, or `orthogonal`
    - `1`, or `isometric`
    - `2`, or `staggered`

### Get world position

```javascript
var worldX = grid.getWorldX(tileX, tileY);
var worldY = grid.getWorldY(tileX, tileY);
```

### Get tile position

```javascript
var tileX = grid.getTileX(worldX, worldY);
var tileY = grid.getTileY(worldX, worldY);
```

### Directions

- `0` : Left
- `1` : Down
- `2` : Right
- `3` : Up
- `4` : Left-down
- `5` : Down-right
- `6` : Right-up
- `7` : Up-left