import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Card.module.css';

export default function Card({ image, isFlipped, isMatched, onClick, disabled, index }) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [wasMatched, setWasMatched] = useState(false);

  // Trigger celebration when card becomes matched
  useEffect(() => {
    if (isMatched && !wasMatched) {
      setShowCelebration(true);
      setWasMatched(true);
      // Hide celebration after animation completes
      const timer = setTimeout(() => setShowCelebration(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isMatched, wasMatched]);

  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick();
    }
  };

  return (
    <motion.div
      className={styles.cardContainer}
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ 
        delay: index * 0.02,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      <motion.div
        className={`${styles.card} ${isFlipped || isMatched ? styles.flipped : ''}`}
        onClick={handleClick}
        whileHover={!disabled && !isFlipped && !isMatched ? { scale: 1.05 } : {}}
        whileTap={!disabled && !isFlipped && !isMatched ? { scale: 0.95 } : {}}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <span className={styles.questionMark}>?</span>
          </div>
          <div className={`${styles.cardBack} ${isMatched ? styles.matched : ''}`}>
            <img src={image} alt="Card" className={styles.cardImage} />
          </div>
        </div>
        
        {/* Celebration effects */}
        {showCelebration && (
          <>
            <div className={styles.glowRing} />
            <div className={styles.celebrationContainer}>
              {/* Particles */}
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              {/* Stars */}
              <div className={styles.star} />
              <div className={styles.star} />
              <div className={styles.star} />
              <div className={styles.star} />
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
