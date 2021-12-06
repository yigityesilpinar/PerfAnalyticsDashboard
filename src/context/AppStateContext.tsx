import React from 'react'

interface AppStateContextProps {}

const AppStateContext = React.createContext<AppStateContextProps>({})

interface ProviderProps {}

const AppStateConsumer = AppStateContext.Consumer
const AppStateContextProvider = AppStateContext.Provider
const useAppState = () => React.useContext(AppStateContext)

// like session state, initialize in protocted routes, reset in unprotocted
const AppStateProvider: React.FC<ProviderProps> = ({ children }) => (
  <AppStateContextProvider value={{}}>{children}</AppStateContextProvider>
)

export { AppStateContext, AppStateProvider, AppStateConsumer, useAppState }
