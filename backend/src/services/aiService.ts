import { SoilNutrients } from '../types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function askAgriSaarthiAI(
  message: string,
  farmerContext?: {
    farmerName?: string;
    location?: string;
    soilData?: SoilNutrients;
    currentCrop?: string;
    farmSize?: number;
    language?: string;
  }
): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  const isMock = process.env.MOCK_MODE === 'true' || !apiKey;
  const lang = farmerContext?.language || 'en';

  if (isMock) {
    return generateMockAIResponse(message, farmerContext, lang);
  }

  try {
    const provider = process.env.AI_PROVIDER || 'openai';
    const baseUrl = process.env.AI_BASE_URL || (provider === 'groq' ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1');
    const model = process.env.AI_MODEL || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');

    const promptContext = farmerContext
      ? `Farmer Name: ${farmerContext.farmerName || 'Farmer'}, Location: ${farmerContext.location || 'Telangana'}, Soil Data: pH ${farmerContext.soilData?.pH || 6.8}, Nitrogen ${farmerContext.soilData?.nitrogen || 'Low'}, Current Crop: ${farmerContext.currentCrop || 'Tomato'}, Farm Size: ${farmerContext.farmSize || 5} acres. Preferred Language: ${lang}.`
      : `Preferred Language: ${lang}.`;

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `You are AgriSaarthi AI Assistant, an expert digital farming assistant designed exclusively for Indian farmers. ALWAYS respond in the user's requested language code (${lang}). Provide practical, encouraging, simple agricultural guidance. Context: ${promptContext}`
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data: any = await res.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
  } catch (err) {
    console.warn('AI API Call failed, falling back to mock response:', err);
  }

  return generateMockAIResponse(message, farmerContext, lang);
}

