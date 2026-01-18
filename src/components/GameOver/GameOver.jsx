import { motion } from 'framer-motion';
import styles from './GameOver.module.css';

export default function GameOver({ players, winner, onPlayAgain, onNewGame }) {
  const isTie = winner === 'tie';

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className={styles.modal}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div 
          className={styles.confetti}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎉✨🎊
        </motion.div>
        
        <motion.h1 
          className={styles.title}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Game Over!
        </motion.h1>
        
        {isTie ? (
          <motion.div 
            className={styles.tieContainer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <span className={styles.tieEmoji}>🤝</span>
            <p className={styles.tieText}>It's a Tie!</p>
            <p className={styles.tieScore}>Both players got {players[0].score} pairs</p>
          </motion.div>
        ) : (
          <motion.div 
            className={styles.winnerContainer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <span className={styles.winnerEmoji}>{winner.emoji}</span>
            <p className={styles.winnerName}>{winner.name}</p>
            <p className={styles.winnerText}>Wins! 🏆</p>
            <p className={styles.winnerScore}>{winner.score} pairs matched</p>
          </motion.div>
        )}

        <div className={styles.finalScores}>
          <h3 className={styles.scoresTitle}>Final Scores</h3>
          <div className={styles.scoresList}>
            {players.map((player, index) => (
              <motion.div 
                key={index} 
                className={styles.playerScore}
                initial={{ x: index === 0 ? -30 : 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <span className={styles.playerInfo}>
                  {player.emoji} {player.name}
                </span>
                <span className={styles.playerPoints}>{player.score}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.buttons}>
          <motion.button
            className={styles.playAgainBtn}
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Play Again 🔄
          </motion.button>
          
          <motion.button
            className={styles.newGameBtn}
            onClick={onNewGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            New Players 👥
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
