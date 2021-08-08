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

  if (last_move.landing_height < 10) {
    LandingHeightFactor = -4;
  }
  if (last_move.landing_height < 5) {
    LandingHeightFactor = -2;
  }
  if (clamp(3000, 3500)) {
    LandingHeightFactor = -6;
  }
  if (clamp(4900, 5000)) {
    LandingHeightFactor = -7;
  }
  if (clamp(6300, 6500)) {
    LandingHeightFactor = -7;
  }

  if (clamp(7500, 7600)) {
    LandingHeightFactor = -9;
  }

  if (clamp(9000, 9200)) {
    LandingHeightFactor = -7;
  }

  return (
    GetLandingHeight(last_move, board) * LandingHeightFactor +
    last_move.rows_removed * RowsRemovedFactor +
    GetRowTransitions(board, this.number_of_columns) * -3.2178882868487753 +
    GetColumnTransitions(board, this.number_of_columns) * -9.348695305445199 +
    GetNumberOfHoles(board, this.number_of_columns) * -7.899265427351652 +
    GetWellSums(board, this.number_of_columns) * -3.3855972247263626
  );
};
