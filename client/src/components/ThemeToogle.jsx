import React from "react";
import { useTheme } from "../context/ThemeContext";  // Utiliser le hook pour accéder au contexte

const ThemeToggle = () => {
  const { theme, toogleTheme } = useTheme();  // Accéder au thème et à la fonction pour basculer le thème

  return (
    <div>
      {/* Le texte du bouton change en fonction du thème actuel */}
      <button onClick={toogleTheme}>
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>
    </div>
  );
};

export default ThemeToggle;
