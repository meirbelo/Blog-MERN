import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(); // Crée un contexte

export const useTheme = () => useContext(ThemeContext); // Hook personnalisé pour utiliser le contexte

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');  // État du thème avec une valeur par défaut 'light'

  const toogleTheme = () => {  // Fonction pour basculer entre les thèmes
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      {children} {/* Fournit le contexte aux enfants */}
    </ThemeContext.Provider>
  );
};