function generateMockAIResponse(
  message: string,
  farmerContext?: { farmerName?: string; location?: string; soilData?: SoilNutrients; currentCrop?: string; farmSize?: number },
  lang: string = 'en'
): string {
  const q = message.toLowerCase();
  const loc = farmerContext?.location || 'Nizamabad, Telangana';
  const ph = farmerContext?.soilData?.pH || 6.8;
  const nVal = farmerContext?.soilData?.nitrogen || 215;
  const crop = farmerContext?.currentCrop || 'Maize';

  // TELUGU RESPONSES
  if (lang === 'te') {
    if (q.includes('పంట') || q.includes('crop') || q.includes('pH') || q.includes('మంచిది')) {
      return `మీ నేల pH ${ph} మరియు పోషకాల ప్రకారం, **మొక్కజొన్న (Maize)**, **వేరుశనగ (Groundnut)**, మరియు **టమోటా (Tomato)** చాలా అనుకూలమైన పంటలు. నిజామాబాద్ మార్కెట్‌లో వీటి లాభదాయకత బాగుంది.`;
    }
    if (q.includes('యూరియా') || q.includes('urea') || q.includes('ఎరువు') || q.includes('fertilizer')) {
      return `మీ నేలలో నత్రజని (${nVal} kg/ha) కుగాను, ఎకరానికి 50 కిలోల యూరియా మరియు 25 కిలోల DAP నిపార్ఫారమ్ వద్ద మరియు 30 రోజులకు విడతలవారీగా అందించాలి.`;
    }
    if (q.includes('ధర') || q.includes('price') || q.includes('మార్కెట్') || q.includes('market')) {
      return `నిజామాబాద్ APMC యార్డ్‌లో ${crop} ప్రస్తుత మార్కెట్ ధర క్వింటాలుకు సుమారు ₹1,850 గా ఉంది (+5% పెరిగింది).`;
    }
    return `నమస్తే! అగ్రిసారథి AI మీకు సహాయం చేయడానికి సిద్ధంగా ఉంది. మీ నేల pH ${ph} కి తగిన పంటలు, ఎరువుల ప్లాన్ మరియు మార్కెట్ ధరలను మీరు ఇక్కడ తెలుసుకోవచ్చు.`;
  }

  // HINDI RESPONSES
  if (lang === 'hi') {
    if (q.includes('फसल') || q.includes('crop') || q.includes('pH')) {
      return `आपकी मिट्टी के pH ${ph} के अनुसार, **मक्का (Maize)**, **मूंगफली (Groundnut)** और **टमाटर (Tomato)** आपकी जमीन के लिए सबसे उपयुक्त फसलें हैं।`;
    }
    if (q.includes('यूरिया') || q.includes('खाद') || q.includes('fertilizer')) {
      return `आपकी फसल के लिए प्रति एकड़ 50 किलो यूरिया और 25 किलो डीएपी को बुआई के समय और 30 दिनों बाद दो किस्तों में डालें।`;
    }
    if (q.includes('भाव') || q.includes('दाम') || q.includes('बाजार') || q.includes('price')) {
      return `निजामाबाद मंडी में ${crop} का आज का बाजार भाव ₹1,850 प्रति क्विंटल चल रहा है।`;
    }
    return `नमस्ते! एग्रीसारथी AI आपकी सेवा में है। आपकी मिट्टी pH ${ph} के आधार पर सही फसल और खाद की जानकारी उपलब्ध है।`;
  }

  // MARATHI RESPONSES
  if (lang === 'mr') {
    if (q.includes('पीक') || q.includes('crop') || q.includes('pH')) {
      return `तुमच्या मातीच्या pH ${ph} नुसार, **मका (Maize)**, **भुईमूग (Groundnut)** आणि **टोमॅटो (Tomato)** ही उत्तम पिके आहेत.`;
    }
    if (q.includes('खत') || q.includes('युरिया') || q.includes('fertilizer')) {
      return `तुमच्या पिकासाठी प्रति एकरी ५० किलो युरिया आणि २५ किलो डीएपी दोन हप्त्यांमध्ये वापरावे.`;
    }
    if (q.includes('भाव') || q.includes('बाजार') || q.includes('price')) {
      return `बाजारपेठेत ${crop} चा आजचा दर ₹१,८५० प्रति क्विंटल आहे.`;
    }
    return `नमस्कार! ॲग्रीसारथी AI मध्ये आपले स्वागत आहे. तुमच्या शेतीसाठी योग्य पीक आणि खत नियोजन उपलब्ध आहे.`;
  }

  // TAMIL RESPONSES
  if (lang === 'ta') {
    if (q.includes('பயிர்') || q.includes('crop') || q.includes('pH')) {
      return `உங்கள் மண்ணின் pH ${ph} க்கு **மக்காச்சோளம் (Maize)** மற்றும் **மணிலா பயிர் (Groundnut)** மிகவும் ஏற்றது.`;
    }
    if (q.includes('உரம்') || q.includes('fertilizer')) {
      return `ஒரு ஏக்கருக்கு 50 கிலோ யூரியா மற்றும் 25 கிலோ DAP உரத்தை இரண்டு தவணைகளாக இடவும்.`;
    }
    if (q.includes('விலை') || q.includes('சந்தை') || q.includes('price')) {
      return `சந்தையில் ${crop} இன்றைய விலை குவிண்டாலுக்கு ₹1,850 ஆக உள்ளது.`;
    }
    return `வணக்கம்! அக்ரிசாரதி AI உங்களுக்கு உதவ தயார். உங்கள் மண் மற்றும் பயிர் தேவைகளை கேட்கலாம்.`;
  }

  // KANNADA RESPONSES
  if (lang === 'kn') {
    if (q.includes('ಬೆಳೆ') || q.includes('crop') || q.includes('pH')) {
      return `ನಿಮ್ಮ ಮಣ್ಣಿನ pH ${ph} ಗೆ **ಮೆಕ್ಕೆಜೋಳ (Maize)** ಮತ್ತು **ಕಡಲೆಕಾಯಿ (Groundnut)** ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳಾಗಿವೆ.`;
    }
    if (q.includes('ಗೊಬ್ಬರ') || q.includes('fertilizer')) {
      return `ಪ್ರತಿ ಎಕರೆಗೆ 50 ಕೆಜಿ ಯೂರಿಯಾ ಮತ್ತು 25 ಕೆಜಿ DAP ಯನ್ನು ಎರಡು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.`;
    }
    if (q.includes('ಬೆಲೆ') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('price')) {
      return `ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ${crop} ಇಂದಿನ ಬೆಲೆ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹1,850 ಆಗಿದೆ.`;
    }
    return `ನಮಸ್ಕಾರ! ಅಗ್ರಿ ಸಾರಥಿ AI ನಿಮ್ಮ ಸೇವೆಗೆ ಸಿದ್ಧವಾಗಿದೆ. ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಬೆಳೆ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಪಡೆಯಬಹುದು.`;
  }

  // DEFAULT ENGLISH RESPONSES
  if (q.includes('suitable') || q.includes('crop') || q.includes('ph')) {
    return `Based on your soil pH (${ph}) and nutrient profile in ${loc}, **Maize**, **Groundnut**, and **Tomato** are highly suitable for your farm with expected net profit up to ₹34,000/acre.`;
  }

  if (q.includes('nitrogen') || q.includes('fertilizer') || q.includes('urea')) {
    return `For your ${crop} crop, apply basal dose (DAP 25kg & MOP 15kg) during land preparation. Urea (50kg/acre) should be top-dressed in 2 equal split doses at 30 days and 50 days post-sowing.`;
  }

  if (q.includes('market') || q.includes('sell') || q.includes('price')) {
    return `Current market prices for ${crop} in ${loc} average ₹1,850 / quintal (+5% from last week) at Nizamabad APMC Yard.`;
  }

  return `AgriSaarthi AI is here to help! Based on your farm in ${loc}, we recommend maintaining proper soil moisture, conducting periodic pest checks, and following your customized fertilizer schedule.`;
}
