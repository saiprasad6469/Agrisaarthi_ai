import { Response } from 'express';
import { AuthRequest } from '../types';
import { askAgriSaarthiAI } from '../services/aiService';

export const chatWithAssistant = async (req: AuthRequest, res: Response) => {
  try {
    const { message, farmerContext, language } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const lang = language || farmerContext?.language || 'en';
    const mergedContext = { ...farmerContext, language: lang };

    const reply = await askAgriSaarthiAI(message, mergedContext);

    return res.json({
      success: true,
      reply,
      language: lang,
      suggestedQuestions: [
        'What crop is suitable for my soil?',
        'What does low nitrogen mean?',
        'When should I apply fertilizer?',
        'How much water does my crop need?',
        'What are the risks for my crop?',
        'Where can I sell my crop?'
      ]
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
