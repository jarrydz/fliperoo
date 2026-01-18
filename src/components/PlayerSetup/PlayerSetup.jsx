import { useState } from 'react';
import { motion } from 'framer-motion';
import { characterEmojis } from '../../data/emojis';
import styles from './PlayerSetup.module.css';

const difficulties = [
  { id: 'easy', name: 'Easy', pairs: 6, description: '6 pairs' },
  { id: 'medium', name: 'Medium', pairs: 12, description: '12 pairs' },
  { id: 'hard', name: 'Hard', pairs: 18, description: '18 pairs' },
];

export default function PlayerSetup({ onStartGame }) {
  const [players, setPlayers] = useState([
    { name: '', character: null },
    { name: '', character: null },
  ]);
  const [difficulty, setDifficulty] = useState('medium');

  const updatePlayer = (index, field, value) => {
    setPlayers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const canStart = players.every(p => p.name.trim() && p.character);

  const handleStart = () => {
    if (canStart) {
      onStartGame(players, difficulty);
    }
  };

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.title}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        🎮 Flipeoo 🎮
      </motion.h1>
      
      <motion.p 
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        The Memory Matching Game!
      </motion.p>

      {/* Difficulty Selection */}
      <motion.div 
        className={styles.difficultySection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <label className={styles.sectionLabel}>Choose Difficulty</label>
        <div className={styles.difficultyOptions}>
          {difficulties.map((diff) => (
            <motion.button
              key={diff.id}
              className={`${styles.difficultyBtn} ${difficulty === diff.id ? styles.selectedDifficulty : ''}`}
              onClick={() => setDifficulty(diff.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.difficultyName}>{diff.name}</span>
              <span className={styles.difficultyDesc}>{diff.description}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className={styles.playersContainer}>
        {players.map((player, index) => (
          <motion.div
            key={index}
            className={styles.playerCard}
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.2 }}
          >
            <h2 className={styles.playerTitle}>Player {index + 1}</h2>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Your Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your name..."
                value={player.name}
                onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                maxLength={15}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Choose Your Character</label>
              <div className={styles.characters}>
                {characterEmojis.map((char) => (
                  <motion.button
                    key={char.id}
                    className={`${styles.characterBtn} ${
                      player.character === char.id ? styles.selected : ''
                    } ${
                      players.some((p, i) => i !== index && p.character === char.id)
                        ? styles.disabled
                        : ''
                    }`}
                    onClick={() => updatePlayer(index, 'character', char.id)}
                    disabled={players.some((p, i) => i !== index && p.character === char.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.characterEmoji}>{char.emoji}</span>
                    <span className={styles.characterName}>{char.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className={`${styles.startBtn} ${!canStart ? styles.startBtnDisabled : ''}`}
        onClick={handleStart}
        disabled={!canStart}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={canStart ? { scale: 1.05 } : {}}
        whileTap={canStart ? { scale: 0.95 } : {}}
      >
        {canStart ? "Let's Play! 🚀" : 'Enter names & choose characters'}
      </motion.button>
    </div>
  );
}
