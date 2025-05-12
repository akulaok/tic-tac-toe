import {ReactNode} from "react";
import {useGameLogic} from "../utils/useGameLogic";
import {GameProvider} from "./AppContext";

export function GameLogicProvider({children}: {children: ReactNode}) {
  const value = useGameLogic();
  return <GameProvider value={value}>{children}</GameProvider>;
}
