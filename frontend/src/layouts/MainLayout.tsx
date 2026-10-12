import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import { VoiceAssistantModal } from '../components/VoiceAssistantModal';
import { FloatingVoiceTrigger } from '../components/FloatingVoiceTrigger';

interface MainLayoutProps {
  currentLang: string;
  onLangChange: (lang: any) => void;
  user: any;
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  currentLang,
  onLangChange,
  user,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        currentLang={currentLang}
        onLangChange={onLangChange}
        user={user}
        onLogout={onLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenVoice={() => setVoiceOpen(true)}
      />

      <div className="flex flex-1 min-w-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 min-w-0 lg:pl-64 flex flex-col">
          <main className="flex-1 pb-24 lg:pb-10 pt-4 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <BottomNav />

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
