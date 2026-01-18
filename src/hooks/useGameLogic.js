import { useState, useCallback, useEffect } from 'react';
import { gameImages, characterEmojis } from '../data/emojis';

// Difficulty settings
const difficultySettings = {
  easy: { pairs: 6 },
  medium: { pairs: 12 },
  hard: { pairs: 18 },
};

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create initial cards based on difficulty
function createCards(difficulty) {
  const { pairs } = difficultySettings[difficulty];
  
  // Shuffle images and take the number needed for this difficulty
  const shuffledImages = shuffleArray([...gameImages]);
  const selectedImages = shuffledImages.slice(0, pairs);
  
  const cards = selectedImages.flatMap((image, index) => [
    { id: `${index}-a`, image, pairId: index, isFlipped: false, isMatched: false },
    { id: `${index}-b`, image, pairId: index, isFlipped: false, isMatched: false },
  ]);
  
  return shuffleArray(cards);
}

export function useGameLogic() {
  const [gamePhase, setGamePhase] = useState('setup'); // 'setup' | 'playing' | 'finished'
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  // Get character emoji for a player
  const getPlayerEmoji = (characterId) => {
    const character = characterEmojis.find(c => c.id === characterId);
    return character ? character.emoji : '👤';
  };

  // Start the game
  const startGame = useCallback((playerData, selectedDifficulty) => {
    const formattedPlayers = playerData.map(p => ({
      name: p.name,
      character: p.character,
      emoji: getPlayerEmoji(p.character),
      score: 0,
    }));
    setPlayers(formattedPlayers);
    setDifficulty(selectedDifficulty);
    setCards(createCards(selectedDifficulty));
    setCurrentPlayer(0);
    setSelectedCards([]);
    setIsChecking(false);
    setGamePhase('playing');
  }, []);

  // Handle card click
  const handleCardClick = useCallback((cardId) => {
    if (isChecking) return;
    if (selectedCards.length >= 2) return;

    const clickedCard = cards.find(c => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    // If we now have 2 cards selected, check for match
    if (newSelected.length === 2) {
      setIsChecking(true);
    }
  }, [cards, selectedCards, isChecking]);

  // Check for match when 2 cards are selected
  useEffect(() => {
    if (selectedCards.length !== 2 || !isChecking) return;

    const [first, second] = selectedCards;
    const isMatch = first.pairId === second.pairId;

    const checkTimeout = setTimeout(() => {
      if (isMatch) {
        // Match found!
        setCards(prev => prev.map(card => 
          card.id === first.id || card.id === second.id
            ? { ...card, isMatched: true }
            : card
        ));
        setPlayers(prev => prev.map((player, idx) => 
          idx === currentPlayer
            ? { ...player, score: player.score + 1 }
            : player
        ));
        // Same player continues
      } else {
        // No match - flip cards back
        setCards(prev => prev.map(card => 
          card.id === first.id || card.id === second.id
            ? { ...card, isFlipped: false }
            : card
        ));
        // Switch to other player
        setCurrentPlayer(prev => (prev + 1) % 2);
      }
      
      setSelectedCards([]);
      setIsChecking(false);
    }, 1000);

    return () => clearTimeout(checkTimeout);
  }, [selectedCards, isChecking, currentPlayer]);

  // Check if game is finished
  useEffect(() => {
    if (gamePhase === 'playing' && cards.length > 0) {
      const allMatched = cards.every(card => card.isMatched);
      if (allMatched) {
        setGamePhase('finished');
      }
    }
  }, [cards, gamePhase]);

  // Reset game
  const resetGame = useCallback(() => {
    setGamePhase('setup');
    setPlayers([]);
    setCards([]);
    setSelectedCards([]);
    setCurrentPlayer(0);
    setIsChecking(false);
  }, []);

  // Play again with same players and difficulty
  const playAgain = useCallback(() => {
    setCards(createCards(difficulty));
    setSelectedCards([]);
    setCurrentPlayer(0);
    setIsChecking(false);
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    setGamePhase('playing');
  }, [difficulty]);

  // Determine winner
  const getWinner = useCallback(() => {
    if (players.length < 2) return null;
    if (players[0].score > players[1].score) return players[0];
    if (players[1].score > players[0].score) return players[1];
    return 'tie';
  }, [players]);

  return {
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
  };
}
