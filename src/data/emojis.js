// Game images for the memory game pairs
// Use BASE_URL to handle deployment to subdirectories (e.g., GitHub Pages)
const base = import.meta.env.BASE_URL;

export const gameImages = [
  `${base}images/AntHorse.png`,
  `${base}images/BearSloth.png`,
  `${base}images/BunnyOctopus.png`,
  `${base}images/BunnyPlatypus.png`,
  `${base}images/DogEchidna.png`,
  `${base}images/DonkeyTurtle.png`,
  `${base}images/FlamingoPeacock.png`,
  `${base}images/HorseDog.png`,
  `${base}images/KoalaKangaroo.png`,
  `${base}images/LizardBird.png`,
  `${base}images/PandaMonkey.png`,
  `${base}images/PonyTurtle.png`,
  `${base}images/SharkFish.png`,
  `${base}images/SnakeCrocodile.png`,
  `${base}images/TurtleFish.png`,
];

// Character emojis for player selection
export const characterEmojis = [
  { id: 'horse', emoji: '🐴', name: 'Horse' },
  { id: 'dog', emoji: '🐕', name: 'Dog' },
  { id: 'bunny', emoji: '🐰', name: 'Bunny' },
  { id: 'koala', emoji: '🐨', name: 'Koala' },
];
