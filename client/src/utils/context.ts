import { createContext } from 'react'

export const NotLoggedInModalOpenContext = createContext({
  notLoggedInModalOpen: false,
  setNotLoggedInModalOpen: (_: boolean) => {},
})
