"use client"
import { useEffect, useState } from "react";

export function useDarkmode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('bg-lightGray');
      document.body.classList.add('dark');
      document.body.classList.add('bg-darkGray');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.remove('bg-darkGray');
      document.body.classList.add('bg-lightGray');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode }
}
