import React, { useContext } from 'react'

import { Dialog } from '@headlessui/react'

import Button from './Button'

import { NotLoggedInModalOpenContext } from '../utils/context'

export default function NotLoggedInModal() {
  const { notLoggedInModalOpen, setNotLoggedInModalOpen } = useContext(
    NotLoggedInModalOpenContext
  )

  const handleClose = () => setNotLoggedInModalOpen(false)

  if (!notLoggedInModalOpen) return null

  return (
    <Dialog
      as="div"
      open={notLoggedInModalOpen}
      className="relative z-10"
      onClose={handleClose}
    >
      <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
          <Dialog.Title as="h3" className="text-3xl font-semibold">
            You are not logged in
          </Dialog.Title>

          <p className="text-sm text-gray-500 mt-2">
            To use this feature, you must be logged in.
          </p>

          <div className="mt-4">
            <Button
              href="/api/auth/login?returnTo=/signupcont"
              onClick={handleClose}
              className="mx-1"
            >
              Log In
            </Button>

            <Button onClick={handleClose} className="mx-1">
              Close
            </Button>
          </div>
        </Dialog.Panel>

        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </Dialog>
  )
}
