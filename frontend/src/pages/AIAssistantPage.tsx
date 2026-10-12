import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Bot, Send, User, FileText, Sprout, Store, Bell, Settings, ChevronRight, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { api } from '../services/api';

const LANG_CONFIG: Record<string, { name: string; native: string; code: string; ttsCode: string }> = {
  en: { name: 'English', native: 'English', code: 'en-IN', ttsCode: 'en-IN' },
  te: { name: 'Telugu', native: 'తెలుగు', code: 'te-IN', ttsCode: 'te-IN' },
  hi: { name: 'Hindi', native: 'हिंदी', code: 'hi-IN', ttsCode: 'hi-IN' },
  mr: { name: 'Marathi', native: 'मराठी', code: 'mr-IN', ttsCode: 'mr-IN' },
  ta: { name: 'Tamil', native: 'தமிழ்', code: 'ta-IN', ttsCode: 'ta-IN' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', code: 'kn-IN', ttsCode: 'kn-IN' }
};

export const AIAssistantPage: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Namaste Ramesh! I am AgriSaarthi Mitra. How can I help you with your soil test report, crop selection, or fertilizer plan today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        setAvailableVoices(window.speechSynthesis.getVoices());
      }
    };
    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = LANG_CONFIG[selectedLang]?.code || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [selectedLang]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          stopSpeaking();
          recognitionRef.current.lang = LANG_CONFIG[selectedLang]?.code || 'en-IN';
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          setIsListening(false);
        }
      } else {
        alert('Voice speech recognition is not supported in your browser.');
      }
    }
  };

  const findMatchingVoice = (langKey: string): SpeechSynthesisVoice | null => {
    const config = LANG_CONFIG[langKey] || LANG_CONFIG['en'];
    const targetCode = config.ttsCode.toLowerCase();
    const shortLang = langKey.toLowerCase();

    let matched = availableVoices.find((v) => v.lang.toLowerCase() === targetCode || v.lang.toLowerCase().replace('_', '-').startsWith(shortLang));
    if (matched) return matched;

    const keywords: Record<string, string[]> = {
      te: ['telugu', 'te-in'],
      hi: ['hindi', 'hi-in'],
      mr: ['marathi', 'mr-in'],
      ta: ['tamil', 'ta-in'],
      kn: ['kannada', 'kn-in'],
      en: ['english', 'en-in', 'en-us']
    };
    const kwList = keywords[shortLang] || [shortLang];
    return availableVoices.find((v) => kwList.some((k) => v.name.toLowerCase().includes(k) || v.lang.toLowerCase().includes(k))) || null;
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);

      const targetVoice = findMatchingVoice(selectedLang);
      if (targetVoice) {
        utterance.voice = targetVoice;
        utterance.lang = targetVoice.lang;
      } else {
        utterance.lang = LANG_CONFIG[selectedLang]?.ttsCode || 'en-IN';
      }

      utterance.rate = 0.92;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.askAssistant({ message: textToSend, language: selectedLang });
      const aiReply = res.reply || res.message || 'I recommend following split NPK fertilizer application based on your soil report.';

      const aiMsg = {
        sender: 'ai' as const,
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiReply);
    } catch (err) {
      const fallbackMsg = 'AgriSaarthi AI is ready! Maintaining soil pH between 6.0 - 7.5 and using recommended nitrogen split doses maximizes crop yield.';
      const aiMsg = {
        sender: 'ai' as const,
        text: fallbackMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { label: 'Farmer Profile', icon: User, path: '/profile', sub: 'Ramesh Kumar • Nizamabad' },
    { label: 'Soil Reports', icon: FileText, path: '/soil-analysis', sub: 'Extracted Lab Values' },
    { label: 'Crop Cultivation Plan', icon: Sprout, path: '/crop-plan', sub: 'Customized Timeline' },
    { label: 'Market Prices', icon: Store, path: '/markets', sub: 'APMC Yard Prices' },
    { label: 'Notifications', icon: Bell, path: '/notifications', sub: 'Milestone Alerts' },
    { label: 'Settings', icon: Settings, path: '/settings', sub: 'Voice & Language Settings' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-4 sm:p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black">AgriSaarthi Mitra</h1>
            <p className="text-xs text-emerald-100 font-medium">Multilingual Voice AI Farming Assistant</p>
          </div>
        </div>

        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs"
          >
            <VolumeX className="w-4 h-4" />
            <span>Mute Voice</span>
          </button>
        )}
      </div>

      {/* LANGUAGE SELECTOR */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center space-x-2 overflow-x-auto shadow-xs">
        <span className="text-xs font-bold text-slate-700 uppercase shrink-0 mr-1">Voice Language:</span>
        {Object.entries(LANG_CONFIG).map(([code, config]) => (
          <button
            key={code}
            onClick={() => setSelectedLang(code)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedLang === code
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 border border-slate-200'
            }`}
          >
            {config.native} ({config.name})
          </button>
        ))}
      </div>

      {/* CHAT WINDOW */}
      <div className="agri-card p-4 sm:p-6 space-y-4">
        <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                  m.sender === 'user' ? 'bg-slate-800' : 'bg-emerald-600'
                }`}
              >
                {m.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium max-w-[85%] space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-emerald-50 text-slate-900 border border-emerald-200 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                {m.sender === 'ai' && (
                  <div className="pt-1 border-t border-emerald-200/60 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-mono">{m.time}</span>
                    <button
                      onClick={() => speakText(m.text)}
                      className="inline-flex items-center space-x-1 text-emerald-800 font-bold hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak ({LANG_CONFIG[selectedLang]?.native})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && <p className="text-xs text-emerald-700 font-bold animate-pulse">AgriSaarthi Mitra is typing response in {LANG_CONFIG[selectedLang]?.name}...</p>}
        </div>

        {/* INPUT & VOICE CONTROL */}
        <div className="flex items-center space-x-2 pt-3 border-t border-slate-100">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl text-white font-bold transition-all shadow-xs flex items-center justify-center shrink-0 ${
              isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            title="Click to speak by voice"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask AgriSaarthi Mitra in ${LANG_CONFIG[selectedLang]?.native}...`}
            className="flex-1 px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QUICK COMPANION ACCESS LINKS */}
      <div className="agri-card p-4 space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1">Quick Portal Access</div>
        <div className="divide-y divide-slate-100">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center justify-between p-3 hover:bg-emerald-50/60 rounded-2xl transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{item.label}</span>
                    <p className="text-[10px] sm:text-[11px] text-slate-500">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
