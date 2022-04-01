import { createContext, ReactChild, useState } from 'react'
import { Global } from '../generated'

export interface ServicesOptions {
  title: string
  chatId: number
}

interface IAppContext {
  cmsData: Global | null
  services: Array<ServicesOptions> | null
  selectedService: ServicesOptions | null
  setSelectedService?: (service: ServicesOptions) => void
  setServices?: (arr: Array<ServicesOptions>) => void
}

const AppContext = createContext<Partial<IAppContext>>({})

interface IAppProvider {
  cmsData: Global | null
  children: ReactChild
}

const AppProvider: React.FC<IAppProvider> = ({ cmsData, children }) => {
  const [state, setState] = useState<IAppContext>({
    cmsData: cmsData || null,
    services: null,
    selectedService: null,
  })

  const setServices = (arr: Array<ServicesOptions>) => {
    setState({
      ...state,
      services: arr,
    })
  }

  const setSelectedService = (item: ServicesOptions | null) => {
    setState({
      ...state,
      selectedService: item,
    })
  }
  return (
    <AppContext.Provider
      value={{
        cmsData,
        services: state.services,
        selectedService: state.selectedService,
        setServices,
        setSelectedService,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
