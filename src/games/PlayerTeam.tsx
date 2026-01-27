import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NBA_TEAMS, NBA_PLAYERS, Player, Team, shuffleArray, getTeamById } from '../utils/basketballData';
import { audioService } from '../services/audioService';

interface Props {
  onBack: () => void;
}

export default function PlayerTeam({ onBack }: Props) {
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [correctTeam, setCorrectTeam] = useState<Team | null>(null);
  const [options, setOptions] = useState<Team[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const shuffledPlayers = shuffleArray(NBA_PLAYERS);
    const player = shuffledPlayers[0];
    const team = getTeamById(player.teamId);

    if (!team) return;

    const wrongTeams = shuffleArray(NBA_TEAMS.filter(t => t.id !== team.id)).slice(0, 3);
    const allOptions = shuffleArray([team, ...wrongTeams]);

    setCurrentPlayer(player);
    setCorrectTeam(team);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);

    setTimeout(() => {
      audioService.speakPlayer(`Which team does ${player.name} play for?`);
    }, 300);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (team: Team) => {
    if (selectedAnswer) return;

    setSelectedAnswer(team.id);
    const correct = team.id === correctTeam?.id;
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

    setTimeout(generateQuestion, 2000);
  };

  if (!currentPlayer || !correctTeam) return null;

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
            <span className="text-orange-400 font-bold">⭐ {score}</span>
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
        <p className="text-white/70 text-lg mb-2">Which team does this player play for?</p>
      </div>

      {/* Player Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer.name}
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/30 shadow-2xl"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🏀</div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                {currentPlayer.name}
              </h3>
              <div className="flex items-center justify-center gap-4 text-white/70">
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  #{currentPlayer.jerseyNumber}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {currentPlayer.position}
                </span>
              </div>
            </div>
            {isCorrect !== null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isCorrect ? '✓' : '✗'}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Team Options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
          {options.map((team) => {
            const isSelected = selectedAnswer === team.id;
            const isCorrectAnswer = team.id === correctTeam.id;
            const showResult = selectedAnswer !== null;

            let bgClass = 'bg-white/10 hover:bg-white/20';
            let borderClass = 'border-white/20';

            if (showResult && isCorrectAnswer) {
              bgClass = 'bg-green-500/30';
              borderClass = 'border-green-500';
            } else if (isSelected && !isCorrect) {
              bgClass = 'bg-red-500/30';
              borderClass = 'border-red-500';
            }

            return (
              <motion.button
                key={team.id}
                whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer(team)}
                disabled={!!selectedAnswer}
                className={`${bgClass} backdrop-blur-sm border-2 ${borderClass} rounded-xl p-3 flex items-center gap-3 transition-all`}
              >
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0">
                  <img
                    src={team.logoUrl}
                    alt={team.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white font-bold text-left">{team.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Luigi Hint */}
      <div className="text-center mt-4">
        <p className="text-white/50 text-sm">
          You got this, <span className="text-orange-400">Luigi</span>! 🌟
        </p>
      </div>
    </motion.div>
  );
}
