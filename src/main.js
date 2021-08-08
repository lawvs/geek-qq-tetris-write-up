import fs from "fs";
import path from "path";
import { initGame, config } from "./tetris";
import { ElTetris, pieces } from "./eltetris";
import {
  mapPieceToShape,
  mapShapeToPiece,
  boardToGrid,
  askQuestion,
} from "./utils";

const playElTetris = (eltetris, piece, count) => {
  const move = eltetris.pickMove(piece);

  const last_move = eltetris.playMove(
    eltetris.board,
    move.orientation,
    move.column
  );

  if (!last_move.game_over) {
    eltetris.rows_completed += last_move.rows_removed;
  }

  return { move, last_move };
};

const getEltetrisPiece = (tetris) => {
  const { shapeIndex, stateIndex } = tetris.getShapeInfo(
    tetris.curRandomNum,
    tetris.brickCount
  );
  return pieces.PIECES[mapShapeToPiece[shapeIndex]];
  // return pieces.PIECES[Math.floor(Math.random() * pieces.PIECES.length)];
};

const syncOperate = (tetris, move) => {
  const { shapeIndex } = tetris.getShapeInfo(
    tetris.curRandomNum,
    tetris.brickCount
  );

  const pieceType = pieces.PIECES[mapShapeToPiece[shapeIndex]];
  let shapeOrientationIdx = null;
  for (let j = 0; j < pieceType.length; j++) {
    if (pieceType[j].orientation === move.orientation) {
      const pieceOrientationIdx = j;
      shapeOrientationIdx = mapPieceToShape[shapeIndex][pieceOrientationIdx];
      break;
    }
  }

  if (shapeOrientationIdx == null) {
    console.error(
      "shapeIndex",
      shapeIndex,
      "move",
      move,
      "pieceType",
      pieceType
    );
    throw new Error();
  }

  let lastIdx = -1;
  while (true) {
    if (lastIdx === tetris.stateIndex) {
      // rotate fail
      return { topTouched: true };
    }
    if (tetris.stateIndex === shapeOrientationIdx) {
      break;
    }
    lastIdx = tetris.stateIndex;
    tetris.rotate();
  }

  const shapeOrientation = config.shapes[shapeIndex][shapeOrientationIdx];
  const left = shapeOrientation.reduce(
    (min, [x, y]) => (x < min ? x : min),
    +Infinity
  );

  const stepCount = -4 - left + move.column;
  // tetris API can only move 1 step
  if (stepCount < 0) {
    tetris.move("left", 1);
    if (stepCount < -1) {
      tetris.move("left", -stepCount - 1);
    }
  } else if (stepCount > 0) {
    tetris.move("right", 1);
    if (stepCount > 1) {
      tetris.move("right", stepCount - 1);
    }
  }
  tetris.drop();
  return tetris.update();
};

const main = async () => {
  const { game, tetris } = initGame();
  const col = config.gridConfig.col;
  const row = config.gridConfig.row - 1;
  const eltetris = new ElTetris(col, row);

  tetris.setStatus("running"); // 设定 tetris 为 running 状态
  tetris.initGrids(); // 初始格子

  // while (tetris.brickCount < tetris.maxBrickCount) {
  while (tetris.brickCount < 10000) {
    tetris.initBrick(); // 初始方块

    const piece = getEltetrisPiece(tetris);
    const { move, last_move: lastMove } = playElTetris(
      eltetris,
      piece,
      tetris.brickCount
    );
    const { topTouched, isRoundLimited } = syncOperate(tetris, move);

    // 触顶或者超过游戏的最大方块数量后，结束游戏
    if (topTouched || isRoundLimited) {
      const { maxBrickCount, brickCount } = tetris;
      console.error(
        `方块是否触顶：${topTouched}（当前为第 ${brickCount} 个方块），方块数是否超过限制：${isRoundLimited}（最大方块数：${maxBrickCount}）`
      );
      break;
    }

    if (lastMove.game_over) {
      console.log("last game over", lastMove);
      break;
    }

    const DEBUG = false;
    // DEBUG
    if (DEBUG && tetris.brickCount > 113) {
      console.log("正在处理的方块", tetris.brickCount);
      console.log(boardToGrid(eltetris.board), move);
      const { gridsStr, brickStr } = tetris.getSnapshot();
      console.log(gridsStr);
      // const ans = await askQuestion("Pause");
    }
  }

  const { opRecord, score, brickCount } = tetris;
  // console.log(boardToGrid(eltetris.board));
  game.gameOver();

  const OUTPUT_PATH = path.resolve("build");
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }
  fs.writeFileSync(
    path.resolve(OUTPUT_PATH, "operate.txt"),
    opRecord.join(",")
  );
};

main();