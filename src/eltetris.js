import eltetris from "./eltetris.cjs";
import { getCount } from "./utils";

export const pieces = eltetris.pieces;
export const features = eltetris.features;
export const ElTetris = eltetris.eltetris.ElTetris;

let LandingHeightFactor = -4.500158825082766;

ElTetris.prototype.evaluateBoard = function (last_move, board, count) {
  if (last_move.landing_height < 10) {
    LandingHeightFactor = -4;
  }
  if (getCount() > 5000) {
    LandingHeightFactor = -5;
  }
  if (getCount() > 7000) {
    LandingHeightFactor = -7;
  }
  if (getCount() > 9000) {
    LandingHeightFactor = -9;

    if (last_move.landing_height < 5) {
      LandingHeightFactor = -7;
    }
  }
  return (
    GetLandingHeight(last_move, board) * LandingHeightFactor +
    last_move.rows_removed * 3.4181268101392694 +
    GetRowTransitions(board, this.number_of_columns) * -3.2178882868487753 +
    GetColumnTransitions(board, this.number_of_columns) * -9.348695305445199 +
    GetNumberOfHoles(board, this.number_of_columns) * -7.899265427351652 +
    GetWellSums(board, this.number_of_columns) * -3.3855972247263626
  );
};
