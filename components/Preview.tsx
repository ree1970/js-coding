import React, { useState, useEffect, useRef } from 'react';
import type { ConsoleMessage, Challenge } from '../types';
import { LogType } from '../types';
import { BackIcon, AlertIcon, ErrorIcon, LogIcon } from './icons';

interface PreviewProps {
  userCode: string;
  challenge: Challenge;
  onBack: () => void;
}

const getLogStyle = (type: LogType) => {
    switch (type) {
        case LogType.LOG:
            return {
                icon: <LogIcon />,
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-800',
                borderColor: 'border-blue-200'
            };
        case LogType.ALERT:
            return {
                icon: <AlertIcon />,
                bgColor: 'bg-yellow-50',
                textColor: 'text-yellow-800',
                borderColor: 'border-yellow-200'
            };
        case LogType.ERROR:
            return {
                icon: <ErrorIcon />,
                bgColor: 'bg-red-50',
                textColor: 'text-red-800',
                borderColor: 'border-red-200'
            };
        default:
            return {
                icon: <LogIcon />,
                bgColor: 'bg-gray-50',
                textColor: 'text-gray-800',
                borderColor: 'border-gray-200'
            };
    }
}

export const Preview: React.FC<PreviewProps> = ({ userCode, challenge, onBack }) => {
  const [output, setOutput] = useState<ConsoleMessage[]>([]);
  const domPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (domPreviewRef.current && challenge.initialHTML) {
      domPreviewRef.current.innerHTML = challenge.initialHTML;
    }

    const logs: ConsoleMessage[] = [];
    const originalConsoleLog = console.log;
    const originalAlert = window.alert;

    console.log = (...args: any[]) => {
      logs.push({ type: LogType.LOG, message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ') });
    };

    window.alert = (message?: any) => {
      logs.push({ type: LogType.ALERT, message: String(message) });
    };
    
    try {
      new Function(userCode)();
    } catch (error: any) {
      logs.push({ type: LogType.ERROR, message: error.message });
    } finally {
      console.log = originalConsoleLog;
      window.alert = originalAlert;
      setOutput(logs);
    }

    return () => {
      console.log = originalConsoleLog;
      window.alert = originalAlert;
    };
  }, [userCode, challenge]);

  return (
    <div className="flex-grow flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">実行結果</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
        >
          <BackIcon />
          エディタに戻る
        </button>
      </div>

      <div className="flex-grow flex flex-col overflow-auto p-6 space-y-6">
        {challenge.hasDOMPreview && (
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md">
            <h3 className="text-xl font-bold text-gray-300 p-4 border-b border-gray-700">HTMLプレビュー</h3>
            <div className="p-6">
              <div ref={domPreviewRef} className="min-h-[50px] flex items-center justify-center font-sans">
                {/* Content is set via useEffect and user's code */}
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow flex flex-col bg-gray-900 text-white font-mono rounded-lg overflow-hidden shadow-md">
            <h3 className="text-xl font-bold text-gray-300 p-4 border-b border-gray-700 flex-shrink-0">コンソール出力</h3>
            <div className="p-4 overflow-auto h-full">
              {output.length === 0 ? (
                <p className="text-gray-400">出力はありません。</p>
              ) : (
                <ul className="space-y-2">
                  {output.map((log, index) => {
                      const style = getLogStyle(log.type);
                      return (
                          <li key={index} className={`flex items-start p-3 rounded-md border text-base ${style.bgColor} ${style.textColor} ${style.borderColor}`}>
                              <div className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5">{style.icon}</div>
                              <pre className="flex-grow whitespace-pre-wrap break-words font-sans">{log.message}</pre>
                          </li>
                      )
                  })}
                </ul>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};