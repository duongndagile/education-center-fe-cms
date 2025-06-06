/* eslint-disable @typescript-eslint/no-unused-vars */
import { themes, type ThemeType } from '../../themes'
import { ChakraProvider, type SystemContext } from '@chakra-ui/react'
import { createContext, useContext, useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const ThemeContext = createContext({ toggleTheme: (_themeType: ThemeType) => {}, theme: themes.fo })

export const Provider = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<SystemContext>(themes.fo)

  const toggleTheme = (themeType: ThemeType) => {
    setTheme(themes[themeType])
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <QueryClientProvider client={queryClient}>
      <ChakraProvider value={theme}>{props.children}</ChakraProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeSwitcher = () => useContext(ThemeContext)
