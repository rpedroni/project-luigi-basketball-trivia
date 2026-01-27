import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NBA_TEAMS, Team, shuffleArray } from '../utils/basketballData';
import { audioService } from '../services/audioService';

interface Props {
  onBack: () => void;
}

export default function LogoMatch({ onBack }: Props) {
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

  const speakTeamName = () => {
    if (currentTeam) {
      audioService.speakTeam(currentTeam.fullName);
    }
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
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Which team's logo is this, <span className="text-orange-400">Luigi</span>?
        </h2>
      </div>

      {/* Logo Display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTeam.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative mb-8"
          >
            <div
              className="w-40 h-40 md:w-52 md:h-52 bg-white rounded-3xl p-4 shadow-2xl cursor-pointer hover:shadow-white/30 transition-shadow"
              onClick={speakTeamName}
            >
              <img
                src={currentTeam.logoUrl}
                alt="Team Logo"
                className="w-full h-full object-contain"
              />
            </div>
            {isCorrect !== null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isCorrect ? '✓' : '✗'}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {options.map((team) => {
            const isSelected = selectedAnswer === team.id;
            const isCorrectAnswer = team.id === currentTeam.id;
            const showResult = selectedAnswer !== null;

            let bgClass = 'bg-white/10 hover:bg-white/20';
            if (showResult && isCorrectAnswer) {
              bgClass = 'bg-green-500/80';
            } else if (isSelected && !isCorrect) {
              bgClass = 'bg-red-500/80';
            }

            return (
              <motion.button
                key={team.id}
                whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer(team)}
                disabled={!!selectedAnswer}
                className={`${bgClass} backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white font-bold text-lg transition-colors`}
              >
                {team.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
