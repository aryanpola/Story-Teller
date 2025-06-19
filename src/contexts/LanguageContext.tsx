import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
}

const translations = {
  welcome: {
    en: 'Welcome to StoryLand',
    fr: 'Bienvenue à StoryLand',
    es: 'Bienvenido a StoryLand',
    hi: 'स्टोरीलैंड में आपका स्वागत है'
  },
  login: {
    en: 'Login',
    fr: 'Connexion',
    es: 'Iniciar Sesión',
    hi: 'लॉग इन करें'
  },
  register: {
    en: 'Register',
    fr: 'S\'inscrire',
    es: 'Registrarse',
    hi: 'पंजीकरण करें'
  },
  stories: {
    en: 'Stories',
    fr: 'Histoires',
    es: 'Historias',
    hi: 'कहानियाँ'
  },
  createStory: {
    en: 'Create Story',
    fr: 'Créer une Histoire',
    es: 'Crear Historia',
    hi: 'कहानी बनाएं'
  },
  profile: {
    en: 'Profile',
    fr: 'Profil',
    es: 'Perfil',
    hi: 'प्रोफ़ाइल'
  },
  logout: {
    en: 'Logout',
    fr: 'Déconnexion',
    es: 'Cerrar Sesión',
    hi: 'लॉग आउट'
  },
  home: {
    en: 'Home',
    fr: 'Accueil',
    es: 'Inicio',
    hi: 'होम'
  },
  language: {
    en: 'Language',
    fr: 'Langue',
    es: 'Idioma',
    hi: 'भाषा'
  },
  menu: {
    en: 'Menu',
    fr: 'Menu',
    es: 'Menú',
    hi: 'मेनू'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};