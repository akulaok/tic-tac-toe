import {useContext} from "react";
import {GameContext} from "../contexts/AppContext";

export function useGame() {
  const context = useContext(GameContext);
  return context;
}
