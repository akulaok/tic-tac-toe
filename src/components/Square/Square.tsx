import { JSX } from "react";
import { SquareValue } from "../../types";
import styles from "./Square.module.css";

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  disabled: boolean;
}

export function Square({ value, onClick, disabled }: SquareProps): JSX.Element {
  return (
    <button 
      className={styles.button} 
      onClick={onClick} 
      disabled={disabled}
    >
      {value}
    </button>
  );
}