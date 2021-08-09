import eltetris from "./eltetris.cjs";
import { getCount } from "./utils";

export const pieces = eltetris.pieces;
export const features = eltetris.features;
export const ElTetris = eltetris.eltetris.ElTetris;

const clamp = (min = -Infinity, max = Infinity) =>
  getCount() > min && getCount() < max;

ElTetris.prototype.pickMove = function (piece) {
  // Fallback
  const worst = {
    evaluation: -100000,
    orientation: piece[0].orientation,
    column: 0,
    removed: 0,
    landing_height: Infinity,
  };
  let candidates = [worst];
  let maxLandingHeight = -Infinity;
  // Evaluate all possible orientations
  for (var i in piece) {
    var orientation = piece[i].orientation;

    // Evaluate all possible columns
    for (var j = 0; j < this.number_of_columns - piece[i].width + 1; j++) {
      // Copy current board
      var board = this.board.slice();
      var last_move = this.playMove(board, orientation, j);

      if (!last_move.game_over) {
        const evaluation = this.evaluateBoard(last_move, board);

        maxLandingHeight = Math.max(maxLandingHeight, last_move.landing_height);

        candidates.push({
          evaluation,
          orientation: piece[i].orientation,
          column: j,
          removed: last_move.rows_removed,
          landing_height: last_move.landing_height,
        });
      }
    }
  }

  candidates.sort((a, b) => b.evaluation - a.evaluation);
  if (
    maxLandingHeight >= 11 ||
    clamp(450, 550) ||
    clamp(850, 1100) ||
    clamp(2800, 2950) ||
    clamp(3400, 3500) ||
    clamp(5150, 5250) ||
    clamp(5450, 5550) ||
    clamp(5800, 6000) ||
    clamp(6400, 6560) ||
    clamp(7000, 7150) ||
    clamp(7300, 7400) ||
    clamp(8100, 8200) ||
    clamp(8500, 8600) ||
    clamp(9600, 9700)
  ) {
    // Use default strategy
    return candidates[0];
  }
  // Prioritize operations without block removed
  return candidates.slice(0, 5).find((i) => !i.removed);

  // return {
  //   orientation: piece[best_orientation].orientation,
  //   column: best_column,
  // };
};
