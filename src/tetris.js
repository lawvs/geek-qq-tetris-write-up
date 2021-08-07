import { tetrisGlobal, mockCanvas } from "./mock";
import "../tetris/tetris.config";
import "../tetris/tetris.core";
import "../tetris/tetris.game";

export const Game = tetrisGlobal.Game;
export const Tetris = tetrisGlobal.Tetris;
export const config = tetrisGlobal.config;

export const initGame = () => {
  const game = new Game(mockCanvas, {});
  const tetris = game.tetris;
  return { game, tetris };
};
