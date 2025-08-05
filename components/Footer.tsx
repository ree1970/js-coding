import React from 'react';
import { ResetIcon, PlayIcon } from './icons';

interface FooterProps {
  onReset: () => void;
  onPreview: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReset, onPreview }) => {
  return (
    <footer className="py-4 mt-4">
      <div className="container mx-auto flex justify-end items-center gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
        >
          <ResetIcon />
          リセット
        </button>
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 shadow-md"
        >
          <PlayIcon />
          プレビュー
        </button>
      </div>
    </footer>
  );
};