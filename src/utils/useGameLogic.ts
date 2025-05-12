import {useEffect, useState} from "react";
import {SquareValue, WinningLine} from "../types";
import {COMPUTER_SYMBOL, PLAYER_SYMBOL, priorityIndices} from "../consts";
import {calculateWinner} from "../utils/calculateWinner";

export function useGameLogic() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  const getEmptyIndices = () =>
    board.reduce<number[]>((emptyIndices, square, index) => {
      if (square === null) {
        emptyIndices.push(index);
      }
      return emptyIndices;
    }, []);

  const makeMove = (index: number, symbol: SquareValue) => {
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);
    return newBoard;
  };

  const findWinningMove = (symbol: SquareValue): number | null => {
    const emptyIndices = getEmptyIndices();
    for (const index of emptyIndices) {
      const testBoard = [...board];
      testBoard[index] = symbol;
      const winnerLine = calculateWinner(testBoard);
      if (winnerLine && testBoard[winnerLine[0]] === symbol) {
        return index;
      }
    }
    return null;
  };

  const checkGameResult = (newBoard: SquareValue[]) => {
    const winnerLine = calculateWinner(newBoard);
    if (winnerLine) {
      setWinningLine(winnerLine);
      return true;
    }
    if (newBoard.every((cell) => cell !== null)) {
      setIsDraw(true);
      return true;
    }
    return false;
  };

  const handleMove = (index: number) => {
    if (winningLine || board[index] || isComputerThinking || isDraw) return;

    const newBoard = makeMove(index, PLAYER_SYMBOL);
    if (!checkGameResult(newBoard)) {
      setIsXNext(false);
    }
  };

  const makeComputerMove = () => {
    setIsComputerThinking(true);

    setTimeout(() => {
      const emptyIndices = getEmptyIndices();
      if (emptyIndices.length === 0) {
        setIsComputerThinking(false);
        return;
      }

      const winningMove = findWinningMove(COMPUTER_SYMBOL);
      if (winningMove !== null) {
        const newBoard = makeMove(winningMove, COMPUTER_SYMBOL);
        checkGameResult(newBoard);
        setIsComputerThinking(false);
        return;
      }
      const isBlock = Math.random() < 0.7;
      if (isBlock) {
        const blockingMove = findWinningMove(PLAYER_SYMBOL);
        if (blockingMove !== null) {
          const newBoard = makeMove(blockingMove, COMPUTER_SYMBOL);
          if (!checkGameResult(newBoard)) {
            setIsXNext(true);
          }
          setIsComputerThinking(false);
          return;
        }
      }

      const moveIndex = priorityIndices.find((index) => board[index] === null);
      if (moveIndex !== undefined) {
        const newBoard = makeMove(moveIndex, COMPUTER_SYMBOL);
        if (!checkGameResult(newBoard)) {
          setIsXNext(true);
        }
      }
      setIsComputerThinking(false);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setIsComputerThinking(false);
    setIsDraw(false);
  };

  useEffect(() => {
    if (winningLine || isDraw) {
      const resetTimeout = setTimeout(resetGame, 3000);
      return () => clearTimeout(resetTimeout);
    }

    if (!isXNext && !winningLine && !isComputerThinking && !isDraw) {
      makeComputerMove();
    }
  }, [isXNext, winningLine, isComputerThinking, isDraw]);

  return {
    board,
    winningLine,
    isComputerThinking,
    handleMove,
  };
}
