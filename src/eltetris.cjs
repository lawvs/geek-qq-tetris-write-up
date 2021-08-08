// rewire no work at ES module
// See https://github.com/jhnns/rewire#limitations
// import "../node_modules/eltetris/src/features.js";
// import rewire from "rewire";

const rewire = require("rewire");

const JUST_FOR_DEV_REFER_PIECES = require("../node_modules/eltetris/src/pieces.js");
const piecesModule = rewire("../node_modules/eltetris/src/pieces.js");

const JUST_FOR_DEV_REFER_FEATURES = require("../node_modules/eltetris/src/features.js");
const featuresModule = rewire("../node_modules/eltetris/src/features.js");

const featuresExportArray = [
  "GetLandingHeight",
  "GetRowTransitions",
  "GetColumnTransitions",
  "GetNumberOfHoles",
  "GetWellSums",
];

const features = Object.fromEntries(
  featuresExportArray.map((funName) => [
    funName,
    featuresModule.__get__(funName),
  ])
);

const JUST_FOR_DEV_REFER_ELTETRIS = require("../node_modules/eltetris/src/eltetris.js");
const eltetrisModule = rewire("../node_modules/eltetris/src/eltetris.js");
// inject deps
eltetrisModule.__set__(features);

module.exports = {
  pieces: {
    PIECES: piecesModule.__get__("PIECES"),
    parse: piecesModule.__get__("parse"),
  },
  features,

  eltetris: { ElTetris: eltetrisModule.__get__("ElTetris") },
};
