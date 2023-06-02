import { UserProvider } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

import Header from '../components/Header'
import NotLoggedInModal from '../components/NotLoggedInModal'

import { NotLoggedInModalOpenContext } from '../utils/context'

import '../styles/globals.css'

import { trpc } from '../utils/trpc'

type Props = {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Props) {
  const [notLoggedInModalOpen, setNotLoggedInModalOpen] = useState(false)

  return (
    <UserProvider>
      <NotLoggedInModalOpenContext.Provider
        value={{ notLoggedInModalOpen, setNotLoggedInModalOpen }}
      >
        <div className="max-w-2xl mx-auto">
          <Header />

          <Component {...pageProps} />
        </div>

        <NotLoggedInModal />
      </NotLoggedInModalOpenContext.Provider>
    </UserProvider>
  )
}

export default trpc.withTRPC(App)
