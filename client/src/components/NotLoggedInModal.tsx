import React, { useContext } from 'react'

import Button from './Button'

import { NotLoggedInModalOpenContext } from '../utils/context'

export default function NotLoggedInModal() {
  const { notLoggedInModalOpen, setNotLoggedInModalOpen } = useContext(
    NotLoggedInModalOpenContext
  )

  const handleClose = () => setNotLoggedInModalOpen(false)

  if (!notLoggedInModalOpen) return null

  return (
    <>
      <div
        id="not-logged-in-modal"
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="my-6 mx-auto border-0 rounded-lg flex flex-col bg-white p-4">
          <h3 className="text-3xl font-semibold">You are not logged in</h3>

          <p className="my-4 text-lg">
            To use this feature, you must be logged in.
          </p>

          <div className="flex items-center justify-end">
            <Button onClick={handleClose} className="m-2">
              Close
            </Button>

            <Button href="/api/auth/login?returnTo=/signupcont" className="m-2">
              Log In
            </Button>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
