import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from './hooks/useGameLogic';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import GameOver from './components/GameOver';
import './App.css';

function App() {
  const {
    gamePhase,
    players,
    currentPlayer,
    cards,
    isChecking,
    difficulty,
    startGame,
    handleCardClick,
    resetGame,
    playAgain,
    getWinner,
  } = useGameLogic();

  return (
    <div className="app">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <AnimatePresence mode="wait">
        {gamePhase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
          >
            <PlayerSetup onStartGame={startGame} />
          </motion.div>
        )}

        {gamePhase === 'playing' && (
          <motion.div
            key="playing"
            className="game-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.header 
              className="game-header"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 className="game-title">Flipeoo</h1>
              <span className="difficulty-badge">{difficulty}</span>
            </motion.header>

            <Scoreboard players={players} currentPlayer={currentPlayer} />
            
            <GameBoard 
              cards={cards} 
              onCardClick={handleCardClick} 
              disabled={isChecking}
              difficulty={difficulty}
            />

            <motion.button
              className="quit-btn"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Quit Game
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {gamePhase === 'finished' && (
        <GameOver
          players={players}
          winner={getWinner()}
          onPlayAgain={playAgain}
          onNewGame={resetGame}
        />
      )}
    </div>
  );
}

export default App;
