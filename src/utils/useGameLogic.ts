import { useEffect, useState } from "react";
import { SquareValue, Winner } from "../types";
import { COMPUTER_SYMBOL, PLAYER_SYMBOL } from "../consts";
import { calculateWinner } from "../utils/calculateWinner";

export function useGameLogic() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Winner>(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const getEmptyIndices = () =>
    board
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null) as number[];

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
      if (calculateWinner(testBoard) === symbol) {
        return index;
      }
    }
    return null;
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
        makeMove(winningMove, COMPUTER_SYMBOL);
        setWinner(COMPUTER_SYMBOL);
        setIsComputerThinking(false);
        return;
      }

      if (Math.random() < 0.7) {
        const blockingMove = findWinningMove(PLAYER_SYMBOL);
        if (blockingMove !== null) {
          makeMove(blockingMove, COMPUTER_SYMBOL);
          setIsComputerThinking(false);
          setIsXNext(true);
          return;
        }
      }

      const priorityIndices = [4, 0, 2, 6, 8, 1, 3, 5, 7];
      const moveIndex = priorityIndices.find((index) => board[index] === null);

      if (moveIndex !== undefined) {
        makeMove(moveIndex, COMPUTER_SYMBOL);
      }

      setIsComputerThinking(false);
      setIsXNext(true);
    }, 500);
  };

  const handleMove = (index: number) => {
    if (winner || board[index] || isComputerThinking) return;

    const newBoard = makeMove(index, PLAYER_SYMBOL);
    const newWinner = calculateWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else {
      setIsXNext(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsComputerThinking(false);
  };

  useEffect(() => {
    if (!isXNext && !winner && !isComputerThinking) {
      makeComputerMove();
    }
  }, [isXNext, winner, isComputerThinking]);

    useEffect(() => {
    if (winner) {
      const resetTimeout = setTimeout(() => resetGame(), 2000); 
      return () => clearTimeout(resetTimeout); 
    }
    }, [winner]);
  
  return {
    board,
    isXNext,
    winner,
    isComputerThinking,
    handleMove,
    resetGame,
  };
}
