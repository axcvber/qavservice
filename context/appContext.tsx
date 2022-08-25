import { createContext, ReactChild, useState } from 'react'
import { Global } from '../generated'

interface IAppContext {
  cmsData: Global | null
  selectedService: string | null
  setSelectedService?: (service: string) => void
}

const AppContext = createContext<Partial<IAppContext>>({})

interface IAppProvider {
  cmsData: Global | null
  children: ReactChild
}

const AppProvider: React.FC<IAppProvider> = ({ cmsData, children }) => {
  const [state, setState] = useState<IAppContext>({
    cmsData: cmsData || null,
    selectedService: null,
  })

  const setSelectedService = (item: string | null) => {
    setState({
      ...state,
      selectedService: item,
    })
  }
  return (
    <AppContext.Provider
      value={{
        cmsData,
        selectedService: state.selectedService,
        setSelectedService,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
