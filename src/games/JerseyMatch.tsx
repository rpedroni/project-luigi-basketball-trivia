import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NBA_PLAYERS, Player, shuffleArray } from '../utils/basketballData';
import { audioService } from '../services/audioService';

interface Props {
  onBack: () => void;
}

export default function JerseyMatch({ onBack }: Props) {
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const shuffledPlayers = shuffleArray(NBA_PLAYERS);
    const player = shuffledPlayers[0];

    // Get 3 wrong jersey numbers (different from correct)
    const allNumbers = NBA_PLAYERS
      .map(p => p.jerseyNumber)
      .filter(n => n !== player.jerseyNumber);
    const uniqueNumbers = [...new Set(allNumbers)];
    const wrongNumbers = shuffleArray(uniqueNumbers).slice(0, 3);

    const allOptions = shuffleArray([player.jerseyNumber, ...wrongNumbers]);

    setCurrentPlayer(player);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);

    setTimeout(() => {
      audioService.speakPlayer(`What is ${player.name}'s jersey number?`);
    }, 300);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (number: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(number);
    const correct = number === currentPlayer?.jerseyNumber;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      audioService.speakCorrect();

      if ((streak + 1) % 5 === 0) {
        setTimeout(() => audioService.speakCelebration(), 500);
      }
    } else {
      setStreak(0);
      audioService.speakIncorrect();
    }

    setTimeout(generateQuestion, 1500);
  };

  if (!currentPlayer) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-2 text-white/70 hover:text-white text-2xl"
        >
          ←
        </motion.button>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 rounded-full px-4 py-2">
            <span className="text-orange-400 font-bold">👕 {score}</span>
          </div>
          {streak >= 3 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-3 py-1"
            >
              <span className="text-white font-bold text-sm">🔥 {streak}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-4">
        <p className="text-white/70 text-lg mb-1">What's their jersey number?</p>
      </div>

      {/* Player Display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer.name}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center mb-8"
          >
            {/* Jersey Icon */}
            <motion.div
              animate={{ rotateY: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative inline-block mb-4"
            >
              <div className="text-8xl">👕</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white mt-2">?</span>
              </div>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
              {currentPlayer.name}
            </h3>
            <p className="text-white/60 text-lg">{currentPlayer.position}</p>

            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                <span className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? `Yes! #${currentPlayer.jerseyNumber}` : `It's #${currentPlayer.jerseyNumber}`}
                </span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Number Options */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {options.map((number) => {
            const isSelected = selectedAnswer === number;
            const isCorrectAnswer = number === currentPlayer.jerseyNumber;
            const showResult = selectedAnswer !== null;

            let bgClass = 'from-orange-500 to-red-600';
            if (showResult && isCorrectAnswer) {
              bgClass = 'from-green-500 to-green-600';
            } else if (isSelected && !isCorrect) {
              bgClass = 'from-red-500 to-red-600';
            }

            return (
              <motion.button
                key={number}
                whileHover={selectedAnswer === null ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(number)}
                disabled={selectedAnswer !== null}
                className={`bg-gradient-to-br ${bgClass} rounded-2xl p-6 shadow-lg transition-all`}
              >
                <span className="text-4xl md:text-5xl font-black text-white">
                  #{number}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Luigi Encouragement */}
      <div className="text-center mt-4">
        <p className="text-white/50 text-sm">
          Think like a pro, <span className="text-orange-400">Luigi</span>! 🏆
        </p>
      </div>
    </motion.div>
  );
}
