import React from 'react';
import type { Challenge } from '../types';

interface EditorProps {
  challenge: Challenge;
  userCode: string;
  onCodeChange: (code: string) => void;
}

interface HighlightedSampleCodeProps {
  challenge: Challenge;
  userCode: string;
}

const HighlightedSampleCode: React.FC<HighlightedSampleCodeProps> = ({ challenge, userCode }) => {
  const { code: sampleCode, template } = challenge;

  if (!template) {
    // Original logic for challenges without a template
    const characters = sampleCode.split('').map((sampleChar, index) => {
      const userChar = userCode[index];
      let bgColor = '';
      if (userChar !== undefined) {
        bgColor = userChar === sampleChar ? 'bg-[#e0f7fa]' : 'bg-[#ffebee]';
      }
      if (sampleChar === '\n') {
        return <br key={`br-${index}`} />;
      }
      return (
        <span key={index} className={`${bgColor} rounded-sm transition-colors duration-150`}>
          {sampleChar === ' ' ? '\u00A0' : sampleChar}
        </span>
      );
    });
    return <div className="whitespace-pre-wrap">{characters}</div>;
  }
  
  // New logic for challenges with a template
  const { prefix, suffix } = template;
  const sampleMiddle = sampleCode.substring(prefix.length, sampleCode.length - suffix.length);

  const prefixIsCorrect = userCode.startsWith(prefix);
  const offset = prefixIsCorrect ? userCode.length - sampleCode.length : 0;
  
  const characters = sampleCode.split('').map((sampleChar, sampleIndex) => {
    let bgColor = '';

    if (sampleIndex < prefix.length) {
      // Prefix part
      const userChar = userCode[sampleIndex];
      if (userChar !== undefined) {
        bgColor = userChar === sampleChar ? 'bg-[#e0f7fa]' : 'bg-[#ffebee]';
      }
    } else if (sampleIndex < prefix.length + sampleMiddle.length) {
      // Middle part
      if (prefixIsCorrect) {
        bgColor = 'bg-[#e0f7fa]';
      }
    } else {
      // Suffix part
      if (prefixIsCorrect) {
        const userIndex = sampleIndex + offset;
        const userSuffixChar = userCode[userIndex];
        if (userSuffixChar !== undefined) {
          bgColor = userSuffixChar === sampleChar ? 'bg-[#e0f7fa]' : 'bg-[#ffebee]';
        }
      }
    }

    if (sampleChar === '\n') {
      return <br key={`br-${sampleIndex}`} />;
    }
    
    return (
      <span key={sampleIndex} className={`${bgColor} rounded-sm transition-colors duration-150`}>
        {sampleChar === ' ' ? '\u00A0' : sampleChar}
      </span>
    );
  });

  return <div className="whitespace-pre-wrap">{characters}</div>;
};


export const Editor: React.FC<EditorProps> = ({ challenge, userCode, onCodeChange }) => {
  return (
    <div className="flex-grow flex flex-col md:flex-row gap-4 overflow-hidden">
      {/* Left Panel: Sample Code with real-time highlighting */}
      <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
          <h2 className="text-xl font-bold">{challenge.title}</h2>
          <p className="text-base text-gray-600 mt-1">{challenge.description}</p>
        </div>
        <div className="p-4 font-mono text-xl leading-loose overflow-auto flex-grow bg-gray-50">
          <HighlightedSampleCode challenge={challenge} userCode={userCode} />
        </div>
      </div>

      {/* Right Panel: User Editor */}
      <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
            <h2 className="text-xl font-bold">エディタ</h2>
            <p className="text-base text-gray-600 mt-1">ここに見本と同じコードを記述してください。</p>
        </div>
        <div className="flex-grow relative">
          <textarea
            value={userCode}
            onChange={(e) => onCodeChange(e.target.value)}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="w-full h-full p-4 font-mono text-xl leading-loose bg-white text-gray-800 resize-none focus:outline-none absolute inset-0"
            aria-label="コードエディタ"
          />
        </div>
      </div>
    </div>
  );
};