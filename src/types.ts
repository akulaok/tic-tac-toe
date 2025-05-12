import {WINNING_LINES} from "./consts";

export type SquareValue = "O" | "X" | null;
export type Winner = "X" | "O" | "draw" | null;
export type WinningLine = (typeof WINNING_LINES)[number] | null;

export interface GameContextType {
  board: SquareValue[];
  isComputerThinking: boolean;
  handleMove: (index: number) => void;
  winningLine: WinningLine;
}
