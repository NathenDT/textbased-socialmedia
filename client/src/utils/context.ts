import { createContext, SetStateAction } from 'react'

export const NotLoggedInModalOpenContext = createContext({
  notLoggedInModalOpen: false,
  setNotLoggedInModalOpen: (_: boolean) => {},
})
