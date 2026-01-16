import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export const ThemeContext = createContext(
  {} as {
    isDarkMode: boolean;
    setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  }
);

export function useThemeContext() {
  return useContext(ThemeContext);
}
