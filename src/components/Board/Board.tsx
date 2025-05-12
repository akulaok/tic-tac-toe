import { useGame } from "../../hooks/useGame";
import { Square } from "../Square/Square";
import styles from './Board.module.css';

export const Board = () => {
  const { board, handleMove, isComputerThinking } = useGame();

  return (
    <div className={styles.board}>
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => handleMove(index)}
          disabled={isComputerThinking || !!value}
        />
      ))}
    </div>
  );
};