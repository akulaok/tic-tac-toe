import { WINNING_LINES } from "../consts";
import { SquareValue, Winner } from "../types";

  export function calculateWinner(squares: SquareValue[]): Winner {
    for (const [a, b, c] of WINNING_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Winner;
      }
    }
    return squares.includes(null) ? null : "draw";
  }
