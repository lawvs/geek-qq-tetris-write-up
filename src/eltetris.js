import eltetris from "./eltetris.cjs";
import { getCount } from "./utils";

export const pieces = eltetris.pieces;
export const features = eltetris.features;
export const ElTetris = eltetris.eltetris.ElTetris;

const clamp = (min = -Infinity, max = Infinity) =>
  getCount() > min && getCount() < max;

let LandingHeightFactor = -4.500158825082766;
let RowsRemovedFactor = 3.4181268101392694;

ElTetris.prototype.evaluateBoard = function (last_move, board) {
  const count = getCount();

  return (
    GetLandingHeight(last_move, board) * LandingHeightFactor +
    last_move.rows_removed * RowsRemovedFactor +
    GetRowTransitions(board, this.number_of_columns) * -3.2178882868487753 +
    GetColumnTransitions(board, this.number_of_columns) * -9.348695305445199 +
    GetNumberOfHoles(board, this.number_of_columns) * -7.899265427351652 +
    GetWellSums(board, this.number_of_columns) * -3.3855972247263626
  );
};

ElTetris.prototype.pickMove = function (piece) {
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
    maxLandingHeight >= 10 ||
    clamp(400, 500) ||
    clamp(1100, 1200) ||
    clamp(3700, 4000) ||
    clamp(4800, 5200) ||
    clamp(5900, 6000)
  ) {
    return candidates[0];
  }
  const target = candidates.slice(0, 5).find((i) => !i.removed);
  return target || candidates[0];

  // return {
  //   orientation: piece[best_orientation].orientation,
  //   column: best_column,
  // };
};
