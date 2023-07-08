import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem("pet-love-language") || 'en');

    const switchLanguage = (newLanguage) => {
        localStorage.setItem("pet-love-language", newLanguage)
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;