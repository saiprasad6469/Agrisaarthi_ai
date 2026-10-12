import React from 'react';
import { Mic, Sparkles } from 'lucide-react';

interface FloatingVoiceTriggerProps {
  onOpen: () => void;
  currentLang: string;
}

export const FloatingVoiceTrigger: React.FC<FloatingVoiceTriggerProps> = ({ onOpen, currentLang }) => {
  return (
    <div className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-40 flex items-center space-x-2">
      <button
        onClick={onOpen}
        className="group relative flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5"
        title="AgriSaarthi Voice Assistant"
      >
        <div className="relative">
          <Mic className="w-5 h-5 text-white animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white"></span>
        </div>
        <span className="text-xs font-black tracking-wide hidden sm:inline uppercase">
          Voice AI Assistant
        </span>
        <Sparkles className="w-4 h-4 text-emerald-200" />
      </button>
    </div>
  );
};
