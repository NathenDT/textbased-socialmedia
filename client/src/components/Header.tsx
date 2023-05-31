import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

import Button from './Button'

export default function Header() {
  const { user, isLoading } = useUser()

  return (
    <div className="full-width flex top-0 bg-white">
      <div className="text-3xl m-2 font-semibold">
        <Link href="/">Text Based</Link>
      </div>

      <div className="grow" />

      {user ? (
        <>
          <Button href="/api/auth/logout" className="m-2">
            Log Out
          </Button>
        </>
      ) : (
        <Button href="/api/auth/login?returnTo=/signupcont" className="m-2">
          Log In
        </Button>
      )}
    </div>
  )
}
