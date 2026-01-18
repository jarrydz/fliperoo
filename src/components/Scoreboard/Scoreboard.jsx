import { motion } from 'framer-motion';
import styles from './Scoreboard.module.css';

export default function Scoreboard({ players, currentPlayer }) {
  return (
    <div className={styles.scoreboard}>
      {players.map((player, index) => (
        <motion.div
          key={index}
          className={`${styles.playerCard} ${currentPlayer === index ? styles.active : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {currentPlayer === index && (
            <motion.div 
              className={styles.turnIndicator}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              Your Turn!
            </motion.div>
          )}
          
          <div className={styles.playerInfo}>
            <span className={styles.playerEmoji}>{player.emoji}</span>
            <span className={styles.playerName}>{player.name}</span>
          </div>
          
          <div className={styles.scoreContainer}>
            <motion.span 
              className={styles.score}
              key={player.score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {player.score}
            </motion.span>
            <span className={styles.scoreLabel}>pairs</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
