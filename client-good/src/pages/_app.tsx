import { UserProvider } from '@auth0/nextjs-auth0/client'
import { trpc } from '../utils/trpc'

import '../styles/globals.css'
import Header from '../components/Header'

type Props = {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Props) {
  return (
    <UserProvider>
      <div className="max-w-2xl mx-auto">
        <Header />

        <Component {...pageProps} />
      </div>
    </UserProvider>
  )
}

export default trpc.withTRPC(App)
