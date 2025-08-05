import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { Footer } from './components/Footer';
import { Preview } from './components/Preview';
import { CHALLENGES } from './constants';
import type { Challenge, ViewMode } from './types';

const App: React.FC = () => {
  const [currentChallengeId, setCurrentChallengeId] = useState<number>(1);
  const [userCode, setUserCode] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('edit');

  const currentChallenge: Challenge | undefined = useMemo(() => 
    CHALLENGES.find(c => c.id === currentChallengeId), 
    [currentChallengeId]
  );

  const handleChallengeSelect = useCallback((id: number) => {
    setCurrentChallengeId(id);
    setUserCode('');
    setViewMode('edit');
  }, []);

  const handleReset = useCallback(() => {
    setUserCode('');
  }, []);

  const handlePreview = () => {
    setViewMode('preview');
  };
  
  const handleBackToEditor = useCallback(() => {
    setViewMode('edit');
  }, []);
  
  if (!currentChallenge) {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-50 text-gray-800">
        課題の読み込みに失敗しました。
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-amber-50 font-sans text-gray-800">
      <Header 
        challenges={CHALLENGES}
        currentChallengeId={currentChallengeId}
        onSelectChallenge={handleChallengeSelect}
      />
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        {viewMode === 'edit' ? (
          <>
            <Editor 
              challenge={currentChallenge}
              userCode={userCode}
              onCodeChange={setUserCode}
            />
            <Footer 
              onReset={handleReset}
              onPreview={handlePreview}
            />
          </>
        ) : (
          <Preview 
            userCode={userCode}
            challenge={currentChallenge}
            onBack={handleBackToEditor}
          />
        )}
      </main>
    </div>
  );
};

export default App;