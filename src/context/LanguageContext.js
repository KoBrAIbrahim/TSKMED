import { createContext } from 'react';

export const LanguageContext = createContext({
  currentLang: 'ar',
  toggleLanguage: () => {}
});
