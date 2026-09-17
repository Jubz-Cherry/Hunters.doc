import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('profileTheme') || 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('profileLanguage') || 'pt');

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('profileTheme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    localStorage.setItem('profileLanguage', language);
  }, [language]);

  const t = useCallback((portuguese, english) => language === 'en' ? english : portuguese, [language]);
  return <PreferencesContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('PreferencesProvider is required');
  return context;
}
