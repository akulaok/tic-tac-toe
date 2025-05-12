import {createContext, ReactNode} from "react";
import {GameContextType} from "../types";
export const GameContext = createContext<GameContextType>({
  board: Array(9).fill(null),
  isComputerThinking: false,
  handleMove: () => {},
  winningLine: null,
});

export function GameProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: GameContextType;
}) {
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
