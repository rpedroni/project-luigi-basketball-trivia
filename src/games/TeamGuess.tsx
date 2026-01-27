import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NBA_TEAMS, Team, shuffleArray } from '../utils/basketballData';
import { audioService } from '../services/audioService';

interface Props {
  onBack: () => void;
}

export default function TeamGuess({ onBack }: Props) {
  const [score, setScore] = useState(0);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [options, setOptions] = useState<Team[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const shuffled = shuffleArray(NBA_TEAMS);
    const correct = shuffled[0];
    const wrongOptions = shuffled.slice(1, 4);
    const allOptions = shuffleArray([correct, ...wrongOptions]);

    setCurrentTeam(correct);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Speak the team name for the question
    setTimeout(() => {
      audioService.speakTeam(`Find the ${correct.name} logo`);
    }, 300);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (team: Team) => {
    if (selectedAnswer) return;

    setSelectedAnswer(team.id);
    const correct = team.id === currentTeam?.id;
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

  if (!currentTeam) return null;

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
            <span className="text-orange-400 font-bold">🏀 {score}</span>
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
      <div className="text-center mb-6">
        <p className="text-white/70 text-lg mb-2">Find the logo for...</p>
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentTeam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl md:text-4xl font-black text-white"
          >
            {currentTeam.fullName}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Logo Options */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {options.map((team) => {
            const isSelected = selectedAnswer === team.id;
            const isCorrectAnswer = team.id === currentTeam.id;
            const showResult = selectedAnswer !== null;

            let borderClass = 'border-white/20';
            if (showResult && isCorrectAnswer) {
              borderClass = 'border-green-500 border-4';
            } else if (isSelected && !isCorrect) {
              borderClass = 'border-red-500 border-4';
            }

            return (
              <motion.button
                key={team.id}
                whileHover={!selectedAnswer ? { scale: 1.05 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(team)}
                disabled={!!selectedAnswer}
                className={`aspect-square bg-white rounded-2xl p-4 border-2 ${borderClass} transition-all shadow-lg hover:shadow-xl`}
              >
                <img
                  src={team.logoUrl}
                  alt={team.name}
                  className="w-full h-full object-contain"
                />
                {showResult && isCorrectAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-6xl">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Hint for Luigi */}
      <div className="text-center mt-4">
        <p className="text-white/50 text-sm">
          Tap the correct logo, <span className="text-orange-400">Luigi</span>!
        </p>
      </div>
    </motion.div>
  );
}
