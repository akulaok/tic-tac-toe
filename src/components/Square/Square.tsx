import {JSX, useEffect, useState} from "react";
import {SquareValue, WinningLine} from "../../types";
import styles from "./Square.module.css";
import Lottie from "lottie-react";
import cross from "../../assets/cross.json";
import oval from "../../assets/oval.json";

interface SquareProps {
  index: number;
  value: SquareValue;
  onClick: () => void;
  disabled: boolean;
  winningLine: WinningLine;
}

export function Square({
  value,
  onClick,
  disabled,
  winningLine,
  index,
}: SquareProps): JSX.Element {
  const animationData = value === "X" ? cross : oval;
  const isWinningSquare = winningLine?.includes(index);
  const [isEndAnimation, setEndAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (winningLine) {
      const timeout = setTimeout(() => {
        setEndAnimation(true);
      }, 1500);

      return () => clearTimeout(timeout);
    } else {
      setEndAnimation(false);
    }
  }, [winningLine]);

  return (
    <>
      <button className={styles.button} onClick={onClick} disabled={disabled}>
        <div
          className={`${styles.animationWrapper} ${
            isEndAnimation ? styles.gameEnd : ""
          } ${isWinningSquare ? styles.winning : ""}`}
        >
          {value ? (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
            />
          ) : (
            <></>
          )}
        </div>
      </button>
    </>
  );
}
