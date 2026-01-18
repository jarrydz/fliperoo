import { motion } from 'framer-motion';
import Card from '../Card';
import styles from './GameBoard.module.css';

export default function GameBoard({ cards, onCardClick, disabled, difficulty }) {
  return (
    <motion.div 
      className={`${styles.board} ${styles[difficulty]}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          image={card.image}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card.id)}
          disabled={disabled}
          index={index}
        />
      ))}
    </motion.div>
  );
}
