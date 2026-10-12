import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { VoiceAssistantModal } from '../components/VoiceAssistantModal';
import { FloatingVoiceTrigger } from '../components/FloatingVoiceTrigger';

interface PublicLayoutProps {
  currentLang: string;
  onLangChange: (lang: any) => void;
  user: any;
  onLogout: () => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  currentLang,
  onLangChange,
  user,
  onLogout
}) => {
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        currentLang={currentLang}
        onLangChange={onLangChange}
        user={user}
        onLogout={onLogout}
        onOpenVoice={() => setVoiceOpen(true)}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-emerald-950 text-emerald-200 py-8 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p className="font-semibold text-white mb-2">AgriSaarthi AI – Smart Soil. Better Crops. Brighter Future.</p>
          <p className="text-emerald-400 text-xs">“From Soil Testing to Smart Farming – Everything a Farmer Needs in One App.”</p>
          <p className="mt-4 text-xs text-emerald-500">Exclusively designed for Indian farmers. Multilingual AI Guidance.</p>
        </div>
      </footer>

      {/* MULTILINGUAL VOICE ASSISTANT MODAL & FLOATING TRIGGER */}
      <VoiceAssistantModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        currentLang={currentLang}
        onLangChange={onLangChange}
      />

      <FloatingVoiceTrigger onOpen={() => setVoiceOpen(true)} currentLang={currentLang} />
    </div>
  );
};
