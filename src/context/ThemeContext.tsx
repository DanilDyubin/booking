import { useState, createContext, useEffect, useMemo, ReactNode } from 'react';

export interface ThemeValue {
  theme: string;
  onChangeTheme: () => void;
}

interface ThemeProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeValue>({
  theme: 'light',
  onChangeTheme: () => {},
});

const ThemeContextProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const onChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = document.querySelector(':root') as HTMLElement;
    const themes = ['background-theme', 'text-theme', 'body-theme'];
    if (root != null) {
      themes.forEach((item) => {
        // вместо map, чтобы не создавать постоянно новый массив
        root.style.setProperty(`--${item}-default`, `var(--${item}-${theme})`);
      });
    }
  }, [theme]);

  const defaultValue = useMemo(
    () => ({
      // чтобы избежать повторного рендеринга
      theme: theme,
      onChangeTheme: onChangeTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
