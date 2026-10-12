import en from '../locales/en.json';
import te from '../locales/te.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';
import ta from '../locales/ta.json';
import kn from '../locales/kn.json';

const translations: Record<string, any> = { en, te, hi, mr, ta, kn };

export function getTranslation(key: string, lang: string = 'en'): string {
  const selectedLang = translations[lang] ? lang : 'en';
  return translations[selectedLang][key] || translations['en'][key] || key;
}

