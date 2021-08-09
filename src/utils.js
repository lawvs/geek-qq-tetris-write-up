import readline from "readline";
import fs from "fs";
import path from "path";

// 0,1,2,3,4,5,6
// I,L,J,T,O,S,Z
// ->
// I,T,O,J,L,S,Z
export const mapShapeToPiece = [0, 4, 3, 1, 2, 5, 6];

//  -> x
// ⬇️
// y
export const mapPieceToShape = [
  [0, 1], // I
  [1, 0, 3, 2], // L
  [1, 0, 3, 2], // J

  [3, 2, 1, 0], // T
  [0], // O
  [1, 0], // S
  [1, 0], // Z
];

export const boardToGrid = (board) => {
  const grids = [];
  for (var row = 0; row < board.length; row++) {
    const rowArr = [];
    let rowValue = board[row];
    for (var i = 0; rowValue !== 0; i++) {
      if (rowValue & 1) {
        rowArr.push(1);
      } else rowArr.push(0);
      rowValue = rowValue >> 1;
    }
    grids.push(rowArr);
  }
  return getSnapshot(grids.reverse());
};

const getSnapshot = (grids) => {
  let gridsStr =
    "     0  1  2  3  4  5  6  7  8  9 \n     ----------------------------\n";

  grids.forEach((row, rowIndex) => {
    let head = `${rowIndex}`;

    head = head.padStart(2, 0);
    gridsStr += `${head} |`;

    row.forEach((grid, colIndex) => {
      gridsStr += grid ? " # " : " . ";
    });

    gridsStr += "\n";
  });

  return gridsStr;
};

export function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

let count = 0;
export const setCount = (n) => {
  count = n;
  return count;
};

export const getCount = () => {
  return count;
};

/**
 * Save score and record to file
 */
export const saveScore = (opRecord, score) => {
  const OUTPUT_PATH = path.resolve("build");
  const SCORE_FILE = path.resolve(OUTPUT_PATH, "score.txt");
  const OPERATE_FILE = path.resolve(OUTPUT_PATH, "operate.txt");
  const UPLOAD_SCRIPT_FILE = path.resolve(OUTPUT_PATH, "upload.js");

  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }

  const maxScore = fs.existsSync(SCORE_FILE)
    ? +fs.readFileSync(SCORE_FILE).toString()
    : 0;

  if (score <= maxScore) {
    return false;
  }
  fs.writeFileSync(SCORE_FILE, String(score));
  fs.writeFileSync(OPERATE_FILE, opRecord.join(","));

  const uploadScript = `record = '${opRecord.join(",")}'
await axios.post('api/upload', {
  record,
  score: ${score},
});
game.playRecord(record.split(','));
game.replayFreq = 0;
`;
  fs.writeFileSync(UPLOAD_SCRIPT_FILE, uploadScript);
  return true;
};
