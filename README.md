# Robot Movement

Just a simulation of a toy robot moving on a square tabletop.

## Usage

```Javascript
git clone https://github.com/yamart/robot-movement.git
cd robot-movement
npm install
```

use `robot.js` in your own project, or you can see how it works by trying the demo version, in `public/index.html`

## Available Commands

- `PLACE`: put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- `MOVE`: move the toy robot one unit forward in the direction it is currently facing, or backward by passing `false` to the function.
- `LEFT`: rotate the robot 90 degrees in the left without changing the position of the robot.
- `RIGHT`: rotate the robot 90 degrees in the right without changing the position of the robot.
- `REPORT`: Return the robot's current position
- `CHECK`: Check if movement to X,Y is allowed
