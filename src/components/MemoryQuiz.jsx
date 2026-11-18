import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSuccessChime, playHitSound, playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';

export default function MemoryQuiz({ onBack }) {
  const { quiz, recipient } = birthdayData;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = quiz[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctIndex;

    if (isCorrect) {
      playSuccessChime();
      setScore((prev) => prev + 1);
      triggerConfetti({
        particleCount: 25,
        origin: { x: 0.5, y: 0.5 },
        speed: 7,
        spread: 120,
      });
    } else {
      playHitSound(0.8);
    }
  };

  const handleNextQuestion = () => {
    playSparkle();
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      triggerConfetti({
        particleCount: 85,
        origin: { x: 0.5, y: 0.4 },
        speed: 10,
        spread: 360,
      });
    }
  };

  const handleRestartQuiz = () => {
    playSparkle();
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="destination-page destination-page--quiz min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        <div className="text-right">
          <span className="text-xs text-[#D8C19A] font-mono uppercase tracking-wider">
            {!isQuizCompleted ? `Score: ${score} / ${quiz.length}` : 'Completed!'}
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#30243F]/70 border border-[rgba(216,193,154,0.35)] text-xs text-[#D8C19A] tracking-widest uppercase mb-3 shadow-sm">
          <Icon name="sparkles" size={13} color="#D8C19A" />
          <span>PERSONAL TRIVIA</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mb-2">
          How Well Do You Know {recipient.name}?
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80">
          A lighthearted trivia challenge celebrating her favorite quirks, laughter, and iconic moments.
        </p>
      </div>

      {/* QUIZ ACTIVE VIEW */}
      {!isQuizCompleted && currentQ && (
        <div className="w-full max-w-2xl bg-[#1c1733]/70 backdrop-blur-2xl border border-[rgba(216,193,154,0.3)] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-mono text-[#D8C19A] mb-3">
            <span>QUESTION {currentIdx + 1} OF {quiz.length}</span>
            <span>{Math.round(((currentIdx + 1) / quiz.length) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quiz.length) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <h2 className="font-serif text-xl sm:text-2xl text-[#F4F0EA] font-medium mb-6 leading-snug">
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let optionStyle = 'bg-[#15172B]/75 border-white/10 text-[#F4F0EA]/85 hover:bg-[#251e3d]';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-[#30243F] border-[#D8C19A] text-[#F4F0EA] shadow-[0_0_15px_rgba(216,193,154,0.35)] font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-[#402029] border-[#D8B5C4] text-[#F4F0EA] opacity-80';
                } else {
                  optionStyle = 'bg-[#15172B]/50 border-white/5 text-white/35';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#30243F] border-[#D8C19A] text-[#F4F0EA] shadow-md font-medium';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer flex items-center justify-between ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <span className="text-[#D8C19A] font-bold text-sm">✓</span>
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <span className="text-[#D8B5C4] font-bold text-sm">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-[#261d3d]/90 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] mb-6 animate-fade-in flex items-start gap-3">
              <span className="text-xl">
                {selectedAnswer === currentQ.correctIndex ? '✨' : '💡'}
              </span>
              <div>
                <span className="font-semibold text-[#D8C19A] block mb-0.5">
                  {selectedAnswer === currentQ.correctIndex ? 'Spot On!' : 'Memorable Answer!'}
                </span>
                <p className="font-story text-sm sm:text-base text-[#F4F0EA]/90 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold text-xs sm:text-sm uppercase tracking-wider disabled:opacity-40 cursor-pointer shadow-md"
              >
                Confirm Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2"
              >
                <span>{currentIdx < quiz.length - 1 ? 'Next Question' : 'View Results'}</span>
                <Icon name="arrow-right" size={15} color="#15172B" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUIZ COMPLETED VIEW */}
      {isQuizCompleted && (
        <div className="w-full max-w-xl bg-[#1c1733]/85 backdrop-blur-2xl border border-[rgba(216,193,154,0.5)] rounded-3xl p-8 sm:p-10 shadow-[0_20px_70px_rgba(21,23,43,0.9)] text-center animate-fade-in">
          
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#D8C19A] to-[#D8B5C4] flex items-center justify-center text-4xl shadow-xl -mt-16 mb-4 border-2 border-white">
            🎓
          </div>

          <h2 className="font-serif text-3xl font-medium text-[#F4F0EA] mb-1">
            Trivia Mastered!
          </h2>

          <p className="text-xs text-[#D8C19A] uppercase font-mono tracking-wider mb-4">
            Official Score: {score} out of {quiz.length}
          </p>

          <div className="p-5 rounded-2xl bg-[#251e3d]/85 border border-[rgba(216,193,154,0.3)] text-sm text-[#F4F0EA] leading-relaxed mb-6">
            <span className="block text-xs font-mono uppercase text-[#D8C19A] mb-1 font-semibold">
              The Verdict:
            </span>
            <p className="font-story text-base sm:text-lg italic">
              &ldquo;Whether you scored 4 out of 4 or 0 out of 4, the undeniable truth remains: you make every single memory brighter, funnier, and completely unforgettable.&rdquo;
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Icon name="rotate-ccw" size={15} color="#15172B" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
