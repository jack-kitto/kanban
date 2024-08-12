"use client"
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export function useDarkmode() {
  const darkThemeEnabled: boolean = localStorage.getItem('darkMode') === 'ENABLED'
  const [isDarkMode, setIsDarkMode] = useState<boolean>(darkThemeEnabled);
  const darkModeMutation = api.user.setDarkTheme.useMutation()

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('bg-lightGray');
      document.body.classList.add('dark');
      document.body.classList.add('bg-darkGray');
      darkModeMutation.mutate(true)
    } else {
      darkModeMutation.mutate(false)
      document.body.classList.remove('dark');
      document.body.classList.remove('bg-darkGray');
      document.body.classList.add('bg-lightGray');
    }
    localStorage.setItem('darkMode', isDarkMode ? 'ENABLED' : 'DISABLED');
  }, [isDarkMode, darkModeMutation]);

  return { isDarkMode, setIsDarkMode }
}
