"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getDictionary, STORAGE_KEY, languages, type Language, type Dictionary } from "./dictionaries";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  languages: { code: Language; label: string }[];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "vi";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en" || stored === "ko") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return "vi";
}

function updateHtmlLang(lang: Language) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => getStoredLanguage());

  // Initialize document language on mount
  useEffect(() => {
    updateHtmlLang(getStoredLanguage());
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    updateHtmlLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const t = getDictionary(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
