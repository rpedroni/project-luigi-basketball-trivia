import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { audioService } from './services/audioService';
import LogoMatch from './games/LogoMatch';
import TeamGuess from './games/TeamGuess';
import PlayerTeam from './games/PlayerTeam';
import JerseyMatch from './games/JerseyMatch';

type Screen = 'home' | 'game-select' | 'logo-match' | 'team-guess' | 'player-team' | 'jersey-match';

const GAMES = [
  {
    id: 'logo-match' as const,
    name: 'Logo Match',
    description: 'Guess the team from the logo!',
    emoji: '🎯',
  },
  {
    id: 'team-guess' as const,
    name: 'Team Guess',
    description: 'Find the right logo!',
    emoji: '🔍',
  },
  {
    id: 'player-team' as const,
    name: 'Player Teams',
    description: 'Which team do they play for?',
    emoji: '⭐',
  },
  {
    id: 'jersey-match' as const,
    name: 'Jersey Numbers',
    description: 'Match players to their numbers!',
    emoji: '👕',
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const handleStart = () => {
    audioService.speakWelcome();
    setScreen('game-select');
  };

  const handleBack = () => {
    if (screen === 'game-select') {
      setScreen('home');
    } else {
      setScreen('game-select');
    }
  };

  return (
    <div className="h-full w-full overflow-hidden basketball-pattern">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex flex-col items-center justify-center p-4"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl mb-6"
            >
              🏀
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-white text-center mb-2">
              Luigi's
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-center mb-8">
              Basketball Trivia
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-orange-500/50 transition-shadow"
            >
              Let's Play! 🎮
            </motion.button>
          </motion.div>
        )}

        {screen === 'game-select' && (
          <motion.div
            key="game-select"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="h-full flex flex-col p-4"
          >
            <div className="flex items-center mb-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                className="p-2 text-white/70 hover:text-white text-2xl"
              >
                ←
              </motion.button>
              <div className="flex-1 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Choose Your Game, <span className="text-orange-400">Luigi</span>! 🏀
                </h1>
              </div>
              <div className="w-10" />
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
              {GAMES.map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setScreen(game.id)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-colors"
                >
                  <div className="text-4xl mb-2">{game.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                  <p className="text-white/70 text-sm">{game.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 'logo-match' && (
          <LogoMatch key="logo-match" onBack={handleBack} />
        )}

        {screen === 'team-guess' && (
          <TeamGuess key="team-guess" onBack={handleBack} />
        )}

        {screen === 'player-team' && (
          <PlayerTeam key="player-team" onBack={handleBack} />
        )}

        {screen === 'jersey-match' && (
          <JerseyMatch key="jersey-match" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
