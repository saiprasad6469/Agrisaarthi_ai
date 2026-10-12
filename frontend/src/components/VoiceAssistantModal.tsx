import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, Send, Bot, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
  onLangChange: (lang: any) => void;
}

const LANG_CONFIG: Record<string, { name: string; native: string; code: string; ttsCode: string; samplePrompts: string[] }> = {
  en: {
    name: 'English',
    native: 'English',
    code: 'en-IN',
    ttsCode: 'en-IN',
    samplePrompts: [
      'What crop is best for soil pH 6.8?',
      'How much Urea should I apply per acre?',
      'Show current market price for Maize in Nizamabad.',
      'Explain my 90-day crop cultivation plan.'
    ]
  },
  te: {
    name: 'Telugu',
    native: 'తెలుగు',
    code: 'te-IN',
    ttsCode: 'te-IN',
    samplePrompts: [
      'నా మట్టి pH 6.8 కి ఏ పంట మంచిది?',
      'ఎకరానికి ఎంత యూరియా వేయాలి?',
      'మొక్కజొన్న ప్రస్తుత మార్కెట్ ధర ఎంత?',
      'పంట సాగు ప్లాన్ వివరాలు చెప్పండి.'
    ]
  },
  hi: {
    name: 'Hindi',
    native: 'हिंदी',
    code: 'hi-IN',
    ttsCode: 'hi-IN',
    samplePrompts: [
      'मेरी मिट्टी pH 6.8 के लिए कौन सी फसल सबसे अच्छी है?',
      'प्रति एकड़ कितना यूरिया डालना चाहिए?',
      'निजामाबाद में मक्के का आज का बाजार भाव क्या है?',
      'मेरी फसल खेती योजना विस्तार से बताएं।'
    ]
  },
  mr: {
    name: 'Marathi',
    native: 'मराठी',
    code: 'mr-IN',
    ttsCode: 'mr-IN',
    samplePrompts: [
      'माझ्या मातीचे pH 6.8 साठी कोणते पीक उत्तम आहे?',
      'एका एकराला किती युरिया वापरावा?',
      'मक्याचा आजचा बाजार भाव काय आहे?',
      'माझ्या पीक लागवड योजनेची माहिती द्या.'
    ]
  },
  ta: {
    name: 'Tamil',
    native: 'தமிழ்',
    code: 'ta-IN',
    ttsCode: 'ta-IN',
    samplePrompts: [
      'எனது மண் pH 6.8 க்கு எந்த பயிர் சிறந்தது?',
      'ஒரு ஏக்கருக்கு எவ்வளவு யூரியா இட வேண்டும்?',
      'மக்காச்சோளத்தின் இன்றைய சந்தை விலை என்ன?',
      'எனது பயிர் சாகுபடி திட்டத்தை விளக்கவும்.'
    ]
  },
  kn: {
    name: 'Kannada',
    native: 'ಕನ್ನಡ',
    code: 'kn-IN',
    ttsCode: 'kn-IN',
    samplePrompts: [
      'ನನ್ನ ಮಣ್ಣಿನ pH 6.8 ಗೆ ಯಾವ ಬೆಳೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ?',
      'ಪ್ರತಿ ಎಕರೆಗೆ ಎಷ್ಟು ಯೂರಿಯಾ ಹಾಕಬೇಕು?',
      'ಮೆಕ್ಕೆಜೋಳದ ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಎಷ್ಟು?',
      'ನನ್ನ ಬೆಳೆ ಸಾಗುವಳಿ ಯೋಜನೆಯ ವಿವರ ನೀಡಿ.'
    ]
  }
};

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLangChange
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Namaste! I am AgriSaarthi Mitra, your voice agricultural assistant. Speak or type your question in English, Telugu, Hindi, Marathi, Tamil, or Kannada!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const recognitionRef = useRef<any>(null);

  // Load browser voices asynchronously
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = LANG_CONFIG[currentLang]?.code || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLang]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          stopSpeaking();
          recognitionRef.current.lang = LANG_CONFIG[currentLang]?.code || 'en-IN';
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.warn('Failed to start speech recognition:', err);
          setIsListening(false);
        }
      } else {
        alert('Voice speech recognition is not supported in your browser. Please type your query.');
      }
    }
  };

  /**
   * Find explicit browser voice matching language
   */
  const findMatchingVoice = (langKey: string): SpeechSynthesisVoice | null => {
    if (!availableVoices.length && 'speechSynthesis' in window) {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setAvailableVoices(v);
    }

    const config = LANG_CONFIG[langKey] || LANG_CONFIG['en'];
    const targetCode = config.ttsCode.toLowerCase();
    const shortLang = langKey.toLowerCase();

    // 1. Direct code match (e.g., te-IN, hi-IN, mr-IN, ta-IN, kn-IN)
    let matched = availableVoices.find((v) => v.lang.toLowerCase() === targetCode || v.lang.toLowerCase().replace('_', '-').startsWith(shortLang));
    if (matched) return matched;

    // 2. Search voice names for language terms
    const langNames: Record<string, string[]> = {
      te: ['telugu', 'te-in'],
      hi: ['hindi', 'hi-in', 'हिन्दी'],
      mr: ['marathi', 'mr-in', 'मराठी'],
      ta: ['tamil', 'ta-in', 'தமிழ்'],
      kn: ['kannada', 'kn-in', 'ಕನ್ನಡ'],
      en: ['english', 'en-in', 'en-us']
    };

    const keywords = langNames[shortLang] || [shortLang];
    matched = availableVoices.find((v) => keywords.some((kw) => v.name.toLowerCase().includes(kw) || v.lang.toLowerCase().includes(kw)));
    if (matched) return matched;

    // 3. Fallback to any voice starting with language prefix
    return availableVoices.find((v) => v.lang.toLowerCase().startsWith(shortLang)) || null;
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Clean markdown tags (* # _) for smoother TTS reading
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);

      const targetVoice = findMatchingVoice(currentLang);
      if (targetVoice) {
        utterance.voice = targetVoice;
        utterance.lang = targetVoice.lang;
      } else {
        utterance.lang = LANG_CONFIG[currentLang]?.ttsCode || 'en-IN';
      }

      utterance.rate = 0.92;
      utterance.pitch = 1.0;

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

  const handleSendQuery = async (userQuery?: string) => {
    const textToSubmit = userQuery || query;
    if (!textToSubmit.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSubmit,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const res = await api.askAssistant({ message: textToSubmit, language: currentLang });
      const aiReply = res.reply || res.message || 'I recommend checking your soil test values and applying split NPK fertilizers.';

      const aiMsg = {
        sender: 'ai' as const,
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiReply);
    } catch (err) {
      const fallbackMsg = 'AgriSaarthi AI is ready! Keeping soil pH balanced (6.0 - 7.5) and following the scheduled fertilizer plan ensures maximum crop yield.';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
                <span>AgriSaarthi Mitra</span>
                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/40 border border-white/20 font-mono tracking-wider">
                  MULTILINGUAL VOICE AI
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-emerald-100 font-medium">Voice Assistance in 6 Languages</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-2.5 sm:px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[11px] sm:text-xs font-bold flex items-center space-x-1 shadow-xs"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Mute</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* LANGUAGE SELECTOR TABS */}
        <div className="bg-emerald-50 p-2.5 sm:p-3 border-b border-emerald-100 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-900 uppercase shrink-0 mr-1">Voice Language:</span>
          {Object.entries(LANG_CONFIG).map(([code, config]) => (
            <button
              key={code}
              onClick={() => onLangChange(code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                currentLang === code
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200'
              }`}
            >
              {config.native} ({config.name})
            </button>
          ))}
        </div>

        {/* MESSAGES CHAT AREA */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-slate-50/50 min-h-[220px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2.5 sm:space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-xs ${
                  msg.sender === 'user' ? 'bg-slate-800' : 'bg-emerald-600'
                }`}
              >
                {msg.sender === 'user' ? 'You' : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-medium shadow-2xs space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] opacity-75 border-t border-slate-200/40">
                  <span>{msg.time}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="inline-flex items-center space-x-1 text-emerald-700 font-bold hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak ({LANG_CONFIG[currentLang]?.native})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold p-3 bg-emerald-50 rounded-2xl border border-emerald-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>AgriSaarthi Voice AI is preparing your response...</span>
            </div>
          )}
        </div>

        {/* QUICK SAMPLE PROMPTS */}
        <div className="p-2.5 sm:p-3 bg-white border-t border-slate-100 space-y-1.5">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tap to Ask by Voice / Text:</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {LANG_CONFIG[currentLang]?.samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(prompt)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 text-xs rounded-xl border border-slate-200 shrink-0 font-medium transition-colors"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* VOICE & INPUT CONTROLS */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2 sm:space-x-3">
          {/* BIG VOICE MIC BUTTON */}
          <button
            onClick={toggleListening}
            className={`p-3 sm:p-3.5 rounded-2xl text-white font-bold transition-all shadow-md flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse ring-4 ring-red-200'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            title={isListening ? 'Click to stop listening' : 'Click to speak'}
          >
            {isListening ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            placeholder={
              isListening
                ? `Listening in ${LANG_CONFIG[currentLang]?.native}... Speak now!`
                : `Ask question in ${LANG_CONFIG[currentLang]?.native}...`
            }
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs sm:text-sm"
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={!query.trim() || loading}
            className="p-3 sm:p-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-2xl shadow-xs transition-colors shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
