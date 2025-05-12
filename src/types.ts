export type SquareValue = 'O' | 'X' | null;
export type Winner = 'X' | 'O' | 'draw' | null;

export interface GameContextType {
  board: SquareValue[];
  isXNext: boolean;
  winner: Winner;
  isComputerThinking: boolean;
  handleMove: (index: number) => void;
  resetGame: () => void;
}