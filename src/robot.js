var board = [5,5],
    facing = {
        NORTH: 0, 
        EAST: 90, 
        SOUTH: 180, 
        WEST: 270
    },
    defaultPosition = {
        X: 0,
        Y: 0,
        F: facing.EAST
    },
    currentPosition;

/**
 * Place robot in X,Y position and towards F
 * @param {number} X
 * @param {number} Y
 * @param {string} F
 */
function PLACE(X,Y,F) {
    if(!CHECK(X,Y)) {
        throw new Error("Movement Not Allowed");
    }

    currentPosition = {
        X: X,
        Y: Y,
        F: F ? facing[F] : currentPosition.F
    }
}

/**
 * Move robot a step forward or backward
 * @param {boolean} reverse
 */
function MOVE(reverse = false) {
    var p = currentPosition,
        c = {
            X: p.X,
            Y: p.Y,
            F: p.F
        };

    switch(p.F) {
        case facing.NORTH:
            c.Y = reverse ? p.Y + 1 : p.Y - 1;
        break;
        case facing.EAST:
            c.X = reverse ? p.X - 1 : p.X + 1;
        break;        
        case facing.SOUTH:
            c.Y = reverse ? p.Y - 1 : p.Y + 1;
        break;        
        case facing.WEST:
            c.X = reverse ? p.X + 1 : p.X - 1;
        break;        
    }

    if(!CHECK(c.X,c.Y)) {
        throw new Error("Movement Not Allowed");
    }   
    
    currentPosition = c;
}

/**
 * Turn robot to the left
 */
function LEFT() {
    var F = currentPosition.F;
    currentPosition.F = F <= 0 ? 270 : F - 90;
}

/**
 * Turn robot to the right
 */
function RIGHT() {
    var F = currentPosition.F + 90;
    currentPosition.F = F >= 360 ? F - 360 : F;
}

/**
 * Return the robot's current position
 * @return {{}} currentPosition
 */
function REPORT() {
    var p = currentPosition,
        c = {
            X: p.X,
            Y: p.Y,
            F: Object.keys(facing).find(k => facing[k] === p.F)
        };

    return c;
}

/**
 * Check if movement is allowed
 * @param {number} X
 * @param {number} Y
 * @return {boolean} output
 */
function CHECK(X,Y) {
    return X >= 0 && X < board[0] && Y >= 0 && Y < board[1];
}

module.exports = {
    Robot: {
        PLACE,
        MOVE,
        LEFT,
        RIGHT,
        REPORT,
        board,
        facing
    }
};