import {useGame} from "../../hooks/useGame";
import {Square} from "../Square/Square";
import styles from "./Board.module.css";

export const Board = () => {
  const {board, handleMove, isComputerThinking, winningLine} = useGame();
  return (
    <div className={styles.board}>
      {board.map((value, index) => (
        <Square
          index={index}
          winningLine={winningLine}
          key={index}
          value={value}
          onClick={() => handleMove(index)}
          disabled={isComputerThinking || !!value}
        />
      ))}
    </div>
  );
};
