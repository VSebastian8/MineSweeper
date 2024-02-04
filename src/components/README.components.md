# MineSweeper

> React + Typescript mini project

---

[![Main](https://img.shields.io/badge/main-Page-818cf8.svg)](https://github.com/VSebastian8/MineSweeper/blob/main/README.md)

**Components**

- `App`

  > Responible for the general layout, shows how many tiles have been revealed, increments the timer every second and stops it when the game ends, contains the logic for the two buttons and holds the board component. Uses components from material-ui.

- `Board`

  > Renders the grid of squares and contains most of the game logic. Generates the random board, hides all tiles on first iteration, handles click events (reveals clicked tiles and, if the tile value is zero, reveals all of its neighbours), plays appropriate sound effects, runs game-end animations and starts the game again (retry/restart).

- `Square`
  > Shows each tile, checks if it's hidden or revealed and handles the right click lock. Display's each number in a different color and checks if the bomb was exploded or just shown at the end of the game.
