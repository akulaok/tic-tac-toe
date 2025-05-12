import {WINNING_LINES} from "../consts";
import {SquareValue, WinningLine} from "../types";

export function calculateWinner(squares: SquareValue[]): WinningLine {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
