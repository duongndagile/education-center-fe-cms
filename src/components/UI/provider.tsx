/* eslint-disable @typescript-eslint/no-unused-vars */
import { themes, type ThemeType } from '../../themes'
import { ChakraProvider, type SystemContext } from '@chakra-ui/react'
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({ toggleTheme: (_themeType: ThemeType) => {}, theme: themes.fo })

export const Provider = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<SystemContext>(themes.fo)

  const toggleTheme = (themeType: ThemeType) => {
    setTheme(themes[themeType])
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ChakraProvider value={theme}>{props.children}</ChakraProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeSwitcher = () => useContext(ThemeContext)
