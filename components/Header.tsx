import React from 'react';
import type { Challenge } from '../types';

interface HeaderProps {
  challenges: Challenge[];
  currentChallengeId: number;
  onSelectChallenge: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ challenges, currentChallengeId, onSelectChallenge }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md p-4 sticky top-0 z-30">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          JavaScript コーディング練習
        </h1>
        <nav className="flex flex-wrap justify-center gap-2">
          {challenges.map(challenge => (
            <button
              key={challenge.id}
              onClick={() => onSelectChallenge(challenge.id)}
              className={`px-4 py-2 rounded-md text-base font-semibold transition-colors duration-200 ${
                currentChallengeId === challenge.id
                  ? 'bg-green-500 text-white shadow'
                  : 'bg-green-200 text-green-800 hover:bg-green-300'
              }`}
            >
              課題{challenge.id}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
