import Lottie from "lottie-react";
import styles from "./App.module.css";
import grid from "./assets/grid.json";
import {Board} from "./components/Board/Board";
import {GameLogicProvider} from "./contexts/GameLogicProvider";
function App() {
  return (
    <GameLogicProvider>
      <div className={styles.gameContainer}>
        <div className={styles.boardWrapper}>
          <div className={styles.lottieBackground}>
            <Lottie animationData={grid} loop={false} autoplay={true} />
          </div>
          <Board />
        </div>
      </div>
    </GameLogicProvider>
  );
}

export default App;
